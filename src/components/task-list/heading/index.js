import { h } from 'preact'
import style from './style'
import Heading from '../../heading'
import Delete from '../../delete'

import { PureComponent } from 'preact-compat'

class TaskListHeading extends PureComponent {
  onDeleteHandler = () => {
    this.props.onDelete(this.props.id)
  }

  render ({ className, hasDelete = true, onDelete, ...props }) {
    return (
      <Heading className={style.TaskListHeading + ' ' + (className || '')} {...props}>
        <div className={style.Actions}>
          {(hasDelete) ? <Delete onClick={this.onDeleteHandler} /> : null}
        </div>
      </Heading>
    )
  }
}

export default TaskListHeading
