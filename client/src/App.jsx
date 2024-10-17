import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthProvider from "./context/AuthProvider";
import { Provider } from 'react-redux';
import store from './app/store'; // Import the store you created
// import { ApiProvider } from '@reduxjs/toolkit/query/react';
import apiSlice from './api/apiSlice'; // Import your API slice

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  console.log(clientId);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}> {/* Single instance of Provider */}
        {/* <ApiProvider api={apiSlice}> */}
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        {/* </ApiProvider> */}
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
