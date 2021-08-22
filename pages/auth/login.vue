<template>
  <v-app>
    <v-row class="grey lighten-3" justify="center" align="center">
      <v-col cols="6">
        <v-toolbar color="blue" class="mb-5">
          <v-toolbar-title class="text-h5 font-weight-bold white--text"
            >Login Page</v-toolbar-title
          >
        </v-toolbar>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            prepend-icon="mdi-account"
            outlined
            v-model="user.email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            prepend-icon="mdi-lock"
            :append-icon="isPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="isPassword = !isPassword"
            outlined
            :type="isPassword ? 'password' : 'text'"
            v-model="user.password"
            :rules="nameRules"
            label="password"
            required
          ></v-text-field>
          <v-row>
            <v-col>
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                block
                @click="loginUser"
              >
                Submit
              </v-btn>
            </v-col>
            <v-col>
              <v-btn block color="error" class="mr-4" @click="reset">
                Clear
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
// import { required, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      valid: true,
      check: false,
      isPassword: true,
      user: {
        email: "",
        password: "",
      },
      error: false,
      isVisible: true,
      nameRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 8) || "Password must be more than 8 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
   
    async loginUser() {
      //   let phone = this.user.phone.replace(/[^0-9]/g, "");
      if (this.$refs.form.validate())
        try {
          let response = await this.$auth.loginWith("local", {
            data: this.user,
          });
        } catch (err) {
          this.$toast.error('Email yoki parol noto\'g\'ri!!!');
          console.log(err);
        }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;500&display=swap");
.body {
  width: 100%;
  height: 100vh;
  background: #e5e5e5;
  font-family: "Poppins", sans-serif;
  .top {
    width: 100%;
    height: 250px;
    background: #07a287;
    .up {
      display: flex;
      justify-content: space-around;
      width: 90%;
      h1 {
        margin-top: 30px;
        font-style: normal;
        font-weight: 500;
        font-size: 28px;
        line-height: 57px;
        color: #ffffff;
      }
      svg {
        margin: 40px 0 0 0px;
        font-size: 12px;
        width: 170px;
        opacity: 0.3;
      }
    }
  }
}
.login {
  top: 100px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 50px);
  width: 350px;
  // height: 340px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  h2 {
    text-align: center;
    margin-top: 20px;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    color: #07a287;
  }
  .form {
    width: 300px;
    // padding: 20px;
    margin: 30px auto;
    p {
      margin-top: 20px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #a7a7a7;
    }
    input {
      color: #777;
      padding: 10px;
      width: 100%;
      height: 50px;
      left: 785px;
      top: 366px;
      background: rgba(51, 51, 51, 0.05);
      border-radius: 8px;
    }
    input:focus-visible {
      outline: none;
    }
    button {
      margin-top: 20px;
      width: 100%;
      height: 50px;
      left: 785px;
      top: 540px;
      font-size: 16px;
      color: #ffffff;
      background: #07a287;
      border-radius: 8px;
    }
  }
}
.past {
  width: 100%;
  position: absolute;
  bottom: 10px;
  h3 {
    font-weight: 500;
    text-align: center;
    font-size: 24px;
    line-height: 36px;
    color: #cececf;
  }
}
</style>
