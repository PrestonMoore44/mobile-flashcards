import { RECEIVE_ENTRIES, ADD_ENTRY, INITIALIZE, ADD_QUESTION, ADD_DECK } from '../actions'

function entries (state = {}, action) {
  console.log( " State then action a...Question...",state)
  switch (action.type) {
    case INITIALIZE : 
      return {
        'Initial Deck' : {
          title: 'Initial Deck',
          questions : [{
            question: 'What are the two main branches of physics???',
            answer: 'Classical and Modern'
          },
          {
            question: 'What is the first prime number?',
            answer: '2'
          }]
        }
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