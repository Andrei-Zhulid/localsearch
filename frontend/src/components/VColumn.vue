<template>
  <v-col
    cols="12"
    sm="6"
  >
    <slot/>
  </v-col>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class VColumn extends Vue {}
</script>