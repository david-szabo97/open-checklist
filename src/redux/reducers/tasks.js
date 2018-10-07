import * as Actions from '../actions'
import { arrayMove } from 'react-sortable-hoc'

const initialState = [
  {
    id: 'getting_started_lists_1',
    listId: 'getting_started',
    text: 'Lists:',
    completed: false,
    type: 'heading'
  },
  {
    id: 'getting_started_lists_2',
    listId: 'getting_started',
    text: 'You can create lists on the left sidebar',
    completed: false
  },
  {
    id: 'getting_started_lists_2',
    listId: 'getting_started',
    text: 'You can indent them by using the blue arrows, creating hiearchy',
    completed: false
  },
  {
    id: 'getting_started_lists_3',
    listId: 'getting_started',
    text: 'You can also move \'em, just drag and drop it',
    completed: false
  },
  {
    id: 'getting_started_tasks_1',
    listId: 'getting_started',
    text: 'Tasks:',
    completed: false,
    type: 'heading'
  },
  {
    id: 'getting_started_tasks_2',
    listId: 'getting_started',
    text: 'You can create tasks here at the bottom of the screen',
    completed: false
  },
  {
    id: 'getting_started_tasks_3',
    listId: 'getting_started',
    text: 'You can create headings like \'Tasks\' by typing a colon at the end of the task name',
    completed: false
  },
  {
    id: 'getting_started_tasks_4',
    listId: 'getting_started',
    text: 'You can also move the tasks, just drag and drop it',
    completed: false
  },
  {
    id: 'getting_started_tasks_5',
    listId: 'getting_started',
    text: 'Have fun!',
    completed: false
  }
]

export default function tasksReducer (state = initialState, action) {
  switch (action.type) {
    case Actions.ADD_TASK:
      return [
        ...state,
        {
          id: action.id,
          listId: action.listId,
          text: action.text,
          completed: false,
          type: action.taskType
        }
      ]

    case Actions.TOGGLE_TASK:
      return state.map(task => (task.id === action.id) ? { ...task, completed: !task.completed } : task)

    case Actions.REMOVE_TASK:
      return state.filter(task => task.id !== action.id)

    case Actions.MOVE_TASK:
      const oldIndex = state.findIndex(task => task.id === action.oldIndexId)
      const newIndex = state.findIndex(task => task.id === action.newIndexId)

      return arrayMove(state, oldIndex, newIndex)

    case Actions.REMOVE_LIST:
      return state.filter(task => task.listId !== action.id)
  }

  return state
}
