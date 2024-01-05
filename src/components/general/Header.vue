<template>
  <div class="conteudo">
    <div class="tile is-ancestor">
      <div class="tile is-vertical">
        <div class="tile is-6">
          <nav>
            <router-link to="/home" id="logo_url">
              <img src="@/assets/home.png" alt="img" id="logo" />
            </router-link>
          </nav>
          <p class="title">Sistema Educa</p>
        </div>
        <div class="tile is-12">
          <div class="tile is-ancestor" v-if="loggedIn">
            <div class="tile is-3"></div>
            <div class="tile is-6">
              <Menu />
            </div>
            <div class="tile is-3">
              <DockMenu :items="items" :onSelected="this.selected" :theme="{
                primary: '#fa9cfa',
                secondary: '#e26fe2',
                tertiary: '#c09ec0',
                textColor: '#5f095c'
              }"></DockMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>

import Menu from '@/components/general/Menu.vue';
import { DockMenu } from "vue-dock-menu";
import "vue-dock-menu/dist/vue-dock-menu.css";

export default {
  name: "Header",
  components: {
    Menu,
    DockMenu
  },
  methods: {
      selected(item) {  
        if (item.name === 'Sair'){
          var path = window.location.href;
          var arrpath = path.split('/');
          arrpath.pop();
          var final = arrpath.join('/');

         // window.location = window.location.hostname;
          window.location.assign(final);
          //  this.$router.push('/');
        } else {
          this.$router.push('/mycad');
        }
      },
    },
  data() {
      return {
        log: false,
        items : [
          {
          name: 'uuu',
          menu: [{ name: "Meu Cadastro"}, {name: "Sair"}]
        }
      ]
      }
  },
  computed: {
    loggedIn() {
      this.log = this.$store.getters["auth/isLogged"];
      return this.$store.getters["auth/isLogged"];
    },
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  watch:{
    log(val){
      if (val){
        var anchors = document.getElementsByClassName('name-container');
        for (var i=0; i<anchors.length; i++){
          if (anchors[i].innerHTML == 'uuu'){
            anchors[i].innerHTML = this.currentUser.nome;
            break;
          }
        }
      } 
    }
  }
};
</script>
  
<style scoped lang="scss">
@import "@/components/general/css/custom-var";

.menu-bar-container .top{
    top: auto !important;
  }
  .menu-bar-container{
    position:relative !important;
  }

.conteudo {
  height: 6rem;
  background-color: $base-bg;
  border-bottom: 4px solid $primary-color;
  padding: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
}



nav {

  padding: 1px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

nav #logo_url {
  margin: auto;
  margin-left: 0;
}

#logo {
  width: 40px;
  height: 40px;
}

.title {
  //color: darkgoldenrod;
  -webkit-text-stroke: 1px rgb(54, 5, 51);
  /* width and color */
  font-size: 2vw;
  font-family: Arial, Helvetica, sans-serif;
  color: rgb(156, 14, 146);
}

@media only screen and (max-width: 320px) {

  .title {
    font-size: 2rem;
  }

}
</style>