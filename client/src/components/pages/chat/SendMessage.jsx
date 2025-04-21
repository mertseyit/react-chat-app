import { Button, HStack, IconButton, Input } from 'rsuite';
import { RiSendPlane2Line } from 'react-icons/ri';
import { useContext, useEffect, useState } from 'react';
import { MessageContext } from '../../../contexts/MessageContext';

const SendMessage = () => {
  const scrollScreen = document.getElementById('chatScreen');
  const { createAQuestion } = useContext(MessageContext);
  const [message, setMessage] = useState('');
  const scrollToBottom = () => {
    scrollScreen &&
      scrollScreen.scrollTo({
        behavior: 'smooth',
        top: scrollScreen.scrollHeight,
      });
  };

  useEffect(() => {
    scrollToBottom();
  }, [scrollScreen && scrollScreen.scrollHeight]);

  return (
    <HStack spacing={16} style={{ width: '100%' }}>
      <Input
        value={message}
        onChange={(value) => setMessage(value)}
        as="textarea"
        rows={3}
        placeholder="Mesajınızı bu alana yazın"
      />
      <IconButton
        onClick={() => {
          createAQuestion(message);
          setMessage('');
          scrollToBottom();
        }}
        type="submit"
        style={{ height: '100%', minWidth: 48 }}
        icon={<RiSendPlane2Line />}
      />
    </HStack>
  );
};

export default SendMessage;
