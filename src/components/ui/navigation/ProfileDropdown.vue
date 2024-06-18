<template>
  <div>
    <Button
      @click="toggle"
      text
      aria-haspopup="true"
      aria-controls="overlay_tmenu"
    >
      <template #default>
        <Avatar shape="circle" :image="user.photoURL" />
      </template>
    </Button>
    <TieredMenu ref="menu" id="overlay_tmenu" popup :model="links">
      <template #start>
        <div class="px-4 py-3 pb-0 flex items-center gap-2">
          <Avatar shape="circle" :image="user.photoURL" />
          <div class="flex flex-col gap-1">
            <h1 class="font-medium">{{ user.displayName }}</h1>
          </div>
        </div>
        <Divider />
      </template>
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
          <span v-if="hasSubmenu" class="pi pi-angle-right ml-auto" />
        </a>
      </template>
    </TieredMenu>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import Divider from "primevue/divider";

export default {
  components: {
    Divider,
  },
  data() {
    return {
      user: getAuth().currentUser,
      links: [
        {
          label: "PROFILE",
          icon: "pi pi-user",
          route: "/profile",
        },
        {
          label: "CHANGE_LANG",
          icon: "pi pi-language",
          command: () => this.switchLanguage(),
        },
        {
          label: "LOG_OUT",
          icon: "pi pi-sign-out",
          command: () => this.$emit("click:logout"),
        },
      ],
    };
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    switchLanguage() {
      const currentLanguage = this.$i18n.locale;
      const newLanguage = currentLanguage === "en" ? "ru" : "en";
      this.$i18n.locale = newLanguage;
      localStorage.setItem("language", newLanguage);
    },
  },
  created() {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      this.$i18n.locale = savedLanguage;
    }
  },
};
</script>

<style lang="scss" scoped></style>
