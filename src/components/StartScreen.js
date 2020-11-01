import React from 'react';

const StartScreen = ({ handleStart }) => (
    <div>
        <h1>Tandem Trivia</h1>
        <button onClick={() => handleStart()}>Start Game</button>
    </div>
);

export default StartScreen;
