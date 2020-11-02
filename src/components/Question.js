import React, { useState } from 'react';
import styled from 'styled-components';
import Result from './Result';

function Question({ question, choices, answer, checkAnswer, nextQuestion }) {
    const [response, setResponse] = useState('');
    const [answered, setAnswered] = useState(false);

    const handleChange = (e) => {
        setResponse(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        checkAnswer(response);
        setAnswered(true);
    };

    return choices ? (
        <div>
            <p>{question}</p>
            {choices.map((choice) => (
                <Choices key={choice}>
                    <input
                        type="radio"
                        value={choice}
                        checked={response === choice}
                        onChange={(e) => handleChange(e)}
                    />
                    <label>{choice}</label>
                    <br />
                </Choices>
            ))}
            <br />
            <br />
            {answered ? (
                <>
                    <Result answer={answer} response={response} />
                    <br />
                    <Button onClick={() => nextQuestion()}>
                        Next Question
                    </Button>
                </>
            ) : (
                <Button type="submit" onClick={(e) => handleSubmit(e)}>
                    Submit
                </Button>
            )}
        </div>
    ) : (
        <p>Loading...</p>
    );
}

export default Question;

const Button = styled.button`
    font-weight: 700;
    font-size: 16px;
    color: #ffffff;
    padding: 10px;
    border: 4px solid #20bf6b;
    background-color: #20bf6b;
    border-radius: 6px;
    cursor: pointer;
    margin: 15px 0;
`;

const Choices = styled.div`
    padding: 3px 0;
`;
