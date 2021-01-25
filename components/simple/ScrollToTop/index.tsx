import { useEffect } from "react";
import { useRouter } from "next/router";

export default function ScrollToTop(): null {
  const { pathname } = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
