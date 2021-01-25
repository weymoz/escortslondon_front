import React, { ReactElement, useEffect } from "react";
import ProfileNav from "@simple/ProfileNav";
import { connect } from "react-redux";
import { ContentTypes, Escort } from "@store/escorts";
import { RootState } from "@store/reducer";
import { addNextProfile, addPrevProfile } from "@store/profileNav";
import { profileClean } from "@store/profile";
import { EscortsDuo, ProfileType } from "@typedefs/app";

interface StateProps {
  nextTitle: string;
  prevTitle: string;
  prevSlug: string;
  nextSlug: string;
  profile: Escort;
  duoProfile: EscortsDuo;
}

interface DispatchProps {
  addNextProfile: (updatedAt: string, contentType: string) => void;
  addPrevProfile: (updatedAt: string, contentType: string) => void;
  profileClean: () => void;
}

interface OwnProps {
  profileType: ProfileType;
  contentType: string;
}

type Props = StateProps & DispatchProps & OwnProps;

function ProfileNavContainer({
  profile,
  duoProfile,
  nextTitle,
  prevTitle,
  nextSlug,
  prevSlug,
  addNextProfile,
  addPrevProfile,
  profileClean,
  profileType,
  contentType,
}: Props): ReactElement {
  useEffect(() => {
    if (profileType === "escort" && profile && profile.updatedAt) {
      addNextProfile(profile.updatedAt, contentType);
      addPrevProfile(profile.updatedAt, contentType);
    }
  }, [profile?.updatedAt]);

  useEffect(() => {
    if (profileType === "duo escort" && duoProfile && duoProfile.updatedAt) {
      addNextProfile(duoProfile.updatedAt, contentType);
      addPrevProfile(duoProfile.updatedAt, contentType);
    }
  }, [duoProfile?.updatedAt]);
  return (
    <ProfileNav
      next={nextTitle}
      prev={prevTitle}
      prevSlug={prevSlug && prevSlug.toLowerCase()}
      nextSlug={nextSlug && nextSlug.toLowerCase()}
      cleanCurrentProfileData={profileClean}
      profileType={profileType}
    />
  );
}

const mapState = (
  {
    profile: { data },
    duoProfile: { data: duoData },
    entities: {
      profileNav: { nextTitle, prevTitle, nextSlug, prevSlug },
    },
  }: RootState,
  { profileType, contentType }: OwnProps
) => ({
  nextTitle,
  prevTitle,
  nextSlug,
  prevSlug,
  profile: data,
  duoProfile: duoData,
  profileType,
  contentType,
});

const mapDispatch = (dispatch) => ({
  addNextProfile: (updatedAt: string, contentType: string) =>
    dispatch(addNextProfile(updatedAt, contentType)),
  addPrevProfile: (updatedAt: string, contentType: string) =>
    dispatch(addPrevProfile(updatedAt, contentType)),
  profileClean: () => dispatch(profileClean()),
});

export default connect(mapState, mapDispatch)(ProfileNavContainer);
