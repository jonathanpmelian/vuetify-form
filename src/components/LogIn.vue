<template>
  <v-card width="500px" class="mt-10">
    <v-card-title class="text-center">Login</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Email"
          prepend-icon="mdi-email-outline"
          clearable
        ></v-text-field>

        <v-text-field
          :type="passVisible ? 'text' : 'password'"
          label="Password"
          prepend-icon="mdi-lock-outline"
          :append-icon="passVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
          @click:append="passVisible = !passVisible"
        ></v-text-field>
      </v-form>
    </v-card-text>

    <v-card-subtitle class="text-center">
      Don't you have an account yet? <a @click="switchForm">Register now</a>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="primary" class="mx-auto">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "LogIn",
  data() {
    return {
      passVisible: false,
    };
  },
  methods: {
    switchForm() {
      this.$emit("switch-form");
    },
  },
};
</script>

<style lang="scss" scoped></style>
