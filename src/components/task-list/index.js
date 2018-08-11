import { h } from 'preact'
import style from './style'
import { Scrollbars } from 'react-custom-scrollbars'

const TaskList = ({ className, children, ...props }) => (
  <div className={style.TaskList + ' ' + (className || '')} {...props}>
    <Scrollbars
      children={children}
    />
  </div>
)

export default TaskList
