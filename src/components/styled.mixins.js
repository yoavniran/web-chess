import { css } from "styled-components";

export const clickableMixin = css`
  cursor: ${({ $clickable }) => ($clickable || $clickable === undefined) ?
          "pointer" : "default"};
`;
