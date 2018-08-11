import { h } from 'preact'
import { PureComponent } from 'preact-compat'
import { removeList, selectList, moveList, addList, incIndentList, decIndentList, addTask } from '../../actions'
import { connect } from 'react-redux'
import Sidebar from '../../../components/sidebar'
import SidebarItem from '../../../components/sidebar/item'
import SidebarHeading from '../../../components/sidebar/heading'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import SidebarItemAdd from '../../../components/sidebar/item/add'

const SortableSidebar = SortableContainer(Sidebar)
const SortableSidebarItem = SortableElement(SidebarItem)

class PureSortableSidebarItem extends SortableSidebarItem {
  shouldComponentUpdate = PureComponent.prototype.shouldComponentUpdate
}

class ReduxSidebar extends PureComponent {
  setListRef = (ele) => {
    if (!ele) return

    this.listRef = ele
  }

  componentDidUpdate (prevProps) {
    if (!this.listRef) return

    if (this.props.lists.length > prevProps.lists.length) {
      this.listRef.base.firstChild.firstChild.scrollTop = this.listRef.base.firstChild.firstChild.scrollHeight
    }
  }

  render ({ children, lists, selectedList, deleteList, selectList, moveList, addList, decIndentList, incIndentList, ...props }) {
    return (
      <SortableSidebar
        transitionDuration={0}
        lockToContainerEdges
        lockAxis='y'
        onSortEnd={moveList}
        pressDelay={200}
        helperClass='SidebarDrag'
        ref={this.setListRef}
        {...props}
      >
        <SidebarHeading text='Lists' />
        {lists.map((list, index) => (
          <PureSortableSidebarItem
            index={index}
            id={list.id}
            key={list.id}
            active={selectedList === list.id}
            indent={list.indent}
            text={list.text}
            onDelete={deleteList}
            onClick={selectList}
            onDecIndent={decIndentList}
            onIncIndent={incIndentList}
          />
        ))}
        <SidebarItemAdd onAdd={text => addList(text)} />
      </SortableSidebar>
    )
  }
}

const mapStateToProps = state => ({
  lists: state.lists,
  selectedList: state.selectedList
})

const mapDispatchToProps = dispatch => ({
  selectList: id => {
    dispatch(selectList(id))
  },

  addList: text => {
    const addListAction = addList(text)
    dispatch(addListAction)
    dispatch(addTask(addListAction.id, `${addListAction.text}:`))
    dispatch(selectList(addListAction.id))
  },

  deleteList: id => {
    dispatch(removeList(id))
  },

  moveList: ({ oldIndex, newIndex }) => {
    dispatch(moveList(oldIndex, newIndex))
  },

  incIndentList: id => {
    dispatch(incIndentList(id))
  },

  decIndentList: id => {
    dispatch(decIndentList(id))
  }
})

const ReduxSidebarConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxSidebar)

export default ReduxSidebarConnected
