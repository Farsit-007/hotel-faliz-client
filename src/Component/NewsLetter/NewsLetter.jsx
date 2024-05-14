import axios from "axios";
import toast from "react-hot-toast";

const NewsLetter = () => {
    const handleNewsLetter =async (e) =>{
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const newLetter = {email}
        try {
            const { data } = await axios.post(`http://localhost:5000/newsletter`, newLetter)
            toast.success("Thanks for subscribe");
            form.reset()
        } catch (err) {
            toast.error(err.response.data);
        }
    }
    return (
        <div className="max-w-6xl  px-16 py-16 mx-auto">
            <div className="items-center lg:flex">
                <div className="w-full">
                    <div className="lg:max-w-lg">
                        <h1 className="text-3xl font-semibold lg:text-4xl">
                            Subscribe To The <span className="text-blue-500">Newsletter</span>
                        </h1>
                        <p className="mt-3 text-gray-600 dark:text-gray-400">
                            Be the first to know when our <span className="font-medium text-blue-500">Brand</span> is live
                        </p>
                       <form onSubmit={handleNewsLetter}>
                       <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                            <input
                                id="email"
                                type="email"
                                className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                                placeholder="Email Address"
                            />
                            <button
                                className="w-full px-5 py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto lg:mx-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                            >
                                Subscribe
                            </button>
                        </div>
                       </form>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                    <img
                        className="w-full h-full max-w-md"
                        src="https://merakiui.com/images/components/Email-campaign-bro.svg"
                        alt="email illustration vector art"
                    />
                </div>
            </div>
            
        </div>
    );
};

export default NewsLetter;
