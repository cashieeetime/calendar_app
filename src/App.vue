<template>
  <div id="calendar_demo">
    <v-app>
      <v-main>
        <nav>
          <router-link to="/">Dashboard</router-link> | 
          <router-link to="/calendar">Calendar</router-link> <!-- | 
          <router-link to="/testing">Testing</router-link> -->
        </nav>
        <router-view/>
      </v-main>
    </v-app>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'App',
  components: {}
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.navbar {
  position: left;
}
</style>