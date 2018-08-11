import { h } from 'preact'
import style from './style'

const Delete = ({ className, ...props }) => (
  <div className={style.Delete + ' ' + (className || '')} {...props}>✘</div>
)

export default Delete
