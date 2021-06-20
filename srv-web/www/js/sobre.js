// Imports e exports
import {
    carregarHtml
  } from './scripts.js'
  
  export {
    carregarPaginaSobre
  };
  
  // Inicia a página sobre.
  async function carregarPaginaSobre() {
    await carregarHtml('sobre', 'main');
  };