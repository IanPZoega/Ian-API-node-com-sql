require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/usuarios', async (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: 'nome e email são obrigatórios' });
  }

  try {
    const [resultado] = await db.query(
      'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
      [nome, email]
    );
    res.status(201).json({ id: resultado.insertId, nome, email });
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ erro: 'erro ao cadastrar usuário' });
  }
});

app.get('/usuarios', async (req, res) => {
  try {
    const [usuarios] = await db.query('SELECT * FROM usuarios');
    res.status(200).json(usuarios);
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ erro: 'erro ao buscar usuários' });
  }
});

app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: 'nome e email são obrigatórios' });
  }

  try {
    const [resultado] = await db.query(
      'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
      [nome, email, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'usuário não encontrado' });
    }

    res.status(200).json({ id, nome, email });
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ erro: 'erro ao atualizar usuário' });
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [resultado] = await db.query('DELETE FROM usuarios WHERE id = ?', [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ erro: 'usuário não encontrado' });
    }

    res.status(200).json({ mensagem: 'usuário removido' });
  } catch (erro) {
    console.log(erro);
    res.status(500).json({ erro: 'erro ao remover usuário' });
  }
});

const porta = process.env.PORT || 3000;
app.listen(porta, () => {
  console.log('Servidor rodando na porta ' + porta);
});
