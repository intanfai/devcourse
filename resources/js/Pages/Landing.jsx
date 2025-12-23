import "../../css/landing.css";
import CourseCard from "../Components/CourseCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import FAQ from "../Components/Faq.jsx";
import Footer from "../Components/Footer";
import TestimonialSlider from "../Components/TestimonialSlider.jsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
    FaRocket, 
    FaCertificate, 
    FaChartLine, 
    FaGraduationCap,
    FaCode,
    FaUsers,
    FaStar,
    FaArrowRight,
    FaPlay,
    FaCheckCircle
} from "react-icons/fa";

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
        <div className="bg-gradient-to-b from-white via-blue-50/30 to-white">
            {/* ================= NAVBAR ================= */}
            <motion.nav 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="fixed top-0 w-full bg-white/70 backdrop-blur-xl py-4 px-6 lg:px-20 flex items-center justify-between border-b border-blue-100/50 z-50 shadow-sm"
            >
                {/* LOGO */}
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 cursor-pointer"
                >
                    <img src="/images/logo.png" className="w-10" alt="DevCourse Logo" />
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        DevCourse
                    </h1>
                </motion.div>

                {/* DESKTOP MENU */}
                <ul className="hidden lg:flex items-center gap-10 text-gray-700 font-medium">
                    {["home", "courses", "whydev", "testimoni"].map((item, index) => (
                        <motion.li 
                            key={item} 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group capitalize"
                        >
                            <a
                                href={`#${item}`}
                                className="hover:text-blue-600 transition-colors duration-300"
                            >
                                {item === "whydev" ? "About" : item}
                            </a>
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-300 group-hover:w-full"></span>
                        </motion.li>
                    ))}
                </ul>

                {/* AUTH BUTTON (DESKTOP) */}
                <div className="hidden lg:flex items-center gap-5">
                    <Link
                        to="/login"
                        className="font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/register"
                        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold px-7 py-2.5 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300"
                    >
                        Get Started
                    </Link>
                </div>

                {/* MOBILE MENU BUTTON */}
                <button
                    onClick={() => setMobileMenu(!mobileMenu)}
                    className="lg:hidden text-gray-700 text-2xl hover:text-blue-600 transition-colors"
                >
                    ☰
                </button>
            </motion.nav>

            {/* MOBILE DROPDOWN */}
            {mobileMenu && (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:hidden fixed top-20 left-0 right-0 mx-4 mt-2 px-6 py-6 bg-white/95 backdrop-blur-xl border border-blue-100 rounded-2xl flex flex-col gap-4 text-gray-700 font-medium shadow-xl z-40"
                >
                    {["home", "courses", "whydev", "testimoni"].map((item) => (
                        <a
                            key={item}
                            href={`#${item}`}
                            onClick={() => setMobileMenu(false)}
                            className="capitalize py-2 hover:text-blue-600 transition-colors hover:pl-2 duration-300"
                        >
                            {item === "whydev" ? "About" : item}
                        </a>
                    ))}

                    <Link
                        to="/login"
                        className="mt-3 font-semibold text-gray-800 hover:text-blue-600 transition-colors"
                    >
                        Sign In
                    </Link>

                    <Link
                        to="/register"
                        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all w-max"
                    >
                        Get Started
                    </Link>
                </motion.div>
            )}

            {/* ================= HERO SECTION ================= */}
            <section
                id="home"
                className="pt-28 pb-20 lg:pt-36 lg:pb-28 relative overflow-hidden px-6 lg:px-20"
            >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
                    {/* LEFT SIDE */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full text-blue-700 font-medium text-sm mb-6"
                        >
                            <FaRocket className="text-blue-600" />
                            <span>Start Your Journey Today</span>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 bg-clip-text text-transparent leading-tight mb-6"
                        >
                            Master Skills,
                            <br />
                            Build Your
                            <br />
                            <span className="relative">
                                Future
                                <motion.span
                                    className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-400/30 -z-10"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ delay: 1, duration: 0.8 }}
                                />
                            </span>
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed"
                        >
                            Learn programming with structured materials, hands-on practice, and guidance from expert mentors ready to support your growth journey.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link
                                to="/register"
                                className="group bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold px-8 py-4 rounded-full shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2"
                            >
                                Get Started Free
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <button className="group bg-white text-blue-700 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 inline-flex items-center justify-center gap-2">
                                <FaPlay className="text-blue-600" />
                                Watch Demo
                            </button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-8 mt-12"
                        >
                            {[
                                { number: "10K+", label: "Students" },
                                { number: "50+", label: "Courses" },
                                { number: "98%", label: "Success Rate" }
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* RIGHT SIDE */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        {/* Glowing Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl"></div>

                        <div className="relative">
                            <motion.img
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                src="/images/hero.png"
                                className="w-[460px] lg:w-[600px] drop-shadow-2xl relative z-10"
                                alt="Hero"
                            />

                            {/* Floating Card 1 */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8, type: "spring" }}
                                whileHover={{ scale: 1.1 }}
                                className="absolute top-10 -left-6 bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl px-5 py-4 flex items-center gap-3 z-20 border border-blue-100"
                            >
                                <img
                                    src="/images/jake.jpg"
                                    className="w-12 h-12 rounded-full ring-2 ring-blue-500"
                                    alt="Student"
                                />
                                <div>
                                    <p className="font-bold text-sm text-gray-800">Jake Sim</p>
                                    <div className="flex items-center gap-1 text-yellow-500 text-xs">
                                        <FaStar />
                                        <span className="text-gray-600">5.0 Rating</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Card 2 */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1, type: "spring" }}
                                whileHover={{ scale: 1.1 }}
                                className="absolute top-36 -right-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl px-5 py-4 z-20 border border-blue-100"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                                        <FaCode className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-800">John Chena</p>
                                        <p className="text-xs text-gray-500">Top Instructor</p>
                                    </div>
                                </div>
                                <div className="flex text-yellow-400 text-xs gap-1">
                                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                                </div>
                            </motion.div>

                            {/* Floating Card 3 */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2, type: "spring" }}
                                whileHover={{ scale: 1.1 }}
                                className="absolute bottom-8 right-20 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl px-5 py-4 z-20 border border-blue-100"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <FaUsers className="text-blue-600 text-lg" />
                                    <p className="text-sm font-bold text-gray-800">Expert Instructors</p>
                                </div>
                                <div className="flex -space-x-3">
                                    {["sunoo", "jungwon", "sunghoon", "jennie"].map((img) => (
                                        <img
                                            key={img}
                                            src={`/images/${img}.jpg`}
                                            className="w-10 h-10 rounded-full border-3 border-white shadow-lg"
                                            alt="Instructor"
                                        />
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-3 border-white bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                                        +50
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ================= POPULAR COURSES ================= */}
            <section
                id="courses"
                className="py-20 lg:py-28 px-6 lg:px-20 overflow-hidden relative"
            >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 font-semibold text-sm mb-4"
                        >
                            ⭐ Explore Our Courses
                        </motion.span>
                        
                        <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent mb-4">
                            Popular Courses
                        </h2>
                        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                            Discover our most loved courses, trusted by thousands of learners worldwide
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                whileHover={{ y: -10 }}
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
                            </motion.div>
                        ))}

                        {showMore &&
                            extraCourses.map((c, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.15 }}
                                    whileHover={{ y: -10 }}
                                >
                                    <CourseCard {...c} />
                                </motion.div>
                            ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex justify-center mt-14"
                    >
                        <button
                            onClick={() => setShowMore(!showMore)}
                            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-full shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                        >
                            {showMore ? "Show Less" : "View All Courses"}
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ================= ABOUT SECTION ================= */}
            <section id="whydev" className="py-24 lg:py-32 px-6 lg:px-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center relative z-10">
                    {/* FEATURE CARDS */}
                    <div className="space-y-6">
                        {[
                            [
                                FaRocket,
                                "Learn Anytime, Anywhere",
                                "Access world-class courses with flexible learning schedules that fit your lifestyle.",
                                "from-blue-500 to-blue-600"
                            ],
                            [
                                FaCertificate,
                                "Official Certificate",
                                "Earn industry-recognized certificates to showcase your achievements and boost your career.",
                                "from-purple-500 to-purple-600"
                            ],
                            [
                                FaChartLine,
                                "Updated Materials",
                                "Stay ahead with regularly updated content that reflects the latest industry trends and best practices.",
                                "from-green-500 to-green-600"
                            ],
                        ].map(([Icon, title, desc, gradient], i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                whileHover={{ scale: 1.03, x: 10 }}
                                className="group flex items-start gap-5 bg-white/80 backdrop-blur-sm p-7 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100/50"
                            >
                                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-xl transform group-hover:rotate-6 transition-transform duration-300`}>
                                    <Icon className="text-white text-2xl md:text-3xl" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-bold text-lg md:text-xl mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
                                        {title}
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                        {desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* TEXT BLOCK */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-2 bg-blue-100 border border-blue-300 rounded-full text-blue-700 font-semibold text-sm mb-6"
                        >
                            🎯 Why Choose Us
                        </motion.span>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
                            Transform Your
                            <br />
                            Career with
                            <br />
                            DevCourse
                        </h2>

                        <p className="text-gray-700 text-base md:text-lg mb-8 leading-relaxed">
                            We provide a structured, practical, and guided learning journey tailored for anyone who wants to build a real career in tech — from complete beginners to advanced learners.
                        </p>

                        <div className="space-y-4 mb-8">
                            {[
                                "Expert-led video tutorials",
                                "Hands-on projects and assignments",
                                "24/7 community support",
                                "Lifetime access to materials"
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <FaCheckCircle className="text-green-500 text-xl flex-shrink-0" />
                                    <span className="text-gray-700 font-medium">{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 inline-flex items-center gap-2"
                        >
                            Learn More About Us
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* ================= TESTIMONIALS ================= */}
            <section
                id="testimoni"
                className="py-24 lg:py-32 px-6 lg:px-20 relative overflow-hidden"
            >
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14 relative z-10"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 font-semibold text-sm mb-4"
                    >
                        💬 Student Stories
                    </motion.span>
                    
                    <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        What Our Students Say
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                        Join thousands of satisfied learners who transformed their careers with DevCourse
                    </p>
                </motion.div>

                <div className="relative z-10">
                    <TestimonialSlider />
                </div>
            </section>

            {/* ================= FAQ ================= */}
            <section id="faq" className="py-24 lg:py-32 px-6 lg:px-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 font-semibold text-sm mb-4"
                    >
                        ❓ Have Questions?
                    </motion.span>
                    
                    <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                        Find answers to common questions about our courses and platform
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <FAQ />
                </motion.div>
            </section>

            {/* ================= CTA ================= */}
            <section className="py-24 lg:py-32 px-6 lg:px-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-10 md:p-16 shadow-2xl max-w-4xl mx-auto overflow-hidden"
                >
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Ready to Start Learning?
                            </h2>
                            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                                Join thousands of students and start your journey to success today. Get instant access to all courses!
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto"
                        >
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 w-full sm:w-auto px-6 py-4 rounded-full outline-none text-gray-800 shadow-lg focus:ring-4 focus:ring-white/30 transition-all"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto px-8 py-4 bg-white text-blue-700 font-bold rounded-full hover:bg-blue-50 transition-all shadow-lg inline-flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                Get Started Free
                                <FaArrowRight />
                            </motion.button>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="text-blue-100 text-sm mt-6"
                        >
                            No credit card required • Cancel anytime • 14-day money-back guarantee
                        </motion.p>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
}
