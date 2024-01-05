<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-three-fifths">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Atividade</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <fieldset class="fieldset">
                                <legend>Tipo</legend>
                                <div class="control has-icons-left has-icons-right">
                                    <div class="columns">
                                        <div class="column is-4">

                                            <label class="radio">
                                                <input type="radio" name="tipo" value="1" v-model="educacao.tipo" />
                                                Rotina
                                            </label>
                                        </div>
                                        <div class="column is-4">
                                            <label class="radio">
                                                <input type="radio" name="tipo" value="2" v-model="educacao.tipo" />
                                                Projeto
                                            </label>
                                        </div>
                                        <div class="column is-4">
                                            <label class="radio">
                                                <input type="radio" name="tipo" value="3" v-model="educacao.tipo" />
                                                Mobilização
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <span class="is-error" v-if="v$.educacao.tipo.$error">
                                    {{ v$.educacao.tipo.$errors[0].$message }}
                                </span>
                            </fieldset>
                            <div class="columns">
                                <div class="column is-half">
                                    <div class="field">
                                        <label class="label">Município</label>
                                        <div class="control">
                                            <CmbTerritorio :id_prop="currentUser.id" :tipo="3" :sel="educacao.id_municipios"
                                                @selTerr="mun = $event"
                                                :errclass="{ 'is-danger': v$.educacao.id_municipios.$error }" />
                                            <span class="is-error" v-if="v$.educacao.id_municipios.$error">
                                                {{ v$.educacao.id_municipios.$errors[0].$message }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="column is-half">
                                    <div class="field">
                                        <label class="label">Programa</label>
                                        <div class="control">
                                            <CmbPrograma @selProg="educacao.id_programas = $event" :sel="educacao.id_programas" />
                                            <span class="is-error" v-if="v$.educacao.id_programas.$error">
                                                {{ v$.educacao.id_programas.$errors[0].$message }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="columns" v-if="educacao.tipo == 2">
                                <div class="column is-half">
                                    <div class="field">
                                        <label class="label">Projeto</label>
                                        <div class="control">
                                            <CmbGeneric  :data="projetos"
                                                @selGen="proj = $event"
                                                :errclass="{ 'is-danger': v$.educacao.id_projetos.$error }" />
                                                <span class="is-error" v-if="v$.educacao.id_projetos.$error">
                                                    {{ v$.educacao.id_projetos.$errors[0].$message }}
                                                </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="column is-half">
                                    <div class="field">
                                        <label class="label">Fase</label>
                                        <div class="control">
                                            <CmbGeneric  :data="fases"
                                                @selGen="educacao.id_fase = $event"
                                                :errclass="{ 'is-danger': v$.educacao.id_fase.$error }" />
                                                <span class="is-error" v-if="v$.educacao.id_fase.$error">
                                                    {{ v$.educacao.id_fase.$errors[0].$message }}
                                                </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-half">
                                    <div class="field">
                                        <label class="label">Data</label>
                                        <div class="control">
                                            <input type="date" id="dtCad">
                                        </div>
                                        <span class="is-error" v-if="v$.educacao.dt_cadastro.$error">
                                            {{ v$.educacao.dt_cadastro.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="column is-half">
                                    <div class="field">
                                        <label class="label">Duração (dias)</label>
                                        <input type="number" class="input" placeholder="Numérico"
                                            v-model="educacao.dias" />
                                            <span class="is-error" v-if="v$.educacao.dias.$error">
                                            {{ v$.educacao.dias.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-half">
                                    <div class="field">
                                        <label class="label">Atividade</label>
                                        <div class="control">
                                            <CmbAuxiliares @selAux="educacao.id_atividade = $event" :tipo="1" :aux="0"
                                                :sel="educacao.id_atividade" />
                                            <span class="is-error" v-if="v$.educacao.id_atividade.$error">
                                                {{ v$.educacao.id_atividade.$errors[0].$message }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="column is-half">
                                    <div class="field">
                                        <label class="label">Módulo</label>
                                        <div class="control">
                                            <CmbAuxiliares @selAux="educacao.id_modulo = $event" :tipo="2" :aux="educacao.id_atividade"
                                                :sel="educacao.id_modulo" />
                                            <span class="is-error" v-if="v$.educacao.id_modulo.$error">
                                                {{ v$.educacao.id_modulo.$errors[0].$message }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="field">
                                <label class="label">Tema</label>
                                <textarea type="text" class="textarea" cols="50" rows="2" v-model="educacao.tema"
                                    placeholder="Descreva as atividades que serão executadas nesta fase"></textarea>
                                <span class="is-error" v-if="v$.educacao.tema.$error">
                                    {{ v$.educacao.tema.$errors[0].$message }}
                                </span>
                            </div>

                            <!---->
                        </div>
                    </div>
                    <footer class="card-footer">
                        <footerCard @submit="update" @cancel="null" @aux="details" :cFooter="cFooter" />
                    </footer>
                    <br><br>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import educacaoService from "@/services/educacao.service";
import projetoService from "@/services/projeto.service";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import CmbPrograma from "@/components/forms/CmbPrograma.vue";
import CmbTerritorio from "@/components/forms/CmbTerritorio.vue";
import CmbGeneric from "@/components/forms/CmbGeneric.vue";
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import moment from 'moment';

import {
    required$,
    maxLength,
    requiredIf$,
    combo$,
} from "../../components/forms/validators.js";


export default {
    components: {
        Loader,
        Message,
        footerCard,
        CmbPrograma,
        CmbTerritorio,
        CmbAuxiliares,
        CmbGeneric,
    },
    data() {
        return {
            educacao: {
                id_educacao: 0,
                dt_cadastro: '', 
                id_municipios: 0, 
                id_atividade: 0, 
                id_modulo: 0, 
                owner_id: 0, 
                dias: '', 
                profissionais: '', 
                tipo: 0, 
                id_programas: 0, 
                id_projetos: 0, 
                id_fase: 0, 
                tema: '',
            },
            v$: useValidate(),
            id_educacao: 0,
            isLoading: false,
            message: "",
            caption: "",
            type: "",
            mun: 0,
            proj: 0,
            projetos: [],
            fases: [],
            showMessage: false,
            nivel: 0,
            cFooter: {
                strSubmit: 'Salvar',
                strCancel: 'Cancelar',
                strAux: 'Detalhes',
                aux: true,
            }
        };
    },
    validations() {
        return {
            educacao: {
                dt_cadastro: { required$ }, 
                id_municipios: { minValue: combo$(1), }, 
                id_atividade: { minValue: combo$(1), }, 
                id_modulo: { minValue: combo$(1), },
                dias: { required$ },
                profissionais: '', 
                tipo: { required$ }, 
                id_programas: { minValue: combo$(1), }, 
                id_projetos: {requiredIf: requiredIf$(this.educacao.tipo == '2'),}, 
                id_fase: {requiredIf: requiredIf$(this.educacao.tipo == '2'), },  
                tema: { required$ },
            },
        };
    },
    computed: {
        currentUser() {
            return this.$store.getters["auth/loggedUser"];
        },
    },
    methods: {
        details(){
            this.$router.push(`/educacao_det/${this.educacao.id_educacao}`);
        },
        startCalendar(){
            const options = {
                type: "date",
                dateFormat: "dd/MM/yyyy",
                startDate: this.educacao.dt_cadastro,
                showHeader: false,
                color: "primary"
            };
            
            
            this.calendar = bulmaCalendar.attach('#dtCad', options);
            const element = document.querySelector('#dtCad');
            
            if (element) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element.bulmaCalendar.on('select', datepicker => {
                this.educacao.dt_cadastro = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }
  
        },
        loadData(){
            this.isLoading = true;

            educacaoService.getEducacao(this.educacao.id_educacao).then(
                (response) => {
                    let data = response.data;
                    this.educacao.dt_cadastro = data.dt_cadastro;
                    this.educacao.id_atividade = data.id_atividade;
                    this.educacao.id_municipios = data.id_municipios;
                    this.educacao.id_modulo = data.id_modulo;
                    this.educacao.dias = data.dias;
                    this.educacao.tipo = data.tipo;
                    this.educacao.id_programas = data.id_programas;
                    this.educacao.id_projetos = data.id_projetos;
                    this.educacao.id_fase = data.id_fase;
                    this.educacao.tema = data.tema;
                    this.mun = data.id_municipios;
                    this.proj = data.id_projetos;
                    this.startCalendar();
                },
                (error) => {
                this.message =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.response.data ||
                    error.message ||
                    error.toString();
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Atividade";
                setTimeout(() => (this.showMessage = false), 3000);
                }
            );

            this.isLoading = false;
        },
        update() {
            this.v$.$validate(); // checks all inputs
            if (!this.v$.$error) {
                document.getElementById('login').classList.add('is-loading');

                educacaoService.update(this.educacao).then(
                    (response) => {
                        this.showMessage = true;
                        this.message = "Atividade alterada com sucesso!!";
                        this.type = "success";
                        this.caption = "Atividade";
                        setTimeout(() => {
                            this.showMessage = false;
                        }, 5000);
                    },
                    (error) => {
                        this.message = error;
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Atividade";
                        setTimeout(() => (this.showMessage = false), 3000);
                    }
                )
                    .finally(() => {
                        document.getElementById('login').classList.remove('is-loading');
                    });
            } else {
                this.message = "Corrija os erros para enviar as informações";
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Atividade";
                setTimeout(() => (this.showMessage = false), 3000);
            }
        },
    },
    mounted() {
        let cUser = this.currentUser;
        if (cUser) {
            this.educacao.owner_id = cUser.id;
        }
    },
    created() {
        this.educacao.id_educacao = this.$route.params.id;
        this.loadData();
    },
    watch: {
        mun(value) {
            this.educacao.id_municipios = value;  

            projetoService.getProjetosCombo(value)
                .then((response) => {
                    this.projetos = response.data;
                })
                .catch((err) =>{
                    console.log(err);
                })
        },
        proj(value) {
            this.educacao.id_educacao = value;  
            
            projetoService.getFasesCombo(value)
                .then((response) => {
                    this.fases = response.data;
                })
                .catch((err) =>{
                    console.log(err);
                })
        },
    }
};
</script>

<style scoped>
label.radio {
    margin-left: 1rem;
    margin-top: .5rem;
}

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
}</style>
