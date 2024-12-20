<template>
  <DockMenu 
    :items="items" 
    :onSelected="this.selected"
    :theme="{
        primary: '#fa9cfa',
        secondary: '#e26fe2',
        tertiary: '#c09ec0',
        textColor: '#5f095c'
      }">
      <template #search>
        <font-awesome-icon icon="fa-solid fa-search" />
      </template>
      <template #user>
        <font-awesome-icon icon="fa-solid fa-user" />
      </template>
      <template #proj>
        <font-awesome-icon icon="fa-solid fa-flask" />
      </template>
      <template #ativ>
        <font-awesome-icon icon="fa-solid fa-cubes" />
      </template>
      <template #trash>
        <font-awesome-icon icon="fa-solid fa-trash" />
      </template>
      <template #home>
        <font-awesome-icon icon="fa-solid fa-house" />
      </template>
      <template #help>
        <font-awesome-icon icon="fa-solid fa-question" />
      </template>
      </DockMenu>
</template>


<script>
  import { DockMenu } from "vue-dock-menu";
  import "vue-dock-menu/dist/vue-dock-menu.css";
 
  export default {
    name: "Menu",
    components: {
      DockMenu
    },
    data() {
      return {
        items: [
          {
            name: "Home",
            menu: [
                  {name: "Home", path: "home>home", "route": "/home", iconSlot: "home"},
                  {name: "Materiais Auxiliares",path: "home>materiais auxiliares", "route": "/ajuda", iconSlot: "help"}
            ]
          },
          {
            name: "Usuário",
            iconSlot: "users",
            menu: [
              { name: "Cadastrar",path: "usuário>cadastrar", route: "/user", iconSlot: "user"}, 
              {name: "Consultar",path: "usuário>consultar", route: "/users", iconSlot: "search"},
              {name: "Excluir",path: "usuário>excluir", route: "/trocauser", iconSlot: "trash"}
            ]
          },
          {
            name: "Projeto",
            menu: [
                  {name: "Cadastrar", path: "projeto>cadastrar", "route": "/projeto", iconSlot: "proj"},
                  {name: "Consultar",path: "projeto>consultar", "route": "/projetos", iconSlot: "search"}
            ]
          },
          {
            name: "Atividade",
            menu: [
              {name: "Cadastrar",path: "atividade>cadastrar", "route": "/atividade", iconSlot: "ativ"}, 
              {name: "Consultar",path: "atividade>consultar", "route": "/atividades", iconSlot: "search"}
            ]
          },
          {
            name: "Relatório",
            menu: [
              { name: "01. Resumo de Atividades",path: "relatório>01. resumo de atividades", "route": "/reports/1"}, 
              { name: "02. Resumo de Instituições",path: "relatório>02. resumo de instituições", "route": "/reports/2"},
              { name: "03. Resumo de Capacitações",path: "relatório>03. resumo de capacitações", "route": "/reports/3"}, 
              { name: "04. Resumo de Projetos",path: "relatório>04. resumo de projetos", "route": "/reports/4"},
              { name: "05. Atividades por Projeto",path: "relatório>05. atividades por projeto", "route": "/reports/5"}, 
              { name: "06. Detalhamento de Atividades",path: "relatório>06. detalhamento de atividades", "route": "/reports/6"}, 
            ]
          },
        ]
      }
    },
    methods: {
      selected(item) {  
        var select = null; 
        this.items.map( el  => {
          el.menu.map( x  => {
            if (Array.isArray(x.menu)){
              x.menu.map(y => {
                if(y.path === item.path){
                  select = y.route;
                }
              })
            } else {
              if(x.path === item.path){
                select = x.route;
              }
            }
          });
        });
        this.$router.push(select);
      },
    } 
  };
</script>

<style scoped>
  .menu-bar-container .top{
    top: auto !important;
  }
  .menu-bar-container{
    position:relative !important;
  }
</style>
