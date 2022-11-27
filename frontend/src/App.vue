<template>
  <v-app>
    <v-main>
      <v-container class="layout-width pa-4">
        <v-row>
          <v-col>
            <router-view/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.layout-width {
  min-width: 300px;
  max-width: 900px
}
</style>