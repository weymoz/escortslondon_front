import React from 'react';

import PropTypes from 'prop-types';
import { default as ReactModal } from 'react-modal';

import Close from '@svg/close-burger.svg';

import s from './style.module.css';

const Modal = ({
  children,
  isOpen,
  onRequestClose,
  theme,
  hideClose,
  mobileTheme,
}) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className={`
      ${s.modal}
      ${theme === 'dark' ? s.dark : ''}
      ${mobileTheme === 'center' ? s.mobileCenter : ''}
    `}
    overlayClassName={`
      ${s.overlay}
      ${theme === 'dark' ? s.dark : ''}
      ${mobileTheme === 'center' ? s.mobileCenter : ''}
    `}
    ariaHideApp={false}
  >
    {!hideClose && (
      <button onClick={onRequestClose} className={s.close}>
        <Close />
      </button>
    )}
    {children}
  </ReactModal>
);

Modal.defaultProps = {
  isOpen: false,
  hideClose: false,
  theme: '',
  mobileTheme: '',
};

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  theme: PropTypes.string,
  mobileTheme: PropTypes.string,
  hideClose: PropTypes.bool,
};

export default Modal;
