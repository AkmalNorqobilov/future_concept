<template>
  <v-row justify="center">
    <v-dialog v-model="isDelete" max-width="400">
      <v-card height="150">
        <v-card-title class="text-h5 text-center"> Ishonchingiz komilmi? </v-card-title>

        <v-card-text> </v-card-text>

        <v-card-actions>
          <v-row justify="space-between" align="center">
            <v-col cols="6">
              <v-btn width="150" color="silver" class="otmena" @click="$emit('closeDelete')"
                >Bekor qilish</v-btn
              >
            </v-col>
            <v-col cols="6">
              <v-btn width="150" class="red ml-5 white--text" @click="$emit('deleteRequest')"
                >O'chirish</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    isDelete: {
      type: Boolean,
    },
  },
};
</script>
