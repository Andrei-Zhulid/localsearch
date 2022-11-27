<template>
  <v-row>
    <VColumn class="mx-4">
      Your search did not match any places.
    </VColumn>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VColumn from '@/components/VColumn.vue';

@Component({ components: { VColumn } })
export default class SearchResultsRowNoData extends Vue {}
</script>