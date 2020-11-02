import React from 'react';
import styled from 'styled-components';

const StartScreen = ({ handleStart }) => (
    <div>
        <h1>Tandem Trivia</h1>
        <Button variant="primary" onClick={() => handleStart()}>
            Start Game
        </Button>
    </div>
);

export default StartScreen;

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
