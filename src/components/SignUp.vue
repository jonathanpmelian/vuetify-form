<template>
  <v-card width="500px" class="mt-10">
    <v-card-title>Sign Up</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Email"
          v-model="email"
          :rules="[rules.emailMatch]"
          prepend-icon="mdi-email-outline"
          clearable
        ></v-text-field>

        <v-text-field
          :type="pass.visible ? 'text' : 'password'"
          label="Password"
          v-model="pass.password"
          :rules="[rules.min, rules.strength]"
          prepend-icon="mdi-lock-outline"
          :append-icon="
            pass.visible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
          "
          @click:append="pass.visible = !pass.visible"
        ></v-text-field>
        <v-progress-linear
          :color="score.color"
          :value="score.value"
          background-opacity="0.65"
        ></v-progress-linear>
        <v-text-field
          :type="pass.visible ? 'text' : 'password'"
          label="Password"
          v-model="pass.confirm"
          prepend-icon="mdi-lock-outline"
          :append-icon="
            pass.visible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
          "
          :rules="[rules.passwordMatch]"
          @click:append="pass.visible = !pass.visible"
        ></v-text-field>

        <v-select
          :items="country"
          item-text="name"
          label="Country"
          prepend-icon="mdi-earth"
        ></v-select>

        <v-divider></v-divider>

        <v-radio-group v-model="selectedGender" row class="text-center">
          <v-spacer></v-spacer>
          <v-radio label="male" value="male"> </v-radio>
          <v-radio label="female" value="female"> </v-radio>
          <v-radio label="undisclosed" value="undisclosed"> </v-radio>
          <v-spacer></v-spacer>
        </v-radio-group>

        <v-divider></v-divider>

        <v-menu
          ref="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="birthdate"
              label="Birthday date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              :rules="[rules.over18]"
              clearable
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="birthdate"
            :max="
              new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10)
            "
            min="1950-01-01"
          ></v-date-picker>
        </v-menu>

        <v-divider></v-divider>

        <v-checkbox
          v-model="terms"
          :label="`Acceptance of the Terms and Conditions (mandatory)`"
        ></v-checkbox>
        <v-checkbox
          v-model="mailing"
          :label="`Acceptance to join the Mailing List (optional)`"
        ></v-checkbox>
      </v-form>
    </v-card-text>

    <v-card-subtitle class="text-center">
      Are you already registered? <a @click="switchForm">Login</a>
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="primary" class="mx-auto" :disabled="!isDisabled"
        >Sign Up</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import countries from "../../countries";
import zxcvbn from "../../node_modules/zxcvbn";

export default {
  name: "SignUp",
  data() {
    return {
      pass: {
        visible: false,
        password: "",
        confirm: "",
      },
      email: "",
      country: countries.countries,
      selectedGender: "",
      birthdate: "",
      terms: "",
      mailing: "",
      rules: {
        emailMatch: () => {
          return /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)
            ? true
            : "Invalid email format";
        },
        passwordMatch: () => {
          return this.pass.password === this.pass.confirm
            ? true
            : "Password you entered don't match";
        },
        over18: () => {
          let date18YearsAgo = new Date();
          date18YearsAgo = date18YearsAgo.setFullYear(
            date18YearsAgo.getFullYear() - 18
          );
          return Date.parse(this.birthdate) <= date18YearsAgo
            ? true
            : "You must be older than 18";
        },
        min: () =>
          this.pass.password.length >= 8 ||
          "Use 8 characters or more for your password",
        strength: () =>
          zxcvbn(this.pass.password).score >= 3 ||
          "Please choose a stronger password. Try a mix of letters, numbers, and symbols.",
      },
    };
  },
  computed: {
    isDisabled() {
      if (this.pass.password !== "" || this.pass.confirm !== "") {
        return (
          this.rules.passwordMatch() === true &&
          this.rules.emailMatch() === true &&
          this.terms &&
          this.rules.over18() === true
        );
      } else {
        return false;
      }
    },
    score() {
      const result = zxcvbn(this.pass.password);

      switch (result.score) {
        case 4:
          return {
            color: "light-blue",
            value: 100,
          };
        case 3:
          return {
            color: "light-green",
            value: 75,
          };
        case 2:
          return {
            color: "yellow",
            value: 50,
          };
        case 1:
          return {
            color: "orange",
            value: 25,
          };
        default:
          return {
            color: "red",
            value: 0,
          };
      }
    },
  },
  methods: {
    switchForm() {
      this.$emit("switch-form");
    },
  },
};
</script>

<style lang="scss" scoped></style>
