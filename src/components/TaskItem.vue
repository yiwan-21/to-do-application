<template>
    <div class="tasks">
        <input type="checkbox" v-on:click="toggleComplete(task)" :checked="task.completed" />
        <div class="task-body">
            <span v-text="task.title"></span>
            <span class="description" v-text="task.description"></span>
        </div>
        <div class="task-buttons">
            <button @click="editTask(task, $event)">Edit</button>
            <button @click="deleteTask(task)">Delete</button>
        </div>
    </div>
</template>

<script>
import { TaskBus } from '../main';
export default {
    name: "TaskItem",
    props: {
        task: {
            type: Object,
            required: true,
        },
        editing: {
            type: Object,
            required: true,
        }
    },
    methods: {
        toggleComplete: function (task) {
            this.$axios.put('/tasks/' + task.id, {
                title: task.title,
                description: task.description,
                completed: !task.completed
            }).then(() => {
                task.completed = !task.completed;
            }).catch(e => {
                console.log(e);
            })
        },
        editTask: function (task, event) {
            event.preventDefault();
            // this.task.title = task.title;
            // this.task.description = task.description;
            TaskBus.$emit("updateForm", task);
            TaskBus.$emit("openEditing", task.id);
        },
        deleteTask(task) {
            this.$emit("deleteTask", task);
        }
    }
}
</script>

<style scoped>
.tasks {
    text-align: start;
    margin: 1rem 0;
    padding: 0.5rem;
    border: 1px solid #000;
    border-radius: 3px;
    display: flex;
    align-items: flex-start;
}

.tasks div>* {
    padding: 0 0.5rem;
}

.completed {
    background-color: #76ff95;
}

.task-body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: auto;
}

.description {
    color: #878787;
    margin-top: 0.2rem;
    line-break: anywhere;
}

.task-buttons {
    margin-left: auto;
    display: flex;
    flex-direction: column;
}

.task-buttons>button {
    margin-bottom: 0.2rem;
}
</style>