import shortid from 'shortid'

export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const TOGGLE_TASK = 'TOGGLE_TASK'
export const MOVE_TASK = 'MOVE_TASK'

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
