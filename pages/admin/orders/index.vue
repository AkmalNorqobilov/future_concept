<template>
  <admin-layout>
    <Delete
      @deleteRequest="deleteData()"
      @closeDelete="closeDelete"
      :isDelete="isDelete"
    />
    <v-row justify="center">
      <v-col>
        <v-card elevation="10">
          <v-card-title>
            Buyurtmalar
            <v-spacer></v-spacer>
            <v-row justify="end">
              <v-col cols="6">
                <v-text-field
                  outlined
                  dense
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Qidirish"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="2">
                <v-btn :to="`${getUri()}/create`" color="success"
                  >Qo'shish</v-btn
                >
              </v-col>
            </v-row>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="$store.state.tags.tags"
            :search="search"
          >
            <template v-slot:item="row">
              <tr>
                <td>{{ row.item.name.uz }}</td>
                <td class="text-right">
                  <v-btn
                    height="35"
                    width="35"
                    color="blue lighten-2"
                    elevation="0"
                    fab
                    small
                    :to="`${getUri()}/${row.item._id}`"
                    ><v-icon size="20" color="white">mdi-eye</v-icon></v-btn
                  >
                  <v-btn
                    height="35"
                    width="35"
                    color="green lighten-2"
                    elevation="0"
                    fab
                    small
                    :to="`${getUri()}/update?id=${row.item._id}`"
                    ><v-icon size="20" color="white">mdi-pencil</v-icon></v-btn
                  >
                  <v-btn
                    height="35"
                    width="35"
                    color="red lighten-2"
                    elevation="0"
                    fab
                    small
                    @click="openDelete(row.item._id)"
                    ><v-icon size="20" color="white"
                      >mdi-trash-can</v-icon
                    ></v-btn
                  >
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </admin-layout>
</template>

<script>
import adminLayout from "../../../components/adminLayout.vue";
import { deleteItem } from "../../../helpers/mixins/delete";
export default {
  middleware: "isAdmin",
  data:()=> ({
      headers: [
        {
          text: "Teg nomi",
          value: "name.uz",
        },
        { text: "", align: "right", sortable: false, value: "" },
      ],
  }),
  mixins: [deleteItem],
  methods: {
    deleteData() {
      this.deleteRequest('tags/DELETE_ONE');
    },
  },
  components: { adminLayout },
  beforeCreate() {
    this.$store.dispatch("tags/GET_ALL");
  },
};
</script>

