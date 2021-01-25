import { FC, useState, useEffect, useMemo, ReactElement } from "react";
import Head from "next/head";
import noScroll from "no-scroll";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import {
  selectServicesMenuData,
  addServicesMenuData,
} from "@store/servicesMenu";
import { addSettings } from "@store/settings";
import Header from "@sections/Header";
import { Menu } from "@functions/Menu";
import s from "./style.module.css";
import Aside from "@sections/Aside";
import { RootState } from "@store/reducer";
import { MainPageSettings, MenuItem } from "@typedefs/app";
import Footer from "@sections/Footer";

interface Props {
  callToActionFooterSiteDescription: string;
  callToActionFooterTitle: string;
  callToActionFooterText: string;
  termsFooter: string;
  phone: string;
  whatsApp: string;
}

const Layout: FC<Props> = ({
  callToActionFooterSiteDescription,
  callToActionFooterTitle,
  callToActionFooterText,
  termsFooter,
  phone,
  whatsApp,
  children,
}) => {
  const [toggleAside, setToggleAside] = useState(false);
  const isTablet = useMediaQuery({ query: "(max-width: 1240px)" });
  const dispatch = useDispatch();

  const servicesSubMenu = useSelector<RootState, MenuItem[]>(
    selectServicesMenuData
  );

  useEffect(() => {
    dispatch(addSettings());
    dispatch(addServicesMenuData());
  }, []);

  const menu = useMemo(() => {
    const menu = new Menu();
    menu.addSubMenu("service", servicesSubMenu);
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
    <main className={s.layout}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header
        menu={menu}
        toggleAside={toggleAside}
        handleToggleAside={handleToggleAside}
        closeAside={closeAside}
        phone={phone}
      />
      {isTablet ? (
        <Aside
          menu={menu}
          toggleAside={toggleAside}
          handleToggleAside={handleToggleAside}
        />
      ) : null}
      {children}
      <Footer
        callToActionFooterSiteDescription={callToActionFooterSiteDescription}
        callToActionFooterTitle={callToActionFooterTitle}
        callToActionFooterText={callToActionFooterText}
        phone={phone}
        whatsApp={whatsApp}
        termsFooter={termsFooter}
      />
    </main>
  );
};
export default Layout;
