
import { ScrollRestoration } from "react-router-dom";
const AboutUs = () => {
    return (
        <div className="font-Mulish ">
           
           <section className="">
                <div className=" bg-cover max-h-[300px] bg-slate-50 " style={{ backgroundImage: `url(https://i.postimg.cc/HnPhy6QT/frame-from-plants-drawing-suplies.webp)` }}>

                    <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-gray-900">
                        <h1 className="text-4xl  mt-8 md:mt-0 font-bold leading-none sm:text-7xl xl:max-w-3xl text-white playfair ">Add Your Craft Items</h1>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto">
                <div  className=" p-6 py-12 space-y-24 lg:px-8 lg:max-w-7xl">
                    <div data-aos="fade-up"
                data-aos-duration="1000" className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
                        <div >
                            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl t">About Us </h3>
                            <p className="mt-3 text-lg ">Welcome to FaLi Villa, your destination for exceptional real estate experiences. We curate a collection of unique properties that cater to every lifestyle. Whether you seek a cozy abode or a luxurious retreat, we're here to help you find your dream home. Explore our portfolio and let us guide you to a property that reflects your individuality and aspirations. With FaLi Villa, your real estate dreams become a captivating reality.</p>

                        </div>
                        <div  aria-hidden="true" className="mt-10 lg:mt-0  ">
                            <img src="https://i.ibb.co/zJnbh4f/2150799725-1.jpg" alt="" className="mx-auto rounded-lg shadow-lg bg-gray-500" />
                        </div>
                    </div>
                    <div>
                        <div  data-aos="fade-up"
                data-aos-duration="1000" className="grid lg:gap-8 lg:grid-cols-2 lg:items-center ">
                            <div  className="lg:col-start-2">
                                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl t">Fictitious Founding Story</h3>
                                <p className="mt-3 text-lg ">Founded in 2008 in Villa Springs by visionary entrepreneurs Fiona Lawson and Liam Villanova, FaLi Villa is the result of their shared passion for architecture and design. Fiona, an architect, and Liam, a real estate investor, combined their expertise to redefine the real estate landscape. The name "FaLi Villa" honors their commitment to exceptional service and curated homes. Since inception, FaLi Villa has been synonymous with personalized attention, exceptional properties, and fulfilling real estate journeys.</p>
                            </div>
                            <div  className="mt-10 lg:mt-0 lg:col-start-1 lg:row-start-1">
                                <img src="https://i.ibb.co/Tt1HvJK/35839-1.jpg" alt="" className="mx-auto rounded-lg shadow-lg bg-gray-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="max-w-6xl mb-8 mx-auto">
                <div  data-aos="fade-up"
                data-aos-duration="1000" className=" flex flex-col-reverse  lg:flex-row">
                    <div className="flex flex-col px-6 py-8 space-y-6 rounded-sm sm:p-8 lg:p-12 lg:w-1/2 xl:w-2/5 ">

                        <div  className="lg:col-start-2">
                            <h3 className="text-2xl font-bold tracking-tight sm:text-4xl">Why Choose Us</h3>
                            <p className="mt-3 text-lg ">When it comes to selecting a real estate partner, why choose us? Because we offer more than just transactions – we provide personalized experiences tailored to your unique needs and preferences. We go above and beyond to ensure your satisfaction every step of the way. </p>
                            <div className="flex mt-3 justify-between">
                                <div className="p-1">
                                    <h1 className="font-bold text-xl">20+ Years</h1>
                                    <p>Of Real Estate Experience</p>
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