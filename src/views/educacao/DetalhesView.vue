<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-three-fifths">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Público Alvo</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="field">
                <label class="label">Instituição</label>
                <div class="control">
                  <CmbAuxiliares @selAux="educacao_det.id_instituicao = $event" :tipo="3"
                    :sel="educacao_det.id_instituicao" />
                  <span class="is-error" v-if="v$.educacao_det.id_instituicao.$error">
                    {{ v$.educacao_det.id_instituicao.$errors[0].$message }}
                  </span>
                </div>
              </div>
              <div class="field">
                <label class="label">Tipo</label>
                <div class="control">
                  <CmbAuxiliares @selAux="educacao_det.id_tipo_instituicao = $event" :tipo="4"
                    :aux="educacao_det.id_instituicao" :sel="educacao_det.id_tipo_instituicao" />
                  <span class="is-error" v-if="v$.educacao_det.id_tipo_instituicao.$error">
                    {{ v$.educacao_det.id_tipo_instituicao.$errors[0].$message }}
                  </span>
                </div>
              </div>

              <div class="field">
                <label class="label">Campo</label>
                <input type="number" class="input" placeholder="Qt Profissionais" v-model="educacao_det.campo" />
              </div>
              <div class="field">
                <label class="label">Técnico</label>
                <input type="number" class="input" placeholder="Qt Profissionais" v-model="educacao_det.tecnico" />
              </div>
              <div class="field">
                <label class="label">Participantes</label>
                <input type="number" class="input" placeholder="Qt Pessoas" v-model="educacao_det.participantes" />
              </div>
            </div>
          </div>
          <footer class="card-footer">
            <footerCard @submit="create" @cancel="null" @aux="details" :cFooter="cFooter" />
          </footer>
        </div>
        <div class="card">
          <div class="card-content">
            <MyCleanTable :tableData="dataTable" :columns="columns" :vazio="'Nenhuma público cadastrado'" />
            <hr>
            <fieldset class="fieldset" v-if="max > 0">
              <legend>Carregar Fotos</legend>
              <div class="columns">
                <div class="column is-8 is-offset-2">
                  <vue-multi-image-upload @data-image="images" :max=max :image-size="4e6" :alert-timeout="3e3"
                    :accept="imageType" :preview="{ h: 100, w: 100 }" :resize="{ h: 500, w: 500, keepRatio: true }"
                    :data-reset="component" :options="options" />
                </div>
              </div>
              <div class="columns">
                <div class="column is-3 is-offset-2">
                  <button class="button is-link submit-img is-fullwidth" @click="sendFotos" :disabled="inputImages.length == 0">
                    <span class="btico"><font-awesome-icon icon="fa-solid fa-check" /></span>
                    Enviar Imagens
                  </button>
                </div>
                <div class="column is-3 is-offset-2">
                  <button class="button is-link cancel-img is-fullwidth" @click="clear" :disabled="inputImages.length == 0">
                    <span class="btico"><font-awesome-icon icon="fa-solid fa-broom" /></span>
                    Limpar Imagens
                  </button>
                </div>
              </div>
            </fieldset>
            <hr>
            <fieldset class="fieldset" v-if="max < 3">
              <legend>Fotos</legend>
              <div class="columns">
                <div class="column is-4">
                  <button class="delete" @click="delFoto(0)"></button>
                  <img :src=img[0] alt=".." width="200">
                </div>
                <div class="column is-4" v-if="max < 2">
                  <button class="delete" @click="delFoto(1)"></button>
                  <img :src=img[1] alt=".." width="200">
                </div>
                <div class="column is-4" v-if="max == 0">
                  <button class="delete" @click="delFoto(2)"></button>
                  <img :src=img[2] alt=".." width="200">
                </div>
              </div>
            </fieldset>
            <br><br>
          </div>
        </div>

        <div style="display: none;">
          <span class="icon is-small is-left" name="coisa">
            <font-awesome-icon icon="fa-solid fa-edit" />
          </span>
          <span class="icon is-small is-left" name="coisa2">
            <font-awesome-icon icon="fa-solid fa-trash" />
          </span>
        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import { toValue } from "vue";
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import educacaoService from "@/services/educacao.service";
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import MyCleanTable from '@/components/forms/MyCleanTable.vue';
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import ConfirmDialog from "@/components/forms/ConfirmDialog.vue";
import { VueMultiImageUpload } from '@zakerxa/vue-multiple-image-upload';


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
    MyCleanTable,
    ConfirmDialog,
    VueMultiImageUpload
  },
  data() {
    return {
      educacao_det: {
        id_educacao_det: 0,
        id_educacao: 0,
        id_instituicao: 0,
        id_tipo_instituicao: 0,
        campo: "",
        tecnico: "",
        participantes: ''
      },
      options: {
        max: 'Disponíveis: ',
        ready: 'Pronto',
        select: 'selecionado(s)',
      },
      v$: useValidate(),
      max: 3,
      component: {},
      inputImages: [],
      imageType: ['image/jpeg', 'image/png', 'image/gif'],
      myspan: null,
      myspan2: null,
      dataTable: [],
      isLoading: false,
      columns: [],
      fotos: [],
      img: [],
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
      educacao_det: {
        id_educacao: { required$, },
        id_instituicao: { minValue: combo$(1), },
        id_tipo_instituicao: { minValue: combo$(1), },
      },
    };
  },
  methods: {
    images(e) {
      this.inputImages = e;
    },
    sendFotos() {
      // The way to append images to FormData.
      let formData = new FormData();
      this.inputImages.map(img => formData.append('images[]', img));
      formData.append('id_educacao', this.educacao_det.id_educacao);

      educacaoService.postFotos(formData).then(
        (response) => {
          this.showMessage = true;
          this.message = "Fotos enviadas com sucesso!!";
          this.type = "success";
          this.caption = "Atividade";
          setTimeout(() => (this.showMessage = false), 3000);
          this.setTableData();
        },
        (error) => {
          this.message = error;
          this.showMessage = true;
          this.type = "alert";
          this.caption = "atividade";
          setTimeout(() => (this.showMessage = false), 3000);
        }
      )
        .finally(() => {
          document.getElementById('login').classList.remove('is-loading');
        });
    },
    clear() {
      this.component.clear = true;
    },
    edit(row) {
      this.educacao_det.id_educacao_det = row.id_educacao_det;
      this.educacao_det.id_educacao = row.id_educacao;
      this.educacao_det.id_instituicao = row.id_instituicao;
      this.educacao_det.id_tipo_instituicao = row.id_tipo_instituicao;
      this.educacao_det.campo = row.campo;
      this.educacao_det.tecnico = row.tecnico;
      this.educacao_det.participantes = row.participantes;
    },
    create() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        document.getElementById('login').classList.add('is-loading');

        if (this.educacao_det.id_educacao_det > 0) {
          educacaoService.updateDet(this.educacao_det).then(
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
          educacaoService.createDet(this.educacao_det).then(
            (response) => {
              this.showMessage = true;
              this.message = "Público inserido com sucesso!!";
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
        this.caption = "Detalhamento";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
    delFoto(idx){
      educacaoService.delFoto(this.fotos[idx], this.educacao_det.id_educacao )
          .then((response) => {
            this.showMessage = true;
            this.message = "Foto removida com sucesso!!";
            this.type = "success";
            this.caption = "Detalhamento";
            setTimeout(() => (this.showMessage = false), 3000);
            this.setTableData();
          })
          .catch((err) => {
            console.log(err);
          })
    },
    getFoto() {
      this.fotos.forEach(element => {
        educacaoService.getFoto(element)
          .then((response) => {
            this.img.push(URL.createObjectURL(response.data));
          })
          .catch((err) => {
            console.log(err);
          })
      });
    },
    setTableData() {
      educacaoService.getDets(this.educacao_det.id_educacao)
        .then((response) => {
          this.dataTable = response.data;
          if (response.data[0].fotos) {
            this.fotos = response.data[0].fotos;
            this.getFoto();
          }

          this.max = 3 - this.fotos.length;
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
        { title: 'Instituição', field: 'instituicao', type: 'string' },
        { title: 'Tipo', field: 'tipo', type: 'string' },
        { title: 'Campo', field: 'campo', type: 'string' },
        { title: 'Técnico', field: 'tecnico', type: 'string' },
        { title: 'Participantes', field: 'participantes', type: 'string' },
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
                message: 'Deseja mesmo excluir esse público?',
                okButton: 'Confirmar',
              })
              if (ok) {
                educacaoService.deleteDet(row.id_educacao_det);
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
    this.setTable();
  },
  created() {
    this.educacao_det.id_educacao = this.$route.params.educ;
  },
};
</script>

<style scoped>
.fieldset {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .02);
  color: #4a4a4a;
  display: block;
  padding: 1.25rem;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
}

.fieldset>legend {
  color: #363636;
  display: block;
  font-size: 1rem;
  font-weight: 700;
  background-color: #fff;
  padding: 0 5px;
  width: max-content;
  border: 0 none
}

.submit-img {
  background-color: #4f52a3;
  color: #e6e2db;
  font-weight: bold;
  border: 2px solid #13156e;
  padding: 1rem;
  font-size: 1rem;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.submit-img:hover {
  background-color: transparent;
  color: #13156e;
  border: 2px solid #4f52a3;
}

.cancel-img {
  background-color: #b8ae57;
  color: #463205;
  font-weight: bold;
  border: 2px solid #a3a4b3;
  padding: 1rem;
  font-size: 1rem;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.cancel-img:hover {
  background-color: transparent;
  color: #a3a4b3;
  border: 2px solid #b8ae57;
}
</style>
