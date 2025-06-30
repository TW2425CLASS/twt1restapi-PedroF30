const Aluno = require('../models/aluno');

exports.listar = async (req, res) => {
  const alunos = await Aluno.find();
  res.json(alunos);
};

exports.buscar = async (req, res) => {
  const aluno = await Aluno.findById(req.params.id);
  aluno ? res.json(aluno) : res.sendStatus(404);
};

exports.criar = async (req, res) => {
  const aluno = new Aluno(req.body);
  await aluno.save();
  res.status(201).json(aluno);
};

exports.atualizar = async (req, res) => {
  const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
  aluno ? res.json(aluno) : res.sendStatus(404);
};

exports.apagar = async (req, res) => {
  const resBD = await Aluno.findByIdAndDelete(req.params.id);
  resBD ? res.sendStatus(204) : res.sendStatus(404);
};
