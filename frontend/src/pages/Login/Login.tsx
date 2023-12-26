import React, { useState } from "react";

import * as C from "./styles";
import { useNavigate } from "react-router";
import Logo from "../../components/Logo/Logo";
import ButtonComponent from "../../components/Button/Button";
import { loginUser } from "../../services/api/Ueser";

type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const loginResponse = await loginUser(email, password);
      sessionStorage.setItem("Token", loginResponse.data.token);
      navigate("/");
    } catch (error: any) {
      setError("Usuário invalido");
      setTimeout(() => [setError("")], 2500);
    }
  };

  const handleSingUp = () => {
    navigate("/register");
  };

  return (
    <C.LoginPageContainer>
      <Logo />
      <C.InputPartContainer>
        <C.InputBoxContainer>
          <C.LoginText>Login</C.LoginText>
          <C.InputArea>
            <C.InputField
              placeholder="Email"
              onChange={handleEmailChange}
            ></C.InputField>
          </C.InputArea>
          <C.InputArea>
            <C.InputField
              placeholder="Senha"
              type="password"
              onChange={handlePasswordChange}
            ></C.InputField>
          </C.InputArea>
          {error !== "" && <C.ErrorMessage>{error}</C.ErrorMessage>}
          <C.ButtonArea>
            <ButtonComponent name="Enviar" functionsCall={handleSubmit} />
            <ButtonComponent name="Cadastrar" functionsCall={handleSingUp} />
          </C.ButtonArea>
        </C.InputBoxContainer>
      </C.InputPartContainer>
    </C.LoginPageContainer>
  );
};

export default Login;
