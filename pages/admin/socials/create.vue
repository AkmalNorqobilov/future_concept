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
          <v-col cols="6">
            <v-file-input
              @change="setImage($event)"
              :rules="rules"
              label="Rasm"
            ></v-file-input>
            <!--  :rules="[required('Rasm')]" -->
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="social.link"
              :rules="[required('Link')]"
              label="Link"
            ></v-text-field>
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
import { createItem } from "../../../helpers/mixins/create";
export default {
  components: { adminLayout },
  data: () => ({
    social: {
      image: null,
      link: "",
    },
    rules: [
      (v) => !!v || "File is required",
      (v) => (v && v.size > 0) || "File is required",
    ],
  }),
  mixins: [validators, ckeditor, createItem],
  methods: {
    setImage(e) {
      console.log(e);

      // alert(this.path, this.pathWithAdmin);
      const form = new FormData();
      form.append("image", e);
      this.$axios.$post("/image/upload", form).then((res) => {
        this.social.image = res.data._id;
      }).catch(err=>{
        console.log("Rasm yuklanmadi");
      });
    },
    create() {
      this.addData(this.social);
    },
  },
};
</script>