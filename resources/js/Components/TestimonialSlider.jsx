import Slider from "react-slick";
import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TestimonialSlider() {
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 800,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0px",
        arrows: false,
        pauseOnHover: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            {
                breakpoint: 640,
                settings: { slidesToShow: 1, centerMode: false },
            },
        ],
    };

    const testimonials = [
        {
            title: "Understand Easily",
            text: "Explained step-by-step which made it easy to follow.",
            image: "/images/anita.jpg",
            name: "Anita",
            role: "Senior Student",
            rating: 5,
        },
        {
            title: "Supportive Instructors",
            text: "The instructors are patient and explain the reasoning.",
            image: "/images/anita.jpg",
            name: "Anita",
            role: "Senior Student",
            rating: 5,
        },
        {
            title: "Perfect for Beginners",
            text: "I started with zero experience but now I feel confident.",
            image: "/images/anita.jpg",
            name: "Fatimah",
            role: "Senior Student",
            rating: 5,
        },
        {
            title: "Very Practical",
            text: "Lessons are straight to the point and practical.",
            image: "/images/jake.jpg",
            name: "Jake",
            role: "Developer",
            rating: 5,
        },
        {
            title: "Highly Recommended",
            text: "Clear, structured and fun to follow!",
            image: "/images/jay.jpg",
            name: "Jay",
            role: "Student",
            rating: 5,
        },
    ];

    return (
        <section className="py-24 px-8 lg:px-24">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900">
                    What our student say
                </h2>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                    about us
                </p>
            </div>

            {/* Slider */}
            <Slider ref={sliderRef} {...settings}>
                {testimonials.map((item, i) => (
                    <div key={i} className="px-4 pt-6 pb-6">
                        <div
                            className="testimonial-card bg-[#F5F8FE] shadow-[0_4px_20px_rgba(0,0,0,0.0)]
         p-8 rounded-2xl border-gray-200 h-[240px]"
                        >
                            {" "}
                            <h3 className="font-semibold text-lg mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                {item.text}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.image}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold">
                                            {item.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {item.role}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-yellow-400 text-lg">
                                    {"★".repeat(item.rating)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>

            {/* Custom Arrows */}
            <div className="flex justify-center gap-6 mt-14">
                <button
                    onClick={() => sliderRef.current.slickPrev()}
                    className="w-11 h-11 rounded-full border flex items-center justify-center text-blue-600 hover:bg-blue-50 transition"
                >
                    <i className="ri-arrow-left-line text-xl"></i>
                </button>

                <button
                    onClick={() => sliderRef.current.slickNext()}
                    className="w-11 h-11 rounded-full border flex items-center justify-center text-blue-600 hover:bg-blue-50 transition"
                >
                    <i className="ri-arrow-right-line text-xl"></i>
                </button>
            </div>
        </section>
    );
}
