<template>
  <div id="note">
    <div class="cardNote">
      <h2 class="note__title">{{ note.title }}</h2>
      <ul class="note__taskList" @change="addEventHistory">
        <li v-for="(task, id) in note.tasksPoints" :key="id" class="note__taskPoint">
          <input
            :id="task.id"
            type="checkbox"
            @change="onCompleteTask"
            v-model="complete[id]"
            class="custom-checkbox"
            :checked="task.complete"
          />
          <label :for="task.id">
            <input class="editInput" type="text" @blur="editTask" v-model="editTasksPoint[id]" />
          </label>
          <a @click.prevent="deleteTasksPoint(task.id)" class="btn btn_delete_task" name="undo">
            <font-awesome-icon icon="trash-alt" class="trash-alt" />
          </a>
        </li>
      </ul>
      <div class="note__buttons">
        <a class="btn" @click="saveEdit">Сохранить</a>
        <a class="btn" @click="$modal.show('addTaskModal')">
          <font-awesome-icon icon="plus" size="lg" />
        </a>
        <div>
          <a class="btn btn-undo-redo" name="undo" @click="undoEdit">
            <font-awesome-icon icon="chevron-circle-left" size="lg" />
          </a>
          <a class="btn btn-undo-redo" name="redo" @click="redoEdit">
            <font-awesome-icon icon="chevron-circle-right" size="lg" />
          </a>
        </div>
        <a class="btn" @click="$modal.show('deleteNoteModal')">
          <font-awesome-icon icon="trash-alt" size="lg" />
        </a>
      </div>
    </div>

    <!-- Модальное окно добавления задания -->
    <modal class="addTaskModal" name="addTaskModal" :width="400" :height="130" :adaptive="true">
      <div class="container_modal">
        <label for="addTaskInput">Новое задание</label>
        <input id="addTaskInput" type="text" class="addTaskInput" v-model="newTask" />
        <a class="btn" @click="addTask">Add</a>
        <a class="btn btnCloseModal" @click="$modal.hide('addTaskModal')">
          <font-awesome-icon icon="times" />
        </a>
      </div>
    </modal>
    <!-- Модальное окно удаления заметки -->
    <modal
      class="deleteNoteModal"
      name="deleteNoteModal"
      :width="400"
      :height="120"
      :adaptive="true"
    >
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
      tasksPoints: [],
      newTask: "",
      complete: [],
      editTasksPoint: [],
    };
  },
  computed: {
    ...mapGetters(["noteById"]),
    note() {
      return this.noteById(+this.$route.params.id);
    },
  },
  methods: {
    ...mapActions(["updateNote", "deleteNote"]),
    // Сохранение заметки
    saveEdit() {
      this.updateNote({ id: this.note.id, tasksPoints: this.tasksPoints });
      this.$router.push("/");
    },
    // Добавление задания
    addTask() {
      if (this.newTask !== "") {
        this.editTasksPoint.push(this.newTask);
        this.tasksPoints.push({
          complete: false,
          task: this.newTask,
          id: this.tasksPoints.length,
        });
        this.newTask = "";
        this.$modal.hide("addTaskModal");
      }
    },
    // Удаление заметки
    deleteNoteFunc() {
      this.deleteNote({ id: this.note.id });
      this.$router.push("/");
    },
    //Отслеживание выполнения задания(checkbox)
    onCompleteTask() {
      for (let i = 0; i < this.tasksPoints.length; i++) {
        this.tasksPoints[i].complete = this.complete[i];
      }
    },
    //Отслеживание изменения заданий
    editTask() {
      for (let i = 0; i < this.tasksPoints.length; i++) {
        this.tasksPoints[i].task = this.editTasksPoint[i];
      }
    },

    deleteTasksPoint(id) {
      this.tasksPoints.splice(id, 1);
      // пересчет id после удаления задания
      for (let i = 0; i < this.tasksPoints.length; i++) {
        this.tasksPoints[i].id = i;
      }
    },
  },

  created() {
    this.tasksPoints = this.noteById(+this.$route.params.id).tasksPoints;
    // this.history.push(this.tasksPoints)
    console.log(this.history);
    // Запись во временное хранилище(checked task)
    for (let i = 0; i < this.tasksPoints.length; i++) {
      this.complete.push(this.tasksPoints[i].complete);
    }
    // Запись во временное хранилище(task)
    for (let i = 0; i < this.tasksPoints.length; i++) {
      this.editTasksPoint.push(this.tasksPoints[i].task);
    }
  },
};
</script>
