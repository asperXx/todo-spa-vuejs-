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
      <input :id="task + id" type="checkbox" class="custom-checkbox" :checked="task.complete" disabled>
      <label :for="task + id" >{{ task.task }}</label>
      </li>
    </ul>
    <div class="buttons">
      <router-link :to="'/note/'+ note.id" tag="button">Редактировать</router-link>
      <button @click="$modal.show('deleteNoteModal'); idx = note.id">Удалить</button>
    </div>
    </div>
    </div>
    <p v-else>NONONONONO</p>
      <modal name="deleteNoteModal" :width="400" :height="90" :adaptive="true">
      <p>Вы уверены, что не хотите удалить заметку?</p>
      <a class="btn" @click="deleteNoteFunc">Да</a>
      <a class="btn" @click="$modal.hide('deleteNoteModal')">Нет</a>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      idx: null
    }
  },
  computed: {
    ...mapGetters(['notes'])
  },
  methods: {
    ...mapActions(['deleteNote']),
      deleteNoteFunc() {
      this.deleteNote({ id: this.idx });
      this.$modal.hide('deleteNoteModal')
    }
  }
}
</script>

<style lang="scss">
#home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>