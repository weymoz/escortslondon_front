import React, { ReactElement, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "@store/reducer";
import { Escort } from "@store/escorts";
import { addProfile, profileClean } from "@store/profile";
import { Action } from "redux";
import Profile from "@sections/Profile";
import { addEscort1DateData, setEscort1Name } from "@store/escortDate";
import { useRouter } from "next/router";

interface StateProps {
  data: Escort | null;
  loading: boolean;
}

interface DispatchProps {
  addProfile: (id: string) => void;
  addNextProfile: (updatedAt: string) => void;
  profileClean: () => void;
  setEscort1Name: (title: string) => void;
}

type Props = StateProps & DispatchProps;

interface UrlParams {
  profileId: string;
}

//React Component
function ProfileContainer({
  data,
  loading,
  addProfile,
  profileClean,
  setEscort1Name,
}: Props): ReactElement {
  const {
    query: { slug },
  } = useRouter();

  /*
  useEffect(() => {
    profileClean();
    addProfile(slug as string);
  }, [slug]);
   */

  return (
    <Profile loading={loading} data={data} setEscort1Name={setEscort1Name} />
  );
}

const mapState = ({ profile: { data, loading } }: RootState): StateProps => ({
  data,
  loading,
});

const mapDispatch = (dispatch: (a: Action) => void) => ({
  addProfile: (id: string) => dispatch(addProfile(id)),
  profileClean: () => dispatch(profileClean()),
  addEscort1DateData: (title: string): void =>
    dispatch(addEscort1DateData(title)),
  setEscort1Name: (title: string) => dispatch(setEscort1Name(title)),
});

export default connect(mapState, mapDispatch)(ProfileContainer);
