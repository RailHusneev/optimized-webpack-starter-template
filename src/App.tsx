import React, { FC } from "react";

import Test from './images/1.jpg';

type PropsType = {};

export const App: FC<PropsType> = () => {
  return <img src={Test} alt="test" />;
};
