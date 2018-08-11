import { h } from 'preact'
import style from './style'
import Heading from '../../heading'

const SidebarHeading = ({ className, ...props }) => (
  <Heading className={style.SidebarHeading + ' ' + (className || '')} {...props} />
)

export default SidebarHeading
