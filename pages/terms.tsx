import Head from "next/head";
import Layout from "@sections/Layout";
import {
  getMainPageSettings,
  getTermsPageSettings,
} from "@functions/contentful-api";
import Terms from "@pages/TermsOfService";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { MainPageSettings, TermsPageSettings } from "@typedefs/app";
import { initStore } from "@store/configureStore";
import {
  mainPageSettingsReceived,
  selectMainPageSettings,
} from "@store/mainPageSettings";
import { useSelector } from "react-redux";
import { RootState } from "@store/reducer";
import {
  selectTermsPageSettings,
  termsPageSettingsDataReceived,
} from "@store/termsPageSettings";

export const getStaticProps: GetStaticProps<{
  mainPageSettings: MainPageSettings;
}> = async () => {
  const store = initStore();
  const { dispatch, getState } = store;
  try {
    const termsPageSettingsData = await getTermsPageSettings();
    dispatch(termsPageSettingsDataReceived(termsPageSettingsData));

    const mainPageSettingsData = await getMainPageSettings();
    dispatch(mainPageSettingsReceived(mainPageSettingsData));

    return {
      props: {
        initialStoreState: { ...getState() },
      },
    };
  } catch (e) {
    console.error(e);
  }
};

export default function Index({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  const mainPageSettings = useSelector<RootState, MainPageSettings>(
    selectMainPageSettings
  );
  const termsPageSettings = useSelector<RootState, TermsPageSettings>(
    selectTermsPageSettings
  );

  const {
    phone,
    whatsApp,
    callToActionFooterSiteDescription,
    callToActionFooterTitle,
    callToActionFooterText,
    termsFooter,
  } = mainPageSettings;

  const { titleMetaTag, metaDescriptionTag } = termsPageSettings;

  return (
    <Layout
      callToActionFooterSiteDescription={callToActionFooterSiteDescription}
      callToActionFooterTitle={callToActionFooterTitle}
      callToActionFooterText={callToActionFooterText}
      termsFooter={termsFooter}
      phone={phone}
      whatsApp={whatsApp}
    >
      <Head>
        <title>{titleMetaTag}</title>
        <meta name="description" content={metaDescriptionTag} />
      </Head>
      <Terms />
    </Layout>
  );
}
