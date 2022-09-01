import styled from "styled-components";
import { colors, measurments } from "../utils/config";

const StyledInput = styled.div`
  label,
  input {
    display: block;
  }
  label {
    font-size: 1rem;
    line-height: 1.5rem;
    color: ${colors.neutral[90]};
    font-weight: 500;
  }
  input {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid ${colors.neutral[60]};
    border-radius: ${measurments.borderRadius}px;
    font-size: 0.875rem;
    color: ${colors.neutral[100]};
    padding: 0.6rem;
  }
  .error {
    color: ${colors.danger.main};
    font-size: 0.8rem;
  }
`;

const Input = (props) => {
  const { label, id, error } = props;

  return (
    <StyledInput>
      {label && <label htmlFor={id}>{label}</label>}
      <input {...props} />
      {error && <p className="error m0 mbottom05">{error}</p>}
    </StyledInput>
  );
};

export default Input;
