<template>
  <v-row>
    <SearchResultsColumn>
      <v-skeleton-loader type="article"/>
    </SearchResultsColumn>
    <SearchResultsColumn>
      <v-skeleton-loader type="article"/>
    </SearchResultsColumn>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchResultsColumn from '@/components/SearchResultsColumn.vue';

@Component({ components: { SearchResultsColumn } })
export default class SearchResultsLoaderRow extends Vue {}
</script>