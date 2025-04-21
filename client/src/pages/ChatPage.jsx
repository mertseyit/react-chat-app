import { useContext, useEffect } from 'react';
import PageBox from '../components/layout/PageBox';
import ChatScreen from '../components/pages/chat/ChatScreen';
import { UserContext } from '../contexts/UserContext';
import { Navigate } from 'react-router-dom';
import { MessageContext } from '../contexts/MessageContext';

const ChatPage = () => {
  const { user } = useContext(UserContext);
  const { generateSession, getUserChats, loading, getUserSessions } =
    useContext(MessageContext);

  useEffect(() => {
    if (user) {
      generateSession();
      getUserChats();
      getUserSessions();
    }
  }, []);

  if (!user) {
    return <Navigate to={'/login'} replace />;
  }

  return (
    <PageBox>
      <div id="chatPage">{loading ? 'Yükleniyor' : <ChatScreen />}</div>
    </PageBox>
  );
};

export default ChatPage;
