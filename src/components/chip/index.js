import { h } from 'preact'
import style from './style'

const Chip = ({ className, text, color, ...props }) => (
  <div className={style.Chip + ' ' + ((color === 'green') ? style.ChipGreen : '') + ' ' + (className || '')}{...props}>{text}</div>
)

export default Chip
