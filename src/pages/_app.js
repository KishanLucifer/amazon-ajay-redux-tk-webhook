import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import "../styles/globals.css";
import { SessionProvider as AuthProvider } from "next-auth/react";
import { PersistGate } from "redux-persist/integration/react";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      {/* Over here, we have imported SessionProvider and set the session. This means we give the entire app
      the access to the authentication state and can be used throughout the app. */}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
};

export default MyApp;
