import { combineReducers } from '../../../node_modules/redux'
import listsReducer from './lists'
import tasksReducer from './tasks'
import selectedListReducer from './selected-list'
import bottomNavigationBarReducer from './bottom-navigation-bar'

const checklistApp = combineReducers({
  selectedList: selectedListReducer,
  lists: listsReducer,
  tasks: tasksReducer,
  bottomNavigationBar: bottomNavigationBarReducer
})

export default checklistApp
