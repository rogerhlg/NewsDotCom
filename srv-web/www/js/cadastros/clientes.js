// Imports e exports
import {
  carregarHtml,
  criarElemento,
  formatarCPF
} from '../util.js'

export {
  abrirListagemDeClientes
}

// Listagem de clientes
async function abrirListagemDeClientes() {
  await carregarHtml("clientes/listar", "#clientes");
  document.querySelector('#clientes > div > a').onclick = async e =>{
    e.preventDefault();
    criarNovoCliente();
  }

  fetch('http://localhost:8000/clientes')
  .then(response => response.json())
  .then(json => {
    json.forEach( cliente => {
      const linha = criarLinhaCliente(cliente);
      const tbody = document.querySelector('table.clientes > tbody');
      tbody.appendChild(linha);
    })  
  });
}

async function criarNovoCliente(){
  await carregarHtml('clientes/criar', '#clientes');

  

  const btnSalvar = document.querySelector("#frmClientes > input#btnSalvar");
  btnSalvar.addEventListener('click', () => {
    let isNovo = true;
    salvarCliente(isNovo);
  });

  const btnCancelar = document.querySelector("#frmClientes > input#btnCancelar");
  btnCancelar.addEventListener('click', () => {
    abrirListagemDeClientes();
  });
}

function salvarCliente(isNovo) {
  const form = document.forms.clientes;
  let url = 'http://localhost:8000/clientes/';
  let metodo = 'POST';

  if (!isNovo){
      url += form.id.value;
      metodo = 'PUT';
  } 

  const header = { 
    method: metodo,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: popularJsonCliente()
  };

  fetch(url, header).then(() => {
    abrirListagemDeClientes();
  });
}

// Cria linhas da tabela cliente.
function criarLinhaCliente(cliente){
  const linha = criarElemento('tr');
  linha.incluirFilho(criarElemento('td').adicionarTexto(cliente.id));
  linha.incluirFilho(criarElemento('td').adicionarTexto(cliente.nome));
  const cpf = formatarCPF(cliente.cpf);
  linha.incluirFilho(criarElemento('td').adicionarTexto(cpf));
  linha.incluirFilho(criarElemento('td').adicionarTexto(cliente.fone));

  linha.incluirFilho(criarElemento('td').adicionarTexto(cliente.email));

  criarActions(linha, "clientes", cliente.id);
  return linha;
}

// Cria ações de exclusão e edição.
function criarActions(linha, path, id){
  const td = criarElemento('td');

  const linkEditar = criarElemento('a');
  linkEditar.adicionarTexto('Editar');
  linkEditar.style.display = 'inline-block';
  linkEditar.style.width = '40px';
  linkEditar.href = path + "/" + id;
  linkEditar.onclick = async e => {
    e.preventDefault();
    editarCliente(id);
  }
  td.incluirFilho(linkEditar)
  linha.incluirFilho(td)

  const linkExcluir = criarElemento('a');
  linkExcluir.adicionarTexto('Excluir');
  linkExcluir.href = path + '/' + id;
  linkExcluir.onclick = async e => {
    e.preventDefault();
    excluirCliente(id);
  }
  td.incluirFilho(linkExcluir)
  linha.incluirFilho(td)
}

async function editarCliente(id) {
  await carregarHtml('clientes/editar', '#clientes');
  popularFormCliente(id);

  const btnSalvar = document.querySelector("#btnSalvar");
  btnSalvar.addEventListener('click', () => {
    let isNovo = false;
    salvarCliente(isNovo);
  });

  const btnCancelar = document.querySelector("#btnCancelar");
  btnCancelar.addEventListener('click', () => {
    abrirListagemDeClientes();
  });
}

async function excluirCliente(id) {
  await carregarHtml('clientes/excluir', '#clientes');
  popularFormCliente(id);

  const btnConfimar = document.querySelector("#btnConfimar");
  btnConfimar.addEventListener('click', () => {
    fetch('http://localhost:8000/clientes/' + id, { method: 'DELETE'})
      .then(() => {
        abrirListagemDeClientes();
      });
  });

  const btnCancelar = document.querySelector("#btnCancelar");
  btnCancelar.addEventListener('click', () => {
    abrirListagemDeClientes();
  });
}

function popularFormCliente(id) {
  const form = document.forms.clientes;
  fetch('http://localhost:8000/clientes/' + id)
  .then(response => response.json())
  .then(cliente => {
    form.id.value = parseInt(cliente.id);
    form.login.value = cliente.login;
    form.email.value = cliente.email;
    form.nome.value = cliente.nome;
    form.sobrenome.value = cliente.sobrenome;
    form.cpf.value = cliente.cpf;
  });
}

function popularJsonCliente() {
  const form = document.forms.clientes;
  return JSON.stringify({
    id: parseInt(form.id.value),
    login: form.login.value,
    email: form.email.value,
    nome: form.nome.value,
    sobrenome: form.sobrenome.value,
    cpf: form.cpf.value,
  });
}