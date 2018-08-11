import { h } from 'preact'
import ReduxTaskList from '../redux/containers/task-list'
import ReduxSidebarConnected from '../redux/containers/sidebar'

const Main = () => (
  <main>
    <link href='https://fonts.googleapis.com/css?family=Roboto+Condensed:400,300,300italic,400italic,700,700italic' rel='stylesheet' type='text/css' />
    <ReduxSidebarConnected />
    <ReduxTaskList />
  </main>
)

export default Main
