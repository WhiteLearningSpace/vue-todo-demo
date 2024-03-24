import {computed, onMounted, ref} from "vue";

export interface Todo {
    id: number;
    text: string;
    isCompleted: boolean;
}

type StateFilter = 'all' | 'completed' | 'incomplete';

export function useTodo() {
    // 事项列表
    const todos = ref<Todo[]>([]);
    // 事项状态过滤器
    const stateFilter = ref<StateFilter>('all');
    // 是否生成模拟数据
    const isToGenerateMockData = true;

    /**
     * 添加事项
     * @param title 事项标题
     */
    const addTodo = (title: string) => {
        todos.value.unshift({
            id: todos.value.length + 1,
            text: title,
            isCompleted: false
        });
        saveTodos()
    }

    /**
     * 删除事项
     * @param id 事项id
     */
    const removeTodo = (id: number) => {
        todos.value = todos.value.filter(todo => todo.id !== id);
        saveTodos()
    }

    /**
     * 删除所有事项
     */
    const removeAll = () => {
        const isConfirm = confirm('确定要删除所有事项吗？');
        if (!isConfirm) return;
        todos.value = [];
        saveTodos()
    }

    /**
     * 切换事项状态
     * @param id 事项id
     */
    const toggleTodo = (id: number) => {
        todos.value = todos.value.map(todo => {
            if (todo.id === id) {
                todo.isCompleted = !todo.isCompleted;
            }
            return todo;
        });
        saveTodos()
    }

    /**
     * 修改事项内容
     */
    const editTodo = (id: number, text: string) => {
        todos.value = todos.value.map(todo => {
            if (todo.id === id) {
                todo.text = text;
            }
            return todo;
        });
        saveTodos()
    }

    /**
     * 过滤事项列表，根据状态过滤
     * all: 全部, completed: 已完成, incomplete: 未完成
     * @returns 返回过滤后的新列表
     */
    const filteredTodos = computed<Todo[]>(() => {
        switch (stateFilter.value) {
            case 'completed':
                return todos.value.filter(v => v.isCompleted);
            case 'incomplete':
                return todos.value.filter(v => !v.isCompleted);
            default:
                return todos.value;
        }
    });

    /**
     * 删除当前过滤状态下的所有事项
     */
    const removeAllFiltered = () => {
        const isConfirm = confirm('确定要删除当前列表中的所有事项吗？');
        if (!isConfirm) return;
        switch (stateFilter.value) {
            case 'completed':
                todos.value = todos.value.filter(v => !v.isCompleted);
                break;
            case 'incomplete':
                todos.value = todos.value.filter(v => v.isCompleted);
                break;
            default:
                todos.value = [];
                break;
        }
        saveTodos()
    }


    /**
     * 保存事项列表到本地存储
     */
    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos.value));
    }

    /**
     * 获取事项列表
     */
    const getTodos = (): Todo[] => {
        const todos = localStorage.getItem('todos');
        if (todos) {
            return JSON.parse(todos);
        }
        return [];
    }

    onMounted(() => {
        if (isToGenerateMockData) {
            if (localStorage.getItem('todos') === null) {
                localStorage.setItem('todos', JSON.stringify(mockData));
            }
        }

        todos.value = getTodos();
    })

    return {
        todos,
        addTodo,
        removeTodo,
        toggleTodo,
        editTodo,
        removeAll,
        removeAllFiltered,
        stateFilter,
        filteredTodos,
    }
}

const mockData: Todo[] = [
    {
        id: 1,
        text: '学习Vue3',
        isCompleted: true
    },
    {
        id: 2,
        text: '学习Vite',
        isCompleted: false
    },
    {
        id: 3,
        text: '学习Vue Router',
        isCompleted: false
    },
    {
        id: 4,
        text: '学习Vuex',
        isCompleted: false
    },
    {
        id: 5,
        text: '学习React',
        isCompleted: false
    },
    {
        id: 6,
        text: '学习Java',
        isCompleted: false
    },
    {
        id: 7,
        text: '学习Mysql',
        isCompleted: false
    },
    {
        id: 8,
        text: '学习Redis',
        isCompleted: false
    },
    {
        id: 9,
        text: '学习Nginx',
        isCompleted: false
    },
    {
        id: 10,
        text: '学习Docker',
        isCompleted: false
    },
    {
        id: 11,
        text: '学习Kubernetes',
        isCompleted: false
    },
    {
        id: 12,
        text: '学习Jenkins',
        isCompleted: false
    },
    {
        id: 13,
        text: '学习Git',
        isCompleted: false
    },
    {
        id: 14,
        text: '学习Github',
        isCompleted: false
    },
    {
        id: 15,
        text: '学习Gitlab',
        isCompleted: false
    }
];