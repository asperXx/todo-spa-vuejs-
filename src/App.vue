<template>
  <div id="app">
    <div id="nav">
      <font-awesome-icon icon="dragon" :style="{ color: 'white' }" size="2x"/>
      <ul class="nav-area">
        <router-link to="/"><li><a>Список заметок</a></li></router-link>
        <router-link to="/create"><li><a>Создать заметку</a></li></router-link>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  #nav {
    background-color: #039BE5; 
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 0px 0px 5px;
    font-weight: 500;
    font-size: 16px;
  }
  .nav-area {
    list-style: none;
    
    li{
      padding: 15px 15px;
      margin: 0px 0px ;
      display: inline-block;
      text-transform: uppercase;
      height: 100%;
      color: #fff;
      a {
        text-decoration: none;
      }
    }
    li:hover {
      background-color: #10affc;
      color: #f3f3f3
    }
  }

</style>
