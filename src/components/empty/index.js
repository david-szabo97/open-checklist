import { h } from 'preact'
import style from './style'

const Empty = ({ className, children, ...props }) => (
  <div className={style.Empty + ' ' + (className || '')} {...props}>{children}</div>
)

export default Empty
