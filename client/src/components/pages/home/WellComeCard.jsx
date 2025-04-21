import React from 'react';
import PageBox from '../../layout/PageBox';
import { Text, VStack } from 'rsuite';
import animation from '../../../assets/media/react-animation.mp4';

const WellComeCard = () => {
  return (
    <VStack alignItems="center">
      <video src={animation} loop muted autoPlay></video>
      <Text
        style={{ textAlign: 'center', fontSize: '32px', fontWeight: 'bold' }}
        color="violet"
      >
        React Chat Bot
      </Text>
      <Text size={'lg'}>
        React ve Google Gemini API kullanılarak oluşturulmuş basit bir chat
        uygulaması.
      </Text>
    </VStack>
  );
};

export default WellComeCard;
