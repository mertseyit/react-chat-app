import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'rsuite/dist/rsuite.min.css'; // or 'rsuite/styles/index.less'
import { CustomProvider } from 'rsuite';
import { UserProvider } from './contexts/UserContext.jsx';
import { MessageProvider } from './contexts/MessageContext.jsx';

createRoot(document.getElementById('root')).render(
  <CustomProvider>
    <UserProvider>
      <MessageProvider>
        <App />
      </MessageProvider>
    </UserProvider>
  </CustomProvider>
);
