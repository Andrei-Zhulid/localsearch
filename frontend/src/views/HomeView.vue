<template>
  <div
    class="mx-auto"
    style="min-width: 300px; max-width: 900px"
  >
    <SearchInput class="ma-3"/>

    <v-container>
      <v-row v-show="!loading && places?.length > 0">
        <SearchResultsColumn
          v-for="place in places"
          :key="place.id"
        >
          <PlaceCard :place="place"/>
        </SearchResultsColumn>
      </v-row>
      <v-row v-show="!loading && places?.length === 0">
        <SearchResultsColumn class="mx-4">
          Your search did not match any places.
        </SearchResultsColumn>
      </v-row>
      <SearchResultsLoaderRow v-show="loading"/>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchInput from '@/components/SearchInput.vue';
import SearchResultsLoaderRow from '@/components/SearchResultsLoaderRow.vue';
import IPlace from '../../../common/interfaces/IPlace';
import SearchService from '@/servises/SearchService';
import SearchResultsColumn from '@/components/SearchResultsColumn.vue';
import PlaceCard from '@/components/PlaceCard.vue';

@Component({ components: { PlaceCard, SearchResultsColumn, SearchResultsLoaderRow, SearchInput } })
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
