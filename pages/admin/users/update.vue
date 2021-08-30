<template>
  <admin-layout>
    <v-card class="pa-5">
      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn outlined color="red lighten-2" to="/admin/services"
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
          <v-col cols="4" class="text-center">
             <image-remover
                :deleteButton="false"
              :path="oneItem.photo.path|| imagePath"
            ></image-remover>
          </v-col>
          <v-col cols="4">
            <v-file-input
              v-if="!oneItem.photo"
              @change="setImage($event)"
              :rules="rules"
              label="Rasm"
            ></v-file-input>
            <v-file-input
              v-else
              @change="setImage($event)"
              label="Rasm"
            ></v-file-input>
           
              <!-- @deleteImage="deleteImage(oneItem.photo)" -->
            <!--  :rules="[required('Rasm')]" -->
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="oneItem.firstname"
              :rules="[required('Ism')]"
              label="Ism"
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="oneItem.lastname"
              :rules="[required('Familiya')]"
              label="Familiya"
            ></v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="oneItem.email"
              :rules="[emailRules]"
              label="Email"
            ></v-text-field>
          </v-col>

          <!-- <v-col cols="4">
            <v-text-field
              v-model="oneItem.password"
              :rules="[required('Parol'), minLength('Parol', 8)]"
              counter
              label="Parol"
            ></v-text-field>
          </v-col> -->
          <v-col cols="4">
            <v-select
              :items="['admin', 'user', 'moderator']"
              label="Foydalanuvchi turi"
              v-model="oneItem.role"
            ></v-select>
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
import ImageRemover from "../../../components/imageRemover.vue";
export default {
  components: { adminLayout, ImageRemover },
  data: () => ({
    imagePath: "",
    rules: [
      (v) => !!v || "File is required",
      (v) => (v && v.size > 0) || "File is required",
    ],
  }),
  mixins: [validators, updateItem],
  async mounted() {
    this.$axios.$get(`/user/one/${this.$route.query.id}`).then((res) => {
      this.oneItem = res.data;
    });
  },
  methods: {
    deleteImage(img) {
      this.$axios
        .$delete(`image/${img._id}`)
        .then((res) => {
          console.log(res);
          this.oneItem.photo = "";
          this.$toast.success("Muvaffaqiyatli bajarildi!!!");
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error("Rasm o'chirishda xatolik sodir bo'ldi!!!");
        });
    },
    setImage(e) {
      console.log(e);
      if (this.oneItem.photo) {
        this.$axios.$delete(`/image/${this.oneItem.photo._id}`);
      }
      // alert(this.path, this.pathWithAdmin);
      const form = new FormData();
      form.append("image", e);
      this.$axios
        .$post("/image/upload", form)
        .then((res) => {
          this.$toast.success("Rasm muvaffaqiyatli yuklandi!!!");
          this.oneItem.photo = res.data._id;
          this.imagePath=res.data.path;
        })
        .catch((err) => {
          console.log("Rasm yuklanmadi");
        });
    },
  },
};
</script>