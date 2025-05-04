import './App.css';
import { useWindowSize } from './utils/useWindowSize';
import MobileHomePage from './components/HomePage/MobileHomePage';
import HomePage from './components/HomePage/HomePage';
import { IonApp, setupIonicReact } from '@ionic/react';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/core.css';

setupIonicReact();

function App() {
  const windowSize = useWindowSize()
  return windowSize < 768?(
    <IonApp>
      <MobileHomePage/>
    </IonApp>
  ): (
    <HomePage/>
  );
}

export default App;
