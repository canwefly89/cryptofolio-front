import styled from "styled-components";

const Button = styled.button`
  margin-top: ${(props) => (props.margin && props.margin[0]) || "0"};
  margin-right: ${(props) => (props.margin && props.margin[1]) || "0"};
  margin-bottom: ${(props) => (props.margin && props.margin[2]) || "0"};
  margin-left: ${(props) => (props.margin && props.margin[3]) || "0"};
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  background-color: ${(props) => props.bgColor || "#3742fa"};
  font-weight: ${(props) => props.fontWeight || "600"};
  font-size: ${(props) => props.fontSize || "0.8rem"};
  color: ${(props) => props.color || "white"};
  /* text-transform: uppercase; */
  /* transition: all 0.1s ease-in-out; */
  cursor: pointer;

  /* :hover {
    transform: scale(1.02, 1.02);
  } */

  :focus {
    outline: none;
  }
`;

export default Button;
