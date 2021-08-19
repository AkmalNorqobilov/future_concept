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
          <v-col cols="6">
            <v-text-field
              v-model="oneItem.name.uz"
              :rules="[required('Teg')]"
              label="Teg nomi(uz)"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="oneItem.name.ru"
              :rules="[required('Teg')]"
              label="Teg nomi(ru)"
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
import {updateItem}  from "../../../helpers/mixins/update";
export default {
  components: { adminLayout },
  mixins: [validators, updateItem],

};
</script>