<template>
  <div
    class="mx-auto"
    style="min-width: 300px; max-width: 900px"
  >
    <SearchInput class="ma-3"/>

    <v-container>
      <v-row>
        <SearchResultsColumn>
          <v-skeleton-loader type="article"/>
        </SearchResultsColumn>
        <SearchResultsColumn>
          <v-skeleton-loader type="article"/>
        </SearchResultsColumn>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchInput from '@/components/SearchInput.vue';
import SearchResultsColumn from '@/components/SearchResultsColumn.vue';

@Component({ components: { SearchResultsColumn, SearchInput } })
export default class HomeView extends Vue {}
</script>
