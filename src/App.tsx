import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Boxes from './components/box/Boxes';
import styled from 'styled-components';
import useTimer from './hooks/useTimer';

function App() {
  const { remainingTime } = useTimer({});
  const [stage, setStage] = useState(1);
  const [score, setScore] = useState(0);

  const boxes = useMemo(() => {
    const boxCnt = Math.pow(Math.round((stage + 0.5) / 2) + 1, 2);
    const correct = Math.ceil(Math.random() * boxCnt);
    const tempBoxes = [];
    for (let i = 0; i < boxCnt; i++) {
      const boxObj = {
        id: i,
        box: {
          color: {
            r: 255,
            g: 212,
            b: 120,
          },
          isCorrect: false,
          onClick: () => {
            console.log('box 클릭');
          },
        },
      };
      if (i === correct) {
        boxObj.box.isCorrect = true;
        boxObj.box.onClick = () => {
          console.log('정답');
        };
      }
      tempBoxes.push(boxObj);
      // console.log(tempBoxes);
    }
    return tempBoxes;
  }, [stage]);

  useEffect(() => {
    if (remainingTime <= 0) {
      // alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
      setStage(1);
      setScore(0);
    }
  }, [remainingTime, stage, score]);

  return (
    <Container>
      <Header>
        스테이지 : {stage} 남은시간 : {remainingTime} 점수 : {score}
      </Header>
      <Boxes stage={stage} boxes={boxes} />
    </Container>
  );
}

export default App;

const Container = styled.div``;

const Header = styled.div``;
