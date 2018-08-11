import shortid from 'shortid'

export const ADD_LIST = 'ADD_LIST'
export const REMOVE_LIST = 'REMOVE_LIST'
export const MOVE_LIST = 'MOVE_LIST'
export const INDENT_LIST = 'INDENT_LIST'

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
