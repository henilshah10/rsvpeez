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
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="createEvent" element={<CreateEvent />} />
                <Route path="myEvents" element={<AllEvents />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </>
    )
);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
