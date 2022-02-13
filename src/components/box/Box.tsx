import React, { MouseEventHandler } from "react";
import styled, { css } from "styled-components";

interface IBoxProps {
  box: {
    color: {
      r: number;
      g: number;
      b: number;
    };
    isCorrect: boolean;
    onClick: MouseEventHandler<HTMLDivElement>;
  };
}

const Box = ({ box }: IBoxProps) => {
  return (
    <Container
      onClick={box.onClick}
      isCorrect={box.isCorrect}
      r={box.color.r}
      g={box.color.g}
      b={box.color.b}
    />
  );
};

export default React.memo(Box);

const Container = styled.div<{
  isCorrect: boolean;
  r: number;
  g: number;
  b: number;
}>`
  background: ${({ r, g, b }) => css`
    rgb(${r}, ${g}, ${b});
  `};
`;
