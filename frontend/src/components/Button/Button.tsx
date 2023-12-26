import React from "react";

import * as C from "./styles";

type Props = {
  name: string;
  functionsCall: any;
};

const ButtonComponent = (props: Props) => {
  return <C.Button onClick={props.functionsCall}>{props.name}</C.Button>;
};

export default ButtonComponent;
