<template>
  <div class="control">
    <div class="select">
      <select @change="onChange($event)" class="input" :class="errclass">
        <option value="0">-- Selecione --</option>
        <option
          v-for="loc in programas"
          :key="loc.id_programas"
          :value="loc.id_programas"
          :selected="loc.id_programas == sel"
        >
          {{ loc.nome }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import programaService from "@/services/programa.service.js";

export default {
  name: "CmbPrograma",
  data() {
    return {
      programas: [],
    };
  },
  props: ['sel', 'errclass'],
  methods: {
    onChange(event) {
      this.$emit('selProg',event.target.value);
    },
    loadData() {
      programaService.getCombo()
      .then((res) => {
        this.programas = res.data;
      })
      .catch((err) => {
        console.log(err.response);
        this.programas = [];
      })
    }
  },
  watch: {
    
  },
  mounted() {
    this.loadData();
  },
  
};
</script>

<style scoped>
  
</style>
