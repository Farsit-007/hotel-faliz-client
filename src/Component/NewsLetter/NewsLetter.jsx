import axios from "axios";
import toast from "react-hot-toast";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
const NewsLetter = () => {
    const handleNewsLetter = async (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const newLetter = { email }
        try {
            const { data } = await axios.post(`https://server-navy-two-99.vercel.app/newsletter`, newLetter)
            toast.success("Thanks for subscribe");
            form.reset()
        } catch (err) {
            toast.error(err.response.data);
        }
    }
    return (
        <div data-aos="zoom-in"
        data-aos-duration="1000"  className="bg-[#27272c] my-10 p-20">
            <div className="items-center lg:flex">
                <div className="w-full">
                    <div className="flex flex-col md:flex-row justify-around items-center">
                        <div>
                            <h1 className="text-4xl text-white font-semibold lg:text-4xl">
                                Subscribe To The <span className="text-[#cfaf45]">Newsletter</span>
                            </h1>
                            <p className="mt-3 text-gray-600 text-lg dark:text-gray-400">
                                Be the first to know when our <span className="font-medium text-[#cfaf45]">Brand</span> is live
                            </p>
                        </div>
                        <div className=" mt-6 space-y-3 lg:space-y-0 ">

                            <form onSubmit={handleNewsLetter}>

                            <div className="flex">
                            <input
                                    id="email"
                                    type="email"
                                    className="px-4 py-2 text-gray-700 bg-white border  dark:text-gray-300 dark:border-gray-600  "
                                    placeholder="Email Address"
                                />
                                <button
                                    className="w-full px-5 py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-[#cfaf45] lg:w-auto lg:mx-4 hover:bg-transparent focus:outline-none "
                                >
                                    Subscribe
                                </button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default NewsLetter;
