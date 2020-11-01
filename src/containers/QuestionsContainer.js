import React, { useEffect, useState } from 'react';
import Question from '../components/Question';

const QuestionsContainer = () => {
    const initialState = {
        questions: [],
        choices: [],
        answers: [],
        score: 0,
        responses: 0
    };

    const [trivia, setTrivia] = useState(initialState);

    const handleTrivia = data => {
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
        let random = shuffle(data).slice(0, 10);

        let questions = random.map(data => data.question),
            choices = random.map(data => data.incorrect),
            answers = random.map(data => data.correct);

        // add the answer to the list of choices and shuffle the choices 
        function addAnswerToChoices(choices, answers) {
            for (let i = 0; i < choices.length; i++) {
                choices[i].push(answers[i]);
                shuffle(choices[i]);
            }

            return choices;
        }

        let randomized = addAnswerToChoices(choices, answers);

        // set questions, choices, answers in state
        setTrivia({
            questions: questions,
            choices: randomized,
            answers: answers
        });
    };

    useEffect(() => {
        fetch('questions.json')
            .then(res => res.json())
            .then(data => handleTrivia(data));
    }, []);

    return 'Hello world';
};

export default QuestionsContainer;
