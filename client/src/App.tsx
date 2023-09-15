import { AuthBindings, Authenticated, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
} from "@refinedev/mui";

import {
  AccountCircleOutlined,
  AccountBalanceOutlined,
  ChatBubbleOutline,
  PeopleAltOutlined,
  StarOutlineRounded,
  VillaOutlined,
} from "@mui/icons-material";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios, { AxiosRequestConfig } from "axios";
import { CredentialResponse } from "interfaces/google";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { parseJwt } from "utils/parse-jwt";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  AllProperties,
  Agents,
  AgentProfile,
  CreateProperty,
  EditProperty,
  PropertyDetails,
  Login,
  Home,
  MyProfile,
} from "pages";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      //save user to MongoDB...
      if (profileObj) {
        const response = await fetch(
          "http://localhost:8080/api/v1/users",
          // "https://greetgrid-admin.onrender.com/api/v1/users",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: profileObj.name,
              email: profileObj.email,
              avatar: profileObj.picture,
            }),
          }
        );

        const data = await response.json();

        if (response.status === 200) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              userid: data._id,
            })
          );
        } else {
          return Promise.reject();
        }
      }

      if (profileObj) {
        localStorage.setItem("token", `${credential}`);

        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider("http://localhost:8080/api/v1")}
              // dataProvider={dataProvider(
              //   "https://greetgrid-admin.onrender.com/api/v1"
              // )}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[
                {
                  name: "properties",
                  icon: <VillaOutlined />,
                  options: { label: "Properties" },
                  list: AllProperties,
                  create: CreateProperty,
                  edit: EditProperty,
                  show: PropertyDetails,
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "agents",
                  icon: <PeopleAltOutlined />,
                  options: { label: "Agents" },
                  list: Agents,
                  show: AgentProfile,
                },
                {
                  name: "reviews",
                  icon: <StarOutlineRounded />,
                  options: { label: "Reviews" },
                  list: Home,
                },
                {
                  name: "messages",
                  icon: <ChatBubbleOutline />,
                  options: { label: "Messages" },
                  list: Home,
                },
                {
                  name: "my-profile",
                  icon: <AccountCircleOutlined />,
                  options: { label: "My Profile" },
                  list: MyProfile,
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "4rGHVM-p4dA7f-vACqw6",
                disableTelemetry: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2
                        Header={() => <Header isSticky={true} />}
                        Title={({ collapsed }) => (
                          <ThemedTitleV2
                            // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
                            collapsed={collapsed}
                            icon={
                              collapsed ? (
                                <AccountBalanceOutlined
                                  sx={{ color: "#000" }}
                                />
                              ) : (
                                <AccountBalanceOutlined
                                  sx={{
                                    color: "#000",
                                  }}
                                />
                              )
                            }
                            text="My Dashboard"
                          />
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route path="/properties">
                    <Route index element={<AllProperties />} />
                    <Route path="create" element={<CreateProperty />} />
                    <Route path="edit/:id" element={<EditProperty />} />
                    <Route path="show/:id" element={<PropertyDetails />} />
                  </Route>
                  <Route path="/agents">
                    <Route index element={<Agents />} />
                    <Route path="show/:id" element={<AgentProfile />} />
                  </Route>
                  <Route path="/">
                    <Route index element={<Home />} />
                  </Route>
                  <Route path="/reviews">
                    <Route index element={<Home />} />
                  </Route>
                  <Route path="/messages">
                    <Route index element={<Home />} />
                  </Route>
                  <Route path="/my-profile">
                    <Route index element={<MyProfile />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
