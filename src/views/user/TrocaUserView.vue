<template>
    <div class="main-container">
      <div class="columns is-centered">
        <div class="column is-three-fifths">
          <Loader v-if="isLoading" />
          <Message
            v-if="showMessage"
            @do-close="closeMessage"
            :msg="message"
            :type="type"
            :caption="caption"
          />
          <div class="card">
            <header class="card-header">
              <p class="card-header-title is-centered">Excluir Usuário</p>
            </header>
            <div class="card-content">
              <div class="content">
                <div class="columns">
                    <div class="column is-6 is-offset-3">
                        <div class="field">
                            <label class="label">Nível</label>
                            <div class="control has-icons-left has-icons-right">
                                <label class="radio" v-if="currentUser.nivel == 1 || currentUser.nivel == 9">
                                    <input
                                    type="radio"
                                    name="role"
                                    value="9"
                                    v-model="role"
                                    :disabled="currentUser.nivel == 2 || currentUser.nivel == 3"
                                    />
                                    Gestor Regional
                                </label>
                                <label class="radio" v-if="currentUser.nivel <= 3 || currentUser.nivel == 9">
                                    <input
                                    type="radio"
                                    name="role"
                                    value="2"
                                    v-model="role"
                                    :disabled="currentUser.nivel == 3"
                                    />
                                    Gestor Local
                                </label>
                                <label class="radio">
                                    <input
                                    type="radio"
                                    name="role"
                                    value="3"
                                    v-model="role"
                                    />
                                    Usuário Município
                                </label>
                            </div>
                        </div>
              
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-6 is-offset-3">
                        <div class="field">
                            <label class="label">{{strLocal}}</label>
                            <div class="control">
                            <CmbTerritorio
                                :id_prop="id_user"
                                :tipo="role"
                                @selTerr="id_local = $event"                               
                            />
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="columns" v-if="id_local > 0">
                    <div class="column is-5">
                        <div class="field">
                            <label for="" class="label">Usuário a ser excluído</label>
                            <div class="control">
                                <CmbAuxiliares :tipo="99" :aux="id_local" @selAux="id_sai = $event"
                                :errclass="{ 'is-danger': v$.id_sai.$error }" />
                            <span class="is-error" v-if="v$.id_sai.$error">
                                {{ v$.id_sai.$errors[0].$message }}
                            </span>
                            </div>
                        </div>
                    </div>
                    <div class="column is-5 is-offset-2">
                        <div class="field">
                            <label for="" class="label">Usuário que irá receber a produção</label>
                            <div class="control">
                                <CmbAuxiliares :tipo="99" :aux="id_local" @selAux="id_fica = $event"
                                :errclass="{ 'is-danger': v$.id_fica.$error }" />
                            <span class="is-error" v-if="v$.id_fica.$error">
                                {{ v$.id_fica.$errors[0].$message }}
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
              </div>
            </div>
            <footer class="card-footer">
              <footerCard @submit="register" @cancel="null" @aux="details" :cFooter="cFooter" />
            </footer>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Message from "@/components/general/Message.vue";
  import Loader from "@/components/general/Loader.vue";
  import CmbTerritorio from "@/components/forms/CmbTerritorio.vue";
  import footerCard from '@/components/forms/FooterCard.vue'
  import auxiliaresService from "@/services/auxiliares.service";
  import useValidate from "@vuelidate/core";
  import {
    required$,
    combo$,
  } from "../../components/forms/validators.js";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
  
  export default {
    data() {
      return {
        role: 0,
        id_user: 0,
        id_local: 0,
        id_fica: 0,
        id_sai: 0,
        v$: useValidate(),
        isLoading: false,
        message: "",
        caption: "",
        type: "",
        showMessage: false,
        cFooter:{
            strSubmit:'Excluir',
            strCancel: 'Cancelar',
            strAux:'',
            aux: false
          }
      };
    },
    validations(){
      return {
          id_fica: { required$, minValue: combo$(1)},
          id_sai: { required$, minValue: combo$(1)},
      }
    },
    computed: {
      loggedIn() {
        return this.$store.getters["auth/isLogged"];
      },
      currentUser() {
        return this.$store.getters["auth/loggedUser"];
      },
    },
    components: {
      Message,
      Loader,
      CmbTerritorio,
      CmbAuxiliares,
      footerCard
    },
    methods: {
      register() {
        this.v$.$validate(); 
        if (!this.v$.$error) {
          document.getElementById("login").classList.add("is-loading");
  
          auxiliaresService.trocaUser({id_fica: this.id_fica, id_sai: this.id_sai}).then(
            (response) => {
              this.showMessage = true;
              this.message = "Usuário excluído com sucesso.";
              this.type = "success";
              this.caption = "Usuário";
              setTimeout(() => (this.showMessage = false), 3000);
            },
            (error) => {
              this.message = error;
               /* (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.data.err ||
                error.message ||
                error.toString();*/
              this.showMessage = true;
              this.type = "alert";
              this.caption = "Usuário";
              setTimeout(() => (this.showMessage = false), 3000);
            }
          )
          .finally(() => {
              document.getElementById("login").classList.remove("is-loading");
            });
        } else {
          this.message = "Corrija os erros para enviar as informações";
          this.showMessage = true;
          this.type = "alert";
          this.caption = "Usuário";
          setTimeout(() => (this.showMessage = false), 3000);
        }
      },
    },
    mounted() {
      this.id_user = this.currentUser.id;
    },
    watch:{
        role(value) {
            this.strLocal = (value == 3 ? 'Município' : (value == 2 ? 'GVE' : 'Regional'));
        },
    },
  };
  </script>
  
  <style scoped></style>
  