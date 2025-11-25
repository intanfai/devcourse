import "../../css/landing.css"; // Pastikan sesuai nama file
import CourseCard from "../Components/CourseCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import FAQ from "../Components/Faq.jsx";
import Footer from "../Components/Footer";
import TestimonialSlider from "../Components/TestimonialSlider.jsx";
import { Link } from "react-router-dom";


export default function Landing() {
    const [showMore, setShowMore] = useState(false);
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
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg py-5 px-8 lg:px-24 flex items-center justify-between border-b z-50">
                {/* LEFT — LOGO */}
                <div className="flex items-center gap-3 cursor-pointer">
                    <img src="/images/logo.png" className="w-10" alt="logo" />
                    <h1 className="text-xl font-bold text-[#004FC5]">
                        Dev
                        <span className="text-gray-800 font-semibold">
                            Course
                        </span>
                    </h1>
                </div>

                {/* MIDDLE — MENU */}
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

                {/* RIGHT — BUTTONS */}
                <div className="flex items-center gap-5">
                    <button className="font-semibold text-gray-800 hover:text-[#004FC5]">
                        Sign In
                    </button>
                    <Link to="/register"
                            className="bg-[#004FC5] text-white font-semibold px-6 py-2 rounded-full shadow-sm hover:bg-blue-700 transition">
                        Get Started
                    </Link>
                </div>
            </nav>
            {/* HERO SECTION */}
            <section
                id="home"
                className="pt-40 pb-32 relative overflow-hidden px-8 lg:px-24"
            >
                {/* Background biru lembut */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#eaf1ff] via-white to-[#f3f7ff] -z-20"></div>

                {/* Dekorasi biru belakang gambar */}
                <div className="absolute right-0 top-40 w-[480px] h-[480px] bg-[#dce8ff] rounded-[50px] blur-[2px] opacity-70 -z-10 hidden lg:block"></div>

                {/* Wrapper */}
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    {/* LEFT TEXT */}
                    <div className="max-w-xl">
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-[#004FC5] leading-tight mb-6">
                            Your Future <br />
                            Begins with the <br />
                            Courage to Learn.
                        </h1>

                        <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                            Learn programming with structured materials,
                            hands-on practice, and guidance from mentors ready
                            to support your growth.
                        </p>

                        {/* Search bar */}
                        <button className="bg-[#004FC5] text-white font-semibold px-6 py-2 rounded-full shadow-sm hover:bg-blue-700 transition">
                            Get Started
                        </button>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className="relative flex justify-center lg:justify-end">
                        {/* BLUE BACKGROUND SHAPE */}
                        <div
                            className="
                            absolute -right-0 top-7 
                            w-[520px] h-[520px] 
                            bg-gradient-to-br from-[#004FC5] to-[#2563eb]
                            opacity-[0.15] 
                            rounded-t-[60px]
                            rounded-b-none 
                            blur-sm -z-10 hidden lg:block"
                        ></div>

                        {/* Figur utama */}
                        <img
                            src="/images/hero.png"
                            className="w-[380px] lg:w-[520px] drop-shadow-xl relative z-10"
                        />

                        {/* Floating Card 1 */}
                        <div className="absolute top-6 -left-10 bg-white shadow-lg rounded-xl px-4 py-3 flex items-center gap-3 z-20">
                            <img
                                src="/images/jake.jpg"
                                className="w-10 h-10 rounded-full"
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

                        {/* Floating Card 2 */}
                        <div className="absolute top-48 -right-6 bg-white rounded-xl shadow-lg px-4 py-3 z-20">
                            <p className="font-bold text-sm text-[#004FC5]">
                                John Chena
                            </p>
                            <p className="text-xs text-gray-500">
                                Top Instructor
                            </p>
                            <p className="text-yellow-400 text-xs">★★★★★</p>
                        </div>

                        {/* Floating Card 3 */}
                        <div className="absolute bottom-8 right-20 bg-white rounded-xl shadow-xl px-4 py-3 z-20">
                            <p className="text-sm font-semibold mb-2">
                                Our Instructors
                            </p>
                            <div className="flex -space-x-3">
                                <img
                                    src="/images/sunoo.jpg"
                                    className="w-9 h-9 rounded-full border-2 border-white"
                                />
                                <img
                                    src="/images/jungwon.jpg"
                                    className="w-9 h-9 rounded-full border-2 border-white"
                                />
                                <img
                                    src="/images/sunghoon.jpg"
                                    className="w-9 h-9 rounded-full border-2 border-white"
                                />
                                <img
                                    src="/images/jennie.jpg"
                                    className="w-9 h-9 rounded-full border-2 border-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* COURSE SECTION */}
            <section id="courses" className="py-20 px-10 lg:px-24">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-3">Popular Courses</h2>
                    <p className="text-gray-600">
                        Explore our most popular classes chosen by thousands of
                        students.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* 3 CARD UTAMA */}
                    <CourseCard
                        thumbnail="/images/uiuxfundamentals.webp"
                        category="UI/UX Design"
                        title="UI/UX Design Fundamentals"
                        instructor="Sarah Kim"
                        rating={5.0}
                        students={2746}
                        price={49}
                        oldPrice={150}
                    />

                    <CourseCard
                        thumbnail="/images/htmlcss.jpg"
                        category="Frontend Development"
                        title="HTML & CSS Masterclass"
                        instructor="Daniel Park"
                        rating={5.0}
                        students={2589}
                        price={39}
                        oldPrice={99}
                    />

                    <CourseCard
                        thumbnail="/images/jsessentials.jpg"
                        category="JavaScript"
                        title="JavaScript Essentials"
                        instructor="Kevin Lee"
                        rating={5.0}
                        students={2456}
                        price={29}
                        oldPrice={85}
                    />

                    {/* CARD TAMBAHAN */}
                    {showMore &&
                        extraCourses.map((c, i) => (
                            <CourseCard
                                key={i}
                                thumbnail={c.thumbnail}
                                category={c.category}
                                title={c.title}
                                instructor={c.instructor}
                                rating={c.rating}
                                students={c.students}
                                price={c.price}
                                oldPrice={c.oldPrice}
                            />
                        ))}
                </div>

                {/* BUTTON SHOW / HIDE */}
                <div className="flex justify-center mt-12">
                    <button
                        onClick={() => setShowMore(!showMore)}
                        className="px-6 py-3 bg-[#004FC5] text-white rounded-full hover:bg-blue-700 transition"
                    >
                        {showMore ? "Show Less" : "View All Course"}
                    </button>
                </div>
            </section>
            {/* ABOUT SECTION CLEAN */}
            <section id="whydev" className="py-24 px-8 lg:px-24 bg-[#F4F7FF]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* LEFT — FEATURE CARDS */}
                    <div className="space-y-6">
                        {/* CARD 1 */}
                        <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                            <div className="w-14 h-14 bg-blue-100 text-blue-600 flex items-center justify-center rounded-xl text-2xl">
                                📘
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">
                                    Learn Anytime, Anywhere
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Study with flexible access wherever you are.
                                </p>
                            </div>
                        </div>

                        {/* CARD 2 */}
                        <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                            <div className="w-14 h-14 bg-purple-100 text-purple-600 flex items-center justify-center rounded-xl text-2xl">
                                🎓
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">
                                    Official Certificate
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Earn verified certificates to boost your
                                    portfolio.
                                </p>
                            </div>
                        </div>

                        {/* CARD 3 */}
                        <div className="flex items-start gap-5 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                            <div className="w-14 h-14 bg-pink-100 text-pink-600 flex items-center justify-center rounded-xl text-2xl">
                                🔄
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">
                                    Updated Materials
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    Courses are always updated to match industry
                                    trends.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — TEXT */}
                    <div>
                        <h2 className="text-4xl font-bold text-[#004FC5] mb-4 leading-snug">
                            Why Choose{" "}
                            <span className="text-blue-600">DevCourse?</span>
                        </h2>

                        <p className="text-gray-600 text-lg mb-8 max-w-lg">
                            We provide a structured and practical learning
                            experience designed to prepare you for real-world
                            careers in technology.
                        </p>

                        <button className="px-8 py-3 bg-[#004FC5] text-white rounded-full font-semibold shadow hover:bg-blue-700 transition">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>
            {/* TESTIMONIAL SECTION CLEAN */}
            <section id="testimoni" className="py-24 px-8 lg:px-24 relative">
                 <TestimonialSlider />
            </section>

           
            {/* FAQ SECTION */}
            <section id="faq" className="py-24 px-8 lg:px-24 bg-[#F4F7FF]">
                <div className="text-center mb-14">
                    <h2 className="text-4xl font-bold text-[#004FC5]">
                        Frequently Asked Question
                    </h2>
                    <p className="text-gray-600 mt-3">
                        Do you have any questions? Here are some frequently
                        asked questions that we have answered.
                    </p>
                </div>

                <FAQ />
            </section>
            {/* CTA SECTION */}
            <section className="py-24 px-6 lg:px-24">
                <div className="relative bg-[#F4F8FF] rounded-3xl p-12 lg:p-16 overflow-hidden shadow-sm max-w-3xl mx-auto">
                    {/* Decorative Dots / Shapes */}
                    

                    {/* CTA CONTENT */}
                    <div className="relative z-10 text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1E2A53] mb-3">
                            Grow your skills with us.
                        </h2>
                        <p className="text-xl text-gray-600 mb-10">
                            Join now & start learning.
                        </p>

                        {/* INPUT + BUTTON */}
                        <div className="flex justify-center">
                            <div className="flex bg-white shadow-lg rounded-full overflow-hidden w-full max-w-lg">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-5 py-3 outline-none"
                                />
                                <button className="px-6 py-3 bg-[#004FC5] text-white font-semibold hover:bg-blue-700 transition">
                                    Join Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer /> {/* Tambahkan ini */}
        </div>
    );
}
