<template>
  <navigation class="mb-6" @logOut="logOut"/>
  <div class="container px-5 md:px-0 mx-auto">
    <router-view/>
  </div>
</template>

<script>
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isLoggedIn: false
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  mounted() {
    this.$store.commit("auth/SET_USER", getAuth().currentUser)
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        this.isLoggedIn = true;
        this.$store.dispatch("auth/fetchUser");
      } else {
        this.isLoggedIn = false;
      }
    });
  },
  methods: {
    logOut() {
      signOut(getAuth()).then(() => this.$router.push("/auth/login"));
      this.$store.commit("auth/SET_USER", null);
    }
  }
}
</script>
