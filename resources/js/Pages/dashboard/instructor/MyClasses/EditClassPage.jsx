import { useState, useEffect, useRef } from "react";
import axios from "../../../../axios";
import { useNavigate, useParams } from "react-router-dom";
import InstructorLayout from "../../../../layouts/InstructorLayout";
import { FiArrowLeft, FiPlus, FiTrash2 } from "react-icons/fi";

/* ----------------------  HELPERS ---------------------- */
function emptyQuestion() {
    return { question: "", points: 1, correct: "", choices: ["", "", "", ""] };
}

function emptyMaterial() {
    return {
        id: Math.random().toString(36).substr(2, 9),
        title: "",
        type: "text",
        content: "",
        videoFile: null,
        duration: "",
    };
}

function emptyChapter() {
    return {
        id: Math.random().toString(36).substr(2, 9),
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

    const [form, setForm] = useState({
        title: "",
        category: "",
        level: "",
        price: "",
        thumbnail: null,
        description: "",
        chapters: [],
    });
    const [finalQuiz, setFinalQuiz] = useState({
        title: "",
        passing: 0,
        questions: [],
    });
    const [existingThumbnail, setExistingThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const priceInputRef = useRef(null);

    // Price formatting functions
    const onlyDigits = (s) => (s || "").toString().replace(/\D/g, "");
    const formatRupiah = (s) => {
        if (!s) return "";
        try {
            return Number(s).toLocaleString("id-ID");
        } catch (e) {
            return s;
        }
    };

    const handlePriceChange = (e) => {
        const rawInput = e.target.value || "";
        const selectionStart = e.target.selectionStart || 0;
        const digitsBefore = (rawInput.slice(0, selectionStart).match(/\d/g) || []).length;
        const newRaw = onlyDigits(rawInput);
        setForm((f) => ({ ...f, price: newRaw }));

        setTimeout(() => {
            const el = priceInputRef.current;
            if (!el) return;
            const newDisplay = formatRupiah(newRaw);
            let pos = 0;
            let digitsSeen = 0;
            while (pos < newDisplay.length && digitsSeen < digitsBefore) {
                if (/\d/.test(newDisplay[pos])) digitsSeen++;
                pos++;
            }
            if (digitsSeen < digitsBefore) pos = newDisplay.length;
            el.setSelectionRange(pos, pos);
        }, 0);
    };

    const updateField = (key, value) =>
        setForm((f) => ({ ...f, [key]: value }));

    // Fetch course data from API
    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`/courses/${classId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const course = res.data;
                console.log('Fetched course data:', course);
                console.log('Chapters with quizzes:', course.chapters?.map(ch => ({
                    chapterId: ch.id,
                    chapterTitle: ch.title,
                    quiz: ch.quiz,
                    quizzes: ch.quizzes,
                })));
                
                // Transform chapters data
                const transformedChapters = (course.chapters || []).map(ch => {
                    // Handle both quiz (singular) and quizzes (array) from backend
                    const quizData = ch.quizzes?.[0] || ch.quiz || null;
                    
                    return {
                        id: ch.id,
                        title: ch.title,
                        materials: (ch.materials || []).map(m => {
                            // Clean video_url - handle null, empty string, or string "null"
                            const cleanVideoUrl = m.video_url && 
                                                 m.video_url !== '' && 
                                                 m.video_url !== 'null' && 
                                                 String(m.video_url).trim().length > 0 
                                                 ? m.video_url 
                                                 : null;
                            
                            return {
                                id: m.id,
                                title: m.title,
                                type: cleanVideoUrl ? 'video' : 'text',
                                content: m.content || '',
                                videoFile: null,
                                duration: m.duration || '',
                                existingVideoUrl: cleanVideoUrl,
                            };
                        }),
                        quiz: {
                            id: quizData?.id || null,
                            title: quizData?.title || '',
                            passing: quizData?.passing || 60,
                            questions: quizData?.questions && quizData.questions.length > 0
                                ? quizData.questions.map(q => ({
                                    id: q.id || null,
                                    question: q.question || '',
                                    points: q.points || 1,
                                    correct: q.correct_answer || '',
                                    choices: [
                                        q.option_a || '',
                                        q.option_b || '',
                                        q.option_c || '',
                                        q.option_d || ''
                                    ],
                                }))
                                : [emptyQuestion()], // Ensure at least one empty question
                        },
                    };
                });

                setForm({
                    title: course.title || '',
                    category: course.category || '',
                    level: course.level || '',
                    price: course.price?.toString() || '',
                    thumbnail: null,
                    description: course.description || '',
                    chapters: transformedChapters.length > 0 ? transformedChapters : [emptyChapter()],
                });

                // Set existing thumbnail URL
                if (course.thumbnail) {
                    setExistingThumbnail(course.thumbnail);
                    setThumbnailPreview(`/${course.thumbnail}`);
                }

                // Set final quiz if exists (quiz without chapter_id)
                console.log('All quizzes from API:', course.quizzes);
                const finalQuizData = (course.quizzes || []).find(q => !q.chapter_id);
                console.log('Final quiz data:', finalQuizData);
                
                if (finalQuizData) {
                    const finalQuestions = finalQuizData.questions && finalQuizData.questions.length > 0
                        ? finalQuizData.questions.map(q => ({
                            id: q.id || null,
                            question: q.question || '',
                            points: q.points || 1,
                            correct: q.correct_answer || '',
                            choices: [
                                q.option_a || '',
                                q.option_b || '',
                                q.option_c || '',
                                q.option_d || ''
                            ],
                        }))
                        : [emptyQuestion()];
                    
                    setFinalQuiz({
                        id: finalQuizData.id,
                        title: finalQuizData.title || '',
                        passing: finalQuizData.passing || 0,
                        questions: finalQuestions,
                    });
                } else {
                    setFinalQuiz({
                        title: '',
                        passing: 0,
                        questions: [emptyQuestion()],
                    });
                }
            } catch (err) {
                console.error('Failed to fetch course:', err);
                alert('Failed to load course data');
            } finally {
                setLoading(false);
            }
        };

        if (classId) {
            fetchCourse();
        }
    }, [classId]);

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

    /* -------- FINAL QUIZ -------- */
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

    /* --------------------- SUBMIT --------------------- */
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const payload = new FormData();
        payload.append('title', form.title);
        payload.append('description', form.description);
        payload.append('price', Number(form.price || 0));
        if (form.category) payload.append('category', form.category);
        if (form.level) payload.append('level', form.level);
        if (form.thumbnail) payload.append('thumbnail', form.thumbnail);
        payload.append('_method', 'PUT'); // Laravel method spoofing for multipart

        // Prepare chapters payload
        const chaptersPayload = form.chapters.map((ch) => ({
            title: ch.title,
            materials: ch.materials.map((m) => ({
                title: m.title,
                type: m.type,
                content: m.content || null,
                video_field: m.videoFile ? `material_video_${ch.id}_${m.id}` : null,
                duration: m.duration || null,
                existing_video_url: m.existingVideoUrl || null,
            })),
            quiz: {
                title: ch.quiz?.title || null,
                passing: ch.quiz?.passing || 0,
                questions: ch.quiz?.questions || [],
            },
        }));

        payload.append('chapters', JSON.stringify(chaptersPayload));
        payload.append('final_quiz', JSON.stringify(finalQuiz));

        // Attach video files
        form.chapters.forEach((ch) => {
            ch.materials.forEach((m) => {
                if (m.videoFile) {
                    const key = `material_video_${ch.id}_${m.id}`;
                    payload.append(key, m.videoFile);
                }
            });
        });

        try {
            await axios.post(`/courses/${classId}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            alert('Class updated successfully!');
            navigate('/instructor/classes');
        } catch (err) {
            console.error('Failed to update class', err);
            const msg = err.response?.data?.message || (err.response?.data ? JSON.stringify(err.response.data) : err.message);
            alert('Failed to update class: ' + msg);
        }
    };

    if (loading) {
        return (
            <InstructorLayout>
                <div className="p-1 pb-10 flex items-center justify-center h-screen">
                    <p className="text-gray-400">Loading course data...</p>
                </div>
            </InstructorLayout>
        );
    }

    return (
        <InstructorLayout>
            <div className="px-1 pb-10">
                {/* ----------------- BUTTON BACK ----------------- */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition text-white"
                    >
                        <FiArrowLeft size={18} />
                    </button>
                    <h1 className="text-2xl font-bold">Edit Class</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* =====================================================
                        BASIC CLASS INFO
                    ===================================================== */}
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
                            <select
                                className="px-4 py-2 border rounded-lg"
                                value={form.category}
                                onChange={(e) =>
                                    updateField("category", e.target.value)
                                }
                            >
                                <option value="">Select category</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="Programming">Programming</option>
                                <option value="Design">Design</option>
                                <option value="UI/UX">UI/UX</option>
                            </select>
                            <select
                                className="px-4 py-2 border rounded-lg"
                                value={form.level}
                                onChange={(e) =>
                                    updateField("level", e.target.value)
                                }
                            >
                                <option value="">Select level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-600">Rp</div>
                                <input
                                    ref={priceInputRef}
                                    inputMode="numeric"
                                    className="pl-10 px-4 py-2 border rounded-lg w-full"
                                    placeholder="0"
                                    value={formatRupiah(form.price)}
                                    onChange={handlePriceChange}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Thumbnail</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files && e.target.files[0];
                                        updateField('thumbnail', file);
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setThumbnailPreview(reader.result);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="w-full mt-1"
                                />
                                {thumbnailPreview && (
                                    <div className="mt-2">
                                        <img
                                            src={thumbnailPreview}
                                            alt="Thumbnail preview"
                                            className="w-32 h-32 object-cover rounded-lg border"
                                        />
                                    </div>
                                )}
                            </div>
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

                    {/* =====================================================
                        CHAPTERS
                    ===================================================== */}
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

                        <div className="space-y-6">
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

                                    {/* ------------------ MATERIALS ------------------ */}
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
                                                                <option value="text">
                                                                    Text
                                                                </option>
                                                                <option value="video">
                                                                    Video
                                                                </option>
                                                            </select>

                                                            {m.type ===
                                                            "text" ? (
                                                                <textarea
                                                                    className="px-3 py-2 border rounded w-full"
                                                                    rows="2"
                                                                    placeholder="Paragraph content..."
                                                                    value={
                                                                        m.content
                                                                    }
                                                                    onChange={(e) =>
                                                                        updateMaterial(
                                                                            chapter.id,
                                                                            m.id,
                                                                            "content",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            ) : (
                                                                <>
                                                                    {m.existingVideoUrl && (
                                                                        <div className="mb-3 p-2 bg-gray-50 rounded border">
                                                                            <p className="text-xs font-semibold text-gray-700 mb-2">
                                                                                📹 Current Video:
                                                                            </p>
                                                                            <video 
                                                                                controls 
                                                                                className="w-full max-h-48 rounded border bg-black"
                                                                                src={m.existingVideoUrl.startsWith('http') ? m.existingVideoUrl : `/${m.existingVideoUrl}`}
                                                                            >
                                                                                Your browser does not support the video tag.
                                                                            </video>
                                                                            <p className="text-xs text-gray-600 mt-1 break-all">
                                                                                {m.existingVideoUrl}
                                                                            </p>
                                                                        </div>
                                                                    )}
                                                                    
                                                                    <div className="mb-2">
                                                                        <label className="text-sm font-semibold text-gray-700 block mb-1">
                                                                            {m.existingVideoUrl ? '🔄 Replace Video (optional):' : '⬆️ Upload Video:'}
                                                                        </label>
                                                                        <input
                                                                            type="file"
                                                                            className="text-sm w-full border rounded px-2 py-1"
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
                                                                        {m.videoFile && (
                                                                            <p className="text-xs text-green-600 mt-1 font-medium">
                                                                                ✓ New file: {m.videoFile.name}
                                                                            </p>
                                                                        )}
                                                                    </div>

                                                                    <div>
                                                                        <label className="text-sm font-semibold text-gray-700 block mb-1">
                                                                            ⏱️ Duration:
                                                                        </label>
                                                                        <input
                                                                            className="border px-2 py-1 rounded text-sm w-full"
                                                                            placeholder="Duration (MM:SS e.g., 08:20)"
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
                                                                    </div>
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

                                    {/* ------------------ CHAPTER QUIZ ------------------ */}
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
                                                            title: e.target
                                                                .value,
                                                        }
                                                    )
                                                }
                                            />

                                            <input
                                                className="px-3 py-2 border rounded-lg"
                                                placeholder="Passing %"
                                                value={chapter.quiz.passing}
                                                onChange={(e) =>
                                                    updateChapterField(
                                                        chapter.id,
                                                        "quiz",
                                                        {
                                                            ...chapter.quiz,
                                                            passing:
                                                                e.target.value,
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
                                                            placeholder={`Question ${
                                                                qi + 1
                                                            }`}
                                                            value={q.question}
                                                            onChange={(e) =>
                                                                updateQuestion(
                                                                    chapter.id,
                                                                    qi,
                                                                    "question",
                                                                    e.target
                                                                        .value
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
                                                                        e.target
                                                                            .value
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
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />

                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                            {q.choices.map(
                                                                (c, ci2) => (
                                                                    <input
                                                                        key={
                                                                            ci2
                                                                        }
                                                                        className="px-3 py-2 border rounded-lg"
                                                                        placeholder={`Choice ${String.fromCharCode(
                                                                            65 +
                                                                                ci2
                                                                        )}`}
                                                                        value={
                                                                            c
                                                                        }
                                                                        onChange={(e) => {
                                                                            const arr =
                                                                                [
                                                                                    ...q.choices,
                                                                                ];
                                                                            arr[
                                                                                ci2
                                                                            ] =
                                                                                e.target.value;
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
                                        </div>

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

                    {/* =====================================================
                        FINAL QUIZ
                    ===================================================== */}
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

                    {/* ----------------- BUTTONS ----------------- */}
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
