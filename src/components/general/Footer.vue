<template>
    <div id="footer">
          <p>Coordenadoria de Controle de Doenças &copy; 2024</p>
      </div> 
  </template>
  
  <script>
  export default {
      name: 'Footer'
  }
  </script>
  
  <style scoped lang="scss">
  @import "@/components/general/css/custom-var";
      #footer{
          background-color: $base-bg;
          border-top: 6px solid $primary-color;
          
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          color: $primary_color;
          height: 3rem;
          z-index: 98;
          position:fixed;
          margin-bottom:0px;
      }
  </style>