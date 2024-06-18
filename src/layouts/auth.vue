<template>
  <div class="h-screen bg-green-500 flex justify-center items-center">
    <div class="px-6 md:px-0">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>
