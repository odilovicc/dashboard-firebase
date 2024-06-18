<template>
    <h1 :class="switchClasses"><slot /></h1>
  </template>
  
  <script>
  export default {
    props: {
      version: String,
    },
    computed: {
      switchClasses() {
        switch (this.version) {
          case "heading":
            return "text-xl md:text-2xl font-bold";
          case "small-heading":
            return "text-lg md:text-xl font-medium";
          default:
            return "font-regular";
        }
      },
    },
  };
  </script>

  