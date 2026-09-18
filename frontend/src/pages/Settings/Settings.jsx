import {
    useEffect,
    useState
} from "react";

import {
    FiUser,
    FiMail,
    FiLock,
    FiCheck,
    FiAlertCircle
} from "react-icons/fi";

import DashboardLayout
    from "../../layouts/DashboardLayout";

import {
    getProfile,
    updateProfile,
    changePassword
} from "../../services/userService";

import "./Settings.css";


const Settings = () => {

    const [user, setUser] =
        useState(null);

    const [name, setName] =
        useState("");

    const [
        currentPassword,
        setCurrentPassword
    ] = useState("");

    const [
        newPassword,
        setNewPassword
    ] = useState("");

    const [
        confirmPassword,
        setConfirmPassword
    ] = useState("");

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        savingProfile,
        setSavingProfile
    ] = useState(false);

    const [
        changingPassword,
        setChangingPassword
    ] = useState(false);

    const [
        message,
        setMessage
    ] = useState("");

    const [
        error,
        setError
    ] = useState("");


    const loadProfile =
        async () => {

            try {

                setLoading(true);

                const response =
                    await getProfile();

                setUser(
                    response.user
                );

                setName(
                    response.user.name || ""
                );

            } catch (error) {

                console.error(error);

                setError(
                    error.response
                        ?.data
                        ?.message ||
                    "Failed to load profile"
                );

            } finally {

                setLoading(false);

            }

        };


    useEffect(() => {

        loadProfile();

    }, []);


    const clearFeedback = () => {

        setMessage("");
        setError("");

    };


    const handleProfileSave =
        async (event) => {

            event.preventDefault();

            clearFeedback();

            try {

                setSavingProfile(true);

                const response =
                    await updateProfile({
                        name
                    });

                setUser(
                    current => ({
                        ...current,
                        ...response.user
                    })
                );

                setName(
                    response.user.name
                );

                setMessage(
                    "Profile updated successfully"
                );

            } catch (error) {

                setError(
                    error.response
                        ?.data
                        ?.message ||
                    "Failed to update profile"
                );

            } finally {

                setSavingProfile(false);

            }

        };


    const handlePasswordChange =
        async (event) => {

            event.preventDefault();

            clearFeedback();

            if (
                newPassword !==
                confirmPassword
            ) {

                setError(
                    "New passwords do not match"
                );

                return;
            }

            if (
                newPassword.length < 8
            ) {

                setError(
                    "Password must be at least 8 characters"
                );

                return;
            }

            try {

                setChangingPassword(true);

                await changePassword(
                    currentPassword,
                    newPassword
                );

                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");

                setMessage(
                    "Password changed successfully"
                );

            } catch (error) {

                setError(
                    error.response
                        ?.data
                        ?.message ||
                    "Failed to change password"
                );

            } finally {

                setChangingPassword(false);

            }

        };


    if (loading) {

        return (

            <DashboardLayout>

                <main className="settings-page">

                    <div className="settings-loading">

                        <div className="settings-spinner" />

                        <span>
                            Loading settings...
                        </span>

                    </div>

                </main>

            </DashboardLayout>

        );

    }


    return (

        <DashboardLayout>

            <main className="settings-page">

                <div className="settings-container">

                    {/* Header */}

                    <div className="settings-header">

                        <div>

                            <span className="settings-kicker">
                                ACCOUNT
                            </span>

                            <h1>
                                Settings
                            </h1>

                            <p>
                                Manage your profile
                                and account security.
                            </p>

                        </div>

                    </div>


                    {/* Feedback */}

                    {(message || error) && (

                        <div
                            className={
                                error
                                    ? "settings-feedback error"
                                    : "settings-feedback success"
                            }
                        >

                            {error ? (
                                <FiAlertCircle />
                            ) : (
                                <FiCheck />
                            )}

                            <span>
                                {message || error}
                            </span>

                        </div>

                    )}


                    {/* Profile */}

                    <section className="settings-card">

                        <div className="settings-card-heading">

                            <div className="settings-section-icon">
                                <FiUser />
                            </div>

                            <div>

                                <span>
                                    PROFILE
                                </span>

                                <h2>
                                    Personal information
                                </h2>

                                <p>
                                    Update the information
                                    associated with your account.
                                </p>

                            </div>

                        </div>


                        <form
                            className="settings-form"
                            onSubmit={
                                handleProfileSave
                            }
                        >

                            <div className="settings-avatar-row">

                                <div className="settings-avatar">

                                    {user?.avatar ? (

                                        <img
                                            src={
                                                user.avatar
                                            }
                                            alt={
                                                user.name
                                            }
                                        />

                                    ) : (

                                        user?.name
                                            ?.charAt(0)
                                            .toUpperCase()

                                    )}

                                </div>


                                <div>

                                    <strong>
                                        {user?.name}
                                    </strong>

                                    <span>
                                        {user?.email}
                                    </span>

                                </div>

                            </div>


                            <div className="settings-field">

                                <label>
                                    Name
                                </label>

                                <div className="settings-input-wrap">

                                    <FiUser />

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={
                                            event =>
                                                setName(
                                                    event.target.value
                                                )
                                        }
                                        minLength={2}
                                        maxLength={100}
                                        required
                                    />

                                </div>

                            </div>


                            <div className="settings-field">

                                <label>
                                    Email
                                </label>

                                <div className="settings-input-wrap disabled">

                                    <FiMail />

                                    <input
                                        type="email"
                                        value={
                                            user?.email ||
                                            ""
                                        }
                                        disabled
                                    />

                                </div>

                                <small>
                                    Email changes require
                                    verification and are
                                    currently locked.
                                </small>

                            </div>


                            <div className="settings-actions">

                                <button
                                    type="submit"
                                    disabled={
                                        savingProfile
                                    }
                                >

                                    {savingProfile
                                        ? "Saving..."
                                        : "Save changes"}

                                </button>

                            </div>

                        </form>

                    </section>


                    {/* Password */}

                    <section className="settings-card">

                        <div className="settings-card-heading">

                            <div className="settings-section-icon">
                                <FiLock />
                            </div>

                            <div>

                                <span>
                                    SECURITY
                                </span>

                                <h2>
                                    Change password
                                </h2>

                                <p>
                                    Keep your account
                                    secure with a strong password.
                                </p>

                            </div>

                        </div>


                        <form
                            className="settings-form"
                            onSubmit={
                                handlePasswordChange
                            }
                        >

                            <div className="settings-field">

                                <label>
                                    Current password
                                </label>

                                <div className="settings-input-wrap">

                                    <FiLock />

                                    <input
                                        type="password"
                                        value={
                                            currentPassword
                                        }
                                        onChange={
                                            event =>
                                                setCurrentPassword(
                                                    event.target.value
                                                )
                                        }
                                        autoComplete="current-password"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="settings-field">

                                <label>
                                    New password
                                </label>

                                <div className="settings-input-wrap">

                                    <FiLock />

                                    <input
                                        type="password"
                                        value={
                                            newPassword
                                        }
                                        onChange={
                                            event =>
                                                setNewPassword(
                                                    event.target.value
                                                )
                                        }
                                        minLength={8}
                                        autoComplete="new-password"
                                        required
                                    />

                                </div>

                                <small>
                                    Use at least 8 characters.
                                </small>

                            </div>


                            <div className="settings-field">

                                <label>
                                    Confirm new password
                                </label>

                                <div className="settings-input-wrap">

                                    <FiLock />

                                    <input
                                        type="password"
                                        value={
                                            confirmPassword
                                        }
                                        onChange={
                                            event =>
                                                setConfirmPassword(
                                                    event.target.value
                                                )
                                        }
                                        minLength={8}
                                        autoComplete="new-password"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="settings-actions">

                                <button
                                    type="submit"
                                    disabled={
                                        changingPassword
                                    }
                                >

                                    {changingPassword
                                        ? "Changing..."
                                        : "Change password"}

                                </button>

                            </div>

                        </form>

                    </section>

                </div>

            </main>

        </DashboardLayout>

    );

};


export default Settings;