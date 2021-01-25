import React, { FC } from "react";

import Title from "@simple/Title";
import WelcomeImage from "@svg/welcome.svg";

import s from "./style.module.css";

interface Props {
  welcomeTitle: string;
  welcomeText: string;
}
const Welcome: FC<Props> = ({ welcomeTitle, welcomeText }) => (
  <section className={s.welcome}>
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.titleWrapper}>
          <Title size="h2">
            {welcomeTitle || "Welcome to Escorts London!"}
          </Title>
        </div>
        <p>
          {welcomeText ||
            `
          We have prepared some of London’s hottest and personable babes for
          you. Most men only see such beauty on TV but we can make your fantasy
          a reality. Our babes do not only want to meet you, they are willing to
          sexually give you the treat of your life. You deserve it! You will
          enjoy the ride!
            `}
        </p>
      </div>
      <div className={s.image}>
        <WelcomeImage />
      </div>
    </div>
  </section>
);
export default Welcome;
