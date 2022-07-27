<template>
  <div id="app" class="center">
    <h1>To do list</h1>
    <TaskForm 
      :editing="editing"
      @closeEditing="closeEditing()">
    </TaskForm>

    <TaskList
      :editing="editing"
      @openEditing="openEditing($event)">
    </TaskList>
  </div>
</template>

<script>
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import { TaskBus } from './main';

export default {
  name: 'app',
  components: {
    TaskForm,
    TaskList,
  },
  data() {
    return {
      editing: {
        isEditing: false,
        task: {
          id: -1,
          title: "",
          description: "",
        }
      },
    }
  },
  methods: {
    openEditing: function(id) {
      this.editing.isEditing = true;
      this.editing.task.id = id;
    },
    closeEditing: function() {
      this.editing.isEditing = false;
      this.editing.task.id = -1;
    },
  },
  created() {
    this.$axios.defaults.baseURL = 'http://localhost:8080';

    TaskBus.$on('openEditing', (id) => {
      this.openEditing(id);
    })
  }
}
</script> 


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 5rem;
}

.center>* {
  width: 100%;
}


</style>
