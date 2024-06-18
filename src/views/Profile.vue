<template>
  <div>
    <Card>
      <template #title>{{ $t('PROFILE_MAIN_INFO') }}</template>
      <template #content>
        <Message v-if="!user?.emailVerified" severity="error">
          {{ $t('PROFILE_EMAIL_NOT_VERIFIED') }}
        </Message>
        <form-container>
          <field :label="$t('PROFILE_USERNAME')">
            <input-text :disabled="!user?.emailVerified || loading" v-model="updatedDisplayName"/>
          </field>
        </form-container>
      </template>
      <template #footer>
        <Button :label="$t('PROFILE_SAVE_CHANGES')" :loading="loading" :disabled="!isChanged || loading" @click="updateUserInformation"/>
      </template>
    </Card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      updatedDisplayName: '',
      updatedEmail: '',
      loading: false
    };
  },
  computed: {
    ...mapState('auth', ['user']),
    isChanged() {
      return this.user && (this.user.displayName !== this.updatedDisplayName || this.user.email !== this.updatedEmail);
    },
  },
  watch: {
    user: {
      handler(newUser) {
        if (newUser) {
          this.updatedDisplayName = newUser.displayName;
          this.updatedEmail = newUser.email;
        }
      },
      immediate: true,
    },
  },
  methods: {
    async updateUserInformation() {
      try {
        this.loading = true;
        await this.$store.dispatch("auth/updateUser", {
          updatedDisplayName: this.updatedDisplayName
        });
        this.$toast.add({
          severity: 'success',
          summary: this.$t('PROFILE_SAVE_SUCCESS'),
          life: 3000
        });
      } catch (e) {
        console.log(e);
        this.$toast.add({
          severity: 'error',
          summary: this.$t('PROFILE_SAVE_ERROR'),
          life: 3000
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
