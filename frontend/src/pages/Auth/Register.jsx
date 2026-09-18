import {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    motion
} from "framer-motion";

import {
    FiArrowRight,
    FiEye,
    FiEyeOff
} from "react-icons/fi";

import {
    useAuth
} from "../../context/AuthContext";

import {
    toast
} from "react-hot-toast";

import AuthLayout
    from "../../layouts/AuthLayout";

const Register = () => {

    const navigate =
        useNavigate();

    const {
        register
    } = useAuth();

    const [form, setForm] =
        useState({
            name: "",
            email: "",
            password: ""
        });

    const [showPassword,
        setShowPassword] =
        useState(false);

    const [loading,
        setLoading] =
        useState(false);

    const handleChange = (
        event
    ) => {

        const {
            name,
            value
        } = event.target;

        setForm(previous => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();

        try {

            setLoading(true);

            await register(form);

            toast.success(
                "Account created. Welcome!"
            );

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to create account"
            );

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
                        START FOR FREE
                    </span>

                    <h1>
                        Create your
                        <br />
                        digital identity.
                    </h1>

                    <p>
                        Build your card in minutes.
                        No credit card required.
                    </p>

                </div>

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-field">

                        <label>
                            Your name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Om Patel"
                            value={form.name}
                            onChange={handleChange}
                            autoComplete="name"
                            required
                        />

                    </div>

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

                        <label>
                            Password
                        </label>

                        <div className="password-input">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                placeholder="At least 8 characters"
                                value={
                                    form.password
                                }
                                onChange={
                                    handleChange
                                }
                                autoComplete="new-password"
                                minLength={8}
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

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >

                        <span>
                            {loading
                                ? "Creating account..."
                                : "Create account"}
                        </span>

                        {!loading && (
                            <FiArrowRight />
                        )}

                    </button>

                </form>

                <p className="auth-switch">
                    Already have an account?

                    <Link to="/login">
                        Sign in
                    </Link>
                </p>

                <p className="auth-legal">
                    By creating an account, you agree
                    to our Terms and Privacy Policy.
                </p>

            </motion.div>

        </AuthLayout>
    );
};

export default Register;