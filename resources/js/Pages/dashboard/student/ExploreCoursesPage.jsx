import StudentLayout from "../../../layouts/StudentLayout";
import { FiSearch, FiStar, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ExploreCoursesPage() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [levelFilter, setLevelFilter] = useState("All");
    const [priceFilter, setPriceFilter] = useState("All");
    const [sortBy, setSortBy] = useState("popular");

    const categories = [
        "All",
        "Web Development",
        "Frontend",
        "Backend",
        "Design",
        "Programming",
        "UI/UX",
    ];

    const courses = [
        {
            id: 1,
            title: "React Fundamentals",
            category: "Web Development",
            rating: 4.8,
            students: 12000,
            level: "Beginner",
            price: "Paid",
            thumbnail: "/images/htmlcss.jpg",
        },
        {
            id: 2,
            title: "Laravel Basics",
            category: "Backend",
            rating: 4.7,
            students: 8500,
            level: "Intermediate",
            price: "Paid",
            thumbnail: "/images/jsessentials.jpg",
        },
        {
            id: 3,
            title: "UI/UX Design Starter",
            category: "Design",
            rating: 4.6,
            students: 6700,
            level: "Beginner",
            price: "Free",
            thumbnail: "/images/node.png",
        },
    ];

    const filteredCourses = courses
        .filter((c) => {
            const matchSearch = c.title
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchCategory =
                activeCategory === "All" || c.category === activeCategory;

            const matchLevel = levelFilter === "All" || c.level === levelFilter;

            const matchPrice = priceFilter === "All" || c.price === priceFilter;

            return matchSearch && matchCategory && matchLevel && matchPrice;
        })
        .sort((a, b) => {
            if (sortBy === "popular") return b.students - a.students;
            if (sortBy === "rating") return b.rating - a.rating;
            if (sortBy === "newest") return b.id - a.id;
            return 0;
        });

    return (
        <StudentLayout>
            <div className="pb-6">
                {/* HEADER */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Explore Courses
                </h1>

                {/* SEARCH BAR */}
                <div className="relative mb-8">
                    <input
                        type="text"
                        placeholder="Search any course…"
                        className="
                            w-full px-5 py-3 rounded-xl border border-gray-300 
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            text-sm md:text-base
                        "
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FiSearch
                        className="absolute right-4 top-3.5 text-gray-500"
                        size={18}
                    />
                </div>

                {/* CATEGORY FILTER */}
                <div className="flex gap-3 mb-6 overflow-x-auto pb-2 hide-scrollbar">
                    {categories.map((ct) => (
                        <button
                            key={ct}
                            onClick={() => setActiveCategory(ct)}
                            className={`
                                px-4 py-2 rounded-full border text-sm 
                                transition-all whitespace-nowrap
                                ${
                                    activeCategory === ct
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                }
                            `}
                        >
                            {ct}
                        </button>
                    ))}
                </div>

                {/* FILTER OPTIONS */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10">
                    <select
                        className="border rounded-xl px-4 py-2 text-sm w-full sm:w-auto"
                        value={levelFilter}
                        onChange={(e) => setLevelFilter(e.target.value)}
                    >
                        <option value="All">All Levels</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </select>

                    <select
                        className="border rounded-xl px-4 py-2 text-sm w-full sm:w-auto"
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value)}
                    >
                        <option value="All">All Prices</option>
                        <option value="Free">Free</option>
                        <option value="Paid">Paid</option>
                    </select>

                    <select
                        className="border rounded-xl px-4 py-2 text-sm w-full sm:w-auto"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="popular">Most Popular</option>
                        <option value="rating">Highest Rated</option>
                        <option value="newest">Newest</option>
                    </select>
                </div>

                {/* COURSE GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <Link
                            key={course.id}
                            to={`/student/course/${course.id}/preview`}
                            className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition overflow-hidden"
                        >
                            <img
                                src={course.thumbnail}
                                className="w-full h-40 md:h-44 object-cover"
                                alt={course.title}
                            />

                            <div className="p-5">
                                <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-1">
                                    {course.title}
                                </h3>

                                <p className="text-gray-500 text-sm mb-2">
                                    {course.category} • {course.level}
                                </p>

                                <div className="flex justify-between text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <FiStar className="text-yellow-500" />
                                        {course.rating}
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <FiUsers />
                                        {course.students.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </StudentLayout>
    );
}
