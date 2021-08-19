<template>
  <admin-layout>
    <v-card class="pa-5">
      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn outlined color="red lighten-2" to="/admin/services"
          >Bekor qilish</v-btn
        >
      </v-card-title>
      <v-form ref="service" v-model="valid" lazy-validation>
        <v-row justify="center" align="center">
          <v-col cols="6">
            <v-text-field
              v-model="service.name.uz"
              :rules="[required('Xizmat nomi(uz)')]"
              label="Xizmat nomi(uz)"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="service.name.ru"
              :rules="[required('Xizmat nomi(ru)')]"
              label="Xizmat nomi(ru)"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <p class="subtitle-1">Xizmat tavsif(uz)</p>
            <ckeditor-nuxt
              v-model="service.description.uz"
              :config="editorConfig"
            />
          </v-col>
          <v-col cols="12">
            <p class="subtitle-1">Xizmat tavsif(ru)</p>
            <ckeditor-nuxt
              v-model="service.description.ru"
              :config="editorConfig"
            />
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
import { ckeditor } from "../../../helpers/ckeditor";
import { validators } from "../../../helpers/validators";

export default {
  components: { adminLayout },
  data: () => ({
    valid: false,
    service: {
      name: {
        uz: "",
        ru: "",
      },
      description: {
        uz: "",
        ru: "",
      },
    },
    pathWithAdmin: "",
    path: "",
  }),
  mixins: [validators, ckeditor],
  methods: {
    create() {
      if (this.$refs.service.validate()) {
        this.$store
          .dispatch(`${this.path}/CREATE_ONE`, this.service)
          .then((res) => {
            this.$store.commit("SUCCESS_TRUE");
            this.$router.push(this.pathWithAdmin);
          })
          .catch((error) => {
            this.$store.commit("ERROR_TRUE");
          });
      }
    },
    reset() {
      this.$refs.service.reset();
    },
    resetValidation() {
      this.$refs.service.resetValidation();
    },
    getPathWithAdmin() {
      let path = this.$route.path.split("/");
      this.path = path[2];
      this.pathWithAdmin = `/admin/${path[2]}`;
    },
  },
  created() {
    this.getPathWithAdmin();
  },
};
</script>