import styled from "styled-components";

export const Button = styled.button`
  width: 50%;
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid #3498db;
  border-radius: 5px;
  color: #3498db;
  background-color: #fff;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  &:hover {
    background-color: #3498db;
    color: #fff;
  }
`;
