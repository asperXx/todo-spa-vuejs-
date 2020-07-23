<template>
  <div id="note">
    <div class="cardNote">
      <h2 class="note__title">{{ note.title }}</h2>
      <ul class="note__taskList">
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
            <input class="editInput" type="text" @change="editTask" v-model="editTasksPoint[id]" />
          </label>
            <a @click.prevent="tasksPoints.splice(id, 1)" class="btn btn_delete_task" name="undo">
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
          <a class="btn btn-undo-redo" name="undo">
            <font-awesome-icon icon="chevron-circle-left" size="lg" />
          </a>
          <a class="btn btn-undo-redo" name="redo">
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

    saveEdit() {
      this.updateNote({ id: this.note.id, tasksPoints: this.tasksPoints });
      this.$router.push("/");
    },
    addTask() {
      if (this.newTask !== "") {
        this.tasksPoints.push({
          complete: false,
          task: this.newTask,
          id: this.tasksPoints.length,
        });
        this.newTask = "";
        this.$modal.hide("addTaskModal");
      }
    },
    deleteNoteFunc() {
      this.deleteNote({ id: this.note.id });
      this.$router.push("/");
    },
    onCompleteTask() {
      for (let i = 0; i < this.tasksPoints.length; i++) {
        this.tasksPoints[i].complete = this.complete[i];
      }
    },
    editTask() {
      for (let i = 0; i < this.tasksPoints.length; i++) {
        this.tasksPoints[i].task = this.editTasksPoint[i];
      }
    },
  },

  created() {
    this.tasksPoints = this.noteById(+this.$route.params.id).tasksPoints;
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

<style lang="scss">
#note {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
}

.addTaskInput {
  width: 95%;
  font-size: 13px;
  padding: 6px 0 4px 10px;
  margin: 10px;
  border: 1px solid #cecece;
  background: #f6f6f6;
  border-radius: 8px;
  outline: none;
}

.close {
  position: relative;
}
.addTaskModal{
  .container_modal{
    display: flex;
    flex-direction: column;
    label{
      margin-top: 5px;
      font-weight: 600;
      align-self: center;
      font-family:arial;
      color:#666666;
    }
    .btn{
      align-self: center;
    }
    .btnCloseModal{
      position: absolute;
      top: 0px;
      right: 0px;
      width: 30px;
      height: 20px;
      line-height: 20px;
    }
  }}

  .deleteNoteModal {
     .container_modal{
    display: flex;
    flex-direction: column;
    p {
       margin-top: 15px;
      font-weight: 600;
      align-self: center;
      font-family:arial;
      color:#666666;
    }
    div{
      display: flex;
      justify-content: space-around;
      margin-top: 15px;
    }
  }
  }

</style>
