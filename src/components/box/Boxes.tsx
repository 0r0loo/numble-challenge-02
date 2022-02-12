import React, { MouseEventHandler, useEffect, useMemo } from 'react';
import Box from './Box';
import styled, { css } from 'styled-components';

interface IBoxesProps {
  stage: number;
  boxes: Array<{
    id: number;
    box: {
      color: {
        r: number;
        g: number;
        b: number;
      };
      isCorrect: boolean;
      onClick: MouseEventHandler<HTMLDivElement>;
    };
  }>;
}

const Boxes = ({ stage, boxes }: IBoxesProps) => {
  return (
    <Container rowCnt={Math.round((stage + 0.5) / 2) + 1}>
      {boxes.map((box) => (
        <Box key={box.id} box={box.box} />
      ))}
    </Container>
  );
};

export default Boxes;

const Container = styled.div<{ rowCnt: number }>`
  width: 360px;
  height: 360px;
  display: grid;
  grid-template-rows: ${({ rowCnt }) => css`
     repeat(${rowCnt}, 1fr); 
  `};
  grid-template-columns: ${({ rowCnt }) => css`
     repeat(${rowCnt}, 1fr);
  `};
  gap: 2px;
`;
