import { Avatar, Card, Loader, Stack, Text } from 'rsuite';
import { UserContext } from '../../../contexts/UserContext';
import ai_profile from '../../../assets/icons/ai-profile.svg';

const WaitingResponse = () => {
  return (
    <Stack className="mb" justifyContent="flex-start" spacing={16}>
      <Avatar src={ai_profile} circle style={{ minWidth: 36, minHeight: 36 }} />
      <Card>
        <Card.Body>
          <Loader />
        </Card.Body>
      </Card>
    </Stack>
  );
};

export default WaitingResponse;
