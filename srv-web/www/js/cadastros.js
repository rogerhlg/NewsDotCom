// Imports e exports
import {
  carregarHtml,
  bindFunctions
} from './scripts.js';

import {
  abrirListagemDeClientes
} from './cadastros/clientes.js';

import {
  abrirClienteLogado
} from './cadastros/logado.js';

import {
  abrirListagemDeNoticias
} from './cadastros/noticias.js';

export {
  carregarPaginaCadastros
}

// Inicia a página cadastros.
async function carregarPaginaCadastros() {
  await carregarHtml('cadastros', 'main');
  criarBotoesTabs(document.querySelector('div.tab'));
  abrirListagemDeProdutos();
}

function criarBotoesTabs(container){
  

  const btnClientes = criarElemento('button', 'clientes')
      .adicionarClasse('tablinks')
      .adicionarTexto('Clientes');
      
  const btnLogado = criarElemento('button', 'logado')
      .adicionarClasse('tablinks')
      .adicionarTexto('Logado');
      
      const btnNoticias = criarElemento('button', 'noticias')
      .adicionarClasse('tablinks')
      .adicionarTexto('Noticias');  

  container.appendChild(btnClientes);
  container.appendChild(btnLogado);  
  container.appendChild(btnNoticias);  

}

function criarElemento(tipo, path){
  const elemento = document.createElement(tipo);
  bindFunctions(elemento);
  elemento.addEventListener('click', event => {
    mudarDeCadastro(event, path)
  });
  return elemento;
}

// Alternador de aba.
async function mudarDeCadastro(e, path) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  selecionarAba(path);

  const div = document.getElementById(path);
  div.style.display = 'block';
  e.currentTarget.className += ' active';
}

// Abas de cadastros.
const abasDeCadastros = new Map();
abasDeCadastros.set('clientes', abrirListagemDeClientes);
abasDeCadastros.set('logado', abrirClienteLogado);
abasDeCadastros.set('clientes', abrirListagemDeNoticias);

async function selecionarAba(path){
  const fn = abasDeCadastros.get(path);
  if (fn !== undefined) {
    await fn();
  }
}