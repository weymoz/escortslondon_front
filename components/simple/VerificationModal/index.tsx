import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Title from '@simple/Title';
import Button from '@simple/Button';
import Input from '@simple/Input';

import s from './style.module.css';

const VerificationModal = ({ handleSuccess, onRequestClose }) => {
  const [values, setValues] = useState({
    code: '',
  });

  const handleSubmit = () => {
    console.log(values);
    onRequestClose();
    handleSuccess();
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className={s.root}>
      <div className={s.top}>
        <Title size="h6">Verification</Title>
      </div>
      <div className={s.infoText}>An SMS with verification code was sent to the mobile number you have provided.</div>
      <div className={s.input}>
        <Input
          name="code"
          placeholder="Enter code there"
          id="code"
          onChange={handleInputChange}
          type="text"
          theme="light"
          value={values.code}
        />
      </div>
      <div className={s.infoText}>Resend in 16s</div>
      <div className={s.bottom}>
        <div className={s.buttons}>
          <div className={s.buttonControl} onClick={handleSubmit}>
            <Button size="sm">Submit</Button>
          </div>
          <div className={s.buttonControl} onClick={onRequestClose}>
            <Button size="sm" theme="transparent">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

VerificationModal.propTypes = {
  handleSuccess: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default VerificationModal;
