<template>
  <div id="note">
    <div class="cardNote">
      <h1>{{ note.title }}</h1>
      <ul class="taskList">
        <li v-for="(task, id) in note.tasksPoints" :key="id" class="taskPoint">
          <input :id="task + id" type="checkbox" class="custom-checkbox" />
          <label :for="task + id"><input class="editInput" type="text" :value="task"></label>
        </li>
      </ul>
    <div class="buttons">
        <button>Сохранить</button>
        <button><font-awesome-icon icon="undo" size="lg" /></button>
        <button><font-awesome-icon icon="trash-alt" size="lg" /></button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    note() {
      return this.$store.getters.noteById(+this.$route.params.id);
    },
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
.cardNote {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  padding: 15px 30px;
  margin-top: 20px;
  word-break: break-all;
  max-width: 900px;
  min-width: 700px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
}
.editInput {
    width: 100%;
	font-size: 13px;
	padding: 6px 0 4px 10px;
	border: 1px solid #cecece;
	background: #F6F6f6;
	border-radius: 8px;
    outline: none;
}

</style>
