import * as Actions from '../actions'

export default function selectedListReducer (state = 'getting_started', action) {
  switch (action.type) {
    case Actions.SELECT_LIST:
      return action.id
    case Actions.REMOVE_LIST:
      return state === action.id ? 0 : state
  }

  return state
}
