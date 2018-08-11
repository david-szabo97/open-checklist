import shortid from 'shortid'

export const ADD_LIST = 'ADD_LIST'
export const REMOVE_LIST = 'REMOVE_LIST'
export const MOVE_LIST = 'MOVE_LIST'
export const INDENT_LIST = 'INDENT_LIST'

export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const TOGGLE_TASK = 'TOGGLE_TASK'
export const MOVE_TASK = 'MOVE_TASK'

export const SELECT_LIST = 'SELECT_LIST'

export function selectList (id) {
  return {
    type: SELECT_LIST,
    id
  }
}

export function addList (text) {
  const id = shortid.generate()

  text = text.trim()

  return {
    type: ADD_LIST,
    text,
    id
  }
}

export function removeList (id) {
  return {
    type: REMOVE_LIST,
    id
  }
}

export function moveList (oldIndex, newIndex) {
  return {
    type: MOVE_LIST,
    oldIndex,
    newIndex
  }
}

export function incIndentList (id) {
  return {
    type: INDENT_LIST,
    id,
    change: 1
  }
}

export function decIndentList (id) {
  return {
    type: INDENT_LIST,
    id,
    change: -1
  }
}

export function addTask (listId, text, taskType = true) {
  const id = shortid.generate()

  if (taskType === true) {
    if (text.endsWith(':')) {
      taskType = 'heading'
    } else {
      taskType = undefined
    }
  }

  text = text.trim()

  return {
    type: ADD_TASK,
    listId,
    text,
    taskType,
    id
  }
}

export function removeTask (id) {
  return {
    type: REMOVE_TASK,
    id
  }
}

export function toggleTask (id) {
  return {
    type: TOGGLE_TASK,
    id
  }
}

export function moveTask (listId, oldIndexId, newIndexId) {
  return {
    type: MOVE_TASK,
    listId,
    oldIndexId,
    newIndexId
  }
}
