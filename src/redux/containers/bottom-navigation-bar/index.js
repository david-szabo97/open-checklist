import BottomNavigationBar from '../../../components/bottom-navigation-bar'

import { h } from 'preact'
import { PureComponent } from 'preact-compat'
import { selectItem } from '../../actions'
import { connect } from 'react-redux'

const items = [
  {
    icon: 'listingOption',
    name: 'Lists'
  },
  {
    icon: 'list',
    name: 'Tasks'
  }
]

class ReduxBottomNavigationBar extends PureComponent {
  render ({ selectItem, ...props }) {
    return <BottomNavigationBar items={items} onItemSelected={selectItem} {...props} />
  }
}

const mapStateToProps = state => ({
  selectedItemIndex: state.bottomNavigationBar.selectedItemIndex
})

const mapDispatchToProps = dispatch => ({
  selectItem: index => {
    dispatch(selectItem(index))
  }
})

const ReduxBottomNavigationBarConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxBottomNavigationBar)

export default ReduxBottomNavigationBarConnected
