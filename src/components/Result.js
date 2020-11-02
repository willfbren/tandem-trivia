import React from 'react';

function Result({ answer, response }) {
    return answer === response
        ? 'Correct'
        : `Incorrect. The answer was ${answer}`;
}

export default Result;
