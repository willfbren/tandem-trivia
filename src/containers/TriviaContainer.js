import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Question from '../components/Question';

const TriviaContainer = ({ restart }) => {
    const triviaState = {
        questions: [],
        choices: [],
        answers: [],
        current: null,
    };

    const [trivia, setTrivia] = useState(triviaState);

    const [score, setScore] = useState(0);

    const handleTrivia = (data) => {
        // helper function for shuffling items in array
        function shuffle(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }

            return arr;
        }

        // get random set of 10 questions from json data - might slow down the application with
        // larger data sets since we're getting all the questions at once then slicing but shouldn't
        // be noticable for smaller sets of data, didn't want to modify the original json file
        const random = shuffle(data).slice(0, 10);

        const questions = random.map((triviaData) => triviaData.question);
        const choices = random.map((triviaData) => triviaData.incorrect);
        const answers = random.map((triviaData) => triviaData.correct);

        // add the answer to the list of choices and shuffle the choices
        function addAnswerToChoices() {
            for (let i = 0; i < choices.length; i++) {
                choices[i].push(answers[i]);
                shuffle(choices[i]);
            }

            return choices;
        }

        const randomized = addAnswerToChoices();

        // set questions, choices, answers in state
        setTrivia({
            questions,
            choices: randomized,
            answers,
            current: 0,
        });
    };

    const checkAnswer = (response) => {
        // if response is correct, increase score
        if (response === trivia.answers[trivia.current]) {
            setScore(score + 1);
        }
    };

    const nextQuestion = () => {
        // update current so user gets next question
        setTrivia({ ...trivia, current: trivia.current + 1 });
    };

    const checkGameOver = () => {
        if (trivia.current > 9) {
            return false;
        }
        return true;
    };

    useEffect(() => {
        fetch('questions.json')
            .then((res) => res.json())
            .then((data) => handleTrivia(data));
    }, []);

    return checkGameOver() ? (
        <>
            <Score>Score: {score} / 10</Score>
            <Question
                key={trivia.current}
                question={trivia.questions[trivia.current]}
                choices={trivia.choices[trivia.current]}
                answer={trivia.answers[trivia.current]}
                checkAnswer={checkAnswer}
                nextQuestion={nextQuestion}
            />
        </>
    ) : (
        <>
            <p>Game Over</p>
            <Score>Score: {score} / 10</Score>
            <Button onClick={() => restart()}>Play Again</Button>
        </>
    );
};

export default TriviaContainer;

const Score = styled.p`
    font-style: italic;
`;

const Button = styled.button`
    font-weight: 700;
    font-size: 16px;
    color: #ffffff;
    padding: 10px;
    border: 4px solid #20bf6b;
    background-color: #20bf6b;
    border-radius: 6px;
    cursor: pointer;
`;
