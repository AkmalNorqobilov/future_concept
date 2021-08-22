<template>
  <admin-layout>
    <v-card class="pa-5">
      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn outlined color="red lighten-2" to="/admin/portfolio"
          >Bekor qilish</v-btn
        >
      </v-card-title>
      <v-form ref="oneItem" v-model="valid" lazy-validation>
        <v-row justify="center" align="center">
          <v-col cols="4">
            <v-file-input
              @change="setImage($event)"
              :rules="rules"
              multiple
              accept="image/*"
              label="Rasmlar"
            ></v-file-input>
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              :items="$store.state.services.services"
              label="Xizmat turi"
              v-model="portfolio.services"
              item-text="name.uz"
              item-value="_id"
              :rules="[required('Xizmat turi')]"
              small-chips
              multiple
            ></v-autocomplete>
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              v-model="portfolio.tags"
              :items="$store.state.tags.tags"
              dense
              :rules="[required('Teglar')]"
              chips
              item-text="name.uz"
              item-value="_id"
              small-chips
              label="Teglar"
              multiple
            ></v-autocomplete>
          </v-col>
          <v-col cols="6">
            <!-- <p class="subtitle-1">Qurilish haqida tavsif(uz)</p> -->
            <v-text-field
              v-model="portfolio.buildingName.uz"
              label="Qurilish haqida tavsif(uz)"
              :rules="[required('Qurilish haqidagi tavsif(uz)')]"
            />
          </v-col>
          <v-col cols="6">
            <!-- <p class="subtitle-1">Qurilish haqida tavsif(ru)</p> -->
            <v-text-field
              v-model="portfolio.buildingName.ru"
              label="Qurilish haqida tavsif(ru)"
              :rules="[required('Qurilish haqidagi tavsif(uz)')]"
            />
          </v-col>

          <v-col cols="12">
            <p class="subtitle-1">Tavsif(uz)</p>

            <ckeditor-nuxt
              v-model="portfolio.building.uz"
              :config="editorConfig"
            />
          </v-col>
          <v-col cols="12">
            <p class="subtitle-1">Tavsif(ru)</p>
            <ckeditor-nuxt
              v-model="portfolio.building.ru"
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
import { ckeditor } from "../../../helpers/ckeditor";
import adminLayout from "../../../components/adminLayout.vue";
import { validators } from "../../../helpers/validators";
import { createItem } from "../../../helpers/mixins/create";
export default {
  components: { adminLayout },
  data: () => ({
    isUpdating: false,
    autoUpdate: true,

    valid: false,
    portfolio: {
      building: {
        uz: "",
        ru: "",
      },
      images: [],
      buildingName: {
        uz: "",
        ru: "",
      },
      service: [],
      tags: [],
    },
    error: false,
    rules: [
      // (v) => !!v || console.log(v),
      (v) => !!v || "Rasm bo'sh bo'lmasligi kerak!!!"
    ],
  }),
  mixins: [validators, ckeditor, createItem],

  methods: {
    setImage(images) {
      // console.log(e);

      // alert(this.path, this.pathWithAdmin);
      for (const e of images) {
        const form = new FormData();
        form.append("image", e);
        this.$axios
          .$post("/image/upload", form)
          .then((res) => {
            this.portfolio.images = [...this.portfolio.images, res.data._id];
            this.$toast.success("Rasm muvaffaqiyatli yuklandi");
          })
          .catch((err) => {
            this.$toast.error("Rasm yuklanmadi!!!");
          });
      }
    },
    create() {
      if (this.portfolio.building.uz.length == 0) {
        return this.$toast.error("Tavsif(Uz) bo'sh bo'lmasligi kerak!!!");
      }

      if (this.portfolio.building.ru.length == 0) {
        return this.$toast.error("Tavsif(Ru) bo'sh bo'lmasligi kerak!!!");
      }
      this.addData(this.portfolio);
    },
  },
  beforeCreate() {
    this.$store.dispatch("services/GET_ALL");
    this.$store.dispatch("tags/GET_ALL");
  },
};
</script>