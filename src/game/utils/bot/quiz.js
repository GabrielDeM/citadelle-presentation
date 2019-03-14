import { quizzes } from '../../data';
import { bot, slugify } from './';

export const quiz = (message, self) => {
  const { botContext } = self.props;
  const { content } = message;
  if(botContext !== 'quiz' || (content && content.charAt(0) === '/')) return;
    setTimeout(() => {
      const { difficulty, currentQuiz, currentQuestionIndex } = self.props;
      if(!difficulty) {
        chooseDifficulty(message, self);
        return;
      } else if(!currentQuiz) {
        chooseQuiz(message, self);
        return;
      } else {
        //if(currentQuestionIndex > currentQuiz.questions.length - 1) return displayUserResults(self);
        message === '' && displayQuestion(currentQuestionIndex, self, message);
        chooseAnswer(message, self);
      }
    }, 0);
}

const chooseDifficulty = (message, self) => {
  const { setQuizDifficulty } = self.props;
  let { difficulty, quizzes: quizList } = retrieveObject(message, quizzes);

  if(!quizList)
    bot(self).say('Cette difficulté n\'éxiste pas, veuillez en choisir une parmis celle indiqué ci-dessus')
  else {
    quizList = quizList.quizzes;
    setQuizDifficulty(difficulty);
    self.quiz('');
    mapQuizzes(self);
  }
}

const mapQuizzes = self => {
  const { difficulty } = self.props;
  const _bot = bot(self);
  _bot.say('Bien, maintenant que tu as choisis une difficulté tu va pouvoir choisir un quiz parmis ceux-ci:');
  const quizList = quizzes[difficulty].quizzes;
  if(quizList.length === 0) {
    _bot.say('Oops, on dirait qu\'il n\'y a pas de question.');
    return;
  }
  quizList.forEach(quiz => {
    _bot.say(`${quiz.index}: Le quiz "${quiz.title}" contient ${quiz.questions.length} questions`);
  });
}

const chooseQuiz = (message, self) => {
  if(!message) return;
  const _bot = bot(self);
  const { setCurrentQuiz, difficulty } = self.props;
  let quiz = retrieveObject(message, quizzes[difficulty].quizzes, {split: false});
  console.log(quiz)
  if(!quiz.questions)
    _bot.say('Veuillez séléctionner un quiz parmis ceux indiqué ci-dessus.');
  else {
    setCurrentQuiz(quiz);
    self.quiz('');
    _bot.say(`Vous avez séléctionner le quiz "${quiz.title}"`)
  };
}

const displayQuestion = (index, self) => {
  const { currentQuiz } = self.props;
  const { question, choices } = currentQuiz.questions[index];
  const _bot = bot(self);
  setTimeout(() => {
    _bot.say(question);
    choices.forEach((choice, i) => {
      const j = i + 1;
      setTimeout(() => {
        _bot.say(`${j}: ${choice}`);
      }, j * 100);
    });
  }, 300);
}

const chooseAnswer = (message, self) => {
  const { content } = message;
  if(!content) return;
  const { currentQuiz, currentQuestionIndex, setUserAnswers, userAnswers, setCurrentQuestionIndex } = self.props;
  setCurrentQuestionIndex(currentQuestionIndex + 1);

  const index = Number(content.charAt(0));
  const { answer, choices } = currentQuiz.questions[currentQuestionIndex];
  let userAnswer;
  if(!Number.isNaN(index)) {
    userAnswer = index;
  } else {
    const messageSlug = slugify(content);
    const choicesSlug = choices.map(choice => slugify(choice));
    const answerIndex = choicesSlug.indexOf(messageSlug) + 1;
    userAnswer = answerIndex;
  }
  setUserAnswers([
    ...userAnswers,
    {
      userAnswer,
      answer,
    },
  ]);
  if(currentQuestionIndex + 2 > currentQuiz.questions.length) displayUserResults(self);
  else self.quiz('');
}

const displayUserResults = self => {
  const { userAnswers, currentQuiz } = self.props;
  resetQuiz(self);
  let goodAnswers = 0;
  userAnswers.forEach(userAnswer => {
    const { userAnswer: _userAnswer, answer } = userAnswer;
    if(_userAnswer === answer) ++goodAnswers;
  });
  bot(self).say(`Félicitation! Vous avez, ${goodAnswers}/${currentQuiz.questions.length}`);
}

const resetQuiz = self => {
  const { setQuizDifficulty, setCurrentQuiz, setCurrentQuestionIndex, setUserAnswers } = self.props;
  setQuizDifficulty('');
  setCurrentQuiz(null);
  setCurrentQuestionIndex(0);
  setUserAnswers([]);
}

const retrieveObject = (message, object, options = {}) => {
  const { content } = message;
  let { split, objectProp } = options;
  split = split === undefined ? true : split;
  let index = content.charAt(0);
  index = Number(index);
  let retrievedObject;
  if(!Number.isNaN(index)) {
    for (const key in object) {
      if(object[key].index === index) {
        retrievedObject = object[key];
      }
    }
  } else {
    let researched = split
      ? content.split(' ')[0]
      : content;
    for (const key in object) {
      const currentProp = object[key][objectProp];
      if(currentProp && currentProp.toLowerCase() === researched.toLowerCase()) {
        retrievedObject = object[key];
      }
    }
  }
  return retrievedObject || {};
}
