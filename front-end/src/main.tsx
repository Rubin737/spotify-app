import { createRoot } from "react-dom/client";
import App from "./App";
import { ClerkProvider } from "@clerk/react";
import AuthProvider from "./providers/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import "./App.css"
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';


const CLERK_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")!).render(
<div>
    <ClerkProvider publishableKey={CLERK_KEY} afterSignOutUrl="/">
      <BrowserRouter>
        <AuthProvider>
          <App />  
        </AuthProvider>
      </BrowserRouter>
    </ClerkProvider>
</div>
);
