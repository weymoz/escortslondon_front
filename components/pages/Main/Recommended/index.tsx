import React, { ReactElement } from "react";
import { useMediaQuery } from "react-responsive";

import Title from "@simple/Title";
import Button from "@simple/Button";
import Card from "@simple/Card";

import Arrow from "@svg/arrow-right.svg";

import s from "./style.module.css";
import { Escort } from "@store/escorts";
import { shuffle } from "lodash";
import { CardLinkType, MainPageSettings } from "@typedefs/app";

interface Props {
  title: string;
  subTitle: string;
  data: Escort[];
  pageSettings: MainPageSettings;
  cardLinkType: CardLinkType;
}

const Recommended = ({
  title,
  subTitle,
  data,
  cardLinkType,
}: Props): ReactElement => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  // const isTablet = useMediaQuery({ query: '(max-width: 1023px)' });
  // const isDesktop = useMediaQuery({ query: '(max-width: 1439px)' });
  const bp1 = useMediaQuery({ query: "(min-width: 1008px)" });
  const bp1_1 = useMediaQuery({
    query: "(min-width: 1101px) and (max-width: 1109px)",
  });
  const bp2 = useMediaQuery({ query: "(min-width: 1400px)" });
  const bp3 = useMediaQuery({ query: "(min-width: 1668px)" });
  const bp4 = useMediaQuery({ query: "(min-width: 1800px)" });
  const bp5 = useMediaQuery({ query: "(min-width: 1963px)" });
  const bp6 = useMediaQuery({ query: "(min-width: 2292px)" });

  let limit = 6;

  if (bp1) {
    limit = 8;
  }
  if (bp1_1) {
    limit = 6;
  }
  if (bp2) {
    limit = 5;
  }
  if (bp3) {
    limit = 6;
  }
  if (bp4) {
    limit = 5;
  }
  if (bp5) {
    limit = 6;
  }
  if (bp6) {
    limit = 7;
  }

  return (
    <section className={s.recommended}>
      <div className={s.container}>
        <div className={s.content}>
          <div className={s.titleWrapper}>
            <Title content={title || "Naughty and Discrete"}>{subTitle}</Title>
          </div>
          {!isMobile ? (
            <div className={s.btnWrapper}>
              {/* Hidden until Milestone 2 */}
              {/* <Button theme="transparent">
                Show all girls
                <Arrow />
              </Button> */}
            </div>
          ) : null}
        </div>
        <div className={s.girlsList}>
          {shuffle(data)
            .slice(0, limit)
            .map((el, i) => (
              <div key={el.id}>
                <Card
                  id={el.id}
                  linkType={cardLinkType}
                  title={el.title}
                  imageUrl={el.imageUrl}
                  location={el.location?.name}
                  incallPrice={el.incallPrice}
                  outcallPrice={el.outcallPrice}
                  newTag={el.newTag}
                  recommendedTag={el.recommendedTag}
                />
              </div>
            ))}
        </div>
        {isMobile ? (
          <div className={s.btnWrapper}>
            {/* Hidden until Milestone 2 */}
            {/* <Button size="md">
              Show all girls
              <Arrow />
            </Button> */}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Recommended;
