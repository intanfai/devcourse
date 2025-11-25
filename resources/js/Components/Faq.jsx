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
                <div key={index} className="border-b py-5">
                    <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex justify-between items-center text-left"
                    >
                        <span className="text-lg font-semibold text-gray-800">
                            {faq.question}
                        </span>
                        <span className="text-xl font-bold">
                            {openIndex === index ? "-" : "+"}
                        </span>
                    </button>

                    {openIndex === index && (
                        <p className="mt-3 text-gray-600">{faq.answer}</p>
                    )}
                </div>
            ))}
        </div>
    );
}
