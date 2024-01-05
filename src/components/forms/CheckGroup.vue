<template>
  <div class="control">
    <div class="select">
      <select @change="onChange($event)" class="input" :class="errclass">
        <option value="0">-- Selecione --</option>
        <option
          v-for="loc in programas"
          :key="loc.id_programa"
          :value="loc.id_programa"
          :selected="loc.id_programa == sel"
        >
          {{ loc.nome }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckGroup",
  data() {
    return {
      programas: [],
    };
  },
  props: ['sel', 'errclass', 'data'],
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
  },
  
};
</script>

<style scoped>
  
</style>
