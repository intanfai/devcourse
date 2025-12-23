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
        autoplaySpeed: 3500,
        speed: 900,
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
        <section className="px-8 lg:px-24">
            {/* SLIDER */}
            <Slider ref={sliderRef} {...settings}>
                {testimonials.map((item, i) => (
                    <div key={i} className="px-5 pt-6 pb-10">
                        <div
                            className="
                            bg-white rounded-2xl shadow-lg border-2 border-gray-100 
                            px-8 py-8 h-full
                            transition-all duration-300 
                            hover:-translate-y-2 hover:shadow-2xl hover:border-blue-200
                            "
                        >
                            {/* TITLE */}
                            <h3 className="font-bold text-xl mb-3 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                {item.title}
                            </h3>

                            {/* TEXT */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-10">
                                {item.text}
                            </p>

                            {/* FOOTER */}
                            <div className="flex items-center justify-between">
                                {/* USER */}
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.image}
                                        className="w-12 h-12 rounded-full object-cover shadow-md ring-2 ring-blue-100"
                                        alt={item.name}
                                    />
                                    <div>
                                        <p className="font-bold text-gray-800">
                                            {item.name}
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                            {item.role}
                                        </p>
                                    </div>
                                </div>

                                {/* RATING */}
                                <div className="text-yellow-400 text-lg">
                                    {"★".repeat(item.rating)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>

            {/* CUSTOM ARROWS */}
            <div className="flex justify-center gap-6 mt-14">
                <button
                    onClick={() => sliderRef.current.slickPrev()}
                    className="
                    w-14 h-14 rounded-full 
                    bg-gradient-to-r from-blue-600 to-blue-800
                    shadow-lg shadow-blue-500/30
                    flex items-center justify-center 
                    text-white hover:shadow-xl hover:shadow-blue-500/50
                    hover:scale-110
                    transition-all duration-300
                    "
                >
                    <i className="ri-arrow-left-line text-2xl"></i>
                </button>

                <button
                    onClick={() => sliderRef.current.slickNext()}
                    className="
                    w-14 h-14 rounded-full 
                    bg-gradient-to-r from-blue-600 to-blue-800
                    shadow-lg shadow-blue-500/30
                    flex items-center justify-center 
                    text-white hover:shadow-xl hover:shadow-blue-500/50
                    hover:scale-110
                    transition-all duration-300
                    "
                >
                    <i className="ri-arrow-right-line text-2xl"></i>
                </button>
            </div>
        </section>
    );
}
