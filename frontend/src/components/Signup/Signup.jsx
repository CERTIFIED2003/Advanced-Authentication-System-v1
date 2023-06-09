import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const newForm = new FormData();
        newForm.append("file", avatar);
        newForm.append("name", name);
        newForm.append("email", email);
        newForm.append("password", password);
        await axios.post(`${server}/user/create-user`, newForm, config)
            .then((res) => {
                toast.success(res.data.message)
                setEmail("");
                setName("");
                setPassword("");
                setVisible(false);
                setAvatar(null);
                navigate("/auth");
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold font-Poppins text-gray-900">
                    Create your Account
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md font-Roboto">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Your Full Name
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    name="text"
                                    autoComplete="name"
                                    required
                                    placeholder="Enter Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Your Email
                            </label>
                            <div className="mt-1">
                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    placeholder="Enter Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Your Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    type={visible ? "text" : "password"}
                                    name="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    placeholder="Enter Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                {visible ? (
                                    <AiOutlineEye
                                        className="absolute right-2 top-2 cursor-pointer"
                                        size={25}
                                        onClick={() => setVisible(false)}
                                    />
                                ) : (
                                    <AiOutlineEyeInvisible
                                        className="absolute right-2 top-2 cursor-pointer"
                                        size={25}
                                        onClick={() => setVisible(true)}
                                    />
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="avatar"
                                className="block text-sm font-medium text-gray-700"
                            ></label>
                            <div className="mt-2 flex items-center">
                                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                                    {avatar
                                        ? <img
                                            src={URL.createObjectURL(avatar)}
                                            alt="avatar"
                                            className="h-full w-full object-cover rounded-full"
                                        />
                                        : <RxAvatar className="h-8 w-8" />
                                    }
                                </span>
                                {avatar && (
                                    <span
                                        className="cursor-pointer ml-2 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                        onClick={() => setAvatar(null)}
                                    >
                                        Remove Profile Picture
                                    </span>
                                )}
                                {!avatar && (
                                    <label
                                        htmlFor="file-input"
                                        className="cursor-pointer ml-2 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                    >
                                        <span>
                                            Upload Profile Picture
                                        </span>
                                        <input
                                            type="file"
                                            multiple={false}
                                            name="avatar"
                                            id="file-input"
                                            accept=".jpg,.jpeg,.png"
                                            onChange={handleFileUpload}
                                            className="sr-only"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={loading}
                                type="submit"
                                className={`group cursor-${loading ? "not-allowed" : "pointer"} relative w-full h-[40px] flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? "bg-gray-400" : "bg-blue-600"} hover:${loading ? "bg-gray-500" : "bg-blue-700"}`}
                            >
                                {loading ? "Creating..." : "CREATE"}
                            </button>
                        </div>
                        <div className={`${styles.normalFlex} w-full`}>
                            <h4>Already have an account?</h4>
                            <Link to="/auth" className="text-blue-600 pl-2">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup