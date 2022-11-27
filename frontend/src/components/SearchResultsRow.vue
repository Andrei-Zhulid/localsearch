<template>
  <v-row>
    <VColumn
      v-for="item in items"
      :key="item.id"
    >
      <PlaceCard :place="item"/>
    </VColumn>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VColumn from '@/components/VColumn.vue';
import PlaceCard from '@/components/PlaceCard.vue';
import IPlace from '../../../common/interfaces/IPlace';

@Component({ components: { PlaceCard, VColumn } })
export default class SearchResultsRow extends Vue {
  @Prop({ type: Array, required: true }) items!: IPlace[];
}
</script>