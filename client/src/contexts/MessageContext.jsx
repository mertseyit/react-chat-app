/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import generateCurrentDate from '../utils/generateCurrentDate';
import axios from 'axios';
import { get, ref, remove, set } from 'firebase/database';
import { database } from '../services/firebase';
import { UserContext } from './UserContext';
import generateFirebaseDateTag from '../utils/generateFirebaseDateTag';

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [firstConversation, setFirstConversation] = useState(false);
  const [sessionId, setSessionId] = useState(localStorage.getItem('session'));
  const [userSessions, setUserSessions] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [messageWaiting, setMessageWaiting] = useState(false);

  useEffect(() => {
    if (allMessages.length === 0) {
      setFirstConversation(true);
    } else {
      setFirstConversation(false);
    }
  }, [allMessages]);

  const generateNewChat = () => {
    const newSessionId = `session_${Math.random()
      .toString()
      .replaceAll('.', '-')}-${Math.random().toString().replaceAll('.', '-')}`;
    setSessionId(newSessionId);
    setAllMessages([]);
    setFirstConversation(true);
  };

  const generateSession = () => {
    const newSessionId = localStorage.getItem('session')
      ? localStorage.getItem('session')
      : `session_${Math.random()
          .toString()
          .replaceAll('.', '-')}-${Math.random()
          .toString()
          .replaceAll('.', '-')}`;
    console.log('generated new session:');
    setSessionId(newSessionId);
  };

  const createAQuestion = (message) => {
    if (firstConversation) {
      setUserSessions((pre) => [...pre, sessionId]);
      setFirstConversation(false);
    }
    set(
      ref(
        database,
        `${user.userUID}/${sessionId}/${generateFirebaseDateTag()}`
      ),
      {
        messageType: 'user',
        data: {
          msg: message,
          time: generateCurrentDate(),
        },
      }
    );
    setMessageWaiting(true);
    setAllMessages((pre) => [
      ...pre,
      {
        messageType: 'user',
        data: {
          msg: message,
          time: generateCurrentDate(),
        },
      },
    ]);

    axios
      .post('http://localhost:8080/chat/speak', { message: message })
      .then((response) => {
        if (response.status === 200) {
          set(
            ref(
              database,
              `${user.userUID}/${sessionId}/${generateFirebaseDateTag()}`
            ),
            {
              messageType: 'chatbot_ai',
              data: response.data.data,
            }
          );
          setAllMessages((pre) => [
            ...pre,
            {
              messageType: 'chatbot_ai',
              data: response.data.data,
            },
          ]);
          setMessageWaiting(false);
        } else {
          setMessageWaiting(false);
          console.log(response.statusText);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessageWaiting(false);
      });
  };

  const deleteCurrentChat = () => {
    const sessionRef = ref(database, `${user.userUID}/${sessionId}`);
    remove(sessionRef)
      .then(() => {
        generateNewChat();
      })
      .catch((err) => {
        console.log(err);
      });
    const newSessions = userSessions.filter((item) => item !== sessionId);
    setUserSessions(newSessions);
  };

  const getUserChats = () => {
    setAllMessages([]);
    setLoading(true);
    const sessionRef = ref(database, `${user.userUID}/${sessionId}`);
    get(sessionRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((value) => {
            setAllMessages((pre) => [...pre, value.val()]);
          });
        } else {
          setAllMessages([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Veri çekme hatası:', error);
        setLoading(false);
      });
  };

  const getUserSessions = () => {
    const sessionRef = ref(database, `${user.userUID}`);
    get(sessionRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach((item) => {
            setUserSessions((pre) => [...pre, item.key]);
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Veri çekme hatası:', error);
        setLoading(false);
      });
  };

  const changeSession = (sessionId) => {
    setSessionId(sessionId);
    getUserChats();
  };

  useEffect(() => {
    console.log(sessionId);
    localStorage.setItem('session', sessionId);
  }, [sessionId]);

  return (
    <MessageContext.Provider
      value={{
        allMessages,
        userSessions,
        messageWaiting,
        loading,
        setAllMessages,
        createAQuestion,
        generateNewChat,
        generateSession,
        getUserChats,
        deleteCurrentChat,
        getUserSessions,
        changeSession,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
