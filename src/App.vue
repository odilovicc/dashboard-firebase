<template>
  <div>
    <router-view/>
    <toast/>
    <confirm-dialog/>
  </div>
</template>

<script>
import Toast from 'primevue/toast'

export default {
  components: {
    Toast
  },
}

</script>

<style lang="scss" scoped>

</style>