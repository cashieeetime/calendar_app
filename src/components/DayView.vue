<!-- UNUSED CODE -->

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-sheet height="300">
          <v-calendar
            color="primary"
            type="day"
          >
            <template v-slot:day-header="{ present }">
              <template
                v-if="present"
                class="text-center"
              > Today </template>
            </template>
            <template v-slot:interval="{ hour }">
              <div
                class="text-center"
              >  {{ hour }} o'clock  </div>
            </template>
          </v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DayView',
    data: () => ({}),
  }
</script>