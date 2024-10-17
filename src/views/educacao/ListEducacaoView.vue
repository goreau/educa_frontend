<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <Loader v-if="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption"/>
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Atividades Cadastradas</p>
            <button class="button is-primary is-outlined" @click="newEducacao">
              <span class="icon">
                <font-awesome-icon icon="fa-solid fa-plus-circle" />
              </span>
              <span>Novo</span>
            </button>
          </header>
          <div class="card-content">
            <MyTable :tableData="dataTable" :columns="columns" :filtered="true" :tableName="tableName"/>
          </div>
        </div>
        <div style="display: none;">
          <span class="icon is-small is-left" name="coisa">
            <font-awesome-icon icon="fa-solid fa-edit" />
          </span>
          <span class="icon is-small is-left" name="coisa2">
            <font-awesome-icon  icon="fa-solid fa-trash" />
          </span>
          <span class="icon is-small is-left" name="coisa1">
            <font-awesome-icon  icon="fa-solid fa-eye" />
          </span>
        </div>
      </div>
    </div>
  </div>
  <confirm-dialog ref="confirmDialog"></confirm-dialog>
  <br><br><br>
</template>

<script>
import educacaoService from "@/services/educacao.service";
import MyTable from '@/components/forms/MyTable.vue';
import Loader from '@/components/general/Loader.vue';
import ConfirmDialog from '@/components/forms/ConfirmDialog.vue';
import Message from "@/components/general/Message.vue";

export default {
  name: 'ListaVendas',
  data() {
      return {
          tableName: 'educacao',
          dataTable: [],
          isLoading: false,
          showMessage: false,
          message: "",
          caption: "",
          type: "",
          columns: [],
          myspan: null,
          myspan2: null,
          id_user: 0,
      }
  },
  components: {
      MyTable,
      Loader,
      ConfirmDialog,
      Message

  },
  methods: {
    newEducacao() {
      this.$router.push('/atividade');
      },
      editEducacao(id) {
          this.$router.push(`/edit/${id}`);
      },
      getFormat(row) {
          return {
              'has-text-danger-dark': row.status == 1,
              'has-text-danger': row.status == 2,
              'has-text-info': row.status == 3,
              'has-text-success': row.status == 9,
              'has-text-info': row.status == 7
          }
      }
  },
  mounted() {
    this.id_user = this.currentUser.id;

    this.myspan = document.getElementsByName('coisa')[0];
    this.myspan1 = document.getElementsByName('coisa1')[0];
    this.myspan2 = document.getElementsByName('coisa2')[0];
    //document.createElement('span');
   // this.myspan.innerHTML='<p>teste</p>';;

      this.isLoading = true;
      educacaoService.getEducacaos(this.id_user)
          .then((response) => {
              this.dataTable = response.data;
              this.isLoading = false;
          })
          .catch((err) =>{
            console.log(err);
          })
          .finally(() => this.isLoading = false);

      this.columns = [
          {title: 'GVE', field: 'gve', type: 'string', minWidth: 150, responsive: 3},
          {title: 'Local', field: 'local', type: 'string', minWidth: 150},
          {title: 'Data', field: 'data', type: 'string', sorter:"date", minWidth: 150},
          {title: 'Tipo', field: 'tipo', type: 'string', minWidth: 150},
          {title: 'Programa', field: 'programa', type: 'string', minWidth: 150},    
          {title: 'Atividade', field: 'atividade', type: 'string', minWidth: 150}, 
          {title: 'Módulo', field: 'modulo', type: 'string', minWidth: 150},    
          {title: 'Criação', field: 'criacao', type: 'string', sorter:"date", minWidth: 150, responsive: 2},
          {title: 'Ações', responsive:0, minWidth: 300,
            formatter: (cell, formatterParrams) =>{
              const row = cell.getRow().getData();

              const btEdit = document.createElement('button');
              btEdit.type = 'button';
              btEdit.title = 'Editar';
              btEdit.disabled = this.id_user != row.owner_id;
              btEdit.style.cssText = 'height: fit-content; margin-left: 1rem;';
              btEdit.classList.add('button', 'is-primary', 'is-outlined');
              btEdit.innerHTML = this.myspan.innerHTML;
              btEdit.addEventListener('click', () => {
                this.$router.push(`/editAtividade/${row.id_educacao}`);
              });

            /* const teste = document.createElement('div'); 
              teste.classList.add('icon', 'is-small');
              teste.innerHTML='<span><font-awesome-icon icon=\"fa-solid fa-envelope\" /></span>';*/

              const btDel = document.createElement('button');
              btDel.type = 'button';
              btDel.title = 'Excluir';
              btDel.disabled = this.id_user != row.owner_id;
              btDel.style.cssText = 'height: fit-content; margin-left: 1rem;';
              btDel.classList.add('button', 'is-danger', 'is-outlined');
              btDel.innerHTML = this.myspan2.innerHTML;
              btDel.addEventListener('click', async() => {
                const ok = await this.$refs.confirmDialog.show({
                  title: 'Excluir',
                  message: 'Deseja mesmo excluir essa atividade?',
                  okButton: 'Confirmar',
              })
              if (ok) {
                educacaoService.delete(row.id_educacao)
                .then(resp =>{
                  if (resp.status == '200'){
                    location.reload();
                  } else {
                    this.message = resp;
                    this.showMessage = true;
                    this.type = "alert";
                    this.caption = "Atividades";
                    setTimeout(() => (this.showMessage = false), 3000);
                  }
                })
                .catch(err =>{
                  this.message = err;
                  this.showMessage = true;
                  this.type = "alert";
                  this.caption = "Atividades";
                  setTimeout(() => (this.showMessage = false), 3000);
                });
              }
              });

              const btVer = document.createElement('button');
              btVer.type = 'button';
              
              
             // btVer.disabled = this.id_user != row.owner_id;
              btVer.style.cssText = 'height: fit-content; margin-left: 1rem;';
              btVer.classList.add('button', 'is-info', 'is-outlined');
              if (row.qtfotos != null){
                btVer.title = 'Ver (c/ fotos)'; 
              } else {
                btVer.title = 'Ver';
              }
              
              btVer.innerHTML = this.myspan1.innerHTML;
              btVer.addEventListener('click', () => {
                this.$router.push(`/verAtividade/${row.id_educacao}`);
              });


              const buttonHolder = document.createElement('span');
              buttonHolder.appendChild(btEdit);
              buttonHolder.appendChild(btDel);
              buttonHolder.appendChild(btVer);

              return buttonHolder;

            }}
      ]
  },
  computed: {
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
    },
  },
}
</script>

<style scoped>
.button { 
  margin-right: 1rem;
}
  
</style>