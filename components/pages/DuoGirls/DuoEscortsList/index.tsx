import React, { useEffect } from "react";

import Title from "@simple/Title";
import Button from "@simple/Button";
import DuoCard from "./DuoCard";

import s from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addEscortsDuo, EscortsDuoStateSlice } from "@store/duoEscorts";
import { RootState } from "@store/reducer";

interface Props {
  galleryTextLine1: string;
  galleryTextLine2: string;
  galleryTextLine3: string;
}

const DuoEscortsList = ({
  galleryTextLine1,
  galleryTextLine2,
  galleryTextLine3,
}: Props) => {
  const dispatch = useDispatch();
  const { list, skip, allLoaded } = useSelector<RootState>(
    (state) => state.duoEscorts
  ) as EscortsDuoStateSlice;

  useEffect(() => {
    if (list.length === 0) dispatch(addEscortsDuo(24, 0));
  }, []);

  const handleClick = () => {
    dispatch(addEscortsDuo(24, skip));
  };

  return (
    <section className={s.duoEscortsList}>
      <div className={s.container}>
        <div className={s.contentWrapper}>
          <Title content={galleryTextLine1 || "Naughty and Discrete"}>
            {galleryTextLine2 || "Welcome to our Duo gallery"}
          </Title>
          <p>
            {galleryTextLine3 ||
              `
            Sometimes you just want something a little different. So choose an
            escort duo for double the fun!
              `}
          </p>
        </div>
        <div className={s.girlsList}>
          {list.map((item) => (
            <DuoCard data={item} />
          ))}
        </div>
        <div className={s.showMore}>
          <Button
            style={{
              backgroundColor: !allLoaded ? "#FA1D52" : "#E7E7E7",
              color: !allLoaded ? "white" : "black",
            }}
            onClick={
              !allLoaded
                ? handleClick
                : () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
            }
            size="md"
          >
            {!allLoaded ? "Show more" : "Scroll to top"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DuoEscortsList;
