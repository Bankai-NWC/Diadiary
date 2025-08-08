import React from 'react';
import { Helmet } from 'react-helmet';

import LoginForm from '@ui/Forms/LoginForm/LoginForm';

export default function Login() {
  return (
    <>
      <Helmet>
        <title>Diadiary | Sign in</title>
      </Helmet>
      <LoginForm />
    </>
  );
}
