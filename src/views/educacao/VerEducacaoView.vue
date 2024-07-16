<template>
  <div class="main-container">
    <div class="columns is-centered">
            <div class="column is-three-fifths">
                <Loader v-if="isLoading" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Atividade</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="columns">
                                <div class="column is-align-items-center">
                                    <h5 class="card-header-title is-centered">Geral</h5>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-2 is-title">
                                    Local:
                                </div>
                                <div class="column is-2 is-content">{{ educacao.municipio }}</div>
                                <div class="column is-1 is-title">
                                    Data:
                                </div>
                                <div class="column is-2 is-content">{{ educacao.data }}</div>
                                <div class="column is-2 is-title">
                                    Tipo:
                                </div>
                                <div class="column  is-content">{{ educacao.tipo }}</div>
                            </div>
                            <div class="columns" v-if="educacao.id_tipo==2">
                                <div class="column is-2 is-title">
                                    Projeto:
                                </div>
                                <div class="column is-5  is-content">{{ educacao.projeto }}</div>
                                <div class="column is-2 is-title">
                                    Fase:
                                </div>
                                <div class="column is-3  is-content">{{ educacao.fase }}</div>
                            </div>
                            <div class="columns">
                                <div class="column is-2 is-title">
                                    Programa:
                                </div>
                                <div class="column is-2  is-content">{{ educacao.programa }}</div>
                                <div class="column is-2 is-title">
                                    Atividade:
                                </div>
                                <div class="column is-2  is-content">{{ educacao.atividade }}</div>
                                <div class="column is-2 is-title">
                                    Módulo:
                                </div>
                                <div class="column is-content">{{ educacao.modulo }}</div>
                            </div>
                            <div class="columns">
                                <div class="column is-2 is-title">
                                    Tema:
                                </div>
                                <div class="column is-content">{{ educacao.tema }}</div>
                            </div>
                            <div class="columns">
                                <div class="column is-2 is-title">
                                    Registrado por:
                                </div>
                                <div class="column is-content">{{ educacao.usuario }}</div>
                            </div>
                            <br>
                            <hr>
                            <div class="columns">
                                <div class="column is-align-items-center">
                                    <h5 class="card-header-title is-centered">Público Alvo</h5>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-2 is-title">
                                    Instituição:
                                </div>
                                <div class="column is-4 is-content">{{ educacao.instituicao }}</div>
                                <div class="column is-2 is-title">
                                    Tipo:
                                </div>
                                <div class="column is-content">{{ educacao.tipo_instituicao }}</div>
                            </div>
                            <div class="columns">
                                <div class="column is-2 is-title">
                                    Campo:
                                </div>
                                <div class="column is-2 is-content">{{ educacao.campo }}</div>
                                <div class="column is-2 is-title">
                                    Técnico:
                                </div>
                                <div class="column is-2 is-content">{{ educacao.tecnico }}</div>
                                <div class="column is-2 is-title">
                                    Participantes:
                                </div>
                                <div class="column is-content">{{ educacao.participantes }}</div>
                            </div>
                            <br>
                            <hr>
                            <div class="columns">
                                <div class="column is-align-items-center">
                                    <h5 class="card-header-title is-centered">Imagens</h5>
                                </div>
                            </div>
                            <div class="columns" v-show="showFotos">
                                <div class="column is-4 is-offset-4" >
                                    <section class="hero is-medium has-carousel" >
                                        <div id="carousel-demo" class="hero-carousel">
                                            <div class="item-1">
                                                <img :src=educacao.img[0] alt=".." height="800">
                                            </div>
                                            <div class="item-2" >
                                                <img :src=educacao.img[1] alt=".." v-if="educacao.img.length>1" height="800">
                                            </div>
                                            <div class="item-3" v-if="educacao.img.length>2">
                                                <img :src=educacao.img[2] alt=".." height="800">
                                            </div>
                                        </div>
                                        <div class="hero-body"></div>
                                    </section>
                                </div>
                            </div>
                            <div class="column is-4 is-offset-4" v-if="educacao.img.length==0">                                       
                                <p class="is-centered">Sem imagens registradas</p>
                            </div>
                                                       
                        </div>
                    </div>
                    <footer class="card-footer">
                        
                    </footer>
                    <br><br>
                </div>
            </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/general/Loader.vue";
import educacaoService from "@/services/educacao.service";
import 'bulma-carousel/dist/css/bulma-carousel.min.css'
import bulmaCarousel from 'bulma-carousel/dist/js/bulma-carousel.min.js'


export default {
    components:{
        Loader,
    },
    data() {
        return {
            educacao: {
                id_educacao: 0,
                data: '', 
                municipio: 'lugal', 
                atividade: '', 
                modulo: '', 
                usuario: '', 
                dias: '', 
                campo: '', 
                tecnico: '',
                participantes: '',
                tipo_instituicao: '', 
                instituicao: '',
                tipo: '',
                id_tipo: '',
                programa: '', 
                projeto: 0, 
                fase: '', 
                tema: '',
                img: [],
                fotos: []
            },
            isLoading: false,
            showFotos: true,
        }
    },
    methods:{
        startCarousel(){
            bulmaCarousel.attach('#carousel-demo', {
			    slidesToScroll: 1,
			    slidesToShow: 1,
                loop: true,
                autoplay: true,
		    });
        },
        loadData(){
            this.isLoading = true;

            educacaoService.getView(this.educacao.id_educacao).then(
                (response) => {
                    let data = response.data;
                    this.educacao.data = data.data;
                    this.educacao.atividade = data.atividade;
                    this.educacao.municipio = data.municipio;
                    this.educacao.modulo = data.modulo;
                    this.educacao.dias = data.dias;
                    this.educacao.programa = data.programa;
                    this.educacao.projeto = data.projeto;
                    this.educacao.fase = data.fase;
                    this.educacao.tema = data.tema;
                    this.educacao.usuario =  `${data.nome} (${data.username})`;
                    this.educacao.tipo = data.tipo;
                    this.educacao.id_tipo = data.id_tipo;


                    this.educacao.instituicao = data.instituicao;
                    this.educacao.tipo_instituicao = data.tipo_instituicao;
                    this.educacao.campo = data.campo;
                    this.educacao.tecnico = data.tecnico;
                    this.educacao.participantes = data.participantes;

                    if (data.fotos){
                        this.showFotos = true;
                        this.educacao.fotos = data.fotos;
                        this.getFoto();
                    } else {
                        this.showFotos = false;
                    }
                

                  //  this.mun = data.id_municipios;
                  //  this.proj = data.id_projetos;
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
        getFoto() {
            this.educacao.fotos.forEach(element => {
                educacaoService.getFoto(element)
                .then((response) => {
                    this.educacao.img.push(URL.createObjectURL(response.data));
                })
                .catch((err) => {
                    console.log(err);
                })
            });
        },
    },
    created() {
        this.educacao.id_educacao = this.$route.params.id;
        this.loadData();
    },
    mounted(){
        this.startCarousel();
    }
}
</script>

<style scoped>
    .content {
        padding: 2rem;
    }

    .is-title{
        font-size: large;
        color: blue;
        font-weight: bold;
        display: flex;
        justify-content: flex-end;
    }

    .is-content{
        border-bottom: 1px solid rgb(192, 189, 207);
    }

</style>