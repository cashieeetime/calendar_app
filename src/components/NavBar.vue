<template>
    <v-card
    class="pa-12"
    color="indigo darken-2"
    height="1000"
    flat
    >
        <v-card
            elevation="12"
            width="75"
        >
            <v-navigation-drawer
            floating
            :mini-variant.sync="mini"
            permanent
            >
                <v-list
                    dense
                    rounded
                >
                    <v-list-item
                        v-for="item in items"
                        :key="item.title"
                        link
                        >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
        </v-card>
    </v-card>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Home', icon: 'mdi-home-city', link: "@/views/Dashboard.vue" },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
        ],
        mini: true,
      }
    },
  }
</script>