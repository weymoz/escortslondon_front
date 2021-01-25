import React from "react";
import Link from "next/link";
import Button from "@simple/Button";
import Phone from "@svg/phone.svg";
import Messenger from "@svg/messenger.svg";
import Logo from "@svg/logo-full.svg";
import { FC } from "react";
import s from "./style.module.css";
import { cleanEscort1Data } from "@store/escortDate";
import { useDispatch } from "react-redux";

interface Props {
  callToActionFooterSiteDescription: string;
  callToActionFooterTitle: string;
  callToActionFooterText: string;
  phone: string;
  whatsApp: string;
  termsFooter: string;
}

const Footer: FC<Props> = ({
  callToActionFooterSiteDescription,
  callToActionFooterTitle,
  callToActionFooterText,
  phone,
  whatsApp,
  termsFooter,
}) => {
  const dispatch = useDispatch();
  const handleMakeDateClick = () => {
    dispatch(cleanEscort1Data());
  };
  return (
    <footer className={s.footer}>
      <div className={s.container}>
        <div className={s.footerTop}>
          <div className={s.escortsWrapper}>
            <div className={s.footerLogo}>
              <Logo />
            </div>
            <p>
              {callToActionFooterSiteDescription ||
                `
              Our escorts are well-groomed, beautiful, articulate, and sensual.
              They have all successfully passed our rigorous screening process.
              We can guarantee quality service.
                `}
            </p>
            <div className={s.escortsBtn}>
              <Button onClick={handleMakeDateClick} link={`/make-a-date`}>
                Make a Date
              </Button>
            </div>
          </div>
          <div className={s.footerMenu}>
            {/*Hidden untill milestone 2 */}
            {/* <p className={s.footerTitle}>Girls & Services</p> */}
            <ul className={s.footerCategories}>
              {/*Hidden untill milestone 2 */}
              {/* {categories.map(el => (
              <li key={el.id}>
                <Link to={el.link}>{el.text}</Link>
              </li>
            ))} */}
            </ul>
          </div>
          <div className={s.footerContact}>
            <p className={s.footerTitle}>
              {callToActionFooterTitle || "Call us now"}
            </p>
            <p className={s.footerDesc}>
              {callToActionFooterText ||
                `
              Call us and book one (or two!) of our sexy London escorts
                `}
            </p>
            <ul className={s.footerPhones}>
              <li>
                <a className={s.phone} href={`tel:07907900666`}>
                  <Phone />
                  {phone || "079 079 00666"}
                </a>
              </li>
              <li>
                {/*}<a className={s.phone} href="tel:(+44)07907900666 ">{*/}
                <a className={s.phone} href="https://wa.me/4407907900666">
                  <Messenger />
                  {whatsApp || "(+44) 079 079 00666"}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={s.footerBottom}>
          <div className={s.footerBottomCopyright}>
            <div className={s.copyright}>
              Copyright © 2020. All rights reserved
            </div>
            <div className={s.terms}>
              <Link href="/terms">
                <a>Terms of Service</a>
              </Link>
              {/* <Link to="/">Privacy Policy</Link> */}
            </div>
          </div>
          <div className={s.footerBottomText}>
            {termsFooter ||
              `
            This site is intended for adult viewing and may contain nudity.
            Enter the site only if you are legally entitled to access "Adult
            Sites" as defined by the laws of the country where you live. By
            entering this site, you confirm that: You are not entering this site
            in any official or unofficial capacity; in order to download images,
            or gain information for use in any media, or to use against the
            owner of the site. Money exchanged for legal adult services is for
            time and companionship. Anything implied or inferred on this web
            site is not to be taken as inducement for services other than this.
            Any sexual activities that take place are between consenting adults.
            If you are under 18 or do not agree with the above disclaimer
            statements, please leave this site now.
              `}
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
