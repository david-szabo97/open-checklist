import { h } from 'preact'
import { PureComponent } from 'preact-compat'
import SidebarItem from '.'
import style from './style'

export default class SidebarItemAdd extends PureComponent {
  onKeyUp = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.setState({ value: e.target.value }, this.onAdd)
    }
  }

  onAdd () {
    if (this.state.value.trim().length < 1) return

    this.props.onAdd(this.state.value)
    this.setState({
      value: ''
    })
  }

  constructor (props) {
    super(props)

    this.state = {
      active: false,
      value: ''
    }
  }

  render (props, { active, value }) {
    const text = (
      <textarea
        id='addList'
        name='addList'
        class={style.AddTextArea}
        value={value}
        onKeyUp={this.onKeyUp}
        onKeyDown={this.onKeyDown}
        placeholder='Add a new list...'
      />
    )

    return (
      <SidebarItem
        for='addList'
        hasDelete={false}
        hasIndent={false}
        text={text}
        className={style.SidebarItemAdd}
      />
    )
  }
}
