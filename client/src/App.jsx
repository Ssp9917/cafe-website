import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthProvider from "./context/AuthProvider";

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  console.log(clientId);

  return (
    <>
      <GoogleOAuthProvider clientId="804403418968-ssv20chas0vibj059pc48in5mtvpodda.apps.googleusercontent.com">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
