export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'
export const INITIALIZE = 'INITIALIZE'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_DECK = 'ADD_DECK'

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

export function addQuestion (question,title) {
  return {
    type: ADD_QUESTION,
    question,
    title
  }
}

export function addDeck ({ title }) {
  return {
    type: ADD_DECK,
    title
  }
}