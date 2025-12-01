import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InstructorLayout from "../../../../layouts/InstructorLayout";
import { FiArrowLeft, FiPlus, FiTrash2 } from "react-icons/fi";

/* ----------------------  HELPERS ---------------------- */
function emptyQuestion() {
    return { question: "", points: 1, correct: "", choices: ["", "", ""] };
}

function emptyMaterial() {
    return {
        id: Date.now() + Math.random(),
        title: "",
        type: "text",
        content: "",
        videoFile: null,
        duration: "",
    };
}

function emptyChapter() {
    return {
        id: Date.now() + Math.random(),
        title: "",
        materials: [emptyMaterial()],
        quiz: {
            title: "",
            passing: 60,
            questions: [emptyQuestion()],
        },
    };
}

/* ======================= MAIN PAGE ======================= */
export default function EditClassPage() {
    const navigate = useNavigate();
    const { classId } = useParams();

    // Dummy: normally fetched from API
    const [form, setForm] = useState({
        title: "React Fundamentals",
        category: "Programming",
        level: "Beginner",
        price: "150000",
        description: "Learn basic React from scratch.",
        chapters: [emptyChapter()],
    });

    const updateField = (key, value) =>
        setForm((f) => ({ ...f, [key]: value }));

    /* ---------------------- CHAPTER ---------------------- */
    const addChapter = () =>
        setForm((f) => ({ ...f, chapters: [...f.chapters, emptyChapter()] }));

    const removeChapter = (chapterId) =>
        setForm((f) => ({
            ...f,
            chapters: f.chapters.filter((c) => c.id !== chapterId),
        }));

    const updateChapterField = (chapterId, key, value) =>
        setForm((f) => ({
            ...f,
            chapters: f.chapters.map((c) =>
                c.id === chapterId ? { ...c, [key]: value } : c
            ),
        }));

    /* ---------------------- MATERIALS ---------------------- */
    const addMaterial = (chapterId) =>
        setForm((f) => ({
            ...f,
            chapters: f.chapters.map((c) =>
                c.id === chapterId
                    ? { ...c, materials: [...c.materials, emptyMaterial()] }
                    : c
            ),
        }));

    const removeMaterial = (chapterId, materialId) =>
        setForm((f) => ({
            ...f,
            chapters: f.chapters.map((c) =>
                c.id === chapterId
                    ? {
                          ...c,
                          materials: c.materials.filter(
                              (m) => m.id !== materialId
                          ),
                      }
                    : c
            ),
        }));

    const updateMaterial = (chapterId, materialId, key, value) =>
        setForm((f) => ({
            ...f,
            chapters: f.chapters.map((c) =>
                c.id === chapterId
                    ? {
                          ...c,
                          materials: c.materials.map((m) =>
                              m.id === materialId ? { ...m, [key]: value } : m
                          ),
                      }
                    : c
            ),
        }));

    /* ---------------------- QUIZ ---------------------- */
    const addQuestion = (chapterId) =>
        setForm((f) => ({
            ...f,
            chapters: f.chapters.map((c) =>
                c.id === chapterId
                    ? {
                          ...c,
                          quiz: {
                              ...c.quiz,
                              questions: [...c.quiz.questions, emptyQuestion()],
                          },
                      }
                    : c
            ),
        }));

    const removeQuestion = (chapterId, qIndex) =>
        setForm((f) => ({
            ...f,
            chapters: f.chapters.map((c) =>
                c.id === chapterId
                    ? {
                          ...c,
                          quiz: {
                              ...c.quiz,
                              questions: c.quiz.questions.filter(
                                  (_, i) => i !== qIndex
                              ),
                          },
                      }
                    : c
            ),
        }));

    const updateQuestion = (chapterId, qIndex, key, value) =>
        setForm((f) => ({
            ...f,
            chapters: f.chapters.map((c) =>
                c.id === chapterId
                    ? {
                          ...c,
                          quiz: {
                              ...c.quiz,
                              questions: c.quiz.questions.map((q, i) =>
                                  i === qIndex ? { ...q, [key]: value } : q
                              ),
                          },
                      }
                    : c
            ),
        }));

    /* --------------------- SUBMIT --------------------- */
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("UPDATED CLASS DATA:", form);

        alert("Class updated successfully!");
        navigate("/instructor/classes");
    };

    return (
        <InstructorLayout>
            <div className="p-1 pb-10">
                {/* HEADER */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                    >
                        <FiArrowLeft size={18} />
                    </button>
                    <h1 className="text-2xl font-bold">Edit Class</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* =============== BASIC CLASS INFO =============== */}
                    <div className="bg-white p-6 rounded-xl shadow space-y-4">
                        <h2 className="text-lg font-semibold">
                            Class Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                className="px-4 py-2 border rounded-lg"
                                placeholder="Class Title"
                                value={form.title}
                                onChange={(e) =>
                                    updateField("title", e.target.value)
                                }
                            />

                            <input
                                className="px-4 py-2 border rounded-lg"
                                placeholder="Category"
                                value={form.category}
                                onChange={(e) =>
                                    updateField("category", e.target.value)
                                }
                            />

                            <select
                                className="px-4 py-2 border rounded-lg"
                                value={form.level}
                                onChange={(e) =>
                                    updateField("level", e.target.value)
                                }
                            >
                                <option>Beginner</option>
                                <option>Intermediate</option>
                                <option>Advanced</option>
                            </select>

                            <input
                                className="px-4 py-2 border rounded-lg"
                                placeholder="Price"
                                value={form.price}
                                onChange={(e) =>
                                    updateField("price", e.target.value)
                                }
                            />
                        </div>

                        <textarea
                            className="w-full px-4 py-2 border rounded-lg"
                            rows="3"
                            placeholder="Class description..."
                            value={form.description}
                            onChange={(e) =>
                                updateField("description", e.target.value)
                            }
                        />
                    </div>

                    {/* =============== CHAPTERS SECTION =============== */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Chapters</h2>

                            <button
                                type="button"
                                onClick={addChapter}
                                className="text-blue-600 flex items-center gap-2"
                            >
                                <FiPlus /> Add Chapter
                            </button>
                        </div>

                        <div className="space-y-8">
                            {form.chapters.map((chapter, ci) => (
                                <div
                                    key={chapter.id}
                                    className="p-4 border rounded-xl bg-gray-50"
                                >
                                    {/* CHAPTER TITLE */}
                                    <div className="flex justify-between mb-4">
                                        <input
                                            className="px-3 py-2 border rounded-lg w-72"
                                            placeholder={`Chapter ${
                                                ci + 1
                                            } Title`}
                                            value={chapter.title}
                                            onChange={(e) =>
                                                updateChapterField(
                                                    chapter.id,
                                                    "title",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <button
                                            type="button"
                                            className="text-red-600"
                                            onClick={() =>
                                                removeChapter(chapter.id)
                                            }
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>

                                    {/* ----------- MATERIALS ----------- */}
                                    <div>
                                        <div className="flex justify-between">
                                            <p className="font-semibold text-sm">
                                                Materials
                                            </p>
                                            <button
                                                type="button"
                                                className="text-blue-600 flex items-center gap-1"
                                                onClick={() =>
                                                    addMaterial(chapter.id)
                                                }
                                            >
                                                <FiPlus /> Add Material
                                            </button>
                                        </div>

                                        <div className="space-y-3 mt-2">
                                            {chapter.materials.map((m) => (
                                                <div
                                                    key={m.id}
                                                    className="bg-white p-3 rounded-lg border"
                                                >
                                                    <input
                                                        className="px-3 py-2 border rounded-lg w-full mb-2"
                                                        placeholder="Material Title"
                                                        value={m.title}
                                                        onChange={(e) =>
                                                            updateMaterial(
                                                                chapter.id,
                                                                m.id,
                                                                "title",
                                                                e.target.value
                                                            )
                                                        }
                                                    />

                                                    <select
                                                        className="px-3 py-2 border rounded-lg mb-2"
                                                        value={m.type}
                                                        onChange={(e) =>
                                                            updateMaterial(
                                                                chapter.id,
                                                                m.id,
                                                                "type",
                                                                e.target.value
                                                            )
                                                        }
                                                    >
                                                        <option value="text">
                                                            Text
                                                        </option>
                                                        <option value="video">
                                                            Video
                                                        </option>
                                                    </select>

                                                    {m.type === "text" ? (
                                                        <textarea
                                                            className="w-full px-3 py-2 border rounded-lg"
                                                            rows="2"
                                                            placeholder="Paragraph content..."
                                                            value={m.content}
                                                            onChange={(e) =>
                                                                updateMaterial(
                                                                    chapter.id,
                                                                    m.id,
                                                                    "content",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    ) : (
                                                        <>
                                                            <input
                                                                type="file"
                                                                className="text-sm mb-2"
                                                                accept="video/*"
                                                                onChange={(e) =>
                                                                    updateMaterial(
                                                                        chapter.id,
                                                                        m.id,
                                                                        "videoFile",
                                                                        e.target
                                                                            .files[0]
                                                                    )
                                                                }
                                                            />

                                                            <input
                                                                className="px-3 py-2 border rounded-lg w-40"
                                                                placeholder="Duration (08:20)"
                                                                value={
                                                                    m.duration
                                                                }
                                                                onChange={(e) =>
                                                                    updateMaterial(
                                                                        chapter.id,
                                                                        m.id,
                                                                        "duration",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </>
                                                    )}

                                                    <button
                                                        type="button"
                                                        className="text-red-600 mt-2"
                                                        onClick={() =>
                                                            removeMaterial(
                                                                chapter.id,
                                                                m.id
                                                            )
                                                        }
                                                    >
                                                        <FiTrash2 /> Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* ----------- QUIZ ----------- */}
                                    <div className="mt-6 p-4 bg-white rounded-lg border">
                                        <h3 className="font-semibold mb-3">
                                            Chapter Quiz
                                        </h3>

                                        <input
                                            className="px-3 py-2 border rounded-lg w-full mb-3"
                                            placeholder="Quiz Title"
                                            value={chapter.quiz.title}
                                            onChange={(e) =>
                                                updateChapterField(
                                                    chapter.id,
                                                    "quiz",
                                                    {
                                                        ...chapter.quiz,
                                                        title: e.target.value,
                                                    }
                                                )
                                            }
                                        />

                                        {chapter.quiz.questions.map((q, qi) => (
                                            <div
                                                key={qi}
                                                className="bg-gray-50 p-3 border rounded-lg mb-3"
                                            >
                                                <input
                                                    className="w-full px-3 py-2 border rounded-lg mb-2"
                                                    placeholder={`Question ${
                                                        qi + 1
                                                    }`}
                                                    value={q.question}
                                                    onChange={(e) =>
                                                        updateQuestion(
                                                            chapter.id,
                                                            qi,
                                                            "question",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <input
                                                    className="px-3 py-2 border rounded-lg w-32 mb-2"
                                                    placeholder="Points"
                                                    type="number"
                                                    value={q.points}
                                                    onChange={(e) =>
                                                        updateQuestion(
                                                            chapter.id,
                                                            qi,
                                                            "points",
                                                            Number(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />

                                                <input
                                                    className="w-full px-3 py-2 border rounded-lg mb-2"
                                                    placeholder="Correct answer"
                                                    value={q.correct}
                                                    onChange={(e) =>
                                                        updateQuestion(
                                                            chapter.id,
                                                            qi,
                                                            "correct",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <div className="grid grid-cols-3 gap-2 mb-2">
                                                    {q.choices.map((c, ci2) => (
                                                        <input
                                                            key={ci2}
                                                            className="px-3 py-2 border rounded-lg"
                                                            placeholder={`Choice ${String.fromCharCode(
                                                                65 + ci2
                                                            )}`}
                                                            value={c}
                                                            onChange={(e) => {
                                                                const arr = [
                                                                    ...q.choices,
                                                                ];
                                                                arr[ci2] =
                                                                    e.target.value;
                                                                updateQuestion(
                                                                    chapter.id,
                                                                    qi,
                                                                    "choices",
                                                                    arr
                                                                );
                                                            }}
                                                        />
                                                    ))}
                                                </div>

                                                <button
                                                    type="button"
                                                    className="text-red-600 flex items-center gap-1"
                                                    onClick={() =>
                                                        removeQuestion(
                                                            chapter.id,
                                                            qi
                                                        )
                                                    }
                                                >
                                                    <FiTrash2 /> Remove
                                                </button>
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            className="text-blue-600 flex items-center gap-2"
                                            onClick={() =>
                                                addQuestion(chapter.id)
                                            }
                                        >
                                            <FiPlus /> Add Question
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ---------- SAVE ---------- */}
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow"
                        >
                            Save Changes
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/instructor/classes")}
                            className="px-4 py-2 rounded-lg border"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </InstructorLayout>
    );
}
