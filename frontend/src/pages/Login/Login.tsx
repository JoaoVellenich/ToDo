import React, { useState } from "react";

import * as C from "./styles";
import { useNavigate } from "react-router";
import Logo from "../../components/Logo/Logo";
import ButtonComponent from "../../components/Button/Button";

type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSubmit = () => {
    console.log(email, password);
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
