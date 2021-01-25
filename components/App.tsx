import Main from '@pages/Main';
import Aside from '@sections/Aside';
import Footer from '@sections/Footer';
import Header from '@sections/Header';
import Layout from '@sections/Layout';
import Services from '@pages/Services';
import NotFound from '@sections/NotFound';
import noScroll from 'no-scroll';
import React, { useState, useEffect, useMemo } from 'react';
import { hot } from 'react-hot-loader/root';
import { useMediaQuery } from 'react-responsive';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { EL_PROFILE_ROUTE, EL_MAKE_A_DATE_ROUTE } from './app-constants';
import ScrollToTop from '@simple/ScrollToTop';
import ProfilePage from '@pages/ProfilePage';
import TermsOfService from '@pages/TermsOfService';
import FAQ from '@pages/FAQ';
import DuoGirls from '@pages/DuoGirls';
import ProfileDuoPage from '@pages/ProfileDuoPage';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addSettings } from '@store/settings';
import MakeDate from '@pages/MakeDate';
import DuoMakeDate from '@pages/DuoMakeDate';
import Casting from '@pages/Casting';
import { RootState } from '@store/reducer';
import { addServicesMenuData, selectServicesMenuData } from '@store/service';
import { MenuItem } from '@typedefs/app';
import { Menu } from '@data/nav';

const App = () => {
  const [toggleAside, setToggleAside] = useState(false);
  const isTablet = useMediaQuery({ query: '(max-width: 1240px)' });
  const dispatch = useDispatch();

  const servicesSubMenu = useSelector<RootState, MenuItem[]>(
    selectServicesMenuData,
  );

  useEffect(() => {
    dispatch(addSettings());
    dispatch(addServicesMenuData());
  }, []);

  const menu = useMemo(() => {
    const menu = new Menu();
    menu.addSubMenu('services', servicesSubMenu);
    return menu.items;
  }, [servicesSubMenu]);

  const handleToggleAside = () => {
    setToggleAside(!toggleAside);
    noScroll.toggle();
  };

  const closeAside = () => {
    setToggleAside(false);
    noScroll.off();
  };

  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Header
          menu={menu}
          toggleAside={toggleAside}
          handleToggleAside={handleToggleAside}
          closeAside={closeAside}
        />

        {isTablet ? (
          <Aside
            menu={menu}
            toggleAside={toggleAside}
            handleToggleAside={handleToggleAside}
          />
        ) : null}
        <Switch>
          {/* <Route path={`${EL_MAKE_A_DATE_ROUTE}`}>
            <MakeADate />
          </Route>
  */}
          <Route path={`${EL_PROFILE_ROUTE}/:profileId`}>
            <ProfilePage />
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/terms">
            <TermsOfService />
          </Route>
          <Route exact path="/faq">
            <FAQ />
          </Route>
          <Route exact path="/make-a-date">
            <MakeDate />
          </Route>
          <Route exact path="/duo-make-a-date">
            <DuoMakeDate />
          </Route>

          <Route exact path="/services/:slug">
            <Services />
          </Route>
          <Route exact path="/duo-girls">
            <DuoGirls />
          </Route>
          <Route exact path="/profile-duo/:slug">
            <ProfileDuoPage />
          </Route>
          <Route exact path="/casting">
            <Casting />
          </Route>
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Layout>
    </Router>
  );
};

export default hot(App);
