import './App.css';
import { useWindowSize } from './utils/useWindowSize';
import MobileHomePage from './components/HomePage/MobileHome/MobileHomePage';
import { IonApp, setupIonicReact } from '@ionic/react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

/* Ionic Core CSS */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/core.css';

import DesktopRoutes from './Routes/DesktopRoutes'; // Ensure DesktopRoutes is correctly defined
import MobileHomeContent from './components/HomePage/MobileHome/MobileHomeContent';
import MobileAboutUsContent from './components/HomePage/MobileHome/MobileAboutUsContent';
import MobileCategoryContent from './components/HomePage/MobileHome/MobileCategoryContent';
import MobileRoutes from './Routes/MobileRoutes';


setupIonicReact();

function App() {
  const windowSize = useWindowSize();

  return (
    <IonApp>
      <Router>
        {windowSize < 768 ? (
          <MobileRoutes/>
        ) : (
          <DesktopRoutes />
        )}
      </Router>
    </IonApp>
  );
}

export default App;
