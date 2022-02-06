import React, { useEffect, useState } from 'react';
import './App.css';
import Boxes from './components/box/Boxes';
import styled from 'styled-components';
import useTimer from './hooks/useTimer';

function App() {
  const { remainingTime } = useTimer({});
  const [stage, setStage] = useState(1);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (remainingTime <= 0) {
      alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
      setStage(1);
      setScore(0);
    }
  }, [remainingTime, stage, score]);

  return (
    <Container>
      <Header>
        스테이지 : {stage} 남은시간 : {remainingTime} 점수 : {score}
      </Header>
      <Boxes stage={stage} />
    </Container>
  );
}

export default App;

const Container = styled.div``;

const Header = styled.div``;
