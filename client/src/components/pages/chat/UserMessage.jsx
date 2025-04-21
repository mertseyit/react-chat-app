import React, { useContext } from 'react';
import { Avatar, Card, Stack, Text } from 'rsuite';
import { UserContext } from '../../../contexts/UserContext';
import ReactMarkdown from 'react-markdown';

const UserMessage = ({ message, time }) => {
  const { user } = useContext(UserContext);
  return (
    <Stack
      className="mb"
      justifyContent="flex-end"
      alignItems="flex-start"
      spacing={16}
    >
      <Card>
        <Card.Body>
          <ReactMarkdown>{message}</ReactMarkdown>
        </Card.Body>
        <Card.Footer>
          <Text style={{ fontStyle: 'italic', fontSize: '12px' }} muted>
            {time}
          </Text>
        </Card.Footer>
      </Card>
      <Avatar
        src={user && user.photoURL}
        circle
        style={{ minWidth: 36, minHeight: 36 }}
      />
    </Stack>
  );
};

export default UserMessage;
