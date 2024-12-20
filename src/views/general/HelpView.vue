<template>
    <div class="main-container">
      <div class="columns is-centered">
        <div class="column is-three-fifths">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title is-centered">Materiais Auxiliares</p>
            </header>
            <div class="card-content">
              <div class="content">
                <div class="columns">
                  <ul>
                    <li><a href="/educa/files/informe.pdf" target="_blank">Informe aos Usuários</a></li>
                    <li><a href="/educa/files/boletim_rotina.pdf" target="_blank">Boletim - Atividades</a></li>
                    <li><a href="/educa/files/instrucao_rotina.pdf"  target="_blank">Instrução de Preenchimento - Atividades</a></li>       
                    <li><a href="/educa/files/boletim_projeto.pdf" target="_blank">Boletim - Projetos</a></li>
                    <li><a href="/educa/files/instrucao_projeto.pdf"  target="_blank">Instrução de Preenchimento - Projetos</a></li>
                    <li><a href="/educa/files/atualizacao.html" target="_blank">Histórico de Atualizações</a></li>
                  </ul>
                  
                  <br>
                  <br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "GeradorPDF",
    components: {
    },
    data() {
      return {
        message: "",
        caption: "",
        type: "",
        showMessage: false,
      }
    },
    methods: {
      closeMessage(){
        this.showMessage = false;
      },
    },
  };
  </script>
  <style scoped>
    li {
      padding-top: 1rem;
    }
  </style>