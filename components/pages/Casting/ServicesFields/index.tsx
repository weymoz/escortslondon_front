import React, { ReactElement, useEffect } from 'react';
import Title from '@simple/Title';
import InputCheckboxFormik from '@simple/InputCheckboxFormik';
import s from '../style.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addAllServices, selectAllServices } from '@store/allServices';
import { RootState } from '@store/reducer';
import TextareaFormik from '@simple/TextareaFormik';
import ErrorMessageFormik from '@simple/ErrorMessageFormik';

interface Props {}

export default function ServicesFields({}: Props): ReactElement {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addAllServices());
  }, []);
  const services = useSelector<RootState, string[]>(selectAllServices);
  return (
    <>
      <div className={s.services}>
        <div className={s.servicesFiels__title}>
          <Title size="h6">Select services</Title>
          <div className={s.servicesList}>
            {services &&
              services.length > 0 &&
              services.map((service, i) => (
                <div key={i}>
                  <InputCheckboxFormik
                    name="services"
                    value={service}
                    label={service}
                  />
                </div>
              ))}
          </div>
          <ErrorMessageFormik name="services" cssDisplay="block" />
        </div>
      </div>
      <div className={s.servicesTextareas}>
        <div className={s.servicesFiels__title}>
          <Title size="h6">Additional service costs</Title>
        </div>
        <TextareaFormik
          id="additional_service_costs"
          name="notice"
          placeholder="Enter additional costs per service separated by a newline"
          className={s.textarea}
        />
        <ErrorMessageFormik name="notice" cssDisplay="block" />
      </div>
      <div className={s.servicesTextareas}>
        <div className={s.servicesFiels__title}>
          <Title size="h6">About</Title>
        </div>
        <TextareaFormik
          id="story"
          name="about"
          placeholder="Tell us a short story about yourself..."
          className={s.textarea}
        />
        <ErrorMessageFormik name="about" cssDisplay="block" />
      </div>
    </>
  );
}
