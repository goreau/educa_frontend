<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-three-fifths">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Cronograma</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="field">
                <label class="label">Fase</label>
                <div class="control">
                  <CmbAuxiliares @selAux="crono.id_fase = $event" :tipo="6" :sel="crono.id_fase" />
                  <span class="is-error" v-if="v$.crono.id_fase.$error">
                    {{ v$.crono.id_fase.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="columns">
                <div class="column is-half">
                  <div class="field">
                    <label class="label">Data Início</label>
                    <div class="control">
                      <input type="date" id="dtIni">
                    </div>
                    <span class="is-error" v-if="v$.crono.dt_inicio.$error">
                      {{ v$.crono.dt_inicio.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                <div class="column is-half">
                  <div class="field">
                    <label class="label">Data Término</label>
                    <div class="control">
                      <input type="date" id="dtTer">
                    </div>
                    <span class="is-error" v-if="v$.crono.dt_termino.$error">
                      {{ v$.crono.dt_termino.$errors[0].$message }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label">Atividades</label>
                <textarea type="text" class="textarea" cols="50" rows="2" v-model="crono.atividades" placeholder="Descreva as atividades que serão executadas nesta fase"></textarea>
                <span class="is-error" v-if="v$.crono.atividades.$error">
                  {{ v$.crono.atividades.$errors[0].$message }}
                </span>
              </div>


            </div>
          </div>
          <footer class="card-footer">
            <footerCard @submit="create" @cancel="null" @aux="details" :cFooter="cFooter" />
          </footer>
        </div>
        <div class="card">
          <div class="card-content">
            <MyCleanTable :tableData="dataTable" :columns="columns" :vazio="'Nenhuma fase cadastrada'" />
          </div>
        </div>
        <div style="display: none;">
          <span class="icon is-small is-left" name="coisa">
            <font-awesome-icon icon="fa-solid fa-edit" />
          </span>
          <span class="icon is-small is-left" name="coisa2">
            <font-awesome-icon  icon="fa-solid fa-trash" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toValue } from "vue";
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import projetoService from "@/services/projeto.service";
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import MyCleanTable from '@/components/forms/MyCleanTable.vue';
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import moment from 'moment';

import {
  required$,
  combo$,
} from "../../components/forms/validators.js";


export default {
  components: {
    Loader,
    Message,
    footerCard,
    CmbAuxiliares,
    MyCleanTable
  },
  data() {
    return {
      crono: {
        id_fase: 0,
        id_projetos: 0,
        dt_inicio: "",
        dt_termino: "",
        atividades: ''
      },
      v$: useValidate(),
      myspan: null,
      myspan2: null,
      dataTable: [],
      isLoading: false,
      columns: [],
      message: "",
      caption: "",
      type: "",
      showMessage: false,
      calendar: null,
      calendar2: null,
      cFooter: {
        strSubmit: 'Salvar',
        strCancel: 'Cancelar',
        strAux: '',
        aux: false
      }
    };
  },
  validations() {
    return {
      crono: {
        id_projetos: { required$, },
        dt_inicio: { required$ },
        dt_termino: { required$ },
        id_fase: { minValue: combo$(1), },
        atividades: { required$ },
      },
    };
  },
  methods: {
    startCalendar(){
      const options = {
        type: "date",
        dateFormat: "dd/MM/yyyy",
        showHeader: false,
        color: "primary"
      };
      
      
      this.calendar = bulmaCalendar.attach('#dtIni', options);
      const element = document.querySelector('#dtIni');
      
      if (element) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        element.bulmaCalendar.on('select', datepicker => {
          this.crono.dt_inicio = moment(datepicker.data.startDate).format('YYYY-MM-DD');
        });
      }

      this.calendar2 = bulmaCalendar.attach('#dtTer', options);

      const element2 = document.querySelector('#dtTer');
      if (element2) {
        element2.bulmaCalendar.on('select', datepicker => {
          this.crono.dt_termino = moment(datepicker.data.startDate).format('YYYY-MM-DD');
        });
      }
    },
    edit(row){
      this.crono.id_projeto_cronograma = row.id_projeto_cronograma;
      this.crono.dt_inicio = row.dt_inicio;
      this.crono.id_fase = row.id_fase;
      this.crono.dt_termino = row.dt_termino;
      this.crono.atividades = row.atividades;
      
      this.calendar[0].value(row.dt_inicio);
      this.calendar2[0].value(row.dt_termino);
    },
    create() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        document.getElementById('login').classList.add('is-loading');

        if (this.crono.id_projeto_cronograma > 0){
          projetoService.updateFase(this.crono).then(
          (response) => {
            this.showMessage = true;
            this.message = "Fase alterada com sucesso!!";
            this.type = "success";
            this.caption = "Cronograma";
            setTimeout(() => (this.showMessage = false), 3000);
            this.setTableData();
          },
          (error) => {
            this.message = error;
            this.showMessage = true;
            this.type = "alert";
            this.caption = "Cronograma";
            setTimeout(() => (this.showMessage = false), 3000);
          }
        )
          .finally(() => {
            document.getElementById('login').classList.remove('is-loading');
          });
        } else {
          projetoService.createFase(this.crono).then(
          (response) => {
            this.showMessage = true;
            this.message = "Fase inserida com sucesso!!";
            this.type = "success";
            this.caption = "Cronograma";
            setTimeout(() => (this.showMessage = false), 3000);
            this.setTableData();
          },
          (error) => {
            this.message = error;
            this.showMessage = true;
            this.type = "alert";
            this.caption = "Cronograma";
            setTimeout(() => (this.showMessage = false), 3000);
          }
        )
          .finally(() => {
            document.getElementById('login').classList.remove('is-loading');
          });
        }
        
      } else {
        this.message = "Corrija os erros para enviar as informações";
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Cronograma";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
    setTableData(){
      projetoService.getFases(this.crono.id_projetos)
              .then((response) => {
                this.dataTable = response.data;
                this.isLoading = false;
              })
              .catch((err) => {
                console.log(err);
              })
    },
    async setTable() {
      this.myspan = document.getElementsByName('coisa')[0];
      this.myspan2 = document.getElementsByName('coisa2')[0];

      await this.setTableData();

      this.columns = [
        { title: 'Fase', field: 'fase', type: 'string' },
        { title: 'Início', field: 'dt_inicio', type: 'string' },
        { title: 'Término', field: 'dt_termino', type: 'string' },
        { title: 'Atividades', field: 'atividades', type: 'string' },
        {
          title: 'Ações',
          formatter: (cell, formatterParrams) => {
            const row = cell.getRow().getData();

            const btEdit = document.createElement('button');
              btEdit.type = 'button';
              btEdit.title = 'Editar';
              btEdit.style.cssText = 'height: fit-content; margin-left: 1rem;';
              btEdit.classList.add('button', 'is-primary', 'is-outlined');
              btEdit.innerHTML = this.myspan.innerHTML;
              btEdit.addEventListener('click', () => {
                this.edit(row);
              });

            const btDel = document.createElement('button');
            btDel.type = 'button';
            btDel.title = 'Excluir';
            btDel.style.cssText = 'height: fit-content; margin-left: 1rem;';
            btDel.classList.add('button', 'is-danger', 'is-outlined');
            btDel.innerHTML = this.myspan2.innerHTML;
            btDel.addEventListener('click', async () => {
              const ok = await this.$refs.confirmDialog.show({
                title: 'Excluir',
                message: 'Deseja mesmo excluir essa fase do projeto?',
                okButton: 'Confirmar',
              })
              if (ok) {
                projetoService.deleteFase(row.id_projeto_cronograma);
                location.reload();
              }
            });


            const buttonHolder = document.createElement('span');
            buttonHolder.appendChild(btEdit);
            buttonHolder.appendChild(btDel);

            return buttonHolder;

          }
        }
      ]
    }
  },
  mounted() {
    this.startCalendar();
    this.setTable();
  },
  created() {
    this.crono.id_projetos = this.$route.params.proj;
  },
};
</script>

<style scoped></style>
