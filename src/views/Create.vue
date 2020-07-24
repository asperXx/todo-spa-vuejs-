<template>
  <div id="create">
    <form>
      <h1>Создать задачу</h1>
      <label for="title">Название заметки</label>
      <input type="text" class="editInput" name="title" v-model="title" />

      <label for="tasks">Список задач</label>
      <div class="tasks">
        <input type="text" class="editInput" name="tasks" v-model="newTask" />
        <a class="btn btn_add_task" @click.prevent="addTask"><font-awesome-icon icon="plus" size="lg" /></a>
      </div>

      <div v-for="(task, id) in tasksPoints" :key="id">
        <div class="taskCard">
          {{ task.task }}
          <a @click.prevent="tasksPoints.splice(id, 1)" class="btn btn_delete_task" name="undo">
            <font-awesome-icon icon="trash-alt" class="trash-alt" />
            </a>
        </div>
      </div>
      <a class="btn" @click.prevent="submitHandler">Сохранить</a>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      title: '',
      tasksPoints: [],
      newTask: "",
      taskId: 0
    };
  },
  methods: {
    ...mapActions(['createNote']),
    // Добавление задания
    addTask() {
      if (this.newTask !== ''){
        this.tasksPoints.push({'complete': false,'task': this.newTask, 'id': this.taskId })
        this.taskId++
        this.newTask = ""
      } 
    },
    // Создание заметки
    submitHandler() {
      if (this.title !== '' && this.tasksPoints !== [])
      {const note = {
        title: this.title,
        tasksPoints: this.tasksPoints,
        id: Date.now()
      }
      this.createNote(note)
      this.$router.push('/')}
    }
  },
};
</script>

