<template>
  <div id="home">
    <h1>Список заметок</h1>
    <div v-if="notes.length">
    <div 
    v-for="(note,id) in notes"
    :key="id"
    class="cardNote"
    >{{note.title}}
    
    <ul class="taskList">
      <li 
      v-for="(task, id) in note.tasksPoints"
      :key="id">
      <input :id="task + id" type="checkbox" class="custom-checkbox" disabled>
      <label :for="task + id" >{{ task }}</label>
      </li>
    </ul>
    <div class="buttons">
      <router-link :to="'/note/'+ note.id" tag="button">Редактировать</router-link>
      <button>Удалить</button>
    </div>
    </div>
    </div>
    <p v-else>NONONONONO</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'



export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['notes'])
  },
}
</script>

<style lang="scss">
#home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>