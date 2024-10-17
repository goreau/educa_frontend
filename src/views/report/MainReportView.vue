<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-three-fifths">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Relatórios</p>
          </header>
          <div class="card-content">
            <div class="content">
              <section class="section">
                <div class="dvTipo">
                  <label class="label">Filtros:</label>
                  <div class="columns" v-if="currentUser.nivel == 1">
                    <div class="column is-full">
                      <div class="field">
                        <label class="label">Regional de Saúde</label>
                        <div class="control">
                          <CmbTerritorio :id_prop="currentUser.id" :sel="filter.id_drs" :tipo="4"
                            @selTerr="filter.id_drs = $event" />
                        </div>
                      </div>
                    </div>
                    </div>
                    <div class="columns" v-if="currentUser.nivel != 3">
                      <div class="column is-full">
                        <div class="field">
                          <label class="label">GVE</label>
                          <div class="control">
                            <CmbTerritorio :id_prop="currentUser.id" :sel="filter.id_gve" :tipo="6"
                              @selTerr="filter.id_gve = $event" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="columns" v-if="currentUser.nivel != 2">
                      <div class="column is-full">
                        <div class="field">
                          <label class="label">Colegiado</label>
                          <div class="control">
                            <CmbTerritorio :id_prop="currentUser.id" :sel="filter.id_colegiado" :tipo="5"
                              @selTerr="filter.id_colegiado = $event" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="columns">
                      <div class="column is-full">
                        <div class="field">
                          <label class="label">Município</label>
                          <div class="control">
                            <CmbTerritorio :id_prop="currentUser.id" :sel="filter.id_territorio" :tipo="33"
                              @selTerr="filter.id_territorio = $event" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="columns">
                      <div class="column is-full">
                        <div class="field">
                          <label class="label">Programa</label>
                          <div class="control">
                            <CmbPrograma :sel="filter.id_programa" @selProg="filter.id_programa = $event" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="columns" v-if="hasData">
                      <div class="column is-half">
                        <label class="label">Início</label>
                        <div class="field">
                          <div class="control" id="contIni">
                            <input type="date" id="dtIni" />
                          </div>
                        </div>
                      </div>

                      <div class="column is-half">
                        <label class="label">Término</label>
                        <div class="field">
                          <div class="control" id="contFim">
                            <input type="date" id="dtFim" />
                          </div>

                        </div>
                      </div>
                    </div>
                </div>
              </section>
              <section class="section" v-if="tipo_relat > 0">
                <div class="columns is-centered">
                  <div class="column is-4">
                    <div class="control">
                      <button class="button is-link submit-btn is-fullwidth" id="login" @click="processar">
                        <span class="btico"><font-awesome-icon icon="fa-solid fa-check" /></span>
                        Processar
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <footer class="card-footer">
            <footerCard @submit="create" @cancel="null" @aux="details" :cFooter="cFooter" />
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
import CmbPrograma from "@/components/forms/CmbPrograma.vue";
import CmbGeneric from "@/components/forms/CmbGeneric.vue";
import moment from 'moment';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";

export default {
  data() {
    return {
      tipo_relat: 0,
      filter: {
        id_drs: 0,
        id_gve: 0,
        id_colegiado: 0,
        id_territorio: 0,
        dt_inicio: "",
        dt_final: "",
        id_programa: 0,
        id_prop: 0
      },
      hasData: false,
      ini_date: '',
      fim_date: '',
      id_usuario: 0,
      unidade: "",
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      showMessage: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
  components: {
    Message,
    Loader,
    CmbTerritorio,
    CmbPrograma,
    CmbGeneric
  },
  methods: {
    processar() {
      this.filter.id_prop = this.id_usuario;
      localStorage.setItem('filter', JSON.stringify(this.filter));

      if (this.tipo_relat < 100) {
        this.$router.push(`/report/${this.tipo_relat}`);
      } else {
        this.$router.push(`/reportN/${this.tipo_relat}`);
      }
    },
  },
  mounted() {
    let cUser = this.currentUser;
    if (cUser) {
      this.id_usuario = cUser.id;
    }

    var obj = localStorage.getItem('filter');
    if (obj) {
      this.filter = JSON.parse(obj);

      this.ini_date = this.filter.dt_inicio == '' ? null : moment(String(this.filter.dt_inicio)).format('DD/MM/YYYY');
      this.fim_date = this.filter.dt_final == '' ? null : moment(String(this.filter.dt_final)).format('DD/MM/YYYY');
    }
    if (this.hasData) {

      const teste = document.querySelector('#dtIni');

      if (teste.type == 'text') {
        const elIni = document.querySelector('#contIni');
        elIni.innerHTML = "<input type='date' id='dtIni' />";
        
        const elFim = document.querySelector('#contFim');
        elFim.innerHTML = "<input type='date' id='dtFim' />";
      }

      const element = document.querySelector('#dtIni');
      var options = {
        type: "date",
        dateFormat: "dd/MM/yyyy",
        startDate: this.ini_date,
        showHeader: false,
        color: "primary"
      };

      var calini = bulmaCalendar.attach('#dtIni', options);

      if (element) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        element.bulmaCalendar.on('select', datepicker => {
          this.filter.dt_inicio = moment(datepicker.data.startDate).format('YYYY-MM-DD');
        });

        element.bulmaCalendar.on('clear', datepicker => {
          this.filter.dt_inicio = '';
        });
      }

      options = {
        type: "date",
        dateFormat: "dd/MM/yyyy",
        startDate: this.fim_date,
        showHeader: false,
        color: "primary"
      };

      var calfim = bulmaCalendar.attach('#dtFim', options);

      const element2 = document.querySelector('#dtFim');
      console.log(element2);
      if (element2) {
        // bulmaCalendar instance is available as element.bulmaCalendar
        element2.bulmaCalendar.on('select', datepicker => {
          this.filter.dt_final = moment(datepicker.data.startDate).format('YYYY-MM-DD');
        });
        element2.bulmaCalendar.on('clear', datepicker => {
          this.filter.dt_final = '';
        });
      }
    }
  },
  created() {
    this.tipo_relat = this.$route.params.id;
    var dtarray = new Array('1', '3', '4', '6', '7', '8');
    this.hasData = dtarray.indexOf(this.tipo_relat) != -1;
    console.log(this.hasData)
  },
  watch: {
    '$route'() {
      this.tipo_relat = this.$route.params.id;
      var dtarray = new Array('1', '3', '4', '6', '7', '8');
      this.hasData = dtarray.indexOf(this.tipo_relat) != -1;
    }
  },
};
</script>

<style scoped>
.submit-btn {
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

.submit-btn:hover {
  background-color: transparent;
  color: #13156e;
  border: 2px solid #4f52a3;
}

.btico {
  padding-right: 2rem;
  margin-left: -2rem;
}

section {
  padding: .5rem;
}

.radio {
  margin-left: 1rem !important;
  width: 100%;
}

.flatpickr-input {
  width: auto;
}

.flatpickr-input[readonly] {
  width: auto;
}

.dvTipo {
  border: 1px solid #aaa;
  border-radius: 4px;
  position: relative;
  padding: 1.25rem 2.5rem 1.25rem 1.5rem;
  width: 100%;
}
</style>
