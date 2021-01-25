import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { cleanEscorts, addEscorts } from '@store/escorts';

import RecommendedContainer from '@containers/RecommendedContainer';
import GirlsWaiting from '@sections/GirlsWaiting';

import ArrowLeft from '@svg/arrow-left.svg';

import s from './style.css';
import ProfileDuo from './ProfileDuo';
import ProfileNavContainer from '@containers/ProfileNavContainer';

interface Props {}

const ProfilePage = ({}: Props): ReactElement | null => {
  const dispatch = useDispatch();

  const handleClick = () => {
    //dispatch(cleanEscorts());
    //dispatch(addEscorts({ limit: 0, skip: 24 }));
  };

  return (
    <>
      <section className={s.nav}>
        <div className={s.container}>
          <div className={s.topNav}>
            <div className={s.topNavSide}>
              <Link
                onClick={handleClick}
                to="/"
                className={`${s.navLink} ${s.left}`}
              >
                <ArrowLeft />
                Back to gallery
              </Link>
            </div>
            <div className={`${s.topNavSide} ${s.alignRight}`}>
              <ProfileNavContainer />
            </div>
          </div>
        </div>
      </section>
      <ProfileDuo />
      <GirlsWaiting
        bgColor="black"
        title="Amaya & Alizee are waiting for you!"
      />
      <RecommendedContainer title="Similar girls" />
    </>
  );
};

export default ProfilePage;
