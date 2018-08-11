import { h } from 'preact'
import style from './style'
import Chip from '../chip'

const Heading = ({ className, text, chip, children, ...props }) => (
  <div className={style.Heading + ' ' + (className || '')} {...props}>
    {text}
    {(chip) ? <Chip {...chip} /> : null}
    {children}
  </div>
)

export default Heading
