import styled from "styled-components";
import { colors, measurments } from "../utils/config";

const StyledButton = styled.button`
  cursor: pointer;
  font-family: "Inter", sans-serif;
  padding: 0.5rem 1rem;
  border: none;
  color: white;
  background: ${colors.primary.main};
  border-radius: ${measurments.borderRadius}px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: 100ms ease-in-out;
  &:hover {
    background: ${colors.neutral[100]};
  }
  &:disabled {
    background: ${colors.neutral[50]};
    cursor: initial;
  }
`;

const Button = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
