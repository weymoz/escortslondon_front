import React, { useState } from "react";
import Arrow from "@svg/arrow-right.svg";
import Button from "@simple/Button";
import s from "./style.module.css";
import { MenuItem } from "@typedefs/app";
import ArrowDown from "@svg/arrow-down.svg";
import ArrowUp from "@svg/arrow-up.svg";
import { useDispatch } from "react-redux";
import { escortsByServiceClean } from "@store/service";
import Link from "next/link";
interface Props {
  menu: MenuItem[];
  handleToggleAside(): void;
  toggleAside: boolean;
}

const Aside = ({ menu, toggleAside, handleToggleAside }: Props) => {
  const [submenuIsOpen, setSubmenuIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    handleToggleAside();
    //dispatch(escortsByServiceClean());
  };
  const handleSubmenuContainerClick = () => {
    setSubmenuIsOpen(!submenuIsOpen);
  };

  return (
    <aside
      className={`${s.aside} ${toggleAside ? s.active : ""}`}
      onClick={handleClick}
    >
      <div className={s.menuWrapper} onClick={(e) => e.stopPropagation()}>
        <ul>
          {menu.map(({ title, slug, subMenu }) =>
            subMenu ? (
              <li
                onClick={handleSubmenuContainerClick}
                className={s.submenuContainer}
                key={slug}
              >
                <button type="button">
                  {title}&nbsp;{" "}
                  <ArrowDown className={submenuIsOpen ? s.rotate180 : false} />
                </button>
                <ul className={s.submenu}>
                  {submenuIsOpen &&
                    subMenu.map(({ title, slug }) => (
                      <li key={title}>
                        <Link href={`/service/${slug}`}>
                          <a onClick={handleClick}>{title}</a>
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
            ) : (
              <li key={slug}>
                {title === "Blog" ? (
                  <a onClick={handleToggleAside} href={slug}>
                    {title}
                  </a>
                ) : (
                  <Link href={slug}>
                    <a onClick={handleClick}>{title}</a>
                  </Link>
                )}
              </li>
            )
          )}
          <li className={s.buttonContainer}>
            <Button>
              <Link href={`${process.env.NEXT_PUBLIC_PROXY_URL}/make-a-date`}>
                <a onClick={handleClick}>Make a date</a>
              </Link>
              <Arrow />
            </Button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
