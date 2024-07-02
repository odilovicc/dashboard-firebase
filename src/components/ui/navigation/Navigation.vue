<template>
  <div class="container py-2 mt-2 mx-auto">
    <Menubar :model="itemsByRole">
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
  </div>
</template>

<script>
import ProfileDropdown from "@/components/ui/navigation/ProfileDropdown.vue";

export default {
  components: { ProfileDropdown },
  data() {
    return {
      visible: false,
      role: null,
      itemsByRole: [
        {
          label: "HOME",
          icon: "pi pi-home",
          route: "/",
        },
        {
          label: "EXPANSES.EXPANSES",
          icon: "pi pi-bolt",
          items: [
            {
              label: "EXPANSES.ADD",
              icon: "pi pi-plus",
              route: "/expanses/add",
            },
            {
              separator: true,
            },
            {
              label: "EXPANSES.TODAY",
              icon: "pi pi-calendar",
              route: "/expanses/today",
            },
            {
              label: "EXPANSES.ALL",
              icon: "pi pi-list",
              route: "/expanses/all",
            },
          ],
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
