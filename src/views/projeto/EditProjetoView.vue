<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-four-fifths">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Projeto</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="columns">
                                <div class="column is-half">
                                    <div class="field">
                                        <label class="label">Programa</label>
                                        <div class="control">
                                            <CmbPrograma @selProg="projetos.id_programas = $event" :sel="projetos.id_programas" />
                                            <span class="is-error" v-if="v$.projetos.id_programas.$error">
                                                {{ v$.projetos.id_programas.$errors[0].$message }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="column is-half">
                                    <div class="field">
                                        <label class="label">Nome</label>
                                        <input type="text" class="input" placeholder="Nome do Projeto"
                                            v-model="projetos.nome" />
                                        <span class="is-error" v-if="v$.projetos.nome.$error">
                                            {{ v$.projetos.nome.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <fieldset class="fieldset">
                                <legend>Tipo</legend>
                                <div class="control has-icons-left has-icons-right">
                                    <div class="columns">
                                        <div class="column is-2">

                                            <label class="radio">
                                                <input type="radio" name="tp_projeto" value="5" v-model="projetos.tp_projeto" />
                                                Educação
                                            </label>
                                        </div>
                                        <div class="column is-2">
                                            <label class="radio">
                                                <input type="radio" name="tp_projeto" value="6" v-model="projetos.tp_projeto" />
                                                Mobilização
                                            </label>
                                        </div>
                                        <div class="column is-2">
                                            <label class="radio">
                                                <input type="radio" name="tp_projeto" value="2" v-model="projetos.tp_projeto" />
                                                Ed. Permanente
                                            </label>
                                        </div>
                                        <div class="column is-2">
                                            <label class="radio">
                                                <input type="radio" name="tp_projeto" value="4" v-model="projetos.tp_projeto" />
                                                Comunicação
                                            </label>
                                        </div>
                                        <div class="column is-2">
                                            <label class="radio">
                                                <input type="radio" name="tp_projeto" value="1" v-model="projetos.tp_projeto" />
                                                Educom
                                            </label>
                                        </div>
                                        <div class="column is-2">
                                            <label class="radio">
                                                <input type="radio" name="tp_projeto" value="3" v-model="projetos.tp_projeto" />
                                                Outros
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <span class="is-error" v-if="v$.projetos.tp_projeto.$error">
                                    {{ v$.projetos.tp_projeto.$errors[0].$message }}
                                </span>
                            </fieldset>

                            <div class="columns">
                                <div class="column is-half">
                                    <div class="field">
                                        <label class="label">Município</label>
                                        <div class="control">
                                            <CmbTerritorio :id_prop="currentUser.id" :tp_projeto="3" :sel="projetos.id_municipios"
                                                @selTerr="projetos.id_municipios = $event"
                                                :errclass="{ 'is-danger': v$.projetos.id_municipios.$error }" />
                                            <span class="is-error" v-if="v$.projetos.id_municipios.$error">
                                                {{ v$.projetos.id_municipios.$errors[0].$message }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="column is-half">
                                    <div class="field">
                                        <label class="label">Localidade</label>
                                        <input type="text" class="input" placeholder="" v-model="projetos.localidade" />
                                        <span class="is-error" v-if="v$.projetos.localidade.$error">
                                            {{ v$.projetos.localidade.$errors[0].$message }}
                                        </span>
                                    </div>

                                </div>
                            </div>



                            <div class="columns">
                                <div class="column is-half">
                                    <div class="field">
                                        <label class="label">Justificativa</label>
                                        <textarea type="text" class="textarea" cols="50" rows="2"
                                            v-model="projetos.justificativa"></textarea>
                                        <span class="is-error" v-if="v$.projetos.justificativa.$error">
                                            {{ v$.projetos.justificativa.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="column is-half">
                                    <div class="field">
                                        <label class="label">Metodologia</label>
                                        <textarea type="text" class="textarea" cols="50" rows="2"
                                            v-model="projetos.metodologia"></textarea>
                                        <span class="is-error" v-if="v$.projetos.metodologia.$error">
                                            {{ v$.projetos.metodologia.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="field">
                                <label class="label">Responsável</label>
                                <input type="text" class="input" placeholder="Responsável pela condução do projeto"
                                    v-model="projetos.responsavel" />
                                <span class="is-error" v-if="v$.projetos.responsavel.$error">
                                    {{ v$.projetos.responsavel.$errors[0].$message }}
                                </span>
                            </div>

                            <div class="columns">
                                <div class="column is-half">
                                    <fieldset class="fieldset">
                                        <legend>Parcerias</legend>
                                        <div class="columns">
                                            <div class="column">
                                                <div class="columns" v-for="parc in lstParceriasP" :key="parc.id">
                                                    <label for="" class="checkbox">
                                                        <input type="checkbox" v-model="projetos.parcerias" :true-value="[]" :value="parc.id">
                                                        {{parc.nome}}
                                                    </label>
                                                </div>
                                                
                                            </div>
                                            <div class="column">
                                                <div class="columns" v-for="parc in lstParceriasI" :key="parc.id">
                                                    <label for="" class="checkbox">
                                                        <input type="checkbox" v-model="projetos.parcerias" :true-value="[]" :value="parc.id">
                                                        {{parc.nome}}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                    
                                </div>
                                <div class="column is-half">
                                    <fieldset class="fieldset">
                                        <legend>Público Alvo</legend>
                                        <div class="columns">
                                            <div class="column">
                                                <div class="columns" v-for="parc in lstPublicosP" :key="parc.id">
                                                    <label for="" class="checkbox">
                                                        <input type="checkbox" v-model="projetos.publico_alvo" :true-value="[]" :value="parc.id">
                                                        {{parc.nome}}
                                                    </label>
                                                </div>                                                
                                            </div>
                                            <div class="column">
                                                <div class="columns" v-for="parc in lstPublicosI" :key="parc.id">
                                                    <label for="" class="checkbox">
                                                        <input type="checkbox" v-model="projetos.publico_alvo" :true-value="[]" :value="parc.id">
                                                        {{parc.nome}}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                    
                                </div>
                            </div>
                            <div class="columns">
                                    <div class="column is-half">
                                        <div class="field">
                                            <label class="label">Outras Parcerias</label>
                                            <input type="text" class="input" placeholder="Opcional"
                                                v-model="projetos.ot_parcerias" />
                                        </div>
                                    </div>
                                    <div class="column is-half">
                                        <div class="field">
                                        <label class="label">Outros Públicos</label>
                                        <input type="text" class="input" placeholder="Opcional"
                                            v-model="projetos.ot_publico" />
                                    </div>
                                    </div>
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
import projetosService from "@/services/projeto.service";
import parceriaService from "@/services/parceria.service";

import publicoService from "@/services/publico.service";
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import CmbPrograma from "@/components/forms/CmbPrograma.vue";
import CmbTerritorio from "@/components/forms/CmbTerritorio.vue";


import {
    required$,
    combo$,
} from "../../components/forms/validators.js";


export default {
    components: {
        Loader,
        Message,
        footerCard,
        CmbPrograma,
        CmbTerritorio
    },
    data() {
        return {
            projetos: {
                id_projetos: 0,
                nome: '',
                owner_id: 0,
                id_programas: 0,
                tp_projeto: 0,
                id_municipios: 0,
                localidade: '',
                justificativa: '',
                responsavel: '',
                metodologia: '',
                parcerias: [],
                ot_parcerias: '',
                publico_alvo: [],
                ot_publico: '',

            },
            lstParceriasP: [],
            lstParceriasI: [],
            lstPublicosP: [],
            lstPublicosI: [],
            v$: useValidate(),
            isLoading: false,
            message: "",
            caption: "",
            type: "",
            showMessage: false,
            nivel: 0,
            cFooter: {
                strSubmit: 'Salvar',
                strCancel: 'Cancelar',
                strAux: 'Cronograma',
                aux: true
            }
        };
    },
    validations() {
        return {
            projetos: {
                nome: { required$, maxLength: maxLength$(60) },
                id_programas: { minValue: combo$(1), },
                id_municipios: { minValue: combo$(1), },
                tp_projeto: { required$ },
                localidade: { maxLength: maxLength$(60) },
                justificativa: { required$ },
                responsavel: { required$, maxLength: maxLength$(65) },
                metodologia: { required$ },
                parcerias: { required$ },
                publico_alvo: { required$ },
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
            this.$router.push(`/cronograma/${this.projetos.id_projetos}`);
        },
        loadData(){
            this.isLoading = true;

            projetosService.getProjeto(this.projetos.id_projetos).then(
                (response) => {
                    let data = response.data;
                    this.projetos.nome = data.nome;
                    this.projetos.id_programas = data.id_programas;
                    this.projetos.id_municipios = data.id_municipios;
                    this.projetos.tp_projeto = data.tp_projeto;
                    this.projetos.localidade = data.localidade;
                    this.projetos.justificativa = data.justificativa;
                    this.projetos.responsavel = data.responsavel;
                    this.projetos.metodologia = data.metodologia;
                    this.projetos.ot_parcerias = data.ot_parcerias;
                    this.projetos.ot_publico = data.ot_publico;
                    this.projetos.parcerias = data.parcerias;
                    this.projetos.publico_alvo = data.publico_alvo;
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
                this.caption = "Usuario";
                setTimeout(() => (this.showMessage = false), 3000);
                }
            );

            this.isLoading = false;
            },
        update() {
            this.v$.$validate(); // checks all inputs
            if (!this.v$.$error) {
                document.getElementById('login').classList.add('is-loading');

                projetosService.update(this.projetos).then(
                    (response) => {
                        this.showMessage = true;
                        this.message = "Projeto alterado com sucesso!!";
                        this.type = "success";
                        this.caption = "Projeto";
                    },
                    (error) => {
                        this.message = error;
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Projeto";
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
                this.caption = "Projeto";
                setTimeout(() => (this.showMessage = false), 3000);
            }
        },
        getParceriasList() {
            parceriaService.getCombo()
                .then((response) => {
                    const parc = response.data;
                    this.lstParceriasP = parc.filter(function (el){
                        return el.codigo % 2 === 0;
                    });
                    this.lstParceriasI = parc.filter(function (el){
                        return el.codigo % 2 !== 0;
                    });
                },
                    (error) => {
                        this.message = error;
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Projeto";
                        setTimeout(() => (this.showMessage = false), 3000);
                    }
                )

        },
        getPublicoList() {
            publicoService.getCombo()
                .then((response) => {
                    const parc = response.data;
                    this.lstPublicosP = parc.filter(function (el){
                        return el.codigo % 2 === 0;
                    });
                    this.lstPublicosI = parc.filter(function (el){
                        return el.codigo % 2 !== 0;
                    });
                },
                    (error) => {
                        this.message = error;
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Projeto";
                        setTimeout(() => (this.showMessage = false), 3000);
                    }
                )

        }
    },
    mounted() {
        let cUser = this.currentUser;
        console.log(cUser);
        if (cUser) {
            this.projetos.owner_id = cUser.id;
        }

        this.getParceriasList();
        this.getPublicoList();
    },
    created() {
        this.projetos.id_projetos = this.$route.params.id;
        this.loadData();
    },
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
