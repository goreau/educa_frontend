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
            name: "Usuário",
            iconSlot: "users",
            menu: [
              { name: "Cadastrar",path: "usuário>cadastrar", route: "/user", iconSlot: "user",}, 
              {name: "Consultar",path: "usuário>consultar", route: "/users", iconSlot: "search",}
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
              { name: "01. Repasse de Produto",path: "relatório>01. repasse de produto", "route": "/reports/1"}, 
              { name: "02. Saldo por Local",path: "relatório>02. saldo por local", "route": "/reports/2"},
              { name: "03. Resumo Mensal",path: "relatório>03. resumo mensal", "route": "/reports/3"}, 
              { name: "04. Resumo por Tipo de Movimento",path: "relatório>04. resumo por tipo de movimento", "route": "/reports/4"},
              { name: "05. Saldo por Produto",path: "relatório>05. saldo por produto", "route": "/reports/5"}, 
              { name: "06. Resumo de Repasse",path: "relatório>06. resumo de repasse", "route": "/reports/6"},
              { name: "07. Transferências",path: "relatório>07. transferências", "route": "/reports/7"}, 
              { name: "08. Repasse e Consumo",path: "relatório>08. repasse e consumo", "route": "/reports/8"}
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
