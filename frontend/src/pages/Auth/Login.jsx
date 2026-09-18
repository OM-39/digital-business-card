import { useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import { motion } from "framer-motion";

import {
    FiArrowRight,
    FiEye,
    FiEyeOff
} from "react-icons/fi";

import { toast } from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

import AuthLayout from "../../layouts/AuthLayout";

const Login = () => {

    const navigate = useNavigate();

    const {
        login
    } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [errorMessage, setErrorMessage] =
        useState("");

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setForm(previous => ({
            ...previous,
            [name]: value
        }));

        setErrorMessage("");
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setErrorMessage("");

        try {

            setLoading(true);

            await login(form);

            toast.success(
                "Welcome back!"
            );

            navigate("/dashboard");

        } catch (error) {

            const message =
                error.response?.data?.message ||
                "Invalid email or password";

            setErrorMessage(message);

        } finally {

            setLoading(false);
        }
    };

    return (
        <AuthLayout>

            <motion.div
                className="auth-form-wrapper"
                initial={{
                    opacity: 0,
                    y: 20
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
                transition={{
                    duration: 0.55
                }}
            >

                <div className="auth-heading">

                    <span className="auth-kicker">
                        WELCOME BACK
                    </span>

                    <h1>
                        Good to
                        <br />
                        see you again.
                    </h1>

                    <p>
                        Sign in to manage your
                        digital identity.
                    </p>

                </div>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-field">

                        <label>
                            Email address
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            autoComplete="email"
                            required
                        />

                    </div>

                    <div className="form-field">

                        <div className="field-label-row">

                            <label>
                                Password
                            </label>

                            <Link
                                to="/forgot-password"
                                className="forgot-link"
                            >
                                Forgot password?
                            </Link>

                        </div>

                        <div className="password-input">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="Your password"
                                value={
                                    form.password
                                }
                                onChange={
                                    handleChange
                                }
                                autoComplete="current-password"
                                required
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        previous =>
                                            !previous
                                    )
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword
                                    ? <FiEyeOff />
                                    : <FiEye />
                                }
                            </button>

                        </div>

                    </div>

                    {errorMessage && (
                        <motion.div
                            className="auth-error"
                            initial={{
                                opacity: 0,
                                y: -5
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                        >
                            {errorMessage}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >

                        <span>
                            {loading
                                ? "Signing in..."
                                : "Sign in"}
                        </span>

                        {!loading && (
                            <FiArrowRight />
                        )}

                    </button>

                </form>

                <p className="auth-switch">

                    Don't have an account?

                    <Link to="/register">
                        Create one
                    </Link>

                </p>

            </motion.div>

        </AuthLayout>
    );
};

export default Login;