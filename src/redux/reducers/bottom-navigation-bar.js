import * as Actions from '../actions'

export default function bottomNavigationBarReducer (state = { selectedItemIndex: 0 }, action) {
  switch (action.type) {
    case Actions.SELECT_ITEM:
      return { selectedItemIndex: action.index }
  }

  return state
}
