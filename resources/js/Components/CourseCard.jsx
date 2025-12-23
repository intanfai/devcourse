export default function CourseCard({
    thumbnail,
    category,
    title,
    instructor,
    rating,
    students,
    price,
    oldPrice,
}) {
    return (
        <div
            className="
            bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 
            overflow-hidden border border-gray-100 group hover:-translate-y-1
        "
        >
            {/* Thumbnail */}
            <div className="w-full h-44 bg-gray-200 overflow-hidden">
                <img
                    src={thumbnail}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt="thumbnail"
                />
            </div>

            <div className="p-6">
                {/* Category Badge */}
                <span
                    className="
                    inline-block px-3 py-1.5 text-xs font-semibold 
                    bg-blue-50 text-blue-700 border border-blue-200 
                    rounded-full
                "
                >
                    {category}
                </span>

                {/* Title */}
                <h3 className="font-bold text-lg mt-4 text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>

                {/* Instructor */}
                <p className="text-sm text-gray-600 mt-2 font-medium">{instructor}</p>

                {/* Rating */}
                <div className="text-sm text-yellow-500 mt-3 flex items-center gap-1">
                    <span className="text-base">⭐</span>
                    <span className="font-semibold text-gray-800">{rating}</span>
                    <span className="text-gray-500 ml-1">
                        ({students.toLocaleString()} students)
                    </span>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-center gap-3">
                    <p className="font-bold text-blue-600 text-xl">${price}</p>

                    {oldPrice && (
                        <p className="text-sm text-gray-400 line-through">
                            ${oldPrice}
                        </p>
                    )}
                </div>

                {/* Button */}
                <button
                    className="
                    mt-5 w-full py-2.5 bg-gradient-to-r from-blue-600 to-blue-800 text-white 
                    rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 
                    hover:scale-[1.02] transition-all duration-300
                "
                >
                    View Details
                </button>
            </div>
        </div>
    );
}
