import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Challenge from "./routes/challenges/page.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignUp from "./routes/auth/signup.tsx";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import SignIn from "./routes/auth/signin.tsx";
import AuthRoute from "./routes/auth/auth-route.tsx";
import { AssetsDetails } from "./routes/assets-details.tsx";
import { Transfer } from "./routes/transfer/transfer.tsx";
import { Send } from "./routes/transfer/send.tsx";
import Restore from "./routes/restore/index.tsx";
import Contact from "./routes/contacts/index.tsx";
import AddContact from "./routes/contacts/add.tsx";
import NotificationHook from "./routes/auth/notification.tsx";

// Create a client
const queryClient = new QueryClient();

const router = createMemoryRouter([
  {
    element: <AuthRoute />,
    children: [
      {
        element: <NotificationHook />,
        children: [
          {
            path: "/",
            element: <App />,
            children: [
              {
                index: true,
                element: <AssetsDetails />,
              },
              {
                path: "/transfer",
                element: <Transfer />,
              },
              {
                path: "/send",
                element: <Send />,
              },
            ],
          },
          {
            path: "/challenge",
            element: <Challenge />,
          },
          {
            path: "/contacts",
            element: <Contact />,
          },
          {
            path: "/addcontact",
            element: <AddContact />,
          },
          {
            path: "/restore",
            element: <Restore />,
          },
        ],
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster
          containerStyle={{
            textSizeAdjust: "auto",
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
