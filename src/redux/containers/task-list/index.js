import { h, Component } from 'preact'
import { PureComponent } from 'preact-compat'
import TaskList from '../../../components/task-list'
import TaskListItem from '../../../components/task-list/item'
import TaskListHeading from '../../../components/task-list/heading'
import { toggleTask, removeTask, moveTask, addTask } from '../../actions'
import { connect } from 'react-redux'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import TaskListItemAdd from '../../../components/task-list/item/add'
import Empty from '../../../components/empty'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const SortableTaskList = SortableContainer(TaskList)
const SortableTaskListItem = SortableElement(TaskListItem)
const SortableTaskListHeading = SortableElement(TaskListHeading)

function generateChip (tasks, task, index) {
  let count = 0
  let completed = 0

  for (let i = index + 1; i < tasks.length && tasks[i].type !== 'heading'; i++) {
    count++
    if (tasks[i].completed) completed++
  }

  return { text: `${completed} / ${count}`, color: (count === completed && count > 0) ? 'green' : null }
}

/**
 * I am not sure if this is going to break anything
 * but "why-did-you-update" keeps nagging me.
 *
 * This should be safe because we aren't
 * using the exit transition.
 */
class PureCSSTransition extends CSSTransition {
  shouldComponentUpdate (...args) {
    this.props.onExited = null
    return PureComponent.prototype.shouldComponentUpdate.call(this, ...args)
  }
}

/**
 * I am not sure if this is going to break anything
 * but "why-did-you-update" keeps nagging me.
 */
class PureSortableTaskListItem extends SortableTaskListItem {
  shouldComponentUpdate = PureComponent.prototype.shouldComponentUpdate
}

class ReduxTaskList extends Component {
  calculateDistance = (node) => {
    if (!this.listRef) return { distance: 0, childHeight: 0 }

    const index = this.props.tasks.findIndex(task => task.id === node.id)
    const addBoxPos = this.listRef.base.firstChild.firstChild.lastChild.offsetTop
    const child = this.listRef.base.firstChild.firstChild.children[index]
    const distance = addBoxPos - child.offsetTop
    const childHeight = child.getBoundingClientRect().height

    return { distance, child, childHeight }
  }

  onEnterChild = (node) => {
    if (!this.listRef) return

    const { child, distance, childHeight } = this.calculateDistance(node)
    if (distance > childHeight * 1.5) {
      child.style.transform = `translateY(${distance}px)`
    } else {
      child.style.opacity = 1
    }
  }

  onEnteredChild = (node) => {
    if (!this.listRef) return

    const index = this.props.tasks.findIndex(task => task.id === node.id)
    const child = this.listRef.base.firstChild.firstChild.children[index]
    child.style.transform = ''
    child.style.opacity = ''
  }

  setListRef = (ele) => {
    if (!ele) return

    this.listRef = ele
  }

  onSortEndHandler = ({ oldIndex, newIndex }) => {
    this.props.moveTask(this.props.listId, this.props.tasks[oldIndex].id, this.props.tasks[newIndex].id)
  }

  onAddHandler = text => {
    this.props.addTask(this.props.listId, text)
  }

  componentDidUpdate (prevProps) {
    if (!this.listRef) return

    if (this.props.tasks.length > prevProps.tasks.length) {
      this.listRef.base.firstChild.firstChild.scrollTop = this.listRef.base.firstChild.firstChild.scrollHeight
    }
  }

  renderEmpty ({ list, listId, hasLists }) {
    return (
      <Empty>
        {
          (!list && listId) ? (<div>Seems like your list selection is invalid<br /> =(</div>)
            : (!hasLists) ? (<div>Oh boiii, seems like you don't have any lists.<br />Go on and create one =)</div>)
              : (<div>Go on and select a list from the sidebar =)</div>)
        }
      </Empty>
    )
  }

  renderList ({ children, tasks, list, listId, hasLists, toggleTask, deleteTask, moveTask, addTask, ...props }) {
    return (
      <TransitionGroup
        lockToContainerEdges
        lockAxis='y'
        onSortStart={this.onSortStartHandler}
        onSortEnd={this.onSortEndHandler}
        pressDelay={200}
        helperClass='TaskListDrag'
        {...props}
        component={SortableTaskList}
        transitionName='list'
        exit={false}
        key={list.id}
        ref={this.setListRef}
      >
        {tasks.map((task, index) => (
          <PureCSSTransition
            key={index}
            timeout={500}
            classNames='MoveUpFadeIn'
            onEnter={this.onEnterChild}
            onEntered={this.onEnteredChild}
            onExited={this.onExitedChild}
          >
            {
              (task.type === 'heading')
                ? <SortableTaskListHeading
                  chip={generateChip(tasks, task, index)}
                  id={task.id}
                  key={task.id}
                  index={index}
                  text={task.text}
                  onDelete={deleteTask}
                />
                : <PureSortableTaskListItem
                  key={task.id}
                  index={index}
                  id={task.id}
                  active={task.completed}
                  text={task.text}
                  onDelete={deleteTask}
                  onCheck={toggleTask}
                />
            }
          </PureCSSTransition>
        ))}

        <TaskListItemAdd onAdd={this.onAddHandler} />
      </TransitionGroup>
    )
  }

  render (props) {
    return (this.props.list) ? this.renderList(props) : this.renderEmpty(props)
  }
}

function getTasksOfSelectedList (state) {
  return state.tasks.filter(task => task.listId === state.selectedList)
}

const mapStateToProps = state => ({
  tasks: getTasksOfSelectedList(state),
  listId: state.selectedList,
  list: state.lists.find(list => list.id === state.selectedList),
  hasLists: state.lists.length > 0
})

const mapDispatchToProps = dispatch => ({
  toggleTask: id => {
    dispatch(toggleTask(id))
  },

  deleteTask: id => {
    dispatch(removeTask(id))
  },

  moveTask: (listId, oldIndexId, newIndexId) => {
    dispatch(moveTask(listId, oldIndexId, newIndexId))
  },

  addTask: (listId, text) => {
    dispatch(addTask(listId, text))
  }
})

const ReduxTaskListConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReduxTaskList)

export default ReduxTaskListConnected
