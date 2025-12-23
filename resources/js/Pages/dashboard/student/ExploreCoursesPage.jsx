import StudentLayout from "../../../layouts/StudentLayout";
import { FiSearch, FiStar, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../axios";

export default function ExploreCoursesPage() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [levelFilter, setLevelFilter] = useState("All");
    const [priceFilter, setPriceFilter] = useState("All");
    const [sortBy, setSortBy] = useState("popular");
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch courses from API
    useEffect(() => {
        fetchExploreCourses();
    }, []);

    const fetchExploreCourses = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("/dashboard/explore-courses", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Explore courses response:", res.data);
            console.log("Total courses:", res.data.courses?.length || 0);
            console.log("Courses with thumbnails:", res.data.courses?.map(c => ({
                id: c.id,
                title: c.title,
                thumbnail: c.thumbnail,
            })));
            setCourses(res.data.courses || []);
        } catch (err) {
            console.error("Failed to fetch courses:", err);
            console.error("Error details:", err.response?.data);
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        "All",
        ...new Set(courses.map(c => c.category).filter(Boolean))
    ];

    const getCategories = () => {
        const uniqueCategories = new Set(["All"]);
        courses.forEach(c => {
            if (c.category) uniqueCategories.add(c.category);
        });
        return Array.from(uniqueCategories);
    };

    const filteredCourses = courses
        .filter((c) => {
            const matchSearch = c.title
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchCategory =
                activeCategory === "All" || c.category === activeCategory;

            const matchLevel = levelFilter === "All" || c.level === levelFilter;

            const matchPrice = priceFilter === "All" 
                ? true 
                : (priceFilter === "Free" && c.price === 0) || (priceFilter === "Paid" && c.price > 0);

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
                            w-full px-5 py-3 rounded-xl border-2 border-gray-300 
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            text-sm md:text-base transition-all duration-200
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
                    {getCategories().map((ct) => (
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

                {/* LOADING STATE */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-gray-500">Loading courses...</p>
                    </div>
                )}

                {/* COURSE GRID */}
                {!loading && (
                    <>
                        {filteredCourses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCourses.map((course) => (
                                    <Link
                                        key={course.id}
                                        to={`/student/course/${course.id}/preview`}
                                        className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition overflow-hidden"
                                    >
                                        <img
                                            src={course.thumbnail || "/images/course-thumb.jpg"}
                                            className="w-full h-40 md:h-44 object-cover"
                                            alt={course.title}
                                            onError={(e) => {
                                                e.target.src = "/images/course-thumb.jpg";
                                            }}
                                        />

                                        <div className="p-5">
                                            <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-1">
                                                {course.title}
                                            </h3>

                                            <p className="text-gray-500 text-sm mb-2">
                                                {course.category} • {course.level}
                                            </p>

                                            <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                                                <FiUsers />
                                                {course.students.toLocaleString()} students enrolled
                                            </div>

                                            <div className="flex items-center gap-1 text-sm text-yellow-500">
                                                <FiStar size={16} fill="currentColor" />
                                                <span>{course.rating || 0}</span>
                                                <span className="text-gray-500">({course.reviews || 0} reviews)</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center py-12">
                                <p className="text-gray-500">No courses found</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </StudentLayout>
    );
}
