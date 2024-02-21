import {Todo} from "./useTodo";
import {computed, Ref, ref} from "vue";

export function useFilteredTodo(todos: Ref<Todo[]>) {
    const stateFilter = ref('all');

    const filteredTodos = computed(() => {
        switch (stateFilter.value) {
            case 'completed':
                return todos.value.filter(v => v.isCompleted);
            case 'incomplete':
                return todos.value.filter(v => !v.isCompleted);
            default:
                return todos.value;
        }
    });
    return {
        stateFilter,
        filteredTodos
    }
}