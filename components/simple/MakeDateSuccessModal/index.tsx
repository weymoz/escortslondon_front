import React from "react";
import Link from "next/link";
import Button from "@simple/Button";

import s from "./style.module.css";

const MakeDateSuccessModal = ({ handleClose }) => {
  return (
    <div className={s.modal}>
      <div className={s.modalWrapper} onClick={(e) => e.stopPropagation()}>
        <div className={s.modalTitle}>
          <span>Thank you!</span>
        </div>
        <p className={s.modalDesc}>
          Soon our manager will contact you to confirm your date
        </p>
        <Link href="/">
          <Button onClick={handleClose}>Go to Main</Button>
        </Link>
      </div>
    </div>
  );
};

export default MakeDateSuccessModal;
