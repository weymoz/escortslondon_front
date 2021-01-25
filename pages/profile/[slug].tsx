import Head from "next/head";
import Layout from "@sections/Layout";
import ProfilePage from "@pages/ProfilePage";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import {
  getProfileData,
  getEscortsData,
  getMainPageSettings,
  getProfilePageSettings,
} from "@functions/contentful-api";
import { initStore } from "@store/configureStore";
import { profileReceived, selectProfileData } from "@store/profile";
import { LoadScript } from "@react-google-maps/api";
import Preloader from "@components/simple/Preloader";
import { useRouter } from "next/router";
import { MainPageSettings, ProfilePageSettings } from "@typedefs/app";
import { RootState } from "@store/reducer";
import { getTitleFromSlug } from "@functions/node-helpers";
import {
  mainPageSettingsReceived,
  selectMainPageSettings,
} from "@store/mainPageSettings";
import {
  profilePageSettingsDataReceived,
  selectProfilePageSettings,
} from "@store/profilePageSettings";
import { useSelector } from "react-redux";
import { Escort } from "@store/escorts";

export async function getStaticPaths() {
  console.log("**********************************************");
  const { data } = await getEscortsData(1000);

  const paths = data.items.map((item) => {
    const slug = item.fields.title.toLowerCase();
    console.log("Slug: ", slug);
    return {
      params: {
        slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<{
  initialStoreState: RootState;
}> = async ({ params }) => {
  const store = initStore();
  const { dispatch, getState } = store;
  try {
    const title = getTitleFromSlug((params?.slug as string) || "");
    const { data } = await getProfileData(title);
    dispatch(profileReceived(data));

    const mainPageSettingsData = await getMainPageSettings();
    dispatch(mainPageSettingsReceived(mainPageSettingsData));

    const profilePageSettings = await getProfilePageSettings();
    dispatch(profilePageSettingsDataReceived(profilePageSettings));

    /*
    if (
      process.env.ADD_WATERMARKS === "true" &&
      data.includes?.Asset &&
      data.includes.Asset.length > 0
    ) {
      await addWatermarks(data.includes.Asset);
    }
     */

    const state = getState();
    const initialStoreState = {
      profile: {
        ...state.profile,
      },
      mainPageSettings: {
        ...state.mainPageSettings,
      },
      profilePageSettings: {
        ...state.profilePageSettings,
      },
    };

    return {
      props: { initialStoreState },
      revalidate: 1,
    };
  } catch (e) {
    console.error(e);
  }
};

export default function ProfileBySlug({}: InferGetStaticPropsType<
  typeof getStaticProps
>) {
  const profilePageSettings = useSelector<RootState, ProfilePageSettings>(
    selectProfilePageSettings
  );

  const mainPageSettings = useSelector<RootState, MainPageSettings>(
    selectMainPageSettings
  );

  const profileData = useSelector<RootState, Escort>(selectProfileData);

  const router = useRouter();
  /*
  if (router.isFallback) {
    return <Preloader full />;
  }
   */

  const { titleMetaTag, metaDescriptionTag } = profileData;

  const {
    callToActionFooterSiteDescription,
    callToActionFooterTitle,
    callToActionFooterText,
    termsFooter,
  } = profilePageSettings;

  const { phone, whatsApp } = mainPageSettings;

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
        <title>{titleMetaTag || ""}</title>
        <meta name="description" content={metaDescriptionTag || ""} />
      </Head>
      <ProfilePage />
    </Layout>
  );
  /*
  return (
    <LoadScript
      loadingElement={<Preloader full />}
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY}
    >
      <Layout
        callToActionFooterSiteDescription={callToActionFooterSiteDescription}
        callToActionFooterTitle={callToActionFooterTitle}
        callToActionFooterText={callToActionFooterText}
        termsFooter={termsFooter}
        phone={phone}
        whatsApp={whatsApp}
      >
        <Head>
          <title>{titleMetaTag || ""}</title>
          <meta name="description" content={metaDescriptionTag || ""} />
        </Head>
        <ProfilePage />
      </Layout>
    </LoadScript>
  );
   */
}
