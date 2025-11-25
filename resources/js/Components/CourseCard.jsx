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
            bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 
            overflow-hidden border border-gray-100
        "
        >
            {/* Thumbnail */}
            <div className="w-full h-40 bg-gray-200">
                <img
                    src={thumbnail}
                    className="w-full h-full object-cover"
                    alt="thumbnail"
                />
            </div>

            <div className="p-5">
                {/* Category Badge */}
                <span
                    className="
                    inline-block px-3 py-1 text-xs font-semibold 
                    bg-blue-50 text-blue-700 border border-blue-200 
                    rounded-full
                "
                >
                    {category}
                </span>

                {/* Title */}
                <h3 className="font-bold text-lg mt-3 text-gray-900 leading-tight">
                    {title}
                </h3>

                {/* Instructor */}
                <p className="text-sm text-gray-500 mt-1">{instructor}</p>

                {/* Rating */}
                <div className="text-sm text-yellow-500 mt-2">
                    ⭐ {rating}
                    <span className="text-gray-500 ml-1">
                        ({students.toLocaleString()})
                    </span>
                </div>

                {/* Price */}
                <div className="mt-3 flex items-center gap-2">
                    <p className="font-bold text-blue-700 text-lg">${price}</p>

                    {oldPrice && (
                        <p className="text-sm text-gray-400 line-through">
                            ${oldPrice}
                        </p>
                    )}
                </div>

                {/* Button */}
                <button
                    className="
                    mt-4 w-full py-2 bg-[#004FC5] text-white 
                    rounded-full font-semibold hover:bg-blue-700 transition
                "
                >
                    More Detail
                </button>
            </div>
        </div>
    );
}
