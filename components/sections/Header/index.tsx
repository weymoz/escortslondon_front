import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@simple/Button";
import Logo from "@svg/el-logo.svg";
import cx from "classnames";
import ArrowDown from "@svg/arrow-down.svg";
import Arrow from "@svg/arrow-right.svg";
import Burger from "@svg/burger.svg";
import BurgerClose from "@svg/close-burger.svg";
import s from "./style.module.css";
import { cleanEscorts, addEscorts } from "@store/escorts";
import { cleanEscort1Data } from "@store/escortDate";
import { MainPageSettings, MenuItem } from "@typedefs/app";
import { escortsByServiceClean } from "@store/service";
import Link from "next/link";
import { getPhoneUrl } from "@functions/helpers";
import { RootState } from "@store/reducer";
import { selectMainPageSettings } from "@store/mainPageSettings";

interface Props {
  toggleAside: boolean;
  handleToggleAside(toggleNoScroll: boolean): void;
  menu: MenuItem[];
  closeAside(): void;
  phone: string;
}

const Header = ({
  closeAside,
  toggleAside,
  handleToggleAside,
  menu,
  phone,
}: Props) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    closeAside();
  };

  const handleMakeDateClick = () => {
    dispatch(cleanEscort1Data());
  };

  return (
    <header className={`${s.header} ${toggleAside ? s.openMenu : ""}`}>
      <div className={s.container}>
        <div className={s.leftSide}>
          <Link href="/">
            <a onClick={handleClick} className={s.logo}>
              <Logo />
            </a>
          </Link>
          <nav>
            <ul className={s.menu}>
              {menu.map(({ title, slug, subMenu }) =>
                subMenu ? (
                  <li key={slug}>
                    <button type="button">
                      {title}
                      <ArrowDown className={s.submenuArrow} />
                    </button>
                    <ul className={s.servicesLinks}>
                      {subMenu.map(({ title, slug }) => (
                        <li key={slug}>
                          <Link href={`/service/${slug}`}>
                            <a>{title} </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={slug}>
                    {title === "Blog" || title === "Terms of Service" ? (
                      <a href={slug}>{title}</a>
                    ) : (
                      <Link href={slug}>{title}</Link>
                    )}
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
        <div className={s.rightSide}>
          <div
            className={cx(s.contactWrapper, toggleAside && "asideMenuIsOpen")}
          >
            <img className={s.contactImage} src="/lips.png" alt="lips" />
            <div className={s.contact}>
              <p className={s.contactLabel}>Calls and SMS</p>
              <a className={s.contactTel} href={getPhoneUrl(phone)}>
                {phone || "079 079 00666"}
              </a>
            </div>
          </div>
          <div className={s.dateWrapper}>
            <Button
              onClick={handleMakeDateClick}
              link={`/make-a-date`}
              theme="outline"
            >
              Make a date
              <Arrow />
            </Button>
          </div>
          <button
            type="button"
            className={s.burger}
            onClick={handleToggleAside}
          >
            {toggleAside ? <BurgerClose /> : <Burger />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
