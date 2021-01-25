import React, { ReactElement } from 'react';

import GirlsWaiting from '@sections/GirlsWaiting';

import Welcome from '../Main/Welcome';
import AboutUs from '../Main/AboutUs';
import LatestPosts from '../Main/LatestPosts';
import DuoEscortsList from './DuoEscortsList';
import RecommendedContainer from '@containers/RecommendedContainer';
import Hero from '@pages/DuoGirls/Hero';
import DuoHeroContainer from '@containers/DuoHeroContainer';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}
const Main = ({}: Props): ReactElement => (
  <>
    <DuoHeroContainer />
    <DuoEscortsList />
    <AboutUs title="Duo Gallery" />
    <RecommendedContainer title="Recommended" />
    {/* Hidden until Milestone 2 */}
    {/* <LatestPosts /> */}
    <GirlsWaiting />
  </>
);
Main.propTypes = {};
export default Main;
