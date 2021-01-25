import React from 'react';

import Title from '@simple/Title';
import Button from '@simple/Button';

import Taxi from '@svg/terms/taxi.svg';
import Important from '@svg/terms/important.svg';
import Cancel from '@svg/terms/cancel.svg';
import Payment from '@svg/terms/payment.svg';

import s from './style.module.css';

const cards = [
  {
    id: '01',
    title: 'Taxi Charges',
    icon: <Taxi />,
    subtitle: 'Fees for outcalls only affect Central London areas.',
    text:
      'Travelling fees, which includes taxi charges, apply for all meeting in Greater London and all meetings after midnight. Incalls are not affected.',
  },
  {
    id: '02',
    title: 'Cancellation Fees',
    icon: <Cancel />,
    subtitle:
      'We charge a fee equivalent to the travel cost of our escorts if you cancel outcall meetings.',
    text: `There are no charges for cancellation of incall meetings.`,
  },
  {
    id: '03',
    title: 'Payment Method',
    icon: <Payment />,
    subtitle:
      'Our escorts only accept cash as the form of payment for both incalls and outcalls.',
    text:
      'Please, make all payments immediately after the escort arrives to avoid unpleasant moments later on in your date. Our escorts are professional, they are punctual and they appreciate punctuality. Don’t keep them waiting.',
  },
  {
    id: '04',
    title: 'Important',
    icon: <Important />,
    subtitle:
      'Payments made to any of our escorts are for companionship and time.',
    text:
      'Whatever happens in your date is the result of the independent actions of consenting adults.',
  },
];

const TermsOfService = props => {
  return (
    <div className={s.termsOfService}>
      <div className={s.termsOfService__head}>
        <div className={s.container}>
          <div className={s.titleWrapper}>
            <Title size="h3">Terms of Service</Title>
            <p className={s.text}>
              At Escorts London, we are committed to giving you only the best of
              babes and service, providing you with an experience that would
              have you calling us again. We and our escorts will always do our
              best to meet your needs. Our escort service is classy, friendly,
              and honest.
            </p>
          </div>
        </div>
      </div>
      <div className={s.termsOfService__main}>
        <div className={s.container}>
          <ul className={s.termsOfService__cards}>
            {cards.map(card => (
              <li className={s.card} key={card.id}>
                <div className={s.card__title}>
                  {card.icon}
                  <Title size="h6">{card.title}</Title>
                </div>
                <div className={s.card__subtitle}>{card.subtitle}</div>
                <div className={s.card__text}>{card.text}</div>
              </li>
            ))}
          </ul>
          <div className={s.haveQuestions}>
            <div className={s.haveQuestions__text}>
              <Title size="h6">Still have a questions?</Title>
              <p>
                If you don’t understand any part of our Terms of Service, kindly
                go through our Escort Service FAQ page to get more information.
              </p>
            </div>
            <Button link="/faq" theme="light">
              {'Go to FAQ page'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
