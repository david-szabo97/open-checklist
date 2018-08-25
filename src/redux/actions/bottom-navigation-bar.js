export const SELECT_ITEM = 'SELECT_ITEM'

export function selectItem (index) {
  return {
    type: SELECT_ITEM,
    index
  }
}
