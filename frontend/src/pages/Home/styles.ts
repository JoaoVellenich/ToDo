import styled from "styled-components";

interface TaskBoxProps {
  isChecked: boolean;
}

export const PageContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;

  background-color: #f2f2f2;

  align-items: center;
`;

export const ContentContainer = styled.div`
  width: 50%;
  height: fit-content;
  margin: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PageHeader = styled.h1`
  text-align: center;
  width: 100%;
`;

export const InputContainer = styled.div`
  width: 100%;
  height: 35px;

  margin-bottom: 5px;

  display: flex;
  justify-content: center;
`;

export const InputText = styled.input`
  width: 70%;
  height: 100%;

  text-align: center;
  font-size: 20px;

  box-sizing: border-box;

  border: 1px solid black;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const AddButton = styled.button`
  width: 20%;
  height: 100%;

  font-size: 20px;

  color: white;
  background-color: #3498db;

  border: 1px solid black;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;

  cursor: pointer;
`;

export const TasksContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ListTitle = styled.h1`
  width: 90%;
  text-align: center;

  top: 0;
  left: 0;
`;

export const TasksListContainer = styled.div`
  width: 45%;
`;

export const TaskBox = styled.div<TaskBoxProps>`
  width: 90%;
  height: 35px;

  margin: 5px;

  border: 1px solid black;
  border-radius: 10px;

  justify-content: center;
  /* align-items: center; */
  display: flex;
  background-color: ${(props) => (props.isChecked ? "#8FDB5E" : "white")};
`;

export const TaskCheckBox = styled.input`
  width: 5%;
`;

export const TaskTitleBox = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TaskTitle = styled.span`
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

export const DeleteButton = styled.button`
  width: 5%;
  background-color: #ff0000;
  color: #ffffff;
  border: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #cc0000;
  }
`;
