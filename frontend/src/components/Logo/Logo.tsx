import React from "react";

import * as C from "./styles";

type Props = {};

const Logo = (props: Props) => {
  return (
    <C.LogoContainer>
      <C.LogoText>ToDo</C.LogoText>
      <C.DescriptionText>Faça a sua lista de afazeres</C.DescriptionText>
    </C.LogoContainer>
  );
};

export default Logo;
