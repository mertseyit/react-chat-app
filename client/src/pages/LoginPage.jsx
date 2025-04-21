import { useContext } from 'react';
import PageBox from '../components/layout/PageBox';
import LoginCard from '../components/pages/login/LoginCard';
import { UserContext } from '../contexts/UserContext';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const { user } = useContext(UserContext);
  if (user) {
    return <Navigate to={'/chat'} replace />;
  }

  return (
    <PageBox>
      <div id="login">
        <LoginCard />
      </div>
    </PageBox>
  );
};

export default LoginPage;
