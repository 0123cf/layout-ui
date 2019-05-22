import styled, { css } from 'styled-components';

const leftRightTopBottom = css`
  display: flex;
  position: absolute;
`;

const leftRight = css`
  flex-direction: row;
  cursor: ew-resize;
`;

const topBottom = css`
  flex-direction: column;
  cursor: ns-resize;
`;

export const Container = styled.div`
  position: relative;
`;

export const Left = styled.div`
  ${leftRightTopBottom} ${leftRight};
`;

export const Right = styled.div`
  ${leftRightTopBottom} ${leftRight};
`;

export const Top = styled.div`
  ${leftRightTopBottom} ${topBottom};
`;

export const Bottom = styled.div`
  ${leftRightTopBottom} ${topBottom};
`;

export const NumberBox = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

export const Input = styled.input`
  outline: none;
  width: calc(100% - 5px);
  height: calc(100% - 8px);
  text-align: center;
  border: none;
  background-color: transparent;
`;

export const ButtonContainer = styled.div`
  overflow: hidden;
`;

export const ButtonTriangle = styled.div`
  transition: all 0.2s;
  user-select: none;
  ${(props: any) => {
    switch (props.theme.position) {
      case 'left':
        return `
          border-right-color: rgb(207, 226 ,243);
          &:hover {
              border-right-color: rgba(196, 223, 184);
          }
        `;
      case 'top':
        return `
          border-bottom-color: rgb(207, 226 ,243);
          &:hover {
              border-bottom-color: rgba(196, 223, 184);
          }
        `;
      case 'right':
        return `
          border-left-color: rgb(207, 226 ,243);
          &:hover {
              border-left-color: rgba(196, 223, 184);
          }
        `;
      case 'bottom':
        return `
          border-top-color: rgb(207, 226 ,243);
          &:hover {
              border-top-color: rgba(196, 223, 184);
          }
        `;
    }
  }};
`;
