<template>
  <v-container style="max-width: 500px">
    <v-text-field
      v-model="newTask"
      label="What are you working on?"
      solo
      @keydown.enter="create"
    >
      <template v-slot:append>
        <v-fade-transition>
          <v-icon
            v-if="newTask"
            @click="create"
          >
            mdi-plus-circle
          </v-icon>
        </v-fade-transition>
      </template>
    </v-text-field>

    <h2 class="text-h4 success--text pl-4">
      Tasks:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`tasks-${tasks.length}`">
          {{ tasks.length }}
        </span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-4"></v-divider>

    <v-row
      class="my-1"      
    >
      <strong class="mx-4 text--darken-2">
        To Do: {{ remainingTasks }}
      </strong>

      <v-spacer></v-spacer>
      <v-divider vertical></v-divider>
      
      <strong class="mx-4 info--text text--darken-2">
        In Progress: {{ inprogress }}
      </strong>
      
      <v-spacer></v-spacer>
      <v-divider vertical></v-divider>
      
      <strong class="mx-4 success--text text--darken-2">
        Completed: {{ completedTasks }}
      </strong>
      
      <v-spacer></v-spacer>
      
      <v-progress-circular
        :value="progress"
        class="mr-2"
      ></v-progress-circular>
    </v-row>

    <v-divider class="mb-4"></v-divider>

    <v-card v-if="tasks.length > 0">
      <v-slide-y-transition
        class="py-0"
        group
        tag="v-list"
      >
        <template v-for="(task, i) in tasks">
          <v-divider
            v-if="i !== 0"
            :key="`${i}-divider`"
          ></v-divider>

          <v-list-item :key="`${i}-${task.text}`">
            <v-list-item-action>
              <template>
                <div class="text-center"> 
                  <v-menu
                  bottom
                  :offset-y="offset"
                  color="white"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        :color="determineColor(task)"
                        dark
                        small
                      > {{ determineLabel(task) }} </v-btn>
                    </template>
                    <div class="d-flex flex-column">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        color="fff"
                        small
                        v-if="!task.newtask"
                        @click="task.newtask = true; task.done = false;"
                      >
                        To Do
                      </v-btn>
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        color="fff"
                        small
                        v-if="task.newtask && !task.done || !task.newtask && task.done"
                        @click="task.newtask = false; task.done = false"
                      >
                        In Progress
                      </v-btn>
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        color="fff"
                        small
                        v-if="!task.done"
                        @click="task.newtask = false; task.done = true"
                      >
                        Complete
                      </v-btn>
                    </div>
                  </v-menu>
                </div>
              </template>
            </v-list-item-action>

            <div
              :class="task.done && 'grey--text' || 'primary--text'"
              class="ml-4"
              v-text="task.text"
            ></div>

            <v-spacer></v-spacer>

            <v-scroll-x-transition>
              <v-icon
                v-if="task.done && task.newtask == false"
                color="success"
              >
                mdi-check
              </v-icon>
            </v-scroll-x-transition>
          </v-list-item>
        </template>
      </v-slide-y-transition>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      tasks: [
        {
          newtask: true,
          done: false,
          text: 'Foobar',
        },
        {
          newtask: true,
          done: false,
          text: 'Foobar gh',
        },
        {
          newtask: true,
          done: false,
          text: 'Foobar kdskfd',
        },
      ],
      newTask: null,
      offset: true,
      bgcolor: '',
    }),

    computed: {
      completedTasks () {
        return this.tasks.filter(task => task.done).length
      },
      progress () {
        return this.completedTasks / this.tasks.length * 100
      },
      remainingTasks () {
        return this.tasks.length - this.completedTasks
      },
      inprogress () {
        return this.tasks.filter(task => task.newtask == false && task.done == false).length
      }},

    methods: {
      create () {
        this.tasks.push({
          newtask: true,
          done: false,
          text: this.newTask,
        })
        this.newTask = null
      },
      determineColor (task) {
        let bgcolor = ''
        if (task.newtask == true && task.done == false) {
          return bgcolor = 'black'
        } else if (task.newtask == false && task.done == false) {
          return bgcolor = 'primary'
        } else if (task.newtask == false && task.done == true) {
          return bgcolor = 'success'
        }
      },  
      determineLabel (task) {
        let btnLabel = ''
        if (task.newtask == true && task.done == false) {
          return btnLabel = 'To Do'
        } else if (task.newtask == false && task.done == false) {
          return btnLabel = 'In Progress'
        } else if (task.newtask == false && task.done == true) {
          return btnLabel = 'Complete'
        }
      }}}
</script>