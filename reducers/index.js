import { RECEIVE_ENTRIES, ADD_ENTRY, INITIALIZE, ADD_QUESTION, ADD_DECK, ALERT, INCREMENT_SCORE  } from '../actions'

function entries (state = {}, action) {
  switch (action.type) {
    case INITIALIZE : 
      return {
        'Attempted Answers' : {
          answercount: 0,
          showAlert:false,
        }
      }
    case ALERT : 
      return {
        ...state,
        'Attempted Answers' : 
          Object.assign({},
          state['Attempted Answers'],
          {
            showAlert: state['Attempted Answers'].answercount > 0 ? false : true
          })
      }
    case INCREMENT_SCORE : 
      return {
        ...state,
        'Attempted Answers' : 
          Object.assign({},
          state['Attempted Answers'],
          {
            answercount: 1,
          })
      }
    case ADD_QUESTION : 
      return {
        ...state,
        ...Object.assign({},
          {
            [action.title] : {
              title: action.title,
              questions: !!state[action.title] && !!state[action.title].questions && state[action.title].questions.length > 0 ? 
               [...state[action.title].questions, action.question] : [action.question] 
          }
        })
      }
    case ADD_DECK :
      return {
        ...state,
        ...{
          [action.title] : {
            title: action.title,
            questions: []
          }
        }
      }
    
    default :
      return state
  }
}

export default entries