import { h } from 'preact'
import style from './style'
import { Scrollbars } from 'react-custom-scrollbars'

const Sidebar = ({ className, children, ...props }) => (
  <div className={style.Sidebar + ' ' + (className || '')} {...props}>
    <Scrollbars
      children={children}
    />
  </div>
)

export default Sidebar
