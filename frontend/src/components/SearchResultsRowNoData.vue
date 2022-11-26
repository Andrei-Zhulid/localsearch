<template>
  <v-row>
    <SearchResultsColumn class="mx-4">
      Your search did not match any places.
    </SearchResultsColumn>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchResultsColumn from '@/components/SearchResultsColumn.vue';

@Component({ components: { SearchResultsColumn } })
export default class SearchResultsRowNoData extends Vue {}
</script>