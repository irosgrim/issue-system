<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">reporter</router-link> |
      <router-link to="/about">admin</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '@/styles/main.scss';
</style>
