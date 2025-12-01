import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InstructorLayout from "../../../../layouts/InstructorLayout";
import { FiPlus, FiTrash2, FiArrowLeft } from "react-icons/fi";

/* ---------------------------- HELPERS ---------------------------- */
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

/* ====================== MAIN COMPONENT ====================== */

export default function CreateClassPage() {
    const navigate = useNavigate();

    /* -------- CLASS MAIN FIELDS -------- */
    const [form, setForm] = useState({
        title: "",
        category: "",
        level: "Beginner",
        price: "",
        description: "",
        chapters: [emptyChapter()],
    });

    const updateField = (key, value) =>
        setForm((f) => ({ ...f, [key]: value }));

    /* -------- FINAL QUIZ -------- */
    const [finalQuiz, setFinalQuiz] = useState({
        title: "",
        passing: 0,
        questions: [emptyQuestion()],
    });

    const addFinalQuestion = () =>
        setFinalQuiz((f) => ({
            ...f,
            questions: [...f.questions, emptyQuestion()],
        }));

    const removeFinalQuestion = (idx) =>
        setFinalQuiz((f) => ({
            ...f,
            questions: f.questions.filter((_, i) => i !== idx),
        }));

    const updateFinalQuestion = (idx, key, value) =>
        setFinalQuiz((f) => {
            const newQ = [...f.questions];
            newQ[idx][key] = value;
            return { ...f, questions: newQ };
        });

    /* -------- CHAPTERS -------- */
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

    /* -------- MATERIALS -------- */
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

    /* -------- CHAPTER QUIZ -------- */
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

    /* -------- SUBMIT -------- */
    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            ...form,
            finalQuiz,
        };

        console.log("CLASS CREATED:", payload);
        alert("Class created successfully!");
        navigate("/instructor/classes");
    };

    return (
        <InstructorLayout>
            <div className="px-1 pb-10">

                {/* BACK BUTTON */}
                <div className="flex items-center gap-4 mb-6">
                
                    <h1 className="text-2xl font-bold">Create New Class</h1>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* ================= CLASS INFO ================= */}
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

                    {/* ================= CHAPTERS ================= */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <div className="flex justify-between mb-4">
                            <h2 className="text-lg font-semibold">Chapters</h2>

                            <button
                                type="button"
                                onClick={addChapter}
                                className="text-blue-600 flex items-center gap-2"
                            >
                                <FiPlus /> Add Chapter
                            </button>
                        </div>

                        <div className="space-y-6">
                            {form.chapters.map((chapter, ci) => (
                                <div
                                    key={chapter.id}
                                    className="border rounded-xl p-4 bg-gray-50"
                                >
                                    {/* CHAPTER HEADER */}
                                    <div className="flex justify-between mb-4">
                                        <input
                                            className="px-3 py-2 border rounded-lg w-72"
                                            placeholder={`Chapter ${ci + 1} Title`}
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

                                    {/* MATERIALS */}
                                    <div>
                                        <div className="flex justify-between items-center">
                                            <p className="font-semibold text-sm">
                                                Materials
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    addMaterial(chapter.id)
                                                }
                                                className="text-blue-600 flex items-center gap-1"
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
                                                    <div className="flex justify-between">
                                                        <div className="flex-1 space-y-2">

                                                            <input
                                                                className="px-3 py-2 border rounded-lg w-full"
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
                                                                className="px-3 py-2 border rounded-lg"
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
                                                                <option value="text">Text</option>
                                                                <option value="video">Video</option>
                                                            </select>

                                                            {m.type === "text" ? (
                                                                <textarea
                                                                    className="px-3 py-2 border rounded w-full"
                                                                    rows="2"
                                                                    placeholder="Paragraph content..."
                                                                    value={m.content}
                                                                    onChange={(e) =>
                                                                        updateMaterial(
                                                                            chapter.id,
                                                                            m.id,
                                                                            "content",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                />
                                                            ) : (
                                                                <>
                                                                    <input
                                                                        type="file"
                                                                        className="text-sm"
                                                                        accept="video/*"
                                                                        onChange={(e) =>
                                                                            updateMaterial(
                                                                                chapter.id,
                                                                                m.id,
                                                                                "videoFile",
                                                                                e.target.files[0]
                                                                            )
                                                                        }
                                                                    />

                                                                    <input
                                                                        className="border px-2 py-1 rounded text-sm"
                                                                        placeholder="Duration (08:20)"
                                                                        value={m.duration}
                                                                        onChange={(e) =>
                                                                            updateMaterial(
                                                                                chapter.id,
                                                                                m.id,
                                                                                "duration",
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                    />
                                                                </>
                                                            )}
                                                        </div>

                                                        <button
                                                            type="button"
                                                            className="text-red-600 ml-3"
                                                            onClick={() =>
                                                                removeMaterial(
                                                                    chapter.id,
                                                                    m.id
                                                                )
                                                            }
                                                        >
                                                            <FiTrash2 />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* QUIZ PER CHAPTER */}
                                    <div className="mt-6 bg-white p-4 rounded-lg border">
                                        <h3 className="font-semibold mb-3">
                                            Chapter Quiz
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                                            <input
                                                className="px-3 py-2 border rounded-lg"
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

                                            <input
                                                className="px-3 py-2 border rounded-lg"
                                                placeholder="Passing %"
                                                type="number"
                                                value={chapter.quiz.passing}
                                                onChange={(e) =>
                                                    updateChapterField(
                                                        chapter.id,
                                                        "quiz",
                                                        {
                                                            ...chapter.quiz,
                                                            passing: e.target.value,
                                                        }
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            {chapter.quiz.questions.map(
                                                (q, qi) => (
                                                    <div
                                                        key={qi}
                                                        className="border rounded-lg p-3 bg-gray-50"
                                                    >
                                                        <input
                                                            className="w-full px-3 py-2 border rounded-lg mb-2"
                                                            placeholder={`Question ${qi + 1}`}
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
                                                            className="px-3 py-2 border rounded-lg w-full mb-2"
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

                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                            {q.choices.map(
                                                                (c, ci2) => (
                                                                    <input
                                                                        key={ci2}
                                                                        className="px-3 py-2 border rounded-lg"
                                                                        placeholder={`Choice ${String.fromCharCode(
                                                                            65 + ci2
                                                                        )}`}
                                                                        value={c}
                                                                        onChange={(e) => {
                                                                            const arr = [...q.choices];
                                                                            arr[ci2] = e.target.value;
                                                                            updateQuestion(
                                                                                chapter.id,
                                                                                qi,
                                                                                "choices",
                                                                                arr
                                                                            );
                                                                        }}
                                                                    />
                                                                )
                                                            )}
                                                        </div>

                                                        <button
                                                            type="button"
                                                            className="text-red-600 mt-2 flex items-center gap-1"
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
                                                )
                                            )}

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
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ================= FINAL QUIZ ================= */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-lg font-semibold mb-3">
                            Final Quiz
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                            <input
                                className="px-3 py-2 border rounded-lg"
                                placeholder="Final Quiz Title"
                                value={finalQuiz.title}
                                onChange={(e) =>
                                    setFinalQuiz({
                                        ...finalQuiz,
                                        title: e.target.value,
                                    })
                                }
                            />

                            <input
                                className="px-3 py-2 border rounded-lg"
                                placeholder="Passing %"
                                type="number"
                                value={finalQuiz.passing}
                                onChange={(e) =>
                                    setFinalQuiz({
                                        ...finalQuiz,
                                        passing: Number(e.target.value),
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-3">
                            {finalQuiz.questions.map((q, qi) => (
                                <div
                                    key={qi}
                                    className="border rounded-lg p-3 bg-gray-50"
                                >
                                    <input
                                        className="w-full px-3 py-2 border rounded-lg mb-2"
                                        placeholder={`Question ${qi + 1}`}
                                        value={q.question}
                                        onChange={(e) =>
                                            updateFinalQuestion(
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
                                            updateFinalQuestion(
                                                qi,
                                                "points",
                                                Number(e.target.value)
                                            )
                                        }
                                    />

                                    <input
                                        className="px-3 py-2 border rounded-lg w-full mb-2"
                                        placeholder="Correct answer"
                                        value={q.correct}
                                        onChange={(e) =>
                                            updateFinalQuestion(
                                                qi,
                                                "correct",
                                                e.target.value
                                            )
                                        }
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                        {q.choices.map((c, ci2) => (
                                            <input
                                                key={ci2}
                                                className="px-3 py-2 border rounded-lg"
                                                placeholder={`Choice ${String.fromCharCode(
                                                    65 + ci2
                                                )}`}
                                                value={c}
                                                onChange={(e) => {
                                                    const arr = [...q.choices];
                                                    arr[ci2] = e.target.value;
                                                    updateFinalQuestion(
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
                                        className="text-red-600 mt-2 flex items-center gap-1"
                                        onClick={() => removeFinalQuestion(qi)}
                                    >
                                        <FiTrash2 /> Remove
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                className="text-blue-600 flex items-center gap-2"
                                onClick={addFinalQuestion}
                            >
                                <FiPlus /> Add Final Question
                            </button>
                        </div>
                    </div>

                    {/* ================= BUTTONS ================= */}
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow"
                        >
                            Create Class
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
