import React, { ReactElement } from "react";
import { useLocation, useParams } from "react-router-dom";

import GirlsWaiting from "@sections/GirlsWaiting";

import AboutUs from "../Main/AboutUs";
//import LatestPosts from '../Main/LatestPosts';
import EscortsList from "@pages/Services/EscortsList";
import RecommendedContainer from "@containers/RecommendedContainer";
//import HeroContainer from '@containers/HeroContainer';
import WhatIs from "./WhatIs";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}
const Services = ({}: Props): ReactElement => {
  const { slug } = useParams();
  return (
    <>
      {/*}      <HeroContainer />{*/}
      <WhatIs service={slug} />
      <EscortsList />
      <AboutUs />
      <RecommendedContainer title="Recommended" />
      {/* Hidden until Milestone 2 */}
      {/* <LatestPosts /> */}
      <GirlsWaiting />
    </>
  );
};
export default Services;
