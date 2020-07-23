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
    addTask() {
      if (this.newTask !== ''){
        this.tasksPoints.push({'complete': false,'task': this.newTask, 'id': this.taskId })
        this.taskId++
        this.newTask = ""
        console.log(this.tasksPoints)
      } 
    },
    submitHandler() {

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

<style lang="scss">
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
  .btn {
    align-self: center;
  }
  label {
    margin: 5px 0;
    align-self: center;
    font-weight: 600;
  }
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
  margin:5px 0;
}

.tasks .editInput {
  width: 80%;
}


</style>
