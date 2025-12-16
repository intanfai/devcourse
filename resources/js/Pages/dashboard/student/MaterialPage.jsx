import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StudentLayout from "../../../layouts/StudentLayout";
import {
    FiArrowLeft,
    FiPlayCircle,
    FiCheckCircle,
    FiHelpCircle,
} from "react-icons/fi";
import axios from "../../../axios";

export default function MaterialPage() {
    const { courseId, materialId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [currentChapter, setCurrentChapter] = useState(null);
    const [material, setMaterial] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completedIds, setCompletedIds] = useState(new Set());

    useEffect(() => {
        fetchCourse();
    }, [courseId, materialId]);

    const fetchCourse = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`/courses/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = res.data;

            const chapters = (data.chapters || []).map((chapter) => ({
                id: chapter.id,
                title: chapter.title,
                materials: (chapter.materials || []).map((mat) => ({
                    id: mat.id,
                    title: mat.title,
                    duration: mat.duration || "",
                    content: mat.content || "",
                    video_url: mat.video_url || "",
                })),
                quiz: chapter.quiz
                    ? { id: chapter.quiz.id, title: chapter.quiz.title }
                    : null,
            }));

            const finalQuiz = (data.quizzes || []).find((q) => !q.chapter_id);

            const courseData = {
                id: data.id,
                title: data.title,
                finalQuiz: finalQuiz
                    ? { id: finalQuiz.id, title: finalQuiz.title, done: false }
                    : { id: 999, title: "Final Course Quiz", done: false },
                chapters,
            };

            const foundChapter = chapters.find((ch) =>
                ch.materials.some((m) => String(m.id) === String(materialId))
            );
            const foundMaterial = foundChapter?.materials.find(
                (m) => String(m.id) === String(materialId)
            );

            // Load progress to sync completed materials and quizzes
            const savedProgress = localStorage.getItem(`progress-${courseId}`);
            if (savedProgress) {
                try {
                    const progress = JSON.parse(savedProgress);
                    courseData.chapters = courseData.chapters.map((ch) => {
                        const savedChapter = progress.chapters?.find(
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
                } catch (e) {
                    console.warn("Failed to load progress", e);
                }
            }

            setCourse(courseData);
            setCurrentChapter(foundChapter || null);
            setMaterial(foundMaterial || null);

            // load completed materials for display
            const stored = localStorage.getItem(
                `material-progress-${courseId}`
            );
            if (stored) {
                const arr = JSON.parse(stored);
                setCompletedIds(new Set(arr.map(String)));
            } else {
                setCompletedIds(new Set());
            }
        } catch (err) {
            console.error("Failed to fetch material:", err);
        } finally {
            setLoading(false);
        }
    };

    // Mark current material as completed and unlock next
    useEffect(() => {
        if (!material) return;
        const idStr = String(material.id);

        setCompletedIds((prev) => {
            if (prev.has(idStr)) return prev;
            const next = new Set(prev);
            next.add(idStr);
            const arr = Array.from(next);
            localStorage.setItem(
                `material-progress-${courseId}`,
                JSON.stringify(arr)
            );

            // sync with course progress storage if exists
            const saved = localStorage.getItem(`progress-${courseId}`);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    parsed.chapters = (parsed.chapters || []).map((ch) => ({
                        ...ch,
                        materials: (ch.materials || []).map((m) =>
                            String(m.id) === idStr ? { ...m, done: true } : m
                        ),
                    }));
                    localStorage.setItem(
                        `progress-${courseId}`,
                        JSON.stringify(parsed)
                    );
                } catch (e) {
                    console.warn("Failed to sync progress storage", e);
                }
            }

            return next;
        });
    }, [material, courseId]);

    if (loading) {
        return (
            <StudentLayout>
                <div className="flex items-center justify-center py-12">
                    <p className="text-gray-500">Loading material...</p>
                </div>
            </StudentLayout>
        );
    }

    if (!course || !material) {
        return (
            <StudentLayout>
                <div className="flex items-center justify-center py-12">
                    <p className="text-gray-500">Material not found</p>
                </div>
            </StudentLayout>
        );
    }

    return (
        <StudentLayout>
            <div className="pb-6 px-3 lg:px-1 w-full overflow-x-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                    {/* ================= LEFT CONTENT ================= */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow w-full">
                        <div className="flex items-center gap-4 mb-6">
                            <button
                                onClick={() =>
                                    navigate(`/student/course/${courseId}`)
                                }
                                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                            >
                                <FiArrowLeft size={18} />
                            </button>

                            <h1 className="text-2xl font-bold">
                                {material.title}
                            </h1>
                        </div>

                        <div className="mb-4">
                            {/* VIDEO */}
                            {material.video_url && (
                                <div className="w-full aspect-video rounded-lg overflow-hidden mb-4 bg-black">
                                    {/* Check if it's an embed URL (YouTube, Vimeo, etc) or local file */}
                                    {material.video_url.includes(
                                        "youtube.com"
                                    ) ||
                                    material.video_url.includes("youtu.be") ||
                                    material.video_url.includes("vimeo.com") ||
                                    material.video_url.includes("iframe") ? (
                                        <iframe
                                            className="w-full h-full"
                                            src={material.video_url}
                                            title={material.title}
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <video
                                            className="w-full h-full"
                                            controls
                                            controlsList="nodownload"
                                        >
                                            <source
                                                src={`/${material.video_url}`}
                                                type="video/mp4"
                                            />
                                            Browser Anda tidak mendukung tag
                                            video.
                                        </video>
                                    )}
                                </div>
                            )}

                            {/* TEXT */}
                            {material.content && (
                                <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                                    {material.content}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ================= RIGHT SIDEBAR CONTENT ================= */}
                    <div className="bg-white p-5 rounded-xl shadow h-fit w-full">
                        <h2 className="text-lg font-semibold mb-3 border-l-4 pl-3 border-[#3C64EF]">
                            Course Content
                        </h2>

                        <div className="space-y-5">
                            {course.chapters.map((ch, chapterIndex) => {
                                // Check if previous chapter is completed
                                const isPrevChapterDone =
                                    chapterIndex === 0
                                        ? true
                                        : course.chapters[
                                              chapterIndex - 1
                                          ].materials.every(
                                              (m) =>
                                                  completedIds.has(
                                                      String(m.id)
                                                  ) || m.done
                                          ) &&
                                          (course.chapters[chapterIndex - 1]
                                              .quiz?.done ??
                                              true);

                                return (
                                    <div
                                        key={ch.id}
                                        className={`border rounded-lg p-4 ${
                                            isPrevChapterDone
                                                ? "bg-gray-50"
                                                : "bg-gray-100 opacity-60"
                                        }`}
                                    >
                                        <h3 className="font-semibold text-sm mb-2">
                                            {ch.title}
                                        </h3>

                                        <ul className="space-y-1">
                                            {ch.materials.map((m, idx) => {
                                                const mId = String(m.id);
                                                const isCompleted =
                                                    completedIds.has(mId) ||
                                                    m.done;
                                                const prevMaterialDone =
                                                    idx === 0
                                                        ? true
                                                        : completedIds.has(
                                                              String(
                                                                  ch.materials[
                                                                      idx - 1
                                                                  ].id
                                                              )
                                                          ) ||
                                                          ch.materials[idx - 1]
                                                              .done;
                                                const canOpen =
                                                    isPrevChapterDone &&
                                                    prevMaterialDone;

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
                                                        p-2 rounded-lg flex justify-between items-start cursor-pointer
                                                        break-words
                                                        ${
                                                            m.id == materialId
                                                                ? "bg-blue-100"
                                                                : "bg-white"
                                                        }
                                                        ${
                                                            canOpen
                                                                ? "hover:bg-gray-100"
                                                                : "opacity-50 cursor-not-allowed"
                                                        }
                                                        border
                                                    `}
                                                    >
                                                        <p className="text-sm w-[80%] break-words">
                                                            {m.title}
                                                        </p>

                                                        {isCompleted ? (
                                                            <FiCheckCircle className="text-green-600 text-lg" />
                                                        ) : (
                                                            <FiPlayCircle className="text-blue-600 text-lg" />
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>

                                        {/* QUIZ */}
                                        {ch.quiz && (
                                            <div
                                                className={`mt-3 p-3 bg-white rounded-lg border flex justify-between items-center ${
                                                    isPrevChapterDone &&
                                                    ch.materials.every(
                                                        (m) =>
                                                            completedIds.has(
                                                                String(m.id)
                                                            ) || m.done
                                                    )
                                                        ? "cursor-pointer hover:bg-gray-100"
                                                        : "opacity-50 cursor-not-allowed"
                                                }`}
                                                onClick={() =>
                                                    isPrevChapterDone &&
                                                    ch.materials.every(
                                                        (m) =>
                                                            completedIds.has(
                                                                String(m.id)
                                                            ) || m.done
                                                    ) &&
                                                    navigate(
                                                        `/student/course/${course.id}/quiz/${ch.quiz.id}`
                                                    )
                                                }
                                            >
                                                <div className="flex items-center gap-2">
                                                    <FiHelpCircle className="text-purple-500" />
                                                    <p className="text-sm font-medium">
                                                        {ch.quiz.title}
                                                    </p>
                                                </div>

                                                {ch.quiz.done ? (
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
                            {course.finalQuiz &&
                                (() => {
                                    // Check if all chapters are completed
                                    const isFinalQuizUnlocked =
                                        course.chapters.every((ch) => {
                                            const allMaterials =
                                                ch.materials.every(
                                                    (m) =>
                                                        completedIds.has(
                                                            String(m.id)
                                                        ) || m.done
                                                );
                                            const quizDone =
                                                ch.quiz?.done ?? true;
                                            return allMaterials && quizDone;
                                        });

                                    return (
                                        <div
                                            className={`border rounded-xl p-4 ${
                                                isFinalQuizUnlocked
                                                    ? "bg-gray-50 cursor-pointer hover:bg-gray-100"
                                                    : "bg-gray-100 opacity-60 cursor-not-allowed"
                                            }`}
                                            onClick={() =>
                                                isFinalQuizUnlocked &&
                                                navigate(
                                                    `/student/course/${course.id}/final-quiz`
                                                )
                                            }
                                        >
                                            <h3 className="font-semibold mb-2">
                                                Final Quiz
                                            </h3>

                                            <div className="flex justify-between items-center bg-white p-3 rounded-lg border">
                                                <div className="flex items-center gap-3">
                                                    <FiHelpCircle
                                                        className={`${
                                                            isFinalQuizUnlocked
                                                                ? "text-blue-600"
                                                                : "text-gray-400"
                                                        }`}
                                                    />
                                                    <p>
                                                        {course.finalQuiz.title}
                                                    </p>
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
                                                    Complete all chapters &
                                                    quizzes to unlock the final
                                                    quiz.
                                                </p>
                                            )}
                                        </div>
                                    );
                                })()}
                        </div>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
