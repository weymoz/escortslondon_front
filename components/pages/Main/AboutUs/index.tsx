import React, { ReactElement } from "react";
import Button from "@simple/Button";
import Title from "@simple/Title";
import Lips from "@svg/lips.svg";
import Hours from "@svg/hours.svg";
import Diamond from "@svg/diamond.svg";
import Discretion from "@svg/discretion.svg";

import s from "./style.module.css";
import { AboutUsInfoBlock, MainPageSettings } from "@typedefs/app";

interface Props {
  title?: string;
  text?: string;
  leftColumnData: AboutUsInfoBlock[];
  rightColumnData: AboutUsInfoBlock[];
}

const Icon = ({ url }: { url: string }): ReactElement => (
  <div
    className={s.icon}
    style={{
      backgroundImage: `url(${url})`,
    }}
  ></div>
);

const InfoBlock = ({
  data,
}: {
  data: AboutUsInfoBlock;
  column: "left" | "right";
}): ReactElement => {
  return (
    <div className={s.card}>
      <div className={s.cardIcon}>
        <Icon url={data.iconUrl} />
      </div>
      <div className={s.cardTitle}>
        <Title size="h5">{data.title}</Title>
      </div>
      <p>{data.text}</p>
    </div>
  );
};

const AboutUs = ({
  title = "About us",
  text,
  leftColumnData,
  rightColumnData,
}: Props) => {
  return (
    <section className={s.aboutUs}>
      <div className={s.container}>
        <div className={s.column}>
          <div className={s.titleWrapper}>
            <Title size="h2">{title}</Title>
            <p>
              {text ||
                `
            Escorts London is the home of premium adult entertainment for classy
            Ladies and Gentlemen who want memorable experiences. You deserve
            nothing but the best, and that is why we handpick London’s best
            babes and groom them to give you an amazing experience.
            `}
            </p>
          </div>
          {leftColumnData &&
            leftColumnData.map((infoBlockData) => (
              <InfoBlock data={infoBlockData} />
            ))}
        </div>
        <div className={s.column}>
          {rightColumnData &&
            rightColumnData.map((infoBlockData) => (
              <InfoBlock data={infoBlockData} />
            ))}
        </div>
      </div>
    </section>
  );
};
export default AboutUs;
