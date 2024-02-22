import { useState } from "react";

import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTION from "../questions.js";

export default function Questions({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

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
        key={timer}
        timeout={timer}
        onTimeOut={answer.selectAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
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
