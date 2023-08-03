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
  EngineeringOutlined,
  AnalyticsOutlined,
  ManageAccountsOutlined,
  PeopleAltOutlined,
  AccountBalanceOutlined,
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
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "pages/categories";
import { Login } from "pages/login";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { parseJwt } from "utils/parse-jwt";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import {
  AdminCreate,
  AdminEdit,
  AdminList,
  AdminShow,
  UserAccount,
  UserContent,
} from "pages";

import logo from "./assets/logo-greetgrid.png";

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
          "http://localhost:8080/api/v1/superAdmins",
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
            "superAdmin",
            JSON.stringify({
              ...profileObj,
              avatar: profileObj.picture,
              superAdminid: data._id,
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
      const user = localStorage.getItem("superAdmin");
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
              // dataProvider={dataProvider("http://localhost:8080/api/v1")}
              dataProvider={dataProvider("http://localhost:8080/api/v1")}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[
                {
                  name: "admins",
                  icon: <EngineeringOutlined />,
                  options: { label: "General Administration" },
                  list: "/admins",
                  create: "/admins/create",
                  edit: "/admins/edit/:id",
                  show: "/admins/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "user account management",
                  icon: <ManageAccountsOutlined />,
                  options: { label: "User Account Management" },
                  list: "/user-account",
                },
                {
                  name: "user content control",
                  options: { label: "User Content Control" },
                  list: "/user-content",
                },
                {
                  name: "app maintenance",
                  icon: <AccountBalanceOutlined />,
                  options: { label: "App Maintenance" },
                  list: MuiInferencer,
                },
                {
                  name: "user support",
                  icon: <PeopleAltOutlined />,
                  options: { label: "User Support" },
                  list: MuiInferencer,
                },
                {
                  name: "analitics",
                  icon: <AnalyticsOutlined />,
                  list: MuiInferencer,
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "4rGHVM-p4dA7f-vACqw6",
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
                                <img
                                  src={logo}
                                  alt="logo"
                                  width="28px"
                                  height="28px"
                                />
                              ) : (
                                <img src={logo} alt="logo1" width="32px" />
                              )
                            }
                            text="Greetgrid"
                          />
                        )}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="blog_posts" />}
                  />
                  {/* <Route path="/blog-posts">
                    <Route index element={<BlogPostList />} />
                    <Route path="create" element={<BlogPostCreate />} />
                    <Route path="edit/:id" element={<BlogPostEdit />} />
                    <Route path="show/:id" element={<BlogPostShow />} />
                  </Route>
                  <Route path="/categories">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                  </Route> */}
                  <Route path="/admins">
                    <Route index element={<AdminList />} />
                    <Route path="create" element={<AdminCreate />} />
                    <Route path="edit/:id" element={<AdminEdit />} />
                    <Route path="show/:id" element={<AdminShow />} />
                  </Route>
                  <Route path="/user-account">
                    <Route index element={<UserAccount />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                  </Route>
                  <Route path="/user-content">
                    <Route index element={<UserContent />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
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
