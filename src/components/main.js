import { h, Component } from 'preact'
import ReduxTaskList from '../redux/containers/task-list'
import ReduxSidebarConnected from '../redux/containers/sidebar'
import ReduxBottomNavigationBarConnected from '../redux/containers/bottom-navigation-bar';
import { connect } from 'react-redux'

const MainDesktop = () => (
  <main>
    <ReduxSidebarConnected />
    <ReduxTaskList />
  </main>
)

const MainMobile = ({ bottomNavigationBarSelectedItemIndex }) => (
  <main>
    {bottomNavigationBarSelectedItemIndex === 0 ? <ReduxSidebarConnected /> : <ReduxTaskList />}
    <ReduxBottomNavigationBarConnected />
  </main>
)

const mapStateToProps = state => ({
  bottomNavigationBarSelectedItemIndex: state.bottomNavigationBar.selectedItemIndex
})

const MainMobileConnected = connect(
  mapStateToProps
)(MainMobile)

class Main extends Component {

  componentDidMount () {
    window.addEventListener('resize', this.setWidth)
    this.setWidth()
  }

  setWidth = () => {
    this.setState({ width: window.innerWidth })
  }

  render (props, { width }) {
    return width >= 768 ? <MainDesktop /> : <MainMobileConnected />
  }

}

export default Main
