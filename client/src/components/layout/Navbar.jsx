import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Avatar,
  AvatarGroup,
  Button,
  Dropdown,
  HStack,
  Image,
  VStack,
} from 'rsuite';
import { UserContext } from '../../contexts/UserContext';

const Navbar = () => {
  const { user, logOut } = useContext(UserContext);
  return (
    <HStack justifyContent="space-between" className="navbar">
      <span>LOGO</span>
      <HStack spacing={16}>
        <Button as={NavLink} appearance="default" to={'/'}>
          Ana Sayfa
        </Button>
        {user && (
          <>
            <Button
              as={NavLink}
              to={'/chat'}
              appearance="primary"
              color="violet"
            >
              Bir Şeyler Sor
            </Button>
            <Dropdown
              placement="bottomEnd"
              renderToggle={(props) => (
                <Avatar {...props} circle src={user.photoURL} />
              )}
            >
              <Dropdown.Item onClick={logOut}>Çıkış Yap</Dropdown.Item>
            </Dropdown>
          </>
        )}
        {!user && (
          <Button
            as={NavLink}
            to={'/login'}
            appearance="primary"
            color="violet"
          >
            Giriş Yap
          </Button>
        )}
      </HStack>
    </HStack>
  );
};

export default Navbar;
