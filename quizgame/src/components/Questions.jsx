import { useState } from "react";

import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTION from "../questions.js";

export default function Questions({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectAnswer: "",
    isCorrect: null,
  });

  function handleSelectAnswers(answer) {
    setAnswer({
      selectAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectAnswer: answer,
        isCorrect: QUESTION[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  if (answer.selectAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectAnswer) {
    answerState = "answered";
  }

  return (
    <div id='question'>
      <QuestionTimer
        timeout={10000}
        onTimeOut={onSkipAnswer}
      />
      <h2>{QUESTION[index].text}</h2>
      <Answers
        answers={QUESTION[index].answers}
        selectedAnswer={answer.selectAnswer}
        answerState={answerState}
        onSelected={handleSelectAnswers}
      />
    </div>
  );
}
