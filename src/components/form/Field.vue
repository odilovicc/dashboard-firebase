<template>
  <div class="flex flex-col gap-2">
    <h1 class="font-medium">{{label}}</h1>
    <slot/>
  </div>
</template>

<script>
export default {
  name: "Field",
  props: {
    label: {
      type: String,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>