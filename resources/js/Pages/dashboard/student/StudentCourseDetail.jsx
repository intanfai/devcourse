import { useParams, useNavigate } from "react-router-dom";
import StudentLayout from "../../../layouts/StudentLayout";
import {
    FiCheckCircle,
    FiPlayCircle,
    FiFileText,
    FiHelpCircle,
    FiStar,
    FiUsers,
    FiArrowLeft,
    FiAward,
    FiDownload,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "../../../axios";
import ReviewModal from "../../../Components/ReviewModal";

export default function StudentCourseDetail() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasReviewed, setHasReviewed] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [certificateDownloading, setCertificateDownloading] = useState(false);

    useEffect(() => {
        fetchCourseDetail();
        // Check if review exists in localStorage
        const savedReview = localStorage.getItem(`review-course-${courseId}`);
        if (savedReview) {
            setHasReviewed(true);
        }
    }, [courseId]);

    const fetchCourseDetail = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`/courses/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = res.data;

            // Clean thumbnail path
            let thumbnailPath = data.thumbnail;
            if (
                !thumbnailPath ||
                thumbnailPath === "null" ||
                thumbnailPath.trim() === ""
            ) {
                thumbnailPath = "/images/course-thumb.jpg";
            } else if (thumbnailPath.startsWith("http")) {
                // use as-is
            } else if (thumbnailPath.startsWith("/")) {
                // already absolute
            } else if (thumbnailPath.startsWith("storage/")) {
                thumbnailPath = `/${thumbnailPath}`;
            } else {
                thumbnailPath = `/storage/${thumbnailPath}`;
            }

            // Get instructor avatar
            let instructorAvatar = data.instructor?.avatar || "";
            if (
                !instructorAvatar ||
                instructorAvatar.trim() === "" ||
                instructorAvatar === "null"
            ) {
                instructorAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    data.instructor?.name || "Instructor"
                )}&background=0D8ABC&color=fff&size=100`;
            }

            // Transform chapters and materials
            const chapters = (data.chapters || []).map((chapter) => ({
                id: chapter.id,
                title: chapter.title,
                materials: (chapter.materials || []).map((mat) => ({
                    id: mat.id,
                    title: mat.title,
                    duration: mat.duration ? `${mat.duration}m` : "N/A",
                    video_url: mat.video_url,
                    done: false,
                })),
                quiz: chapter.quiz
                    ? {
                          id: chapter.quiz.id,
                          title: chapter.quiz.title,
                          done: false,
                      }
                    : null,
            }));

            // Get final quiz
            const finalQuiz = (data.quizzes || []).find((q) => !q.chapter_id);

            const courseData = {
                id: data.id,
                title: data.title,
                category: data.category || "Course",
                level: data.level || "Beginner",
                description: data.description,
                thumbnail: thumbnailPath,
                rating: data.average_rating || 0,
                reviews: data.reviews_count || 0,
                studentsCount: data.enrollments_count || 0,
                instructor: {
                    name: data.instructor?.name || "Unknown",
                    avatar: instructorAvatar,
                },
                chapters: chapters,
                finalQuiz: finalQuiz
                    ? { id: finalQuiz.id, title: finalQuiz.title, done: false }
                    : { id: 999, title: "Final Course Quiz", done: false },
            };

            // Load progress from localStorage
            const savedProgress = localStorage.getItem(`progress-${courseId}`);
            const materialProgress = localStorage.getItem(
                `material-progress-${courseId}`
            );

            if (savedProgress) {
                const saved = JSON.parse(savedProgress);
                courseData.chapters = courseData.chapters.map((ch) => {
                    const savedChapter = saved.chapters?.find(
                        (sc) => sc.id === ch.id
                    );
                    return {
                        ...ch,
                        materials: ch.materials.map((m) => {
                            const savedMat = savedChapter?.materials?.find(
                                (sm) => sm.id === m.id
                            );
                            return { ...m, done: savedMat?.done || false };
                        }),
                        quiz: ch.quiz
                            ? {
                                  ...ch.quiz,
                                  done: savedChapter?.quiz?.done || false,
                              }
                            : null,
                    };
                });
                courseData.finalQuiz.done = saved.finalQuiz?.done || false;
            } else if (materialProgress) {
                // fallback: mark done based on material-progress store
                const doneIds = new Set(
                    (JSON.parse(materialProgress) || []).map(String)
                );
                courseData.chapters = courseData.chapters.map((ch) => ({
                    ...ch,
                    materials: ch.materials.map((m) => ({
                        ...m,
                        done: doneIds.has(String(m.id)),
                    })),
                }));
            }

            // Initialize progress if not exists
            if (!savedProgress) {
                const initialProgress = {
                    chapters: courseData.chapters.map((ch) => ({
                        id: ch.id,
                        materials: ch.materials.map((m) => ({
                            id: m.id,
                            done: m.done || false,
                        })),
                        quiz: ch.quiz ? { id: ch.quiz.id, done: false } : null,
                    })),
                    finalQuiz: { id: courseData.finalQuiz.id, done: false },
                };
                localStorage.setItem(
                    `progress-${courseId}`,
                    JSON.stringify(initialProgress)
                );
            }

            setCourse(courseData);
        } catch (err) {
            console.error("Failed to fetch course:", err);
        } finally {
            setLoading(false);
        }
    };

    // Save on updates
    const saveProgress = (data) => {
        localStorage.setItem(`progress-${courseId}`, JSON.stringify(data));
        setCourse(data);
    };

    if (!course)
        return (
            <StudentLayout>
                <div className="flex items-center justify-center py-12">
                    <p className="text-gray-500">
                        {loading ? "Loading course..." : "Course not found"}
                    </p>
                </div>
            </StudentLayout>
        );

    // =============================
    // UNLOCK LOGIC
    // =============================

    // 1) Determine NEXT ITEM
    const getNextItem = () => {
        for (let ch of course.chapters) {
            for (let m of ch.materials) {
                if (!m.done)
                    return {
                        type: "material",
                        chapterId: ch.id,
                        item: m,
                        link: `/student/course/${course.id}/material/${m.id}`,
                    };
            }
            if (!ch.quiz.done)
                return {
                    type: "quiz",
                    chapterId: ch.id,
                    item: ch.quiz,
                    link: `/student/course/${course.id}/quiz/${ch.quiz.id}`,
                };
        }

        if (!course.finalQuiz.done)
            return {
                type: "finalQuiz",
                item: course.finalQuiz,
                link: `/student/course/${course.id}/final-quiz`,
            };

        return null;
    };

    const nextItem = getNextItem();

    // 2) Check if Final Quiz is unlocked
    const isFinalQuizUnlocked = course.chapters.every((ch) => {
        const allMaterials = ch.materials.every((m) => m.done);
        const quizDone = ch.quiz.done;
        return allMaterials && quizDone;
    });

    return (
        <StudentLayout>
            <div className="pb-6">
                {/* BACK BUTTON */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate("/student/courses")}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                    >
                        <FiArrowLeft size={18} />
                    </button>
                    <h1 className="text-2xl font-bold">{course.title}</h1>
                </div>

                {/* HEADER */}
                <div className="bg-white rounded-xl shadow p-6 mb-8 flex gap-6">
                    <div className="w-56 h-36 overflow-hidden rounded-xl bg-gray-200">
                        <img
                            src={course.thumbnail}
                            alt={course.title}
                            onError={(e) => {
                                e.currentTarget.src =
                                    "/images/course-thumb.jpg";
                            }}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex-1 pr-10">
                        <h1 className="text-2xl font-bold mb-2">
                            {course.title}
                        </h1>

                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                                {course.level}
                            </span>
                            <span className="text-sm text-gray-500">
                                {course.category}
                            </span>
                        </div>

                        <div className="flex items-center gap-8 text-sm mb-4">
                            <div className="flex items-center gap-1 text-yellow-500">
                                <FiStar /> {course.rating}
                                <span className="text-gray-500 ml-1">
                                    ({course.reviews} reviews)
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                                <FiUsers />
                                {course.studentsCount.toLocaleString()} students
                            </div>

                            <div className="flex items-center gap-2">
                                <img
                                    src={course.instructor.avatar}
                                    alt={course.instructor.name}
                                    onError={(e) => {
                                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                            course.instructor.name
                                        )}&background=0D8ABC&color=fff&size=100`;
                                    }}
                                    className="w-8 h-8 rounded-full border object-cover"
                                />
                                <span className="text-gray-700">
                                    {course.instructor.name}
                                </span>
                            </div>
                        </div>

                        {/* CONTINUE BUTTON */}
                        {nextItem ? (
                            <button
                                onClick={() => navigate(nextItem.link)}
                                className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-sm"
                            >
                                <FiPlayCircle />
                                Continue: {nextItem.item.title}
                            </button>
                        ) : (
                            <p className="mt-4 text-green-600 font-semibold">
                                🎉 Course Completed!
                            </p>
                        )}
                    </div>
                </div>

                {/* COURSE CONTENT */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4 border-l-4 pl-3 border-[#3C64EF]">
                        Course Content
                    </h2>

                    <div className="space-y-6">
                        {course.chapters.map((chapter) => {
                            const chapterIndex = course.chapters.findIndex(
                                (c) => c.id === chapter.id
                            );

                            // Check if previous chapter is completed (all materials + quiz done)
                            const isPrevChapterDone =
                                chapterIndex === 0
                                    ? true
                                    : course.chapters[
                                          chapterIndex - 1
                                      ].materials.every((m) => m.done) &&
                                      (course.chapters[chapterIndex - 1].quiz
                                          ?.done ??
                                          true);

                            // Check if current chapter is completed
                            const isChapterCompleted =
                                chapter.materials.every((m) => m.done) &&
                                (chapter.quiz?.done ?? true);

                            // Check if chapter has started
                            const isChapterStarted =
                                chapter.materials.some((m) => m.done) ||
                                (chapter.quiz?.done ?? false);

                            return (
                                <div
                                    key={chapter.id}
                                    className={`border rounded-xl p-4 ${
                                        isPrevChapterDone
                                            ? "bg-gray-50"
                                            : "bg-gray-100 opacity-60 cursor-not-allowed"
                                    }`}
                                >
                                    <div className="flex justify-between mb-2">
                                        <h3 className="font-semibold">
                                            {chapter.title}
                                        </h3>

                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${
                                                isChapterCompleted
                                                    ? "bg-green-100 text-green-700"
                                                    : isChapterStarted
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                            {isChapterCompleted
                                                ? "completed"
                                                : isChapterStarted
                                                ? "in-progress"
                                                : "not started"}
                                        </span>
                                    </div>

                                    {/* MATERIALS */}
                                    <ul className="space-y-2">
                                        {chapter.materials.map((m, index) => {
                                            const canOpen =
                                                isPrevChapterDone &&
                                                (index === 0
                                                    ? true
                                                    : chapter.materials[
                                                          index - 1
                                                      ].done || false);

                                            return (
                                                <li
                                                    key={m.id}
                                                    onClick={() =>
                                                        canOpen &&
                                                        navigate(
                                                            `/student/course/${course.id}/material/${m.id}`
                                                        )
                                                    }
                                                    className={`
                                                        flex justify-between items-center bg-white p-3 
                                                        border rounded-lg cursor-pointer
                                                        ${
                                                            canOpen
                                                                ? "hover:bg-gray-100"
                                                                : "opacity-50 cursor-not-allowed"
                                                        }
                                                    `}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <FiFileText className="text-gray-500" />
                                                        <p className="text-sm">
                                                            {m.title}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                                        <span>
                                                            {m.duration}
                                                        </span>
                                                        {m.done ? (
                                                            <FiCheckCircle className="text-green-600" />
                                                        ) : (
                                                            <FiPlayCircle className="text-blue-600" />
                                                        )}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    {/* QUIZ */}
                                    {chapter.quiz && (
                                        <div
                                            className={`mt-3 bg-white border rounded-lg p-3 flex items-center justify-between 
                                                ${
                                                    isPrevChapterDone &&
                                                    chapter.materials.every(
                                                        (m) => m.done
                                                    )
                                                        ? "cursor-pointer hover:bg-gray-100"
                                                        : "opacity-50 cursor-not-allowed"
                                                }`}
                                            onClick={() =>
                                                isPrevChapterDone &&
                                                chapter.materials.every(
                                                    (m) => m.done
                                                ) &&
                                                navigate(
                                                    `/student/course/${course.id}/quiz/${chapter.quiz.id}`
                                                )
                                            }
                                        >
                                            <div className="flex items-center gap-3">
                                                <FiHelpCircle className="text-purple-500" />
                                                <p className="font-medium">
                                                    {chapter.quiz.title}
                                                </p>
                                            </div>

                                            {chapter.quiz.done ? (
                                                <FiCheckCircle className="text-green-600" />
                                            ) : (
                                                <FiPlayCircle className="text-blue-600" />
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* FINAL QUIZ */}
                        <div
                            className={`border rounded-xl p-4 bg-gray-50 
                                ${
                                    isFinalQuizUnlocked
                                        ? "cursor-pointer hover:bg-gray-100"
                                        : "opacity-50 cursor-not-allowed"
                                }`}
                            onClick={() =>
                                isFinalQuizUnlocked &&
                                navigate(
                                    `/student/course/${course.id}/final-quiz`
                                )
                            }
                        >
                            <h3 className="font-semibold mb-2">Final Quiz</h3>

                            <div className="flex justify-between items-center bg-white p-3 rounded-lg border">
                                <div className="flex items-center gap-3">
                                    <FiHelpCircle
                                        className={`${
                                            isFinalQuizUnlocked
                                                ? "text-blue-600"
                                                : "text-gray-400"
                                        }`}
                                    />
                                    <p>{course.finalQuiz.title}</p>
                                </div>

                                <FiPlayCircle
                                    className={`${
                                        isFinalQuizUnlocked
                                            ? "text-blue-600"
                                            : "text-gray-400"
                                    }`}
                                />
                            </div>

                            {!isFinalQuizUnlocked && (
                                <p className="text-xs text-red-500 mt-2">
                                    Complete all chapters & quizzes to unlock
                                    the final quiz.
                                </p>
                            )}
                        </div>

                        {/* CERTIFICATE SECTION */}
                        {course.finalQuiz.done && (
                            <div className="border rounded-xl p-6 bg-gradient-to-r from-yellow-50 to-amber-50">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-yellow-100 rounded-full">
                                        <FiAward className="text-yellow-600 text-2xl" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg mb-2">
                                            Course Certificate
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4">
                                            Congratulations on completing the
                                            course!
                                        </p>

                                        {!hasReviewed ? (
                                            <div className="space-y-3">
                                                <div className="p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
                                                    <p className="text-sm text-yellow-800">
                                                        <strong>
                                                            ⚠️ Review Required:
                                                        </strong>{" "}
                                                        Please leave a review
                                                        before downloading your
                                                        certificate.
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        setShowReviewModal(true)
                                                    }
                                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                                                >
                                                    <FiStar />
                                                    Leave a Review
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={async () => {
                                                    setCertificateDownloading(
                                                        true
                                                    );
                                                    try {
                                                        const token =
                                                            localStorage.getItem(
                                                                "token"
                                                            );
                                                        const response =
                                                            await axios.get(
                                                                `/certificates/download/${courseId}`,
                                                                {
                                                                    headers: {
                                                                        Authorization: `Bearer ${token}`,
                                                                    },
                                                                    responseType:
                                                                        "blob",
                                                                }
                                                            );

                                                        // Check if response is actually a blob (PDF)
                                                        if (
                                                            response.data
                                                                .type ===
                                                            "application/pdf"
                                                        ) {
                                                            const url =
                                                                window.URL.createObjectURL(
                                                                    new Blob(
                                                                        [
                                                                            response.data,
                                                                        ],
                                                                        {
                                                                            type: "application/pdf",
                                                                        }
                                                                    )
                                                                );
                                                            const link =
                                                                document.createElement(
                                                                    "a"
                                                                );
                                                            link.href = url;
                                                            link.setAttribute(
                                                                "download",
                                                                `certificate-${course.title}.pdf`
                                                            );
                                                            document.body.appendChild(
                                                                link
                                                            );
                                                            link.click();
                                                            link.remove();
                                                            window.URL.revokeObjectURL(
                                                                url
                                                            );
                                                        } else {
                                                            // Response might be JSON error
                                                            const text =
                                                                await response.data.text();
                                                            try {
                                                                const errorData =
                                                                    JSON.parse(
                                                                        text
                                                                    );
                                                                alert(
                                                                    errorData.message ||
                                                                        "Failed to download certificate."
                                                                );
                                                            } catch {
                                                                alert(
                                                                    "Failed to download certificate. Please try again."
                                                                );
                                                            }
                                                        }
                                                    } catch (error) {
                                                        console.error(
                                                            "Failed to download certificate:",
                                                            error
                                                        );

                                                        let errorMessage =
                                                            "Failed to download certificate. Please try again.";
                                                        if (
                                                            error.response?.data
                                                        ) {
                                                            // Try to read error message from blob
                                                            try {
                                                                const text =
                                                                    await error.response.data.text();
                                                                const errorData =
                                                                    JSON.parse(
                                                                        text
                                                                    );
                                                                errorMessage =
                                                                    errorData.message ||
                                                                    errorMessage;
                                                            } catch (e) {
                                                                console.error(
                                                                    "Error parsing error response:",
                                                                    e
                                                                );
                                                            }
                                                        }

                                                        alert(errorMessage);
                                                    } finally {
                                                        setCertificateDownloading(
                                                            false
                                                        );
                                                    }
                                                }}
                                                disabled={
                                                    certificateDownloading
                                                }
                                                className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {certificateDownloading ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                        Downloading...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiDownload />
                                                        Download Certificate
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* REVIEW MODAL */}
            <ReviewModal
                open={showReviewModal}
                courseId={courseId}
                onClose={() => setShowReviewModal(false)}
                onReviewSubmitted={() => {
                    setHasReviewed(true);
                    setShowReviewModal(false);
                }}
            />
        </StudentLayout>
    );
}
