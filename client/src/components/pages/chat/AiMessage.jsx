import { Avatar, Card, Stack, Text } from 'rsuite';
import { UserContext } from '../../../contexts/UserContext';
import ai_profile from '../../../assets/icons/ai-profile.svg';
import ReactMarkdown from 'react-markdown';

const AiMessage = ({ message, time }) => {
  return (
    <Stack
      className="mb"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={16}
    >
      <Avatar src={ai_profile} circle style={{ minWidth: 36, minHeight: 36 }} />
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
    </Stack>
  );
};

export default AiMessage;
