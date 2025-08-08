import React from 'react';
import { Helmet } from 'react-helmet';

import RegisterForm from '@ui/Forms/RegisterForm/RegisterForm';

function Register() {
  return (
    <>
      <Helmet>
        <title>Diadiary | Sign up</title>
      </Helmet>
      <RegisterForm />
    </>
  );
}

export default Register;
