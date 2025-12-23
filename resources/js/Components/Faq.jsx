import { useState } from "react";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "What is DevCourse?",
            answer: "DevCourse is an online learning program focused on IT and software development.",
        },
        {
            question: "What it takes to be an instructor?",
            answer: "You need strong expertise and teaching experience.",
        },
        {
            question: "How can I access the class materials?",
            answer: "All materials can be accessed after enrolling.",
        },
        {
            question: "Do I receive a certificate?",
            answer: "Yes, you will get an official certificate after completing the course.",
        },
    ];

    return (
        <div className="max-w-3xl mx-auto">
            {faqData.map((faq, index) => (
                <div 
                    key={index} 
                    className="bg-white rounded-xl border-2 border-gray-200 mb-4 overflow-hidden hover:border-blue-300 transition-all duration-300"
                >
                    <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex justify-between items-center text-left p-6 hover:bg-blue-50/50 transition-colors"
                    >
                        <span className="text-lg font-bold text-gray-800 pr-4">
                            {faq.question}
                        </span>
                        <span className={`text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 flex-shrink-0 ${
                            openIndex === index 
                                ? 'bg-blue-600 text-white rotate-45' 
                                : 'bg-gray-200 text-gray-600'
                        }`}>
                            +
                        </span>
                    </button>

                    {openIndex === index && (
                        <div className="px-6 pb-6 pt-2">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
