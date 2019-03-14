import { chat } from '../action-type';

const {
  SET_VIEW,
  SET_TAB,
  SET_BOT_CONTEXT,
  SET_QUIZ_DIFFICULTY,
  SET_CURRENT_QUIZ,
  SET_CURRENT_QUESTION_INDEX,
  SET_USER_ANSWERS,
} = chat;


const chatState = {
  view: 'ChatButton',
  tab: 'public',
  botContext: 'chat',
  difficulty: '',
  currentQuiz: null,
  currentQuestionIndex: 0,
  userAnswers: [],
};

const chatReducer = (state = chatState, action) => {
  switch (action.type) {
    case SET_VIEW:
      return {
        ...state,
        view: action.payload,
      };
    case SET_TAB:
      return {
        ...state,
        tab: action.payload,
      };
    case SET_BOT_CONTEXT:
      return {
        ...state,
        botContext: action.payload,
      };
    case SET_QUIZ_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload,
      };
    case SET_CURRENT_QUIZ:
      return {
        ...state,
        currentQuiz: action.payload,
      };
    case SET_CURRENT_QUESTION_INDEX:
      return {
        ...state,
        currentQuestionIndex: action.payload,
      };
    case SET_USER_ANSWERS:
      return {
        ...state,
        userAnswers: action.payload,
      };

    default: return { ...state };
  }
}

export default chatReducer;
