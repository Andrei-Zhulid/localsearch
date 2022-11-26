<template>
  <v-text-field
    v-model="query"
    :append-icon="'mdi-magnify'"
    hide-details
    outlined
    dense
    @keydown.enter="search"
    @click:append="search"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SearchInput extends Vue {
  private query = '';

  private search(): void {
    this.$emit('search', this.query);
  }
}
</script>