import React, { useState } from 'react';
import styled from 'styled-components';
import StartScreen from './components/StartScreen';
import TriviaContainer from './containers/TriviaContainer';

function App() {
    const [game, setGame] = useState(false);

    const handleStart = () => {
        setGame(true);
    };

    // ugly hack to reset game start and refetch new questions
    const restart = () => {
        setGame(false);
    };

    return (
        <Container>
            <Content>
                {game ? (
                    <TriviaContainer restart={restart} />
                ) : (
                    <StartScreen handleStart={handleStart} />
                )}
            </Content>
        </Container>
    );
}

export default App;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 350px;
`;

const Content = styled.div`
    width: 50%;
    height: 50%;
    text-align: center;
`;
