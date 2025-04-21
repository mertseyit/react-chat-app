import {
  Button,
  Card,
  Divider,
  Drawer,
  HStack,
  List,
  Stack,
  Text,
} from 'rsuite';
import {
  RiChat3Fill,
  RiDeleteBin7Fill,
  RiChatHistoryFill,
} from 'react-icons/ri';
import UserMessage from './UserMessage';
import AiMessage from './AiMessage';
import SendMessage from './SendMessage';
import WaitingResponse from './WaitingResponse';
import { useContext, useEffect, useState } from 'react';
import { MessageContext } from '../../../contexts/MessageContext';

const ChatScreen = () => {
  const {
    allMessages,
    messageWaiting,
    generateNewChat,
    deleteCurrentChat,
    userSessions,
    changeSession,
  } = useContext(MessageContext);
  useEffect(() => {
    console.log(userSessions);
  }, [userSessions]);

  const [draweOpen, setDraweOpen] = useState(false);
  return (
    <>
      <Drawer
        placement="left"
        open={draweOpen}
        onClose={() => setDraweOpen(false)}
      >
        <Drawer.Body>
          {userSessions.length === 0 ? (
            <>
              <List style={{ width: '100%' }}>
                <List.Item style={{ width: '100%' }}>
                  Sohbet Geçmişi Yok
                </List.Item>
              </List>
            </>
          ) : (
            <>
              <List>
                {userSessions.map((item, key) => (
                  <List.Item key={key}>
                    <Button
                      onClick={() => changeSession(item)}
                      appearance="link"
                      color="violet"
                    >
                      {item}
                    </Button>
                  </List.Item>
                ))}
              </List>
            </>
          )}
        </Drawer.Body>
      </Drawer>
      <Card
        style={{
          height: '85vh',
          overflowY: 'auto',
          maxWidth: '992px',
          width: '100%',
        }}
      >
        <Card.Header as="h5">
          <HStack wrap justifyContent="space-between">
            <Button
              onClick={() => setDraweOpen(true)}
              appearance="primary"
              color="blue"
            >
              <RiChatHistoryFill
                style={{ fontSize: '18px', marginRight: '6px' }}
              />
              Sohbet Geçmişi
            </Button>
            {allMessages.length !== 0 && (
              <Stack spacing={16} wrap>
                <Button
                  onClick={generateNewChat}
                  appearance="primary"
                  color="green"
                >
                  <RiChat3Fill
                    style={{ fontSize: '18px', marginRight: '6px' }}
                  />
                  Yeni Sohbet
                </Button>
                <Button
                  onClick={deleteCurrentChat}
                  appearance="primary"
                  color="red"
                >
                  <RiDeleteBin7Fill
                    style={{ fontSize: '18px', marginRight: '6px' }}
                  />
                  Sohbeti Sil
                </Button>
              </Stack>
            )}
          </HStack>
        </Card.Header>
        <Divider />
        <Card.Body
          id="chatScreen"
          className="chat-screen"
          style={{ height: '100%' }}
        >
          {allMessages &&
            allMessages.length !== 0 &&
            allMessages.map((chat, key) =>
              chat.messageType === 'user' ? (
                <UserMessage
                  key={key}
                  message={chat.data.msg}
                  time={chat.data.time}
                />
              ) : (
                <AiMessage
                  key={key}
                  message={chat.data.msg}
                  time={chat.data.time}
                />
              )
            )}
          {allMessages.length === 0 && (
            <Text>Sohbet Başlatın, Dilediğinizi sorun !</Text>
          )}
          <>{messageWaiting && <WaitingResponse />}</>
        </Card.Body>
        <Divider />
        <Card.Footer style={{ marginTop: 'auto' }}>
          <SendMessage />
        </Card.Footer>
      </Card>
    </>
  );
};

export default ChatScreen;
