export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'
export const INITIALIZE = 'INITIALIZE'

export function receiveEntries (entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries,
  }
}

export function initialize () {
	return {
		type : INITIALIZE
	}
}


export function addEntry (entry) {
  return {
    type: ADD_ENTRY,
    entry,
  }
}