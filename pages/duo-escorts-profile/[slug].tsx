import Head from "next/head";
import Layout from "@sections/Layout";
import ProfileDuoPage from "@pages/ProfileDuoPage";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from "next";
import {
  getDuoProfileData,
  getDuoEscortsData,
  getMainPageSettings,
  getDuoProfilePageSettings,
} from "@functions/contentful-api";
import { addWatermarks } from "@functions/node-helpers";
import { initStore } from "@store/configureStore";
import { LoadScript } from "@react-google-maps/api";
import Preloader from "@components/simple/Preloader";
import { useRouter } from "next/router";
import {
  duoProfileReceived,
  DuoProfileStateSlice,
  selectEscortsDuoProfile,
} from "@store/duoProfile";
import MainPageSettingsModel from "@models/MainPageSettingsModel";
import {
  DuoProfilePageSettings,
  EscortsDuo,
  MainPageSettings,
} from "@typedefs/app";
import {
  mainPageSettingsReceived,
  selectMainPageSettings,
} from "@store/mainPageSettings";
import {
  duoProfilePageSettingsDataReceived,
  selectDuoProfilePageSettings,
} from "@store/duoProfilePageSettings";
import { useSelector } from "react-redux";
import { RootState } from "@store/reducer";
import { selectProfilePageSettings } from "@store/profilePageSettings";

export async function getStaticPaths() {
  try {
    const { data } = await getDuoEscortsData(1000);
    const paths = data.items.map((item) => {
      return {
        params: {
          slug: item.fields.slug,
        },
      };
    });
    return {
      paths,
      fallback: true,
    };
  } catch (e) {
    console.error(e);
  }
}

export const getStaticProps: GetStaticProps<
  {
    initialStoreState: {
      duoProfile: DuoProfileStateSlice;
    };
    mainPageSettings: MainPageSettings;
  },
  { slug: string }
> = async ({ params }) => {
  const store = initStore();
  const { dispatch, getState } = store;
  try {
    const slug = params?.slug;
    const data = await getDuoProfileData(slug);
    dispatch(duoProfileReceived(data));

    const mainPageSettingsData = await getMainPageSettings();
    dispatch(mainPageSettingsReceived(mainPageSettingsData));

    const duoProfilePageSettings = await getDuoProfilePageSettings();
    dispatch(duoProfilePageSettingsDataReceived(duoProfilePageSettings));

    /*
    if (
      process.env.ADD_WATERMARKS === "true" &&
      data.includes?.Asset &&
      data.includes.Asset.length > 0
    ) {
      data.includes.Asset = await addWatermarks(data.includes.Asset);
    }
     */

    const state = getState();

    const initialStoreState = {
      duoProfile: {
        ...state.duoProfile,
      },
      mainPageSettings: {
        ...state.mainPageSettings,
      },
      duoProfilePageSettings: {
        ...state.duoProfilePageSettings,
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
  const duoProfilePageSettings = useSelector<RootState, DuoProfilePageSettings>(
    selectDuoProfilePageSettings
  );

  const mainPageSettings = useSelector<RootState, MainPageSettings>(
    selectMainPageSettings
  );

  const duoProfileData = useSelector<RootState, EscortsDuo>(
    selectEscortsDuoProfile
  );

  const router = useRouter();

  if (router.isFallback) {
    return <Preloader full />;
  }

  const {
    callToActionFooterSiteDescription,
    callToActionFooterTitle,
    callToActionFooterText,
    termsFooter,
  } = duoProfilePageSettings;

  const { titleMetaTag, metaDescriptionTag } = duoProfileData;

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
        <title>{titleMetaTag}</title>
        <meta name="description" content={metaDescriptionTag} />
      </Head>
      <ProfileDuoPage />
    </Layout>
  );
}
