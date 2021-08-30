<template>
  <admin-layout>
    <v-card class="pa-5">
      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn outlined color="red lighten-2" to="/admin/services"
          >Bekor qilish</v-btn
        >
      </v-card-title>
      <v-form ref="oneItem" v-model="valid" lazy-validation>
        <v-row justify="center" align="center">
          <v-col cols="4">
            <v-file-input
              @change="setImage($event)"
              :rules="rules"
              label="Rasm"
            ></v-file-input>
            <!--  :rules="[required('Rasm')]" -->
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="user.firstname"
              :rules="[required('Ism')]"
              label="Ism"
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="user.lastname"
              :rules="[required('Familiya')]"
              label="Familiya"
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="user.email"
              :rules="[emailRules]"
              label="Email"
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="user.password"
              :rules="[required('Parol'), minLength('Parol', 8)]"
              counter
              label="Parol"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-select :items="['admin', 'user', 'moderator']" label="Foydalanuvchi turi" v-model="user.role"></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              block
              @click="create"
            >
              Qo'shish
            </v-btn>
          </v-col>
          <v-col>
            <v-btn block color="error" class="mr-4" @click="reset">
              Tozalash
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </admin-layout>
</template>

<script>
import adminLayout from "../../../components/adminLayout.vue";
import { validators } from "../../../helpers/validators";
import { createItem } from "../../../helpers/mixins/create";
export default {
  components: { adminLayout },
  data: () => ({
    user: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      photo: "",
      role: "",
    },
    rules: [
      (v) => !!v || "File is required",
      (v) => (v && v.size > 0) || "File is required",
    ],
  }),
  mixins: [validators,  createItem],
  methods: {
    setImage(e) {
      console.log(e);
      if (this.user.photo) {
        this.$axios.$delete(`/${this.user.photo._id}`);
      }
      // alert(this.path, this.pathWithAdmin);
      const form = new FormData();
      form.append("image", e);
      this.$axios
        .$post("/image/upload", form)
        .then((res) => {
          this.$toast.success("Rasm muvaffaqiyatli yuklandi!!!");
          this.user.photo = res.data._id;
        })
        .catch((err) => {
          console.log("Rasm yuklanmadi");
        });
    },
    create() {
      this.addData(this.user);
    },
  },
};
</script>