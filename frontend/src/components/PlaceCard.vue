<template>
  <v-hover v-slot="{ hover }">
    <v-card
      :elevation="hover ? 2 : 0"
      outlined
    >
      <v-card-title>{{ place.name }}</v-card-title>
      <v-card-subtitle>{{ place.address }}</v-card-subtitle>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IPlace from '../../../common/interfaces/IPlace';

@Component
export default class PlaceCard extends Vue {
  @Prop({ type: Object, required: true }) place!: IPlace;
}
</script>