import * as Actions from '../actions'
import { arrayMove } from 'react-sortable-hoc'

export default function listsReducer (state = [], action) {
  switch (action.type) {
    case Actions.INDENT_LIST:
      return state.map(list => (list.id === action.id) ? { ...list, indent: list.indent + action.change } : list)

    case Actions.REMOVE_LIST:
      return state.filter(list => list.id !== action.id)

    case Actions.MOVE_LIST:
      return arrayMove(state.lists, action.oldIndex, action.newIndex)

    case Actions.ADD_LIST:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          indent: 0
        }
      ]
  }

  return state
}
