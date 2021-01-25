import React, { ReactElement, useEffect } from "react";
import Recommended from "@pages/Main/Recommended";
import { connect } from "react-redux";
import { addRecommended } from "@store/recommended";
import { profileClean } from "@store/profile";
import { RootState } from "@store/reducer";
import { Escort } from "@store/escorts";
import { CardLinkType, MainPageSettings } from "@typedefs/app";

interface StateProps {
  data: Escort[];
  profileTitle: string;
}

interface OwnProps {
  title: string;
  subTitle: string;
  cardLinkType: CardLinkType;
}

interface DispatchProps {
  addRecommended: () => void;
  profileClean: () => void;
}

type Props = StateProps & OwnProps & DispatchProps;

function RecommendedContainer({
  title = "Recommended",
  subTitle,
  profileTitle,
  addRecommended,
  data,
  profileClean,
  cardLinkType,
}: Props): ReactElement {
  useEffect(() => {
    addRecommended();
  }, [profileTitle]);
  return (
    <Recommended
      title={title}
      subTitle={subTitle}
      data={data}
      profileClean={profileClean}
      cardLinkType={cardLinkType}
    />
  );
}

const mapState = (
  {
    profile: { data: profileData },
    entities: {
      recommended: { data },
    },
  }: RootState,
  { title, subTitle, cardLinkType }: OwnProps
) => ({
  profileTitle: profileData ? profileData.title : "",
  data,
  title,
  subTitle,
  cardLinkType,
});

export default connect(mapState, { addRecommended, profileClean })(
  RecommendedContainer
);
