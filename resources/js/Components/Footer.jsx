export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 px-8 lg:px-24 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">DevCourse</h2>
                    <p className="text-sm leading-relaxed text-gray-300">
                        DevCourse is an online learning site providing great learning
                        experiences by experienced instructors.
                    </p>
                </div>

                {/* Home */}
                <div>
                    <h3 className="font-semibold mb-4">Home</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li>Product</li>
                        <li>Course</li>
                        <li>About Us</li>
                        <li>Log in</li>
                    </ul>
                </div>

                {/* Course */}
                <div>
                    <h3 className="font-semibold mb-4">Course</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li>HTML & CSS</li>
                        <li>JavaScript</li>
                        <li>Business</li>
                        <li>Graphic Design</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-semibold mb-4">Contact Us</h3>
                    <p className="text-gray-300 text-sm">DevCourse@gmail.com</p>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-12 border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-300">
                <p>© 2025 DevCourse. All Rights Reserved.</p>

                <div className="flex gap-6 mt-4 md:mt-0">
                    <p className="hover:text-white cursor-pointer">Privacy Policy</p>
                    <p className="hover:text-white cursor-pointer">Terms of Use</p>
                </div>
            </div>
        </footer>
    );
}
