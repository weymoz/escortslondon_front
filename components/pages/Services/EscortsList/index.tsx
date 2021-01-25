import React, { ReactElement, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import Card from "@simple/Card";
import EscortNotFound from "@simple/EscortNotFound";
import s from "./style.module.css";
import EscortsListContent from "./EscortsListContent";
import EscortsListContentServices from "../../Services/EscotsListContentServices";
import {
  addEscortsByService,
  selectEscortsByService,
  EscortsByNameSlice,
} from "@store/service";
import { RootState } from "@store/reducer";
import Preloader from "@simple/Preloader";
import LoadMoreButton from "@simple/LoadMoreButton";
import { useRouter } from "next/router";
import { ServicePageSettings } from "@typedefs/app";

interface Props {}

export default function EscortsList({}: Props): ReactElement | null {
  const dispatch = useDispatch();
  const { query } = useRouter();

  const { list, skip, total } = useSelector<RootState, EscortsByNameSlice>(
    selectEscortsByService
  );

  const loadMore = useMemo(() => skip < total, [skip]);

  const handleLoadMore = () => {
    dispatch(addEscortsByService(query.slug as string, skip, 24));
  };

  return (
    <section className={s.londonEscorts}>
      <div className={s.container}>
        <EscortsListContentServices />
        <div className={s.cardsList}>
          {list.map(
            ({
              id,
              title,
              thumbnail,
              location,
              incallRate,
              outcallRate,
              newTag,
              recommendedTag,
            }) => (
              <div key={title}>
                <Card
                  id={id}
                  title={title}
                  imageUrl={thumbnail}
                  location={location}
                  incallPrice={incallRate}
                  outcallPrice={outcallRate}
                  newTag={newTag}
                  recommendedTag={recommendedTag}
                />
              </div>
            )
          )}
        </div>
        <div className={s.btnWrapper}>
          <LoadMoreButton loadMore={loadMore} onLoadMore={handleLoadMore} />
          {/*true && (
            <Button
              style={{
                backgroundColor: showMoreButton ? '#FA1D52' : '#E7E7E7',
                color: showMoreButton ? 'white' : 'black',
              }}
              onClick={
                showMoreButton
                  ? loadMore.bind(null, { limit, skip })
                  : () =>
                      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
              }
              size="md"
            >
              {showMoreButton ? 'Show more' : 'Scroll to top'}
            </Button>
          )*/}
        </div>
      </div>
    </section>
  );
}
