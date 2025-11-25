export default function Footer() {
    return (
        <footer className="bg-[#003B95] text-white py-16 px-8 lg:px-24">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

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
