<template>
  <v-row>
    <SearchResultsColumn
      v-for="item in items"
      :key="item.id"
    >
      <PlaceCard :place="item"/>
    </SearchResultsColumn>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import SearchResultsColumn from '@/components/SearchResultsColumn.vue';
import PlaceCard from '@/components/PlaceCard.vue';
import IPlace from '../../../common/interfaces/IPlace';

@Component({ components: { PlaceCard, SearchResultsColumn } })
export default class SearchResultsRow extends Vue {
  @Prop({ type: Array, required: true }) items!: IPlace[];
}
</script>