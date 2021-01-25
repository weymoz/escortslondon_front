import React, { ReactElement } from "react";
import Link from "next/link";
import ArrowRight from "@svg/arrow-right.svg";
import ArrowLeft from "@svg/arrow-left.svg";
import s from "./style.module.css";
import { ProfileType } from "@typedefs/app";

interface Props {
  prev: string;
  next: string;
  nextSlug: string;
  prevSlug: string;
  cleanCurrentProfileData: () => void;
  profileType?: ProfileType;
}

export default function ProfileNav({
  profileType = "escort",
  prev,
  next,
  nextSlug,
  prevSlug,
}: Props): ReactElement {
  let profilePath: string = "profile";
  let prevPath: string = prev?.toLowerCase();
  let nextPath: string = next?.toLowerCase();

  if (profileType === "duo escort") {
    profilePath = "duo-escorts-profile";
    prevPath = prevSlug;
    nextPath = nextSlug;
  }

  return (
    <>
      {prev && (
        <Link prefetch={false} href={`/${profilePath}/${prevPath}`}>
          <a className={`${s.navBtn} ${s.left}`}>
            <ArrowLeft />
          </a>
        </Link>
      )}
      {next && (
        <Link prefetch={false} href={`/${profilePath}/${nextPath}`}>
          <a className={`${s.navBtn} ${s.right}`}>
            <ArrowRight />
          </a>
        </Link>
      )}
    </>
  );
}
