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

export const setView = view => ({ type: SET_VIEW, payload: view });
export const setTab = tab => ({ type: SET_TAB, payload: tab });
export const setBotContext = context => ({ type: SET_BOT_CONTEXT, payload: context });
export const setQuizDifficulty = difficulty => ({ type: SET_QUIZ_DIFFICULTY, payload: difficulty });
export const setCurrentQuiz = quiz => ({ type: SET_CURRENT_QUIZ, payload: quiz });
export const setCurrentQuestionIndex = index => ({ type: SET_CURRENT_QUESTION_INDEX, payload: index });
export const setUserAnswers = answers => ({ type: SET_USER_ANSWERS, payload: answers });
