import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import {
    Toaster
} from "react-hot-toast";

import Landing from "../pages/Landing/Landing.jsx";
import Register from "../pages/Auth/Register.jsx";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreateCard from "../pages/Cards/CreateCard";
import EditCard from "../pages/Cards/EditCard";
import PublicCard from "../pages/PublicCard/PublicCard";
import Analytics from "../pages/Analytics/Analytics.jsx";
import Leads from "../pages/Leads/Leads";
import Settings from "../pages/Settings/Settings";
import Pricing from "../pages/Pricing/Pricing";

const AppRoutes = () => {

    return (
        <BrowserRouter>

            <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000
                    }}
                />
            <Routes>

                <Route
                    path="/"
                    element={<Landing />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/c/:slug"
                    element={<PublicCard />}
                />

                <Route
                    path="/cards/new"
                    element={
                        <ProtectedRoute>
                            <CreateCard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cards/:id/edit"
                    element={
                        <ProtectedRoute>
                            <EditCard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/analytics"
                    element={<Analytics />}
                />

                <Route
                    path="/leads"
                    element={<Leads />}
                />

                <Route
                    path="/settings"
                    element={<Settings />}
                />

                <Route
                    path="/pricing"
                    element={<Pricing />}
                />

            </Routes>

        </BrowserRouter>
    );
};

export default AppRoutes;