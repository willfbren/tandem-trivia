import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import TriviaContainer from './containers/TriviaContainer';

function App() {
    const [game, setGame] = useState(false);

    const handleStart = () => {
        setGame(true);
    };

    return game ? (
        <TriviaContainer />
    ) : (
        <StartScreen handleStart={handleStart} />
    );
}

export default App;
