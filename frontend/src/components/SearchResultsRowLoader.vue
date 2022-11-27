<template>
  <v-row>
    <VColumn>
      <v-skeleton-loader type="article"/>
    </VColumn>
    <VColumn>
      <v-skeleton-loader type="article"/>
    </VColumn>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VColumn from '@/components/VColumn.vue';

@Component({ components: { VColumn } })
export default class SearchResultsRowLoader extends Vue {}
</script>