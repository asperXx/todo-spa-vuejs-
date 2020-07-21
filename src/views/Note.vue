<template>
  <div id="note">
    <div class="cardNote">
      <h1>{{ note.title }}</h1>
      <a class="close btn" @click="$modal.show('undoEditModal')">
        <font-awesome-icon icon="trash-alt" size="lg" />
      </a>
      <ul class="taskList">
        <li v-for="(task, id) in note.tasksPoints" :key="id" class="taskPoint">
          <input :id="task + id" type="checkbox" class="custom-checkbox" />
          <label :for="task + id">
            <input class="editInput" type="text" :value="task" />
          </label>
          <button @click.prevent="tasksPoints.splice(id, 1)">
            <font-awesome-icon icon="trash-alt" size="lg" />
          </button>
        </li>
      </ul>
      <div class="buttons">
        <a class="btn" @click="saveEdit">Сохранить</a>
        <a class="btn" @click="$modal.show('addTaskModal')">
          <font-awesome-icon icon="plus" size="lg" />
        </a>
        <div>
          <a class="btn" name="undo">
            <font-awesome-icon icon="chevron-circle-left" size="lg" />
          </a>
          <a class="btn" name="redo">
            <font-awesome-icon icon="chevron-circle-right" size="lg" />
          </a>
        </div>
        <a class="btn" @click="$modal.show('deleteNoteModal')">
          <font-awesome-icon icon="trash-alt" size="lg" />
        </a>
      </div>
    </div>
    <modal name="addTaskModal" :width="400" :height="90" :adaptive="true">
      <input type="text" class="addTaskInput" v-model="newTask" />
      <a class="btn" @click="addTask">Add</a>
      <a class="btnClose" @click="$modal.hide('addTaskModal')">
        <font-awesome-icon icon="window-close" />
      </a>
    </modal>

    <modal name="undoEditModal" :width="400" :height="90" :adaptive="true">
      <p>Вы уверены, что не хотите сохранить изменения?</p>
      <a class="btn" @click="$router.push('/')">Да</a>
      <a class="btn" @click="$modal.hide('undoEditModal')">Нет</a>
    </modal>

        <modal name="deleteNoteModal" :width="400" :height="90" :adaptive="true">
      <p>Вы уверены, что не хотите удалить заметку?</p>
      <a class="btn" @click="deleteNoteFunc">Да</a>
      <a class="btn" @click="$modal.hide('deleteNoteModal')">Нет</a>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      tasksPoints: [],
      newTask: ""
    };
  },
  computed: {
    ...mapGetters(["noteById"]),
    note() {
      return this.noteById(+this.$route.params.id);
    }
  },
  methods: {
    ...mapActions(["updateNote", "deleteNote"]),
    saveEdit() {
      this.updateNote({ id: this.note.id, tasksPoints: this.tasksPoints });
      this.$router.push("/");
    },
    addTask() {
      if (this.newTask !== "") {
        this.tasksPoints.push(this.newTask);
        this.newTask = "";
        this.$modal.hide("addTaskModal");
      }
    },
    deleteNoteFunc() {
      this.deleteNote({ id: this.note.id });
      this.$router.push("/");
    }
  },

  created() {
    this.tasksPoints = this.noteById(+this.$route.params.id).tasksPoints;
  }
};
</script>

<style lang="scss">
#note {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
}

.editInput {
  width: 95%;
  font-size: 13px;
  padding: 6px 0 4px 10px;
  border: 1px solid #cecece;
  background: #f6f6f6;
  border-radius: 8px;
  outline: none;
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

.btnClose {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
