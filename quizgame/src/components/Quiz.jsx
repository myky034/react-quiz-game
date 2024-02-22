import { useCallback, useRef, useState } from "react";
import quizComplete from "../assets/quiz-complete.png";

import QUESTION from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
  const shuffledAnswers = useRef();
  const [answerState, setAnswerState] = useState("");
  const [userAnswer, setUserAnswer] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? userAnswer.length : userAnswer.length - 1;
  const quizIsComplete = activeQuestionIndex === QUESTION.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswer((prevUserAnswer) => {
        return [...prevUserAnswer, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTION[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {}, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id='summary'>
        <img
          src={quizComplete}
          alt='Quiz Completed'
        />
        <h2>Quiz Completed !</h2>
      </div>
    );
  }

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...QUESTION[activeQuestionIndex].answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <div id='quiz'>
      <div id='question'>
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeOut={handleSkipAnswer}
        />
        <h2>{QUESTION[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {shuffledAnswers.current.map((answer) => {
            const isSelected = userAnswer[userAnswer.length - 1] === answer;
            let classes = "";

            if (answerState === "answered" && isSelected) {
              classes = "selected";
            }

            if (
              (answerState === "correct" || answerState === "wrong") &&
              isSelected
            ) {
              classes = answerState;
            }

            return (
              <li
                key={answer}
                className='answer'>
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={classes}>
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
