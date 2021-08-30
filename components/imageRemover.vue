<template>
  <v-card 
      height="60"
      width="150"
      v-if="path"
      class="d-inline-block mx-1">
    <v-img
      :src="$store.state.uploads + path"
      contain
    >
    </v-img>
      <v-btn v-if="deleteButton" @click="$emit('deleteImage')" fab x-small absolute class="imageRemoverButton"><v-icon>mdi-close</v-icon></v-btn>
  </v-card>
</template>

<script>
export default {
  props: {
    path: String,
    deleteButton:{
      type: Boolean,
      default: true
    }
  },
};
</script>

<style>
.imageRemoverButton{
    top: -10px;
    right: -10px;
    z-index: 1;
}
</style>