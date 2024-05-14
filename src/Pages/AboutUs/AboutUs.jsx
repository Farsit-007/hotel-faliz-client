import { Helmet } from "react-helmet-async";
import { ScrollRestoration } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
const AboutUs = () => {
    return (
        <div className="bg-[#18181b]">
            <Helmet>
                <title>HoTel FaLiz | About Us</title>
            </Helmet>
           <section className="">
                <div className=" bg-cover max-h-[300px] bg-slate-50 " style={{ backgroundImage: `url(https://i.postimg.cc/bJJS6bSC/softly-lit-bedroom-night-by-lamp-light.webp)` }}>

                    <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-gray-900">
                        <h1 className="text-4xl  mt-8 md:mt-0 font-bold leading-none sm:text-7xl xl:max-w-3xl text-white playfair ">About Us</h1>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto">
                <div  className=" p-6 py-12 space-y-24 lg:px-8 lg:max-w-7xl">
                    <div data-aos="fade-up"
                data-aos-duration="1000" className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
                        <div >
                            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl text-[#cfaf45]">About Us </h3>
                            <p className="mt-3 text-white  text-lg ">Welcome to HoTel FaLiz, your gateway to exceptional hospitality experiences. We specialize in offering a curated selection of unique accommodations that cater to every traveler's needs. Whether you're looking for a cozy room or a luxurious retreat, we're here to assist you in finding the perfect hotel for your stay. Explore our portfolio of properties and let us guide you to a hotel that suits your style and preferences. With HoTel FaLiz, your booking dreams transform into an unforgettable reality.</p>

                        </div>
                        <div  aria-hidden="true" className="mt-10 lg:mt-0  ">
                            <img src="https://i.ibb.co/zJnbh4f/2150799725-1.jpg" alt="" className="mx-auto rounded-lg shadow-lg bg-gray-500" />
                        </div>
                    </div>
                    <div>
                        <div  data-aos="fade-up"
                data-aos-duration="1000" className="grid lg:gap-8 lg:grid-cols-2 lg:items-center ">
                            <div  className="lg:col-start-2">
                                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl t text-[#cfaf45]">Fictitious Founding Story</h3>
                                <p className="mt-3 text-white  text-lg ">Established in 2008 in Springsburg by visionary entrepreneurs Fiona Lawson and Liam Villanova, HoTel FaLiz emerged from their mutual love for hospitality and design. Fiona, with her background in architecture, and Liam, a seasoned real estate investor, joined forces to revolutionize the hospitality industry. The name "HoTel FaLiz" pays homage to their dedication to outstanding service and handpicked accommodations. Since its inception, HoTel FaLiz has stood for bespoke experiences, remarkable properties, and enriching stays.</p>
                            </div>
                            <div  className="mt-10 lg:mt-0 lg:col-start-1 lg:row-start-1">
                                <img src="https://i.ibb.co/Tt1HvJK/35839-1.jpg" alt="" className="mx-auto rounded-lg shadow-lg bg-gray-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="max-w-6xl pb-8 mx-auto">
                <div  data-aos="fade-up"
                data-aos-duration="1000" className=" flex flex-col-reverse  lg:flex-row">
                    <div className="flex flex-col px-6 py-8 space-y-6 rounded-sm sm:p-8 lg:p-12 lg:w-1/2 xl:w-2/5 ">

                        <div  className="lg:col-start-2">
                            <h3 className="text-2xl text-[#cfaf45] font-bold tracking-tight sm:text-4xl">Why Choose Us</h3>
                            <p className="mt-3 text-white  text-lg ">When it comes to choosing a hospitality partner, why choose us? Because we offer more than just bookings – we deliver personalized experiences tailored to your specific needs and preferences. We strive to exceed your expectations and ensure your satisfaction at every stage of your stay.</p>
                            <div className="flex mt-3 text-white justify-between">
                                <div className="p-1">
                                    <h1 className="font-bold text-xl">20+ Years</h1>
                                    <p>Of Hotel Experience</p>
                                </div>
                                <div className="p-1">
                                    <h1 className="font-bold text-xl">2012-2024</h1>
                                    <p>Realtors®️ Sales Award</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div  className="lg:w-1/2 xl:w-3/5 ">
                        <div className="flex items-center justify-center p-4 md:p-8 lg:p-12">
                            <img src="https://i.ibb.co/hZMXw6h/2150799631-1.webp" alt="" className="rounded-lg shadow-lg bg-gray-500 aspect-video sm:min-h-96" />
                        </div>
                    </div>
                </div>
            </section>
            <ScrollRestoration />
        </div>
    );
};

export default AboutUs;