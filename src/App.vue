<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/oscilloscope">Oscilloscope</router-link> |
    <router-link to="/history">history</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: black;
}

nav {
  padding: 20px;
  a {
    font-weight: bold;
    color: white;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
