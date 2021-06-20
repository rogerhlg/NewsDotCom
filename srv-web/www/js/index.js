// Imports e exports
import {
    carregarHtml,
  } from './scripts.js'
  
  import {
    carregarPaginaCadastros
  } from './cadastros.js'
  
  import {
    carregarPaginaSobre
  } from './sobre.js'
  
  // Carregar o cabeçalho.
  function carregarHeader(){
    const elemento = document.querySelector("header");
    fetch('html/header.html')
      .then(res => res.text())
      .then(texto => {
        elemento.innerHTML = texto;
      })
  };
  
  
  // Carregar o index.
  (function () {
    carregarHeader();
  })();
  