import React, { useState } from "react";

import Title from "@simple/Title";
import Arrow from "@svg/faq/arrow.svg";
import Phone from "@svg/phone.svg";
import Messenger from "@svg/messenger.svg";

import s from "./style.module.css";
import { FaqPageSettings, MainPageSettings } from "@typedefs/app";
import { getPhoneUrl, getWhatsAppUrl } from "@functions/helpers";

interface Props {
  faqPageSettings: FaqPageSettings;
  mainPageSettings: MainPageSettings;
}

const FAQ = ({ faqPageSettings, mainPageSettings }: Props) => {
  const [actives, setActives] = useState({ "0": true });

  const handleToggle = (id: string) => {
    if (actives[id]) {
      setActives((prevState) => ({ ...prevState, [id]: false }));
    } else {
      setActives((prevState) => ({ ...prevState, [id]: true }));
    }
  };

  return (
    <div className={s.faq}>
      <section className={s.faq__head}>
        <div className={s.container}>
          <div className={s.titleWrapper}>
            <Title size="h3" content={faqPageSettings?.headerTitle || "FAQ"}>
              {faqPageSettings?.headerSubtitle || "Frequently asked questions"}
            </Title>
            <p className={s.desc}>{faqPageSettings?.headerText}</p>
          </div>
        </div>
      </section>
      <section className={s.faq__main}>
        <div className={`${s.container} ${s.faq__main__container}`}>
          <div className={s.accordion__wrapper}>
            <ul>
              {faqPageSettings &&
                faqPageSettings.questions &&
                faqPageSettings.questions.length &&
                faqPageSettings.questions.map((item) => (
                  <li
                    className={`${s.item} ${actives[item.id] ? s.active : ""}`}
                    key={item.id}
                  >
                    <button
                      type="button"
                      className={s.item__question}
                      onClick={() => handleToggle(item.id)}
                    >
                      {item.question}
                      <span className={s.arrow}>
                        <Arrow />
                      </span>
                    </button>
                    <p className={s.item__answer}>{item.answer}</p>
                  </li>
                ))}
            </ul>
          </div>
          <div className={s.gotQuestions}>
            <div>
              <Title size="h5">Still got questions?</Title>
              <p>
                In case if you still got questions just make a call and our
                managers will try to help you.
              </p>
            </div>
            <div className={s.phones}>
              <div className={s.phone}>
                <Phone />
                <a
                  href={getPhoneUrl(
                    (mainPageSettings && mainPageSettings.phone) ||
                      "tel:+079 079 00666"
                  )}
                >
                  {(mainPageSettings && mainPageSettings.phone) ||
                    "+079 079 00666"}
                </a>
              </div>
              <div className={s.phone}>
                <Messenger />
                <a
                  href={getWhatsAppUrl(
                    (mainPageSettings && mainPageSettings.whatsApp) ||
                      "tel:+(44) 079 079 00666"
                  )}
                >
                  {(mainPageSettings && mainPageSettings.whatsApp) ||
                    "+(44) 079 079 00666"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
