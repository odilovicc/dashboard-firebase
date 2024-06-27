<template>
  <Card class="md:min-w-[50rem] sm:min-w-max" v-motion-pop-visible>
    <template #title>{{ $t("REG") }}</template>
    <template #content>
      <form-container>
        <field :label="$t('USERNAME')">
          <input-text
            :disabled="loading"
            v-model="username"
            :placeholder="$t('USERNAME')"
          />
        </field>
        <field :label="$t('EMAIL')">
          <input-text
            :disabled="loading"
            v-model="email"
            :placeholder="$t('EMAIL')"
          />
        </field>
        <field :label="$t('PASS')">
          <input-text
            :disabled="loading"
            type="password"
            v-model="password"
            :placeholder="$t('PASS')"
          />
        </field>
        <p>
          {{ $t("ALREADY_REG") }}
          <router-link :to="{ name: 'login' }" class="text-[--primary-color]">{{
            $t("LOG_IN")
          }}</router-link>
        </p>
      </form-container>
    </template>
    <template #footer>
      <div class="flex items-center flex-col justify-between">
        <Button
          :disabled="loading"
          :loading="loading"
          :label="$t('REG')"
          @click="registerUser"
          class="w-full"
        />
        <divider align="center">{{ $t("OR") }}</divider>
        <Button
          :disabled="loading"
          :loading="loading"
          :label="$t('REG_GOOGLE')"
          icon="pi pi-google"
          outlined
          @click="registerGoogle"
          class="w-full"
        />
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
    ...mapState("auth", ["user", "message"]),
    ...mapGetters("auth", ["isValid"]),
  },
  methods: {
    async registerUser() {
      await this.$store.dispatch("auth/register", {
        email: this.email,
        password: this.password,
        username: this.username,
      });
      switch (this.message) {
        case "Successfully registered":
          this.$router.push({ name: "login" });
          this.$toast.add({
            summary: `${this.message}. Check your inbox to verify your email`,
            life: 3000,
            severity: "success",
          });
          break;
        default:
          this.$toast.add({
            summary: "An error occured",
            severity: "error",
            life: 3000,
          });
      }
    },
    async registerGoogle() {
      try {
        this.loading = true;
        await this.$store.dispatch("auth/regGoogle");
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
