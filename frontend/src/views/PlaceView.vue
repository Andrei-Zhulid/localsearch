<template>
  <div>
    <span v-if="place">{{ place.name }}</span>
    <span v-else>Loading...</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IPlaceDetailed from '../../../common/interfaces/IPlaceDetailed';
import SearchService from '@/servises/SearchService';
import { AxiosError } from 'axios';
import { RouteName } from '@/router';

@Component
export default class PlaceView extends Vue {
  @Prop({ type: String, required: true }) readonly id!: string;

  private place: IPlaceDetailed | null = null;

  // noinspection JSUnusedLocalSymbols
  private async created() {
    try {
      this.place = await SearchService.searchById(this.id);
    } catch (error) {
      if ((error as AxiosError)?.code === AxiosError.ERR_BAD_REQUEST)
        await this.$router.push({ name: RouteName.NotFound });
      else
        console.log(error);
    }
  }
}
</script>
