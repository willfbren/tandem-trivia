import React, { useEffect } from 'react';

function App() {

    let getQuestions = (array, n) => {
        let random = array.sort(() => 0.5 - Math.random()).slice(0, n);
        console.log(random);
    };

    useEffect(() => {
        fetch('questions.json')
            .then(res => res.json())
            .then(data => {
                getQuestions(data, 10);
            });
    }, []);

    return <h1>Hello World</h1>;
}

export default App;
