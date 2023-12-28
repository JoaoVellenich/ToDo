import React, { useState } from "react";
import { useNavigate } from "react-router";

import * as C from "./styles";
import Logo from "../../components/Logo/Logo";
import ButtonComponent from "../../components/Button/Button";
import { IUser } from "../../types/User";
import { registerUser } from "../../services/api/Ueser";

type Props = {};

const SingUp = (props: Props) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleChangeName = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(event.target.value);
  };
  const handleChangeEmail = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };
  const handleRegister = async () => {
    setError("");
    const user: IUser = {
      name,
      email,
      password,
    };
    try {
      await registerUser(user);
      navigate("/login");
      return;
    } catch (error: any) {
      if (error.response.status === 409) {
        setError("Email já cadastrado");
      } else if (error.response.status === 500) {
        setError("Erro no sistema tente novamente mais tarde");
      } else {
        switch (error.response.data.details[0].path[0]) {
          case "email":
            setError(`O email informado está errado`);
            break;
          case "name":
            setError("O nome infromado está errado");
            break;
          case "password":
            setError("A senha informada está errada");
            break;
          default:
            break;
        }
      }

      setTimeout(() => [setError("")], 2500);
    }
  };

  return (
    <C.SingUpPageContainer>
      <Logo />
      <C.SingUpContainer>
        <C.SingUpBox>
          <C.SingUpText>Crie a sua conta</C.SingUpText>
          <C.InputArea>
            <C.InputField
              placeholder="Nome"
              onChange={handleChangeName}
            ></C.InputField>
            <C.InputField
              placeholder="Email"
              onChange={handleChangeEmail}
            ></C.InputField>
            <C.InputField
              placeholder="Senha"
              onChange={handleChangePassword}
            ></C.InputField>
          </C.InputArea>
          {error !== "" && <C.ErrorMessage>{error}</C.ErrorMessage>}
          <C.ButtonBox>
            <ButtonComponent name="Cadastrar" functionsCall={handleRegister} />
            <ButtonComponent
              name="Voltar"
              functionsCall={() => {
                navigate("/login");
              }}
            />
          </C.ButtonBox>
        </C.SingUpBox>
      </C.SingUpContainer>
    </C.SingUpPageContainer>
  );
};

export default SingUp;
