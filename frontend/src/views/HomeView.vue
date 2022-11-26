<template>
  <div
    class="mx-auto"
    style="min-width: 300px; max-width: 900px"
  >
    <SearchInput
      class="ma-3"
      @search="search"
    />

    <v-container>
      <SearchResultsRow
        v-show="!loading && places?.length > 0"
        :items="places"
      />
      <SearchResultsRowNoData v-show="!loading && places?.length === 0"/>
      <SearchResultsRowLoader v-show="loading"/>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchInput from '@/components/SearchInput.vue';
import SearchResultsRowLoader from '@/components/SearchResultsRowLoader.vue';
import IPlace from '../../../common/interfaces/IPlace';
import SearchService from '@/servises/SearchService';
import SearchResultsRowNoData from '@/components/SearchResultsRowNoData.vue';
import SearchResultsRow from '@/components/SearchResultsRow.vue';

@Component({ components: { SearchResultsRow, SearchResultsRowNoData, SearchResultsRowLoader, SearchInput } })
export default class HomeView extends Vue {
  private places: IPlace[] = [];
  private loading = false;

  private async search(query?: string) {
    try {
      this.loading = true;
      this.places = await SearchService.search(query);
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  async created() {
    await this.search();
  }
}
</script>
