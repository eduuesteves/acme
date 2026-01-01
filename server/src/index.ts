import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/connection";
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/pacientes", (req: Request, res: Response) => {
  const sql = "SELECT * FROM pacientes";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    res.json(rows);
  });
});


app.post("/pacientes/registrar", (req, res) => {
  const { nome, data_de_nascimento, cpf, sexo, endereco, status } = req.body;

  const sqlVerificar = "SELECT * FROM pacientes WHERE cpf = ?";

  db.get(sqlVerificar, [cpf], (err, row) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    if (!row) {
      const sqlInserir = `
        INSERT INTO pacientes 
        (nome, data_de_nascimento, cpf, sexo, endereco, status) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      db.run(
        sqlInserir,
        [nome, data_de_nascimento, cpf, sexo, endereco, status],
        function (err) {
          if (err) {
            return res.status(500).json({ erro: err.message });
          }

          res.json({
            mensagem: "Paciente cadastrado com sucesso",
            id: this.lastID
          });
        }
      );
    } else {
      res.status(409).json({ mensagem: "Paciente já cadastrado" });
    }
  });
});


app.put("/pacientes/alterar/:cpf", (req, res) => {
  const { nome, data_de_nascimento, sexo, endereco, status } = req.body;
  const { cpf } = req.params;

  const sqlVerificar = "SELECT * FROM pacientes WHERE cpf = ?";

  db.get(sqlVerificar, [cpf], (err, row) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    if (row) {
      const sqlAtualizar = `
        UPDATE pacientes 
        SET nome = ?, 
            data_de_nascimento = ?, 
            sexo = ?, 
            endereco = ?, 
            status = ?
        WHERE cpf = ?
      `;

      db.run(
        sqlAtualizar,
        [nome, data_de_nascimento, sexo, endereco, status, cpf],
        function (err) {
          if (err) {
            return res.status(500).json({ erro: err.message });
          }

          res.json({ mensagem: "Paciente alterado com sucesso" });
        }
      );
    } else {
      res.status(404).json({ mensagem: "Paciente não encontrado" });
    }
  });
});

app.get("/create-table", (req, res) => {
  const sql = `
    CREATE TABLE IF NOT EXISTS pacientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      data_de_nascimento TEXT NOT NULL,
      cpf TEXT UNIQUE NOT NULL,
      sexo TEXT NOT NULL,
      endereco TEXT,
      status TEXT NOT NULL
    )
  `;

  db.run(sql, (err) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }
    res.json({ mensagem: "Tabela criada com sucesso" });
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
