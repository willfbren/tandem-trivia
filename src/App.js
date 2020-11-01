import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import QuestionsContainer from './containers/QuestionsContainer';

function App() {

    const [game, setGame] = useState(false);

    let handleStart = () => {
        setGame(true)
    }

    return game ? <QuestionsContainer /> : <StartScreen handleStart={handleStart} />;
}

export default App;
