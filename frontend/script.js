const API_URL = 'http://localhost:3000/alunos';
const CURSOS_URL = 'http://localhost:3000/cursos';

const formAdicionar = document.getElementById('formAdicionar');
const formEditar = document.getElementById('formEditar');

const listaAlunos = document.getElementById('listaAlunos');

const msgAdicionar = document.getElementById('msgAdicionar');
const msgEditar = document.getElementById('msgEditar');

const editarSection = document.getElementById('editarSection');

async function carregarCursos() {
  try {
    const res = await fetch(CURSOS_URL);
    const cursos = await res.json();

    preencherSelect('curso', cursos);
    preencherSelect('editarCurso', cursos);
  } catch (err) {
    console.error('Erro ao carregar cursos:', err);
  }
}

function preencherSelect(idSelect, cursos) {
  const select = document.getElementById(idSelect);
  select.innerHTML = '<option value="">Seleciona um curso</option>';
  cursos.forEach(curso => {
    const opt = document.createElement('option');
    opt.value = curso._id;
    opt.textContent = curso.nomeDoCurso;
    select.appendChild(opt);
  });
}

async function listarAlunos() {
  try {
    const res = await fetch(API_URL);
    const alunos = await res.json();

    const cursosRes = await fetch(CURSOS_URL);
    const cursos = await cursosRes.json();

    listaAlunos.innerHTML = '';
    if (alunos.length === 0) {
      listaAlunos.innerHTML = '<p>Nenhum aluno registado.</p>';
      return;
    }

    alunos.forEach(aluno => {
  const cursoNome = cursos.find(c => String(c._id) === String(aluno.curso))?.nomeDoCurso || 'Curso desconhecido';

  const card = document.createElement('div');
  card.className = 'aluno-card';

  card.innerHTML = `
    <div class="aluno-info">
      <strong>${aluno.nome} ${aluno.apelido}</strong><br />
      Idade: ${aluno.idade} | Curso: ${cursoNome} | Ano: ${aluno.anoCurricular}
    </div>
    <div class="aluno-actions">
      <button onclick='editar(${JSON.stringify(aluno)})'>Editar</button>
      <button class="eliminar" onclick='apagar("${aluno._id}")'>Eliminar</button>
    </div>
  `;

  listaAlunos.appendChild(card);
});

  } catch (err) {
    console.error('Erro ao listar alunos:', err);
  }
}

formAdicionar.addEventListener('submit', async (e) => {
  e.preventDefault();
  msgAdicionar.textContent = '';

  const novoAluno = {
    nome: formAdicionar.nome.value.trim(),
    apelido: formAdicionar.apelido.value.trim(),
    idade: parseInt(formAdicionar.idade.value),
    curso: formAdicionar.curso.value,
    anoCurricular: parseInt(formAdicionar.anoCurricular.value),
  };

  if (novoAluno.idade < 17 || novoAluno.idade > 70) {
    msgAdicionar.textContent = 'Idade deve ser entre 17 e 70.';
    msgAdicionar.style.color = 'red';
    return;
  }
  if (novoAluno.anoCurricular < 1 || novoAluno.anoCurricular > 3) {
    msgAdicionar.textContent = 'Ano curricular deve ser entre 1 e 3.';
    msgAdicionar.style.color = 'red';
    return;
  }

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoAluno),
    });
    formAdicionar.reset();
    msgAdicionar.textContent = 'Aluno adicionado com sucesso!';
    msgAdicionar.style.color = '#27ae60';
    listarAlunos();
  } catch (err) {
    msgAdicionar.textContent = 'Erro ao adicionar aluno.';
    msgAdicionar.style.color = 'red';
  }
});

function editar(aluno) {
  editarSection.classList.remove('hidden');

  formEditar.editarId.value = aluno._id;
  formEditar.editarNome.value = aluno.nome;
  formEditar.editarApelido.value = aluno.apelido;
  formEditar.editarIdade.value = aluno.idade;
  formEditar.editarCurso.value = aluno.curso;
  formEditar.editarAnoCurricular.value = aluno.anoCurricular;

  msgEditar.textContent = '';
}

document.getElementById('cancelarEditar').addEventListener('click', () => {
  editarSection.classList.add('hidden');
  formEditar.reset();
  msgEditar.textContent = '';
});

formEditar.addEventListener('submit', async (e) => {
  e.preventDefault();
  msgEditar.textContent = '';

  const id = formEditar.editarId.value;
  const alunoAtualizado = {
    nome: formEditar.editarNome.value.trim(),
    apelido: formEditar.editarApelido.value.trim(),
    idade: parseInt(formEditar.editarIdade.value),
    curso: formEditar.editarCurso.value,
    anoCurricular: parseInt(formEditar.editarAnoCurricular.value),
  };

  if (alunoAtualizado.idade < 17 || alunoAtualizado.idade > 70) {
    msgEditar.textContent = 'Idade deve ser entre 17 e 70.';
    msgEditar.style.color = 'red';
    return;
  }
  if (alunoAtualizado.anoCurricular < 1 || alunoAtualizado.anoCurricular > 3) {
    msgEditar.textContent = 'Ano curricular deve ser entre 1 e 3.';
    msgEditar.style.color = 'red';
    return;
  }

  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alunoAtualizado),
    });
    editarSection.classList.add('hidden');
    formEditar.reset();
    msgEditar.textContent = '';
    listarAlunos();
  } catch (err) {
    msgEditar.textContent = 'Erro ao atualizar aluno.';
    msgEditar.style.color = 'red';
  }
});

async function apagar(id) {
  if (!confirm('Tem certeza que deseja apagar este aluno?')) return;

  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    listarAlunos();
  } catch (err) {
    alert('Erro ao apagar aluno.');
  }
}


(async function init() {
  await carregarCursos();
  await listarAlunos();
})();
