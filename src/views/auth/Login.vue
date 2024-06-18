<template>
  <Card class="md:min-w-[50rem] sm:min-w-max">
    <template #title>{{ $t('LOG_IN') }}</template>
    <template #content>
      <form-container>
        <field :label="$t('EMAIL')">
          <input-text
            :disabled="loading"
            v-model="email"
            :invalid="errorMessage === 'Invalid email'"
            :placeholder="$t('EMAIL')"
          />
        </field>
        <field :label="$t('PASS')">
          <input-text
            :disabled="loading"
            type="password"
            v-model="password"
            :invalid="errorMessage === 'Invalid password'"
            :placeholder="$t('PASS')"
          />
        </field>
        <p class="text-red-500" v-if="errorMessage">{{ errorMessage }}</p>
        <p>
          {{ $t('DONT_REG') }}
          <router-link
            class="text-[--primary-color]"
            :to="{name: 'register'}"
          >{{$t('REG')}}</router-link>
        </p>
      </form-container>
    </template>
    <template #footer>
      <div class="flex items-center justify-between">
        <button-group>
          <Button
            :disabled="loading"
            :loading="loading"
            :label="$t('LOG_IN')"
            @click="login"
          />
          <Button
            :disabled="loading"
            :loading="loading"
            outlined
            :label="$t('LOG_GOOGLE')"
            icon="pi pi-google"
            @click="logGoogle"
          />
        </button-group>
      </div>
    </template>
  </Card>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      loading: false,
    };
  },
  computed: {
    ...mapState("auth", ["user", "message", "errorMessage"]),
    ...mapGetters("auth", ["isValid"]),
  },
  methods: {
    async login() {
      await this.$store.dispatch("auth/signIn", {
        email: this.email,
        password: this.password,
      });
      switch (this.message) {
        case "Successfully logged in":
          this.$toast.add({
            summary: this.message,
            severity: "success",
            life: 3000,
          });
          this.$router.push("/");
          break;
      }
    },
    async logGoogle() {
      try {
        this.loading = true;
        await this.$store.dispatch("auth/signInGoogle");
        if (this.isValid.status) {
          this.$router.push("/");
          this.$toast.add({
            summary: this.isValid.message,
            severity: "success",
            life: 3000,
          });
        } else {
          this.$toast.add({
            summary: this.isValid.message,
            life: 3000,
            severity: "error",
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
