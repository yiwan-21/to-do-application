<template>
    <div>
        <TaskItem 
            v-for="(task) in tasks" 
            :key="task.title" 
            :task="task"
            :editing="editing"
            @deleteTask="deleteTask($event)">
        </TaskItem>
    </div>
</template>

<script>
import TaskItem from './TaskItem.vue';
import { TaskBus } from '../main';

export default {
    name: "TaskList",
    props: {
        editing: {
            type: Object,
            required: true,

        },
    },
    components: {
        TaskItem,
    },
    data() {
        return {
            tasks: [
                // { id: 1, title: "Learn VueJS", description: "Learning", completed: false },
                // { id: 2, title: "Learn SpringBoot", description: "Learning", completed: false },
                // { id: 3, title: "Learn Quasar", description: "Learning", completed: false },
            ],
        }
    },
    methods: {
        updateTask: function (task) {
            const index = this.tasks.findIndex(t => t.id === task.id);
            if (index != -1) {
                this.tasks[index].title = task.title;
                this.tasks[index].description = task.description;
            }
            else {
                this.tasks.push(task);
            }
        },
        deleteTask: function (task) {
            if (confirm("Are you sure to delete task: " + task.title)) {
                this.$axios.delete('/tasks/' + task.id)
                    .then(() => {
                        this.tasks.splice(this.tasks.indexOf(task), 1);
                    }).catch(e => {
                        console.log(e);
                    })
            }
        },
        openEditing: function(id) {
            this.$emit("openEditing", id);
        },
        updateForm: function(task) {
            TaskBus.$emit('updateForm', task);
        }
    },
    mounted() {
        this.$axios.get('/tasks')
            .then(response => {
                this.tasks = response.data;
            })
            .catch(error => {
                console.log(error);
            });
    },
    created() {
        TaskBus.$on('updateTask', (task) => {
            this.updateTask(task)
        });
    }
}
</script>

<style scoped>
</style>