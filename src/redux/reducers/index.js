import { combineReducers } from '../../../node_modules/redux'
import listsReducer from './lists'
import tasksReducer from './tasks'
import selectedListReducer from './selected-list'

const checklistApp = combineReducers({
  selectedList: selectedListReducer,
  lists: listsReducer,
  tasks: tasksReducer
})

export default checklistApp
