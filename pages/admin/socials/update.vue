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
        v-model="valid"
        v-if="oneItem !== null"
        lazy-validation
      >
         <v-row justify="center" align="center">
          <v-col cols="6">
            <v-file-input
              @change="setImage($event)"
              :rules="rules"
              :label="oneItem.image"
            ></v-file-input>
            <!--  :rules="[required('Rasm')]" -->
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="oneItem.link"
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
              @click="update"
            >
              Qo'shish
            </v-btn>
            <!-- <ckeditor -->
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

export default {
  data: () => ({
    rules: [
      (v) => !!v || "File is required",
      (v) => (v && v.size > 0) || "File is required",
    ],
  }),
  components: {
    adminLayout,
  },
  mixins: [validators, updateItem, ckeditor],
  methods: {
    setImage(e) {
      console.log(e);

      // alert(this.path, this.pathWithAdmin);
      const form = new FormData();
      form.append("image", e);
      console.log(this.oneItem);
      this.$axios
        .$put(`/image/update/${this.oneItem.image}`, form)
        .then((res) => {
            console.log(res.data);
          this.oneItem.image = res.data._id;
        })
        .catch((err) => {
          console.log("Rasm yuklanmadi");
        });
    },
  },
};
</script>