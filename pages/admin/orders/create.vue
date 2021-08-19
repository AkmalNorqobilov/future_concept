<template>
    <admin-layout>
        <h1>hello</h1>
    </admin-layout>
</template>


<script>
import {validators} from "../../../helpers/validators";
import adminLayout from '../../../components/adminLayout.vue'
export default {
  components: { adminLayout },
  mixins: [
      validators
  ]
    
}
</script>