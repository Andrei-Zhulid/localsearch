<template>
  <div
    class="mx-auto"
    style="min-width: 300px; max-width: 900px"
  >
    <SearchInput class="ma-3"/>

    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-skeleton-loader type="article"/>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-skeleton-loader type="article"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchInput from '@/components/SearchInput.vue';

@Component({ components: { SearchInput } })
export default class HomeView extends Vue {}
</script>
