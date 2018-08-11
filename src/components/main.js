import { h } from 'preact'
import ReduxTaskList from '../redux/containers/task-list'
import ReduxSidebarConnected from '../redux/containers/sidebar'

const Main = () => (
  <main>
    <ReduxSidebarConnected />
    <ReduxTaskList />
  </main>
)

export default Main
