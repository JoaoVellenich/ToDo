import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import * as C from "./styles";
import { ITask } from "../../types/Task";

type Props = {};

const Data: ITask[] = [
  {
    id: 5,
    name: "TaskTaskTaskTaskTaskTaskTaskTaskTaskTasTaskTaskTaks",
    createdAt: "2023-12-21T20:50:27.000Z",
    completedAt: null,
    updatedAt: "2023-12-21T20:50:27.000Z",
    excludeAt: null,
    ownerId: 13,
  },
  {
    id: 6,
    name: "Task 132",
    createdAt: "2023-12-21T20:50:27.000Z",
    completedAt: "null",
    updatedAt: "2023-12-21T20:50:27.000Z",
    excludeAt: null,
    ownerId: 13,
  },
];

const Home = (props: Props) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    Data.reduce((acc: any, item: any) => {
      acc[item.id] = item.completedAt !== null; // Inicializa todos como desmarcados
      return acc;
    }, {})
  );
  const [orderedItems, setOrderedItems] = useState<ITask[]>(Data);

  const [completed, setCompleted] = useState([]);
  const [todo, setTodo] = useState([]);

  const toggleCheckbox = (itemId: number) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemId]: !prevCheckedItems[itemId],
    }));
  };

  const divideTasks = () => {
    const completed: JSX.Element[] = [];
    const todo: JSX.Element[] = [];
    orderedItems.map((dado: any) => {
      if (checkedItems[dado.id]) {
        completed.push(
          <C.TaskBox isChecked={checkedItems[dado.id]}>
            <C.TaskCheckBox
              type="checkbox"
              checked={checkedItems[dado.id]}
              onChange={() => {
                toggleCheckbox(dado.id);
              }}
            ></C.TaskCheckBox>
            <C.TaskTitleBox>
              <C.TaskTitle>{dado.name}</C.TaskTitle>
            </C.TaskTitleBox>
            <C.DeleteButton>
              <FontAwesomeIcon icon={faTrash} />
            </C.DeleteButton>
          </C.TaskBox>
        );
      } else {
        todo.push(
          <C.TaskBox isChecked={checkedItems[dado.id]}>
            <C.TaskCheckBox
              type="checkbox"
              checked={checkedItems[dado.id]}
              onChange={() => {
                toggleCheckbox(dado.id);
              }}
            ></C.TaskCheckBox>
            <C.TaskTitleBox>
              <C.TaskTitle>{dado.name}</C.TaskTitle>
            </C.TaskTitleBox>
            <C.DeleteButton>
              <FontAwesomeIcon icon={faTrash} />
            </C.DeleteButton>
          </C.TaskBox>
        );
      }
    });
    return [completed, todo];
  };

  const formatContent = () => {
    const tasks = divideTasks();
    return (
      <>
        <C.TasksListContainer>
          <C.ListTitle>A fazer</C.ListTitle>
          {tasks[1]}
        </C.TasksListContainer>
        <C.TasksListContainer>
          <C.ListTitle>Completas</C.ListTitle>
          {tasks[0]}
        </C.TasksListContainer>
      </>
    );
  };

  return (
    <C.PageContainer>
      <C.ContentContainer>
        <C.PageHeader>Lista</C.PageHeader>
        <C.InputContainer>
          <C.InputText></C.InputText>
          <C.AddButton>Adicionar</C.AddButton>
        </C.InputContainer>
      </C.ContentContainer>
      <C.TasksContainer>{formatContent()}</C.TasksContainer>
    </C.PageContainer>
  );
};

export default Home;
