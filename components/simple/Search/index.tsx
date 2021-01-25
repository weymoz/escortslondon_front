import React, { ReactElement, useState, useEffect } from "react";
import SearchIcon from "@svg/search.svg";
import s from "./style.module.css";
import { EscortIndexed } from "@store/types";
import { useLocation, useHistory } from "react-router-dom";
import cx from "classnames";
import { useRouter } from "next/router";

interface Props {
  onChange: (name: string) => void;
  cleanPreviousData: () => void;
  addAllEscorts: () => void;
  escorts: EscortIndexed[];
  className?: string;
}

export default function Search({
  cleanPreviousData,
  addAllEscorts,
  escorts,
  className,
}: Props): ReactElement {
  const [value, setValue] = useState<string | null>(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    // if (value && value?.length > 0) {
    //   cleanPreviousData();
    //   onChange(value);
    // } else if (value === '') {
    //   addAllEscorts();
    // }

    if (value === "") {
      addAllEscorts();
    }
  }, [value]);

  const router = useRouter();

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const v = e.currentTarget.value;
    setValue(v);
  };

  const handleFocus = () => {
    addAllEscorts();
    setShowList(true);
  };

  const handleBlur = () => {
    console.log("BLUR");
    cleanPreviousData();
    setValue(null);
    setShowList(false);
  };

  const handleMouseDown = (location: string) => {
    cleanPreviousData();
    router.push(location.toLowerCase());
  };

  const escortsFiltered = !value
    ? escorts
    : escorts.filter((escort) => {
        const filter = new RegExp(`^${value}`, "i");
        return filter.test(escort.title || "");
      });

  return (
    <div className={cx(s.searchWrapper, className)}>
      <div className={s.search}>
        <span className={s.searchIcon}>
          <SearchIcon className={s.searchByNameSearchIcon} />
          <span></span>
        </span>
        <input
          value={value || ""}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type="search"
          placeholder="Search by name..."
        />
      </div>
      <ul className={s.searchList}>
        {showList &&
          escortsFiltered.map((escort, i) => (
            <li key={i} className={s.searchListItem}>
              <a
                onMouseDown={handleMouseDown.bind(
                  null,
                  `/profile/${escort.title}`
                )}
                href={`/profile/${escort.title}`}
                className={s.searchListLink}
              >
                {escort.title}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
