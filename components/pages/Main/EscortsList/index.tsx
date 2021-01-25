import React, { ReactElement } from "react";

import Button from "@simple/Button";
import Card from "@simple/Card";
import EscortNotFound from "@simple/EscortNotFound";

import s from "./style.module.css";
import { Escort } from "@store/escorts";
import { useRouter } from "next/router";

import EscortsListContent from "./EscortsListContent";
import EscortsListContentServices from "../../Services/EscotsListContentServices";
import { MainPageSettings } from "@typedefs/app";
import { useSelector } from "react-redux";
import { RootState } from "@store/reducer";
import { selectMainPageSettings } from "@store/mainPageSettings";

interface Props {
  escorts: Escort[];
  loadMore: (p: { limit: number; skip: number }) => void;
  total: number;
  skip: number;
  limit: number;
  showMoreButton: boolean;
  showFiltered: boolean;
  mainPageSettings: MainPageSettings;
}

export default function EscortsList({
  escorts,
  loadMore,
  total,
  limit,
  skip,
  showMoreButton,
  showFiltered,
}: Props): ReactElement | null {
  const { galleryTextLine1, galleryTextLine2 } = useSelector<
    RootState,
    MainPageSettings
  >(selectMainPageSettings);

  if (!escorts || escorts.length === 0) {
    if (showFiltered) {
      return <EscortNotFound />;
    } else {
      return null;
    }
  }

  return (
    <section className={s.londonEscorts}>
      <div className={s.container}>
        <EscortsListContent
          title={galleryTextLine1}
          message={
            showFiltered
              ? `We've found ${total} ${galleryTextLine2 || "London Escorts"}`
              : galleryTextLine2
          }
        />
        <div className={s.cardsList}>
          {escorts.map(
            ({
              id,
              title,
              imageUrl,
              location,
              incallPrice,
              outcallPrice,
              newTag,
              recommendedTag,
            }) => (
              <div key={title}>
                <Card
                  id={id}
                  title={title}
                  imageUrl={imageUrl}
                  location={location?.name}
                  incallPrice={incallPrice}
                  outcallPrice={outcallPrice}
                  newTag={newTag}
                  recommendedTag={recommendedTag}
                />
              </div>
            )
          )}
        </div>
        <div className={s.btnWrapper}>
          {true && (
            <Button
              style={{
                backgroundColor: showMoreButton ? "#FA1D52" : "#E7E7E7",
                color: showMoreButton ? "white" : "black",
              }}
              onClick={
                showMoreButton
                  ? loadMore.bind(null, { limit, skip })
                  : () =>
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
              }
              size="md"
            >
              {showMoreButton ? "Show more" : "Scroll to top"}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
