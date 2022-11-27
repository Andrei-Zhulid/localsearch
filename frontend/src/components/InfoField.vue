<template>
  <div>
    <div class="font-weight-medium">{{ title }}</div>
    <div class="ml-6 mb-4">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InfoField extends Vue {
  @Prop({ type: String, required: true }) title!: string;
}
</script>