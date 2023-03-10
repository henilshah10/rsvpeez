// importing Pico CSS
import "@picocss/pico";

// imports from router dom
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

// layouts
import RootLayout from "./layouts/RootLayout";

// pages
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import AllEvents from "./pages/AllEvents";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Invites from "./pages/Invites";

import { GlobalProvider } from "./contexts/GlobalContext";
import { AuthProvider } from "./contexts/AuthContext";
import { DbProvider } from "./contexts/DbContext";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="createEvent" element={<CreateEvent />} />
                <Route path="myEvents" element={<AllEvents />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="profile" element={<Profile />} />
                <Route path="/invites/:id" element={<Invites />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </>
    )
);

const App = () => {
    return (
        <GlobalProvider>
            <AuthProvider>
                <DbProvider>
                    <RouterProvider router={router} />
                </DbProvider>
            </AuthProvider>
        </GlobalProvider>
    );
};

export default App;
