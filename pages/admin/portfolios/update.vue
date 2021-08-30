<template>
  <admin-layout>
    <v-card class="pa-5">
      <v-card-title>
        <v-spacer></v-spacer>

        <v-btn outlined color="red lighten-2" :to="pathWithAdmin"
          >Bekor qilish</v-btn
        >
      </v-card-title>
      <v-form
        ref="oneItem"
        v-if="oneItem !== null"
        v-model="valid"
        lazy-validation
      >
        <v-row justify="center" align="center">
          <v-col cols="12">
            <image-remover
              v-for="(image, index) in oneItem.images"
              :key="image._id"
              :path="image.path"
              @deleteImage="deleteImage(image, index)"
            />

            <image-remover
              v-for="(image, index) in imagesPath"
              :key="image._id"
              :path="image.path"
              @deleteImage="deleteImage(image, index)"
            />
          </v-col>
          <v-col cols="4">
            <v-file-input
              v-if="oneItem.images.length==0"
              @change="setImage($event)"
              :rules="rules"
              multiple
              accept="image/*"
              label="Rasmlar"
            ></v-file-input>
            <v-file-input
              v-else
              @change="setImage($event)"
              multiple
              accept="image/*"
              label="Rasmlar"
            ></v-file-input>
            
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              :items="$store.state.services.services"
              label="Xizmat turi"
              v-model="oneItem.services"
              item-text="name.uz"
              item-value="_id"
              :rules="[required('Xizmat turi')]"
              small-chips
              multiple
            ></v-autocomplete>
          </v-col>
          <v-col cols="4">
            <v-autocomplete
              v-model="oneItem.tags"
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
              v-model="oneItem.buildingName.uz"
              label="Qurilish haqida tavsif(uz)"
              :rules="[required('Qurilish haqidagi tavsif(uz)')]"
            />
          </v-col>
          <v-col cols="6">
            <!-- <p class="subtitle-1">Qurilish haqida tavsif(ru)</p> -->
            <v-text-field
              v-model="oneItem.buildingName.ru"
              label="Qurilish haqida tavsif(ru)"
              :rules="[required('Qurilish haqidagi tavsif(uz)')]"
            />
          </v-col>

          <v-col cols="12">
            <p class="subtitle-1">Tavsif(uz)</p>

            <ckeditor-nuxt
              v-model="oneItem.building.uz"
              :config="editorConfig"
            />
          </v-col>
          <v-col cols="12">
            <p class="subtitle-1">Tavsif(ru)</p>
            <ckeditor-nuxt
              v-model="oneItem.building.ru"
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
              @click="update"
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
import { updateItem } from "../../../helpers/mixins/update";
import { ckeditor } from "../../../helpers/ckeditor";
import ImageRemover from "../../../components/imageRemover.vue";

export default {
  data: () => ({
    isUpdating: false,
    autoUpdate: true,
    imagesPath: [],
    rules: [
      // (v) => !!v || console.log(v),
      (v) => {
        console.log(v, "vuetifyjs");
        return !!v || "Rasm bo'sh bo'lmasligi kerak!!!";
      },
    ],
  }),
  components: {
    adminLayout,
    ImageRemover,
  },
  mixins: [validators, updateItem, ckeditor],
  methods: {
    deleteImage(img, index) {
      this.$axios
        .$delete(`image/${img._id}`)
        .then((res) => {
          console.log(res);
          this.oneItem.images.splice(index, 1);
          this.$toast.success("Muvaffaqiyatli bajarildi!!!");
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error("Rasm o'chirishda xatolik sodir bo'ldi!!!");
        });
    },
    deleteImage1(img, index) {
      this.$axios
        .$delete(`image/${img._id}`)
        .then((res) => {
          console.log(res);
          this.imagesPath.splice(index, 1);
          this.$toast.success("Muvaffaqiyatli bajarildi!!!");
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error("Rasm o'chirishda xatolik sodir bo'ldi!!!");
        });
    },
    setImage(images) {
      // console.log(e);

      // alert(this.path, this.pathWithAdmin);
      for (const e of images) {
        const form = new FormData();
        form.append("image", e);
        this.$axios
          .$post("/image/upload", form)
          .then((res) => {
            this.oneItem.images = [...this.oneItem.images, res.data._id];
            this.imagesPath= [...this.imagesPath, res.data];
            this.$toast.success("Rasm muvaffaqiyatli yuklandi");
          })
          .catch((err) => {
            this.$toast.error("Rasm yuklanmadi!!!");
          });
      }
    },
  },
  beforeCreate() {
    this.$store.dispatch("services/GET_ALL");
    this.$store.dispatch("tags/GET_ALL");
  },
};
</script>