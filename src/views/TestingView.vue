<template>
    <div class="d-flex flex-column mb-6">
        <v-container>
            <event-card/>
        </v-container>

        <v-container>
            <drag-drop-calendar/>
        </v-container>
        
        <v-container>
            <nav-bar/>
        </v-container>
    </div>
</template>
  
<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import DragDropCalendar from '@/components/DragDropCalendar.vue'
import NavBar from '@/components/NavBar.vue'

export default {
name: 'DashboardView',
components: {
    EventCard,
    DragDropCalendar,
    NavBar
    }}
</script>
  