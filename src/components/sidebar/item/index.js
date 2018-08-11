import { h } from 'preact'
import style from './style'
import Delete from '../../delete'
import { PureComponent } from 'preact-compat'

class SidebarItem extends PureComponent {
  onDeleteHandler = (e) => {
    e.stopPropagation()
    this.props.onDelete(this.props.id)
  }

  onDecIndentHandler = (e) => {
    e.stopPropagation()
    if (this.props.indent <= 0) return
    this.props.onDecIndent(this.props.id)
  }

  onIncIndentHandler = (e) => {
    e.stopPropagation()
    if (this.props.indent >= 5) return
    this.props.onIncIndent(this.props.id)
  }

  onClickHandler = (e) => {
    this.props.onClick(this.props.id)
  }

  render ({ hasDelete = true, className, indent = 0, hasIndent = true, active, text, onDelete, onIncIndent, onDecIndent, onClick, ...props }) {
    return (
      <label
        className={style.Item + ' ' + ((active) ? style.ItemActive : '') + ' ' + (className || '')}
        onClick={this.onClickHandler}
        {...props}
      >
        <div className={style.ItemText} style={`padding-left: ${24 + indent * 24}px;`}>{text}</div>
        <div className={style.Actions}>
          {(hasIndent) ? <div className={style.ActionDecIndent} onClick={this.onDecIndentHandler} disabled={indent <= 0}>◀</div> : null}
          {(hasIndent) ? <div className={style.ActionIncIndent} onClick={this.onIncIndentHandler} disabled={indent >= 5}>▶</div> : null}
          {(hasDelete) ? <Delete onClick={this.onDeleteHandler} /> : null}
        </div>
      </label>
    )
  }
}

export default SidebarItem
