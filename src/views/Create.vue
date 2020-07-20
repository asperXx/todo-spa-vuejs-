<template>
  <div id="create">
    <form>
      <h1>Создать задачу</h1>
      <label for="title">Название заметки</label>
      <input type="text" name="title" v-model="title" />

      <label for="tasks">Список задач</label>
      <div class="tasks">
        <input type="text" name="tasks" v-model="taskInput" />
        <button type="button" @click.prevent="addTask"><font-awesome-icon icon="plus" size="2x" /></button>
      </div>

      <div v-for="(task, id) in tasksPoints" :key="id">
        <div class="taskCard">
          {{ task }}
          <button @click.prevent="tasksPoints.splice(id, 1)" class="deleteBtn">
            <font-awesome-icon icon="trash-alt" size="2x" />
          </button>
        </div>
      </div>
      <button @click.prevent="submitHeandler">Сохранить</button>
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
      taskInput: "",
    };
  },
  methods: {
    ...mapActions(['createNote']),
    addTask() {
      if (this.taskInput !== ''){
      this.tasksPoints.push(this.taskInput);
      this.taskInput = "";
      
      } 
    },
    submitHeandler() {

      const note = {
        title: this.title,
        tasksPoints: this.tasksPoints,
        id: Date.now()
      }
      this.createNote(note)
      this.$router.push('/')
    }
  },
};
</script>

<style>
#create {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#create input {
  padding: 10px;
  margin: 15px 0px;
}
.taskCard {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  padding: 15px 30px;
  word-break: break-all;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.deleteBtn {
  width: 40px;
  height: 40px;
}
</style>
