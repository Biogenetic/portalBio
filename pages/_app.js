import '../styles/globals.css'
import AppWrapper from '../components/app-wrapper/AppWrapper';
import { AuthProvider } from '../contexts/AuthContext';
import { LayoutProvider } from '../contexts/LayoutContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider> 
      <LayoutProvider>
        <AppWrapper> 
          <Component {...pageProps} />
        </AppWrapper>        
      </LayoutProvider>
    </AuthProvider>
  )
}

export default MyApp;
