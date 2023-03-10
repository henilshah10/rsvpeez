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

import { AuthProvider } from "./contexts/AuthContext";
import { GlobalProvider } from "./contexts/GlobalContext";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout />}>
                <Route path="home" element={<Home />} />
                <Route path="createEvent" element={<CreateEvent />} />
                <Route path="myEvents" element={<AllEvents />} />
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </>
    )
);

const App = () => {
    return (
        <GlobalProvider>
            <AuthProvider>
                <RouterProvider router={router}></RouterProvider>
            </AuthProvider>
        </GlobalProvider>
    );
};

export default App;
