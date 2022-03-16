<template>
  <v-app>
    <v-app-bar app color="primary" dark></v-app-bar>
    <v-main class="mx-auto align-center">
      <LogIn v-if="login" @switch-form="switchForm" />
      <SignUp v-else @switch-form="switchForm" />
    </v-main>
    <v-footer app color="secondary" dark height="40vh">
      <v-spacer></v-spacer
      ><span for="" color="white--text">@Jonathan Reboot</span>
    </v-footer>
  </v-app>
</template>

<script>
import LogIn from "@/components/LogIn.vue";
import SignUp from "@/components/SignUp.vue";

export default {
  name: "App",
  data() {
    return {
      login: true,
    };
  },
  components: {
    LogIn,
    SignUp,
  },
  methods: {
    switchForm() {
      this.login = !this.login;
    },
  },
};
</script>
