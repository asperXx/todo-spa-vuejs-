<template>
  <div id="app">
    <div id="nav">
      <font-awesome-icon icon="dragon" :style="{ color: 'white' }" size="2x" />
      <ul class="nav-area">
        <li><router-link to="/"
          ><a>Список заметок</a></router-link
        ></li>
        <li><router-link to="/create"
          ><a>Создать заметку</a></router-link
        ></li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
