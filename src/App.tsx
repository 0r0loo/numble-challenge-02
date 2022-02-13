import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import Boxes from './components/box/Boxes';
import styled from 'styled-components';
import useTimer from './hooks/useTimer';

function App() {
  const { remainingTime, resetTime, decreaseTime } = useTimer({});
  const [stage, setStage] = useState(1);
  const [score, setScore] = useState(0);

  const getRGB = useCallback((stage: number): Array<number> => {
    const rgbArr: Array<number> = [];
    const getRandomValue = () => Math.ceil(Math.random() * 255);

    for (let i = 0; i < 3; i++) {
      rgbArr.push(getRandomValue());
    }

    return rgbArr;
  }, []);

  const boxes = useMemo(() => {
    const boxCnt = Math.pow(Math.round((stage + 0.5) / 2) + 1, 2);
    const correct = Math.ceil(Math.random() * boxCnt);
    const tempBoxes = [];
    const [r, g, b] = getRGB(stage);
    for (let i = 1; i <= boxCnt; i++) {
      const boxObj = {
        id: i,
        box: {
          color: {
            r,
            g,
            b,
          },
          isCorrect: false,
          onClick: () => {
            decreaseTime(3);
          },
        },
      };
      if (i === correct) {
        boxObj.box.color.r += 51 - stage;
        boxObj.box.color.g += 51 - stage;
        boxObj.box.color.b += 51 - stage;

        if (boxObj.box.color.r > 255) {
          boxObj.box.color.r -= (51 - stage) * 2;
        }
        if (boxObj.box.color.g > 255) {
          boxObj.box.color.g -= (51 - stage) * 2;
        }
        if (boxObj.box.color.b > 255) {
          boxObj.box.color.b -= (51 - stage) * 2;
        }

        boxObj.box.isCorrect = true;
        boxObj.box.onClick = () => {
          setScore((prev) => prev + stage * remainingTime);
          setStage((prev) => prev + 1);
          resetTime();
        };
      }
      tempBoxes.push(boxObj);
    }
    return tempBoxes;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, resetTime]);

  useEffect(() => {
    if (stage > 50) {
      alert(`당신은 고수~ 점수: ${score}`);
      setStage(1);
      setScore(0);
      resetTime();
    }

    if (remainingTime <= 0) {
      alert(`GAME OVER!\n스테이지: ${stage}, 점수: ${score}`);
      setStage(1);
      setScore(0);
      resetTime();
    }
  }, [remainingTime, stage, score, resetTime]);

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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  padding: 20px;
  background-color: #f6bbbd;
  border-radius: 12px;
  width: 360px;
  margin-top: 30px;
  margin-bottom: 10px;
`;
