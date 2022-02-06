import React, { useEffect } from 'react';
import Box from './Box';
import styled from 'styled-components';

interface BoxesProps {
  stage: number;
}

const Boxes = ({ stage }: BoxesProps) => {
  useEffect(() => {
    console.log(Math.round((stage + 0.5) / 2) + 1);
    console.log(Math.pow(Math.round((stage + 0.5) / 2) + 1, 2));
  }, [stage]);

  return (
    <Container>
      {[
        {
          id: 0,
        },
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
        {
          id: 5,
        },
        {
          id: 6,
        },
        {
          id: 7,
        },
        {
          id: 8,
        },
      ].map((box) => (
        <Box key={box.id} />
      ))}
    </Container>
  );
};

export default Boxes;

const Container = styled.div`
  width: 360px;
  height: 360px;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
`;
