<template>
  <Menubar :model="items" class="border-none">
    <template #item="{ item, props, hasSubmenu }">
      <router-link
        v-if="item.route"
        v-slot="{ href, navigate }"
        :to="item.route"
        custom
      >
        <a :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span class="ml-2">{{ $t(item.label) }}</span>
        </a>
      </router-link>
      <a v-else :href="item.url" :target="item.target" v-bind="props.action">
        <span :class="item.icon" />
        <span class="ml-2">{{ $t(item.label) }}</span>
        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
      </a>
    </template>
    <template #end>
      <profile-dropdown @click:logout="$emit('log-out')"></profile-dropdown>
    </template>
  </Menubar>
</template>

<script>
import ProfileDropdown from "@/components/ui/navigation/ProfileDropdown.vue";
import Sidebar from "primevue/sidebar";

export default {
  components: { ProfileDropdown, Sidebar },
  data() {
    return {
      visible: false,
      items: [
        {
          label: "HOME",
          icon: "pi pi-home",
          route: "/",
        },
        {
          label: "EXPANSES",
          icon: "pi pi-bolt",
          route: "/expanses",
        },
        {
          label: "USERS",
          icon: "pi pi-user",
          route: "/users",
        },
        {
          label: "TODO",
          icon: "pi pi-check-square",
          route: "/todo",
        },
      ],
    };
  },
};
</script>
