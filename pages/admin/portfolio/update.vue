<template>
  <admin-layout>
    <v-card class="pa-5">
        <v-card-title>
            <v-spacer></v-spacer>
            <v-btn outlined color="red lighten-2" to="/admin/portfolio">Bekor qilish</v-btn>
        </v-card-title>
      <v-form ref="portfolio" v-model="valid" lazy-validation>
        <v-row justify="center" align="center">
          <v-col cols="6">
            <v-file-input v-model="portfolio.image" label="Rasm" :rules="[required('Rasm')]"></v-file-input>
          </v-col>
          <v-col cols="6">
            <v-select :items="items" label="Xizmat turi" v-model="portfolio.service" item-text="name.uz" item-value="_id" :rules="[required('Xizmat turi')]"></v-select>
          </v-col>
          <v-col cols="12">
            <p class="subtitle-1">Qurilish haqida tavsif(uz)</p>
            <tinymce
              id="buildingdescriptionuz"
              v-model="portfolio.building.uz"
            ></tinymce>
          </v-col>
          <v-col cols="12">
            <p class="subtitle-1">Qurilish haqida tavsif(ru)</p>
            <tinymce
              id="buildingdescriptionru"
              v-model="portfolio.building.ru"
            ></tinymce>
          </v-col>

          <v-col cols="12">
            <p class="subtitle-1">Tavsif(uz)</p>
            <tinymce
              id="descriptionuz"
              v-model="portfolio.description.uz"
            ></tinymce>
          </v-col>
          <v-col cols="12">
            <p class="subtitle-1">Tavsif(ru)</p>
            <tinymce
              id="descriptionru"
              v-model="portfolio.description.ru"
            ></tinymce>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              block
              @click="validate"
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
export default {
  components: { adminLayout },
  data: () => ({
    valid: false,
    portfolio: {
      building: {
        uz: "",
        ru: "",
      },
      image: null,
      description: {
        uz: "",
        ru: "",
      },
      service: "",
    },
    items: ["Foo", "Bar", "Fizz", "Buzz"],
    error: false,
  }),
  mixins: [validators],
  methods: {
    validate() {
      if(this.$refs.portfolio.validate()){
          this.$store.dispatch('portfolio/UPDATE_ONE', this.portfolio)
          .then(res=>{
              this.$router.push('/admin/portfolio')
          }).catch(error=>{
              this.error= true;
          })
      };
    },
    reset() {
      this.$refs.portfolio.reset();
    },
    resetValidation() {
      this.$refs.portfolio.resetValidation();
    },
  },
};
</script>