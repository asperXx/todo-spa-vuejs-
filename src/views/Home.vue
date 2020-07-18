<template>
  <div id="home">
    <h1>Список заметок</h1>
    <div v-if="notes.length">
    <div 
    v-for="note in notes"
    :key="note.id"
    class="cardNote"
    >
    <input type="checkbox">
    {{note.title}}
    </div>
    </div>
    <p v-else>NONONONONO</p>
  </div>
</template>

<script>



export default {
  computed: {
    notes() {
      return this.$store.getters.notes
    }
  }
}
</script>

<style>
#home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>