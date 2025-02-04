import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ScrollRestoration } from "react-router-dom";
import toast from 'react-hot-toast';
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
const Register = () => {
    const { createUser, profileUpdate } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation()
    const [show, setShow] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const togglePasswordVisibility = () => {
        setShow(!show);
    };

    const onSubmit = async (data) => {
        const { userEmail, userPassword, userName, userPhoto } = data;
        try {
            const result = await createUser(userEmail, userPassword)
            await profileUpdate(userName, userPhoto)
            const { data } = await axios.post(`https://assignment-11-server-gamma-ivory.vercel.app/jwt`, { email: result?.user?.email }, { withCredentials: true })
            console.log(data);
            toast.success("Welcome to HoTel FaLiz")
            navigate(location.state ? location.state : '/')
            
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className="flex justify-center bg-[#18181b]  items-center min-h-[700px] w-full  bg-cover" >
<Helmet>
                <title>HoTel FaLiz | Register</title>
            </Helmet>
            <div data-aos="zoom-in"
                data-aos-duration="1000" className="flex justify-center items-center min-h-screen">
                <div className="flex flex-col md:w-[450px]  mt-8 p-10 pb-4 pt-2 rounded-xl text-white bg-opacity-5 backdrop-blur-3xl bg-[#cfaf4542]">
                    <div className="mb-4 text-center border-b-2">
                        <h1 className="my-2 text-3xl font-bold  ">Register your account</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <div>
                                <label htmlFor="name" className="block  mb-2 text-sm">Username</label>
                                <input type="text" placeholder="Enter your Name" className="w-full px-3 py-2 border outline-none   bg-transparent  "
                                    {...register("userName")}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2   text-sm">Email address</label>
                                <input type="email" placeholder="Enter your email address" className="w-full px-3 py-2 border outline-none  border-gray-200 bg-transparent  "  {...register("userEmail",
                                    {
                                        required: true,
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Invalid Email"
                                        }
                                    }
                                )} />
                                {errors.userEmail && <small className="text-red-500 font-bold">{errors.userEmail.message}</small>}

                            </div>
                            <div>
                                <label htmlFor="photo" className="block   mb-2 text-sm">Photo url</label>
                                <input type="url" placeholder="Enter your photo url" className="w-full px-3 py-2 border outline-none  bg-transparent  " {...register("userPhoto")} />
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="password" className="text-sm ">Password</label>

                                </div>
                                <div className="relative">
                                    <input type={show ? "text" : "password"} placeholder="Enter your password" className="w-full outline-none px-3 py-2 border  border-gray-200 bg-transparent  "
                                        {...register("userPassword",
                                            {
                                                required: true,
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters"
                                                },
                                                pattern: {
                                                    value: /^(?=.*[a-z])(?=.*[A-Z])/,
                                                    message: "At least one lowercase letter and one uppercase letter"
                                                }
                                            }
                                        )}
                                    />
                                    <span onClick={togglePasswordVisibility} className="absolute right-[2%] top-[31%]">
                                        {!show ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                                    </span>

                                </div>
                                {errors.userPassword && <small className="text-red-500 font-bold">{errors.userPassword.message}</small>}
                            </div>
                            <div className="flex items-center gap-2 ">
                                <input type="checkbox"  {...register("userTerms", { required: true })} />
                                <label className="block " htmlFor="term">Accept Term & Conditions</label>
                                {errors.userTerms && <small className="text-red-500 font-bold">(Please accept out terms & conditions)</small>}
                            </div>

                        </div>
                        <div className="space-y-2">
                            <div>
                                <button type="submit" className="bg-transparent w-full text-lg font-bold border border-[#cfaf45] text-white  p-2 flex gap-1 items-center hover:text-white justify-center hover:bg-[#cfaf45] px-4 transition-all duration-1000 ">Register</button>
                            </div>
                            <p className="px-6 text-sm text-center text-gray-300">Already have an account?
                                <Link to="/login" className="hover:underline pl-1 text-red-600 font-extrabold">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <ScrollRestoration />
        </div>
    );
};

export default Register;