import React, { useEffect, useState } from 'react';
import Question from '../components/Question';

const TriviaContainer = () => {
    const initialState = {
        questions: [],
        choices: [],
        answers: [],
        score: null,
        current: null,
    };

    const [trivia, setTrivia] = useState(initialState);

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
            score: 0,
            current: 0,
        });
    };

    useEffect(() => {
        fetch('questions.json')
            .then((res) => res.json())
            .then((data) => handleTrivia(data));
    }, []);

    return (
        <Question
            question={trivia.questions[trivia.current]}
            choices={trivia.choices[trivia.current]}
            answer={trivia.answers[trivia.current]}
        />
    );
};

export default TriviaContainer;
