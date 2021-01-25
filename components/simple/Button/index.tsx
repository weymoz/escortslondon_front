import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import s from "./style.module.css";

const Button = ({
  style,
  size,
  theme,
  link,
  type = "button",
  children,
  onClick,
}) => (
  <>
    {link ? (
      <Link href={link}>
        <a
          style={style}
          onClick={onClick}
          aria-label={children[0]}
          className={`
					${s.button}
					${size === "sm" ? s.sm : ""}
					${size === "md" ? s.md : ""}
					${size === "lg" ? s.lg : ""}
					${theme === "outline" ? s.outline : ""}
					${theme === "primary" ? s.primary : ""}
					${theme === "transparent" ? s.transparent : ""}
					${theme === "light" ? s.light : ""}
					${Array.isArray(children) ? s.withArrow : ""}
				`}
        >
          {children}
        </a>
      </Link>
    ) : (
      <button
        style={style}
        onClick={onClick}
        type={type}
        aria-label={children[0]}
        className={`
					${s.button}
					${size === "sm" ? s.sm : ""}
					${size === "md" ? s.md : ""}
					${size === "lg" ? s.lg : ""}
					${theme === "outline" ? s.outline : ""}
					${theme === "primary" ? s.primary : ""}
					${theme === "transparent" ? s.transparent : ""}
					${theme === "light" ? s.light : ""}
					${Array.isArray(children) ? s.withArrow : ""}
				`}
      >
        {children}
      </button>
    )}
  </>
);

Button.defaultProps = {
  link: "",
  theme: "primary",
  size: "sm",
};

Button.propTypes = {
  link: PropTypes.string,
  theme: PropTypes.string,
  children: PropTypes.any.isRequired,
  size: PropTypes.string,
};
export default Button;
