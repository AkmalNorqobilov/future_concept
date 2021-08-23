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

              <!-- <v-col cols="2">
                <v-btn :to="`${getUri()}/create`" color="success"
                  >Qo'shish</v-btn
                >
              </v-col> -->
            </v-row>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="$store.state.orders.orders"
            :search="search"
          >
            <template v-slot:item="row">
              <tr>
                <td class="py-1">
                  {{ row.item.firstname + " " + row.item.lastname }}
                </td>

                <td class="py-1">
                  {{ row.item.phoneNumber }}
                </td>
                <td>
                  {{ dateformat(row.item.createdAt) }}
                </td>
                <td>
                  <span v-if="row.item.status == -1">
                    <v-btn color="error" text>Bajarilmagan</v-btn>
                  </span>

                  <span v-if="row.item.status == 0">
                    <v-btn color="info" text>Bajarilyapti</v-btn>
                  </span>

                  <span v-if="row.item.status == 1">
                    <v-btn color="success" text>Bajarildi</v-btn>
                  </span>
                </td>

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
                  <v-menu transition="fab-transition">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        height="35"
                        width="35"
                        color="green lighten-2"
                        elevation="0"
                        fab
                        small
                        v-bind="attrs"
                        v-on="on"
                        ><v-icon size="20" color="white"
                          >mdi-pencil</v-icon
                        ></v-btn
                      >
                    </template>
                    <v-list >
                      <v-list-item-group v-model="status" color="blue">
                        <v-list-item
                          v-for="(n, index) in [
                            'Bajarilmagan',
                            'Bajarilyapti',
                            'Bajarildi',
                          ]"
                          :key="n"
                        >
                          <v-list-item-title
                            @click="changeStatus(row.item._id, index - 1)"
                            v-text="n"
                          ></v-list-item-title>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-menu>
                  <!-- <v-btn
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
                  > -->
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
import DateFormat from "dateformat";
export default {
  middleware: "isAdmin",
  data: () => ({
    status: "",
    oneItem: {
      _id: "",
      status: "",
    },
    headers: [
      {
        text: "FIO",
        value: "firstname",
      },
      {
        text: "Telefon nomer",
        value: "phone",
      },
      {
        text: "Saqlangan sanasi",
        value: "createdAt",
      },
      {
        text: "Holati",
        value: "status",
      },
      // {
      //   text: "Link",
      //    value: "link"
      // },
      { text: "", align: "right", sortable: false, value: "" },
    ],
  }),
  mixins: [deleteItem],
  methods: {
    changeStatus(_id, index) {
      console.log(_id, index);
      this.$axios.$patch(`order/update/${_id}/${index}`).then((res) => {
        this.$store.dispatch("orders/GET_ALL");
        this.$toast.success("Muvaffaqiyatli yakunlandi!!!");
      });
    },
    dateformat(date) {
      let changedDate = DateFormat(date, "isoDate");
      changedDate = changedDate.split("-");
      changedDate.reverse();
      changedDate = changedDate.join(".");
      return changedDate;
    },
    setOne(data) {
      (this.oneItem._id = data._id), (this.oneItem.status = data.status);
    },
  },
  components: { adminLayout },
  beforeCreate() {
    this.$store
      .dispatch("orders/GET_ALL")
      .then(() => {
        console.log("ishlamadi");
      })
      .catch(() => {
        this.$toast.error("Nimadir xato ketdi!!!");
      });
  },
};
</script>

