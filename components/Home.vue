<template>
    <div style="padding-left: 1%;padding-right: 1%;">
        <h1>Nuext List</h1>
        <ul>
            <li v-for="todo in todos" :key="todo.text">
                <input :checked="todo.done" @change="toggle(todo)" type="checkbox">
                <span :class="{ done: todo.done }">{{ todo.text }}</span>
                <b-button @click="remove({todo})" variant="danger" size="sm">
                    <b-icon icon="backspace" aria-hidden="true"></b-icon>
                </b-button>
            </li>
            <li><input @keyup.enter="addTodo" placeholder="What do you need?"></li>
        </ul>
    </div>
</template>

<script>
import { mapMutations} from 'vuex'

export default {
    name: "HomeComponent",
    computed: {
        todos () {
            return this.$store.state.todos.list
        }
    },
    methods: {
        addTodo (e) {
            this.$store.commit('todos/add', e.target.value)
            e.target.value = ''
        },
        ...mapMutations({
            toggle: 'todos/toggle',
            remove: 'todos/remove'
        })
    }
}
</script>
<style>
.done {
  text-decoration: line-through;
}
</style>