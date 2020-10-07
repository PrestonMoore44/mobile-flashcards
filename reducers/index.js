import { RECEIVE_ENTRIES, ADD_ENTRY, INITIALIZE } from '../actions'

function entries (state = {}, action) {
  // console.log(state, action)
  switch (action.type) {
    case INITIALIZE :
      return {
        'Initial Deck' : {
          title: 'Initial Deck',
          questions : []
        }
      } 
    default :
      return state
  }
}

export default entries