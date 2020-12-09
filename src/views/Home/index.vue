<template>
  <div>
    <h1>home</h1>
    <ValidationProvider rules="positive" v-slot="v">
      <input type="text" name="" id="" v-model="value">
      <span>{{v.errors[0]}}</span>
    </ValidationProvider>
  </div>
</template>

<script>
import {extend} from 'vee-validate'

extend('positive',value => {
  return value >= 0;
})
export default {
  data() {
    return {
      value :''
    }
  },
};
</script>

<style></style>
