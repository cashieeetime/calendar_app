<template>
    <div class="home">
        <v-col
        cols="10"
        sm="5"
        md="12"
        >
            <v-text-field
            label="Title"
            standard
            clearable
            clear-icon="mdi-close-circle"
            v-model="title"
            ></v-text-field>
            <v-row>
            <v-menu
            ref="menu"
            v-model="StartDateMenu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    v-model="startdate"
                    label="Start Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="selectStartDate"
                    no-title
                    scrollable
                >
                    <v-spacer></v-spacer>
                    <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                    >
                    Cancel
                    </v-btn>
                    <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(date)"
                    >
                    OK
                    </v-btn>
                </v-date-picker>
            </v-menu>
            <v-menu
                ref="menu"
                v-model="StartTimeMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="StartTime"
                        label="Start Time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                </template>
                <v-time-picker
                    ampm-in-title
                    format="ampm"
                    v-model="SelectStartTime"
                >
                    <v-spacer></v-spacer>
                    <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                    >
                    Cancel
                    </v-btn>
                    <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(date)"
                    >
                    OK
                    </v-btn>
                </v-time-picker>
            </v-menu>
            <v-menu
            ref="menu"
            v-model="EndDateMenu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    v-model="enddate"
                    label="End Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker
                    v-model="selectEndDate"
                    no-title
                    scrollable
                >
                    <v-spacer></v-spacer>
                    <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                    >
                    Cancel
                    </v-btn>
                    <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(date)"
                    >
                    OK
                    </v-btn>
                </v-date-picker>
            </v-menu>
            <v-menu
                ref="menu"
                v-model="EndTimeMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="endtime"
                        label="End Time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                </template>
                <v-time-picker
                    ampm-in-title
                    format="ampm"
                    v-model="SelectEndTime"
                >
                    <v-spacer></v-spacer>
                    <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                    >
                    Cancel
                    </v-btn>
                    <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(date)"
                    >
                    OK
                    </v-btn>
                </v-time-picker>
            </v-menu>
            </v-row>
            <v-textarea
            name="input-7-4"
            label="Description"
            clearable
            clear-icon="mdi-close-circle"
            auto-grow
            v-model="description"
            ></v-textarea>
        </v-col>
    </div>
</template>
  
<script>
    export default {
    name: 'DashboardView',
    data() {
        return {
          title: "",
          StartDateMenu: false,
          startdate: null,
          selectStartDate: false,
          StartTimeMenu: false,
          StartTime: null,
          SelectStartTime: null,
          EndDateMenu: false,
          enddate: null,
          selectEndDate: false,
          EndTimeMenu: false,
          endtime: null,
          SelectEndTime: null,
          description: "",
        }}}
</script>