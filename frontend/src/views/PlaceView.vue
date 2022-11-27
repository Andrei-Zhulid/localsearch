<template>
  <div>
    <div v-if="place">
      <div class="text-h4 mb-4">{{ place.name }}</div>

      <v-container class="pa-0">
        <v-row>
          <VColumn>
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
          </VColumn>

          <VColumn class="mt-n6 mt-sm-0">
            <InfoField title="Opening Hours">
              <v-row
                v-for="[intervals, days] in openingHours"
                :key="intervals"
                dense
              >
                <v-col class="text-capitalize">{{ days }}</v-col>
                <v-col class="text-right">
                  <div
                    v-for="interval in intervals.split(',')"
                    :key="interval"
                  >
                    {{ interval }}
                  </div>
                </v-col>
              </v-row>
            </InfoField>
          </VColumn>
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
import VColumn from '@/components/VColumn.vue';
import OpeningHoursHelper from '@/helpers/OpeningHoursHelper';

@Component({ components: { VColumn, InfoField } })
export default class PlaceView extends Vue {
  @Prop({ type: String, required: true }) readonly id!: string;

  private place: IPlaceDetailed | null = null;

  private get phoneTitle() {
    return (this.place?.phones?.length ?? 0) > 1 ? 'Phones' : 'Phone'
  }

  private get openingHours() {
    return OpeningHoursHelper.groupByTime(this.place?.openingHours!);
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
