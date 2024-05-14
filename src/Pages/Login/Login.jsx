import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import toast from 'react-hot-toast';
import axios from 'axios'
const Login = () => {
    const { loginUser, googleLogin} = useContext(AuthContext);
    const [show, setShow] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm()

    const togglePasswordVisibility = () => {
        setShow(!show);
    };

    const onSubmit = async(data) => {
        const { userEmail, userPassword } = data;
        try{
            const result =  await loginUser(userEmail,userPassword)
            const {data} = await axios.post(`https://server-navy-two-99.vercel.app/jwt`,{email : result?.user?.email},{withCredentials:true})
              console.log(data);
             toast.success("Sign In")
               navigate('/')
           } catch(error){
               if(error){
                   toast.error('Wrong email/password')
                }
           }
    }
    const handleGoogle = async() => {
        try{
            const result =  await googleLogin();
            const {data} = await axios.post(`https://server-navy-two-99.vercel.app/jwt`,{email : result?.user?.email},{withCredentials:true})
            console.log(data);
            toast.success("Sign In")
             navigate(location.state ? location.state : '/')
         }catch(error){
          if(error){
             toast.error('This Email Already Exist')
          }
         }
    }
    


    return (
        <div className="flex  pt-6 justify-center  items-center min-h-screen font-Meri w-full bg-cover" style={{ backgroundImage: `url(https://i.postimg.cc/kX25PqHb/tree-with-two-seasons-compared-scene-generative-ai.webp)` }}>
              
            <div className="flex justify-center  items-center min-h-screen">
                <div className="flex text-white flex-col animate__animated animate__zoomIn bg-opacity-5 backdrop-blur-3xl bg-[#b7004f3d]  md:w-[450px] p-10 pb-4 pt-2 rounded-xl ">
                    <div className="mb-4 text-center border-b-2">
                        <h1 className="my-2 text-3xl font-bold text-white ">Login</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">

                            <div>
                                <label htmlFor="email" className="block text-white  mb-2 text-sm">Email address</label>
                                <input type="email" name="email" id="email" placeholder="Enter your email address" className="w-full outline-none px-3 py-2 border rounded-md border-gray-200 bg-transparent " {...register("userEmail",
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
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="password" className="text-sm text-white ">Password</label>

                                </div>
                                <div className="relative">
                                    <input type={show ? "text" : "password"} placeholder="Enter your password" className="w-full px-3 py-2 outline-none border rounded-md border-gray-200 bg-transparent  "
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


                        </div>
                        <div className="pt-1">
                            <div>
                                <button type="submit" className="w-full px-8 py-2 font-semibold rounded-md bg-[#b70050]  text-xl text-white">Login</button>
                            </div>

                        </div>
                    </form>

                    <div className="flex items-center pt-4 space-x-1">
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                        <p className="px-3 text-sm dark:text-gray-300">Login with social accounts</p>
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button onClick={handleGoogle} className="p-3 rounded-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" id="google"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
                        </button>

                        
                    </div>
                    <p className="px-6 text-sm text-center text-gray-300">Don't have any account?
                        <Link to="/register" className="hover:underline text-red-600 pl-1 font-extrabold">Register</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;