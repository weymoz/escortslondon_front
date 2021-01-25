import React, { useState } from "react";
import _ from "lodash";
import Title from "@simple/Title";
import InputFormik from "@simple/InputFormik";

import s from "./style.module.css";

const defaultRates = {
  GBP: [
    {
      time: "One hour",
      incall: "",
      outcall: "",
      icon: "/images/one-hour.svg",
    },
    {
      time: "90 minutes",
      incall: "",
      outcall: "",
      icon: "/images/90-minutes.svg",
    },
    {
      time: "Two hours",
      incall: "",
      outcall: "",
      icon: "/images/two-hours.svg",
    },
    {
      time: "Three hours",
      incall: "",
      outcall: "",
      icon: "/images/three-hours.svg",
    },
    {
      time: "Additional hour",
      incall: "",
      outcall: "",
      icon: "/images/additional-hour.svg",
    },
    {
      time: "Overnight",
      incall: "",
      outcall: "",
      icon: "/images/overnight.svg",
    },
  ],
};

const formatRate = (rate: string): string => {
  if (rate === "£" || rate === "£0" || rate === "$0" || rate == "€0") {
    return " - ";
  } else {
    let rateNum: number;
    let fRate: string;

    try {
      const sign = rate[0];
      const n = rate.replace(new RegExp("\\$|£|€", "i"), "");
      rateNum = parseFloat(n);
      rateNum = Math.round(rateNum);
      fRate = sign + rateNum.toString();
    } catch {
      fRate = " - ";
    }
    return fRate;
  }
};

const Rates = ({
  title = "Rates",
  rates = defaultRates,
  activeCurrency = "GBP",
  ratesForm,
}) => {
  const [currency, setCurrency] = useState<string>("");

  const handleNav = (currency: string) => () => {
    setCurrency(currency);
  };
  const active = currency ? currency : activeCurrency;

  const rate = rates[active];

  const filteredRatesKeys = ratesForm
    ? Object.keys(rates).filter((rate) => rate.toLowerCase() === "gbp")
    : Object.keys(rates);

  return (
    <div className={s.rates}>
      <div className={s.top}>
        <Title size="h6">{title}</Title>
        <nav className={s.navs}>
          {_.map(filteredRatesKeys, (nav) => (
            <button
              key={nav}
              onClick={handleNav(nav)}
              className={`${s.nav} ${nav === active && s.active} }`}
            >
              {nav}
            </button>
          ))}
        </nav>
      </div>
      <div className={s.tableWrapper}>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Time</th>
              <th>Incall</th>
              <th>Outcall</th>
            </tr>
          </thead>
          <tbody>
            {_.map(
              rate.filter((r) => {
                return r.time !== "Three hours";
              }),
              (rateItem, key) => {
                return (
                  <tr key={key} className={s.rateItem}>
                    <td>
                      <div className={s.time}>
                        <img
                          src={rateItem.icon}
                          className={s.icon}
                          alt={rateItem.time}
                        />
                        <span>{rateItem.time}</span>
                      </div>
                    </td>
                    <td>
                      {!ratesForm ? (
                        formatRate(rateItem.incall)
                      ) : (
                        <span className={s.input}>
                          <span>£</span>
                          <InputFormik
                            name={`rates.incall.${rateItem.time}`}
                            inputType="number"
                          />
                        </span>
                      )}
                    </td>
                    <td>
                      {!ratesForm ? (
                        formatRate(rateItem.outcall)
                      ) : (
                        <span className={s.input}>
                          <span>£</span>
                          <InputFormik
                            name={`rates.outcall.${rateItem.time}`}
                            inputType="number"
                          />
                        </span>
                      )}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rates;
