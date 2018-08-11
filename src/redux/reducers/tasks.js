import * as Actions from '../actions'
import { arrayMove } from 'react-sortable-hoc'

export default function tasksReducer (state = [], action) {
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
