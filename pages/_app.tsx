import "../styles/globals.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-phone-input-2/lib/style.css";
import "../styles/datepicker.css";
import "../styles/timepicker.css";
import "../styles/phone-number.css";
import { Provider } from "react-redux";
import { initializeStore } from "@store/configureStore";
import { useMemo } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps, pageProps: { initialStoreState } }) {
  const { pathname } = useRouter();
  const store = useMemo(() => {
    return initializeStore(initialStoreState, pathname);
  }, [initialStoreState]);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
