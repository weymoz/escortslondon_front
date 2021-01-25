import React, { FC } from "react";

import Title from "@simple/Title";
import SearchContainer from "@containers/SearchContainer";

import s from "./style.module.css";

interface Props {
  title: string;
  message: string;
}

const EscortsListContent: FC<Props> = ({ title, message }: Props) => {
  return (
    <div className={s.contentWrapper}>
      <div className={s.titleWrapper}>
        <Title content={title || "Naughty and Discrete"}>{message}</Title>
      </div>
      <SearchContainer className={s.searchContainer} />
    </div>
  );
};

export default EscortsListContent;
