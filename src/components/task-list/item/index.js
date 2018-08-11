import { h } from 'preact'
import { PureComponent } from 'preact-compat'
import style from './style'
import Delete from '../../delete'

class TaskListItem extends PureComponent {
  onCheckHandler = (e) => {
    e.stopPropagation()
    this.props.onCheck(this.props.id)
  }

  onDeleteHandler = (e) => {
    e.stopPropagation()
    this.props.onDelete(this.props.id)
  }

  render ({ key, classes = '', hasDelete = true, hasCheck = true, active, text, onDelete, onCheck, children, ...props }) {
    return (
      <label className={style.Item + ' ' + ((!hasCheck) ? style.ItemNoCheckBox : '') + ' ' + ((active) ? style.ItemActive : '') + ' ' + classes} {...props}>
        {(hasCheck) ? <div className={style.CheckBox} onClick={this.onCheckHandler}><div className={style.Check} /></div> : null}
        <div className={style.ItemText}>{text}</div>
        {children}
        <div className={style.Actions}>
          {(hasDelete) ? <Delete onClick={this.onDeleteHandler} /> : null}
        </div>
      </label>
    )
  }
}

export default TaskListItem
