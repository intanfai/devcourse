import "../../css/landing.css";
import CourseCard from "../Components/CourseCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import FAQ from "../Components/Faq.jsx";
import Footer from "../Components/Footer";
import TestimonialSlider from "../Components/TestimonialSlider.jsx";
import { Link } from "react-router-dom";

// AOS IMPORT
import AOS from "aos";
import "aos/dist/aos.css";

export default function Landing() {
    const [showMore, setShowMore] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 900,
            once: true,
            offset: 100,
            easing: "ease-out-quart",
        });
    }, []);

    const extraCourses = [
        {
            thumbnail: "/images/node.png",
            category: "Backend Development",
            title: "Node.js",
            instructor: "Emily Wong",
            rating: 5.0,
            students: 1823,
            price: 45,
            oldPrice: 120,
        },
        {
            thumbnail: "/images/datamana.jpg",
            category: "Database",
            title: "Database Management",
            instructor: "Joel Gret",
            rating: 5.0,
            students: 3341,
            price: 35,
            oldPrice: 105,
        },
        {
            thumbnail: "/images/postgre.webp",
            category: "Database",
            title: "PostgreSQL",
            instructor: "Mozila Thor",
            rating: 5.0,
            students: 3341,
            price: 35,
            oldPrice: 105,
        },
    ];

    return (
        <div className="bg-white">
            {/* ================= NAVBAR ================= */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg py-4 px-6 lg:px-20 flex items-center justify-between border-b z-50">
                {/* LOGO */}
                <div className="flex items-center gap-3 cursor-pointer">
                    <img src="/images/logo.png" className="w-9" alt="logo" />
                    <h1 className="text-xl font-bold text-[#004FC5]">
                        Dev<span className="text-gray-800">Course</span>
                    </h1>
                </div>

                {/* DESKTOP MENU */}
                <ul className="hidden lg:flex items-center gap-10 text-gray-700 font-medium">
                    {["home", "courses", "whydev", "testimoni"].map((item) => (
                        <li key={item} className="relative group capitalize">
                            <a
                                href={`#${item}`}
                                className="hover:text-[#004FC5] transition"
                            >
                                {item === "whydev" ? "About" : item}
                            </a>
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#004FC5] transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    ))}
                </ul>

                {/* AUTH BUTTON (DESKTOP) */}
                <div className="hidden lg:flex items-center gap-5">
                    <Link
                        to="/login"
                        className="font-semibold text-gray-800 hover:text-[#004FC5]"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/register"
                        className="bg-[#004FC5] text-white font-semibold px-6 py-2 rounded-full shadow-sm hover:bg-blue-700 transition"
                    >
                        Get Started
                    </Link>
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                    onClick={() => setMobileMenu(!mobileMenu)}
                    className="lg:hidden text-gray-700 text-2xl"
                >
                    ☰
                </button>
            </nav>

            {/* MOBILE DROPDOWN */}
            {mobileMenu && (
                <div className="lg:hidden px-6 pt-20 pb-6 bg-white border-b flex flex-col gap-4 text-gray-700 font-medium">
                    {["home", "courses", "whydev", "testimoni"].map((item) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            onClick={() => setMobileMenu(false)}
                            className="capitalize py-2 hover:text-[#004FC5]"
                        >
                            {item === "whydev" ? "About" : item}
                        </a>
                    ))}

                    <Link
                        to="/login"
                        className="mt-3 font-semibold text-gray-800 hover:text-[#004FC5]"
                    >
                        Sign In
                    </Link>

                    <Link
                        to="/register"
                        className="bg-[#004FC5] text-white font-semibold px-5 py-2 rounded-full shadow-sm hover:bg-blue-700 transition w-max"
                    >
                        Get Started
                    </Link>
                </div>
            )}

            {/* ================= HERO SECTION ================= */}
            <section
                id="home"
                className="pt-28 pb-20 lg:pt-32 lg:pb-24 relative overflow-hidden px-6 lg:px-20 bg-[#F4F7FF]"
            >
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* LEFT SIDE */}
                    <div className="max-w-xl" data-aos="fade-up">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#004FC5] leading-snug mb-5">
                            Your Future <br /> Begins with the <br /> Courage to
                            Learn.
                        </h1>

                        <p className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed">
                            Learn programming with structured materials,
                            hands-on practice, and guidance from mentors ready
                            to support your growth.
                        </p>

                        <Link
                            to="/register"
                            className="bg-[#004FC5] text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-blue-700 transition inline-block"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* RIGHT SIDE */}
                    {/* RIGHT IMAGE */}
                    <div
                        className="relative flex justify-center lg:justify-end animate-float"
                        data-aos="fade-left"
                    >
                        <div
                            className="
                absolute top-10 -right-4 w-[420px] h-[420px] bg-[#d9e6ff]
                opacity-50 rounded-3xl blur-md -z-10 hidden lg:block
                animate-pulse-glow
            "
                        ></div>

                        <img
                            src="/images/hero.png"
                            className="w-[460px] lg:w-[640px] drop-shadow-xl relative z-10 translate-y-10 lg:translate-y-15"
                        />

                        {/* Floating Cards */}
                        <div
                            className="absolute top-10 -left-6 bg-white shadow-lg rounded-xl px-4 py-3 flex items-center gap-3 z-20 animate-float-slow"
                            data-aos="zoom-in"
                            data-aos-delay="200"
                        >
                            <img
                                src="/images/jake.jpg"
                                className="w-9 h-9 rounded-full"
                            />
                            <div>
                                <p className="font-semibold text-sm">
                                    Jake Sim
                                </p>
                                <p className="text-xs text-gray-500">
                                    Has been our client for 5 years
                                </p>
                            </div>
                        </div>

                        <div
                            className="absolute top-36 -right-2 bg-white rounded-xl shadow-lg px-4 py-3 z-20 animate-float-slow"
                            data-aos="zoom-in"
                            data-aos-delay="300"
                        >
                            <p className="font-bold text-sm text-[#004FC5]">
                                John Chena
                            </p>
                            <p className="text-xs text-gray-500">
                                Top Instructor
                            </p>
                            <p className="text-yellow-400 text-xs">★★★★★</p>
                        </div>

                        <div
                            className="absolute bottom-4 right-24 bg-white rounded-xl shadow-lg px-4 py-3 z-20 animate-float-slow"
                            data-aos="zoom-in"
                            data-aos-delay="400"
                        >
                            <p className="text-sm font-semibold mb-2">
                                Our Instructors
                            </p>

                            <div className="flex -space-x-3">
                                {["sunoo", "jungwon", "sunghoon", "jennie"].map(
                                    (img) => (
                                        <img
                                            key={img}
                                            src={`/images/${img}.jpg`}
                                            className="w-9 h-9 rounded-full border-2 border-white"
                                        />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= POPULAR COURSES ================= */}
            <section
                id="courses"
                className="py-16 lg:py-20 px-6 lg:px-20 overflow-hidden"
            >
                <div data-aos="fade-up" className="text-center mb-10 lg:mb-12">
                    <h2 className="text-3xl font-bold mb-3">Popular Courses</h2>
                    <p className="text-gray-600 text-sm md:text-base">
                        Explore our most popular classes chosen by thousands of
                        students.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            data-aos="fade-up"
                            data-aos-delay={i * 150}
                        >
                            <CourseCard
                                thumbnail={
                                    [
                                        "/images/uiuxfundamentals.webp",
                                        "/images/htmlcss.jpg",
                                        "/images/jsessentials.jpg",
                                    ][i]
                                }
                                category={
                                    [
                                        "UI/UX Design",
                                        "Frontend Development",
                                        "JavaScript",
                                    ][i]
                                }
                                title={
                                    [
                                        "UI/UX Design Fundamentals",
                                        "HTML & CSS Masterclass",
                                        "JavaScript Essentials",
                                    ][i]
                                }
                                instructor={
                                    ["Sarah Kim", "Daniel Park", "Kevin Lee"][i]
                                }
                                rating={5.0}
                                students={[2746, 2589, 2456][i]}
                                price={[49, 39, 29][i]}
                                oldPrice={[150, 99, 85][i]}
                            />
                        </div>
                    ))}

                    {showMore &&
                        extraCourses.map((c, i) => (
                            <div
                                key={i}
                                data-aos="fade-up"
                                data-aos-delay={200 + i * 150}
                            >
                                <CourseCard {...c} />
                            </div>
                        ))}
                </div>

                <div className="flex justify-center mt-10" data-aos="fade-up">
                    <button
                        onClick={() => setShowMore(!showMore)}
                        className="px-6 py-3 bg-[#004FC5] text-white rounded-full hover:bg-blue-700 transition"
                    >
                        {showMore ? "Show Less" : "View All Course"}
                    </button>
                </div>
            </section>

            {/* ================= ABOUT SECTION ================= */}
            <section id="whydev" className="py-20 px-6 lg:px-20 bg-[#F4F7FF]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
                    {/* FEATURE CARDS */}
                    <div className="space-y-6" data-aos="fade-right">
                        {[
                            [
                                "📘",
                                "Learn Anytime, Anywhere",
                                "Study with flexible access wherever you are.",
                            ],
                            [
                                "🎓",
                                "Official Certificate",
                                "Earn verified certificates to boost your portfolio.",
                            ],
                            [
                                "🔄",
                                "Updated Materials",
                                "Courses are always updated to match industry trends.",
                            ],
                        ].map(([icon, title, desc], i) => (
                            <div
                                key={i}
                                className="flex items-start gap-5 bg-white p-6 md:p-7 rounded-2xl shadow-sm hover:shadow-xl transition border"
                                data-aos="fade-right"
                                data-aos-delay={150 * i}
                            >
                                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#E7F0FF] flex items-center justify-center text-2xl md:text-3xl text-[#004FC5] shadow-sm">
                                    {icon}
                                </div>

                                <div>
                                    <h3 className="font-semibold text-lg md:text-xl mb-1 text-gray-800">
                                        {title}
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base">
                                        {desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* TEXT BLOCK */}
                    <div data-aos="fade-left">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#004FC5] mb-5 leading-tight">
                            Why Choose{" "}
                            <span className="text-[#003a90]">DevCourse?</span>
                        </h2>

                        <p className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
                            We provide a structured, practical, and guided
                            learning journey tailored for anyone who wants to
                            build a real career in tech — from complete
                            beginners to advanced learners.
                        </p>

                        <button className="px-8 py-3 bg-[#004FC5] text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* ================= TESTIMONIALS ================= */}
            <section
                id="testimoni"
                className="py-20 px-6 lg:px-20"
                data-aos="fade-up"
            >
                <TestimonialSlider />
            </section>

            {/* ================= FAQ ================= */}
            <section id="faq" className="py-20 px-6 lg:px-20 bg-[#F4F7FF]">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-[#004FC5]">
                        Frequently Asked Question
                    </h2>
                    <p className="text-gray-600 mt-3 text-sm md:text-base">
                        Do you have any questions? Here are some frequently
                        asked questions.
                    </p>
                </div>

                <FAQ />
            </section>

            {/* ================= CTA ================= */}
            <section className="py-20 px-6 lg:px-20">
                <div className="bg-[#F4F8FF] rounded-3xl p-10 md:p-14 shadow-sm max-w-3xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1E2A53] mb-3">
                            Grow your skills with us.
                        </h2>
                        <p className="text-lg text-gray-600 mb-10">
                            Join now & start learning.
                        </p>

                        <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-full overflow-hidden mx-auto max-w-lg">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-5 py-3 outline-none text-sm"
                            />
                            <button className="px-6 py-3 bg-[#004FC5] text-white font-semibold hover:bg-blue-700 transition">
                                Join Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
