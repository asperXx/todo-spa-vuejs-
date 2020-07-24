<template>
  <div id="home">
    <h1>Список заметок</h1>
    <div v-if="notes.length">
      <div v-for="(note,id) in notes" :key="id" class="cardNote">
        <h2 class="note__title">{{note.title}}</h2>
        <ul class="note__taskList">
          <li v-for="(task, id) in note.tasksPoints" :key="id" class="note__taskPoint">
            <input
              :id="task + id"
              type="checkbox"
              class="custom-checkbox"
              :checked="task.complete"
              disabled
            />
            <label :for="task + id">{{ task.task }}</label>
          </li>
        </ul>
        <div class="note__buttons">
          <router-link :to="'/note/'+ note.id" tag="button" class="btn">Редактировать</router-link>
          <button @click="$modal.show('deleteNoteModal'); idx = note.id" class="btn btn-delete">Удалить</button>
        </div>
      </div>
    </div>
    <p v-else>NONONONONO</p>
    <modal class="deleteNoteModal" name="deleteNoteModal" :width="400" :height="120" :adaptive="true">
      <div class="container_modal">
      <p>Вы уверены, что хотите удалить заметку?</p>
      <div>
        <a class="btn" @click="deleteNoteFunc">Да</a>
        <a class="btn" @click="$modal.hide('deleteNoteModal')">Нет</a>
      </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      idx: null,
    };
  },
  computed: {
    ...mapGetters(["notes"]),
  },
  methods: {
    ...mapActions(["deleteNote"]),
    // Удаление заметки
    deleteNoteFunc() {
      this.deleteNote({ id: this.idx });
      this.$modal.hide("deleteNoteModal");
    },
  },
};
</script>
