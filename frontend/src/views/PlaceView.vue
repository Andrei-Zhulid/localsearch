<template>
  <div>
    <div v-if="place">
      <div class="text-h4 mb-4">{{ place.name }}</div>

      <v-container class="pa-0">
        <v-row>
          <v-col>
            <InfoField
              v-if="place.address"
              title="Address"
            >{{ place.address }}
            </InfoField>

            <InfoField title="Website">
              <a
                :href="place.website"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ place.website }}
              </a>
            </InfoField>

            <InfoField :title="phoneTitle">
              <a
                v-for="phone in place.phones"
                :key="phone"
                :href="`tel:${phone}`"
                class="d-block"
              >
                {{ phone }}
              </a>
            </InfoField>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <span v-else>Loading...</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IPlaceDetailed from '../../../common/interfaces/IPlaceDetailed';
import SearchService from '@/servises/SearchService';
import { AxiosError } from 'axios';
import { RouteName } from '@/router';
import InfoField from '@/components/InfoField.vue';

@Component({ components: { InfoField } })
export default class PlaceView extends Vue {
  @Prop({ type: String, required: true }) readonly id!: string;

  private place: IPlaceDetailed | null = null;

  private get phoneTitle() {
    return (this.place?.phones?.length ?? 0) > 1 ? 'Phones' : 'Phone'
  }

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
