import React, { useContext } from 'react';
import { Button, Card, HStack, Image, Text } from 'rsuite';
import google_icon from '../../../assets/icons/google.svg';
import { UserContext } from '../../../contexts/UserContext';
const LoginCard = () => {
  const { loading, loginWithGoogle } = useContext(UserContext);
  return (
    <Card width={460}>
      <Card.Header as="h5" style={{ textAlign: 'center' }}>
        Giriş Yap
      </Card.Header>
      <Card.Body>
        <Button
          onClick={loginWithGoogle}
          loading={loading}
          style={{ width: '100%' }}
        >
          <Image
            width={32}
            src={google_icon}
            style={{ opacity: loading ? '0' : '1' }}
          />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default LoginCard;
