<template>
  <v-text-field
    :append-icon="'mdi-magnify'"
    hide-details
    outlined
    dense
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SearchInput extends Vue {}
</script>