import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import * as C from "./styles";
import { ITask } from "../../types/Task";
import { checkTask, createTask, getTasks } from "../../services/api/Task";

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();

  const [orderedItems, setOrderedItems] = useState<ITask[]>([]);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [newTask, setNewTask] = useState("");
  const [newTaskError, setNewTaskError] = useState("");

  const initializeCheckedItems = () => {
    const initializedState = orderedItems.reduce((acc: any, item: any) => {
      acc[item.id] = item.completedAt !== null; // Inicializa todos como desmarcados
      return acc;
    }, {});

    setCheckedItems(initializedState);
  };

  const handleNewTasChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNewTask(event.target.value);
  };

  const submitNewTask = async () => {
    try {
      const createResponse = await createTask(newTask);
      setOrderedItems((prevCheckedItems) => [
        ...prevCheckedItems,
        createResponse.data,
      ]);
    } catch (error: any) {
      if (error.response.status === 403) {
        sessionStorage.removeItem("Token");
        navigate("/login");
        return;
      }
      setNewTaskError("Nome invalido");
      setTimeout(() => {
        setNewTaskError("");
      }, 2500);
    }
  };

  const toggleCheckbox = async (itemId: number) => {
    if (checkedItems[itemId]) {
      // Dischedked
    } else {
      try {
        await checkTask(itemId);
      } catch (error) {
        console.log(error);
      }
    }
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
          <C.TaskBox key={dado.id} isChecked={checkedItems[dado.id]}>
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
          <C.TaskBox key={dado.id} isChecked={checkedItems[dado.id]}>
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTasks();
        setOrderedItems(response.data);
      } catch (error: any) {
        if (error.response.status === 403) {
          sessionStorage.removeItem("Token");
          navigate("/login");
          return;
        }
      }
    };
    fetchData();
  }, [navigate]);

  useEffect(() => {
    initializeCheckedItems();
  }, [orderedItems]);

  return (
    <C.PageContainer>
      <C.ContentContainer>
        <C.PageHeader>Lista</C.PageHeader>
        <C.InputContainer>
          <C.InputText onChange={handleNewTasChange}></C.InputText>
          <C.AddButton onClick={submitNewTask}>Adicionar</C.AddButton>
        </C.InputContainer>
        {newTaskError !== "" && <C.ErrorMessage>{newTaskError}</C.ErrorMessage>}
      </C.ContentContainer>
      <C.TasksContainer>{formatContent()}</C.TasksContainer>
    </C.PageContainer>
  );
};

export default Home;
