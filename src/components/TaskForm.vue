<template>
    <form class="add-task-form" ref="form">
        <label for="title">Task</label>
        <input type="text" id="title" ref="title">
        <label for="description">Description</label>
        <textarea type="text" id="description" ref="description"></textarea>
        <div class="form-button">
            <button type="submit" v-if="editing.isEditing" @click="saveTask($event)">Save</button>
            <button type="submit" v-else @click="addTask($event)">Add</button>
            <button type="reset" @click="closeEditing()">Cancel</button>
        </div>
    </form>
</template>

<script>
import { TaskBus } from '../main';

export default {
    name: 'TaskForm',
    props: {
        editing: {
            type: Object,
            required: true,
        }
    },
    methods: {
        updateForm: function(task) {
            this.$refs.title.value = task.title;
            this.$refs.description.value = task.description;
        },
        closeEditing: function () {
            this.$emit('closeEditing');
        },
        updateTask: function (task) {
            TaskBus.$emit('updateTask', task)
        },
        addTask: function (event) {
            event.preventDefault();
            if (this.$refs.title.value.trim() != "") {
                this.$axios.post('/tasks', {
                    title: this.$refs.title.value,
                    description: this.$refs.description.value,
                    completed: false
                }
                ).then(response => {
                    this.updateTask(response.data)
                    this.$refs.form.reset();
                }).catch(e => {
                    console.log(e);
                })
            }
        },
        saveTask: function (event) {
            event.preventDefault();
            if (this.editing.isEditing && this.editing.task.id != -1 && this.$refs.title.value.trim() != "") {
                this.$axios.put('/tasks/' + this.editing.task.id, {
                    title: this.$refs.title.value,
                    description: this.$refs.description.value,
                }).then(response => {
                    this.updateTask(response.data)
                    this.closeEditing();
                    this.$refs.form.reset();
                }).catch(e => {
                    console.log(e);
                })
            }
        },
    },
    created() {
        TaskBus.$on('updateForm', (task) => {
            this.updateForm(task)
        });
    }
}
</script>

<style scoped>
.add-task-form {
    background-color: #f5f5f5;
    padding: 0.2rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

#title {
    width: 100%;
    margin-bottom: 0.5rem;
}

#description {
    width: 100%;
}

.form-button {
    align-self: center;
    margin-top: 1rem;
}
</style>