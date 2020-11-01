import React from 'react';

function Question({ question, answer, choices }) {
    return choices ? (
        <div>
            <p>{question}</p>
            {choices.map((choice) => (
                <p>{choice}</p>
            ))}
        </div>
    ) : (
        <p>Loading...</p>
    );
}

export default Question;
