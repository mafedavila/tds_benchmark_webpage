import { useState } from "react";
import { Link } from "react-router-dom";

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <div className="w-full flex flex-row bg-white shadow-md py-3 text-lg px-5 lg:px-18 justify-between items-center">
                {/* Logo + title */}
                <Link to="/" className="flex flex-row items-center space-x-4">
                    <img src="/src/assets/logo.svg" className="size-9" />
                    <h1 className="text-text-blue font-bold whitespace-nowrap">
                        TDS Benchmark
                    </h1>
                </Link>

                {/* Desktop menu */}
                <div className="hidden md:flex flex-row w-full text-gray-600 justify-between items-center ml-10">
                    <ul className="flex flex-row space-x-6">
                        <li><Link to="/synthesis" className="hover:text-black cursor-pointer">Synthesis</Link></li>
                        <li><Link to="/dissertation" className="hover:text-black cursor-pointer">Dissertation</Link></li>
                        <li><Link to="/publications" className="hover:text-black cursor-pointer">Publications</Link></li>
                        <li><Link to="/cv" className="hover:text-black cursor-pointer">CV</Link></li>
                    </ul>

                    <ul className="flex flex-row space-x-4">
                        <li><a href="https://www.linkedin.com/in/maria-davila-restrepo/" target="_blank" rel="noopener noreferrer"><img className="size-7" src="/src/assets/linkedin-logo.svg"/></a></li>
                        <li><a href="https://github.com/mafedavila" target="_blank" rel="noopener noreferrer"><img className="size-6" src="/src/assets/github-logo.svg"/></a></li>
                    </ul>
                </div>

                {/* Mobile menu button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-gray-700"
                >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
            </div>

            {/* Mobile dropdown */}
            {open && (
                <div className="md:hidden bg-white shadow-md px-5 py-3 space-y-4 text-gray-600 font-medium">
                    <a className="block hover:text-black">Publications</a>
                    <a className="block hover:text-black">TDS Model & Tools Insights</a>
                    <a className="block hover:text-black">Synthesis</a>
                    <a className="block hover:text-black">Dissertation</a>
                    <a className="block hover:text-black">CV</a>

                    <div className="flex flex-row space-x-4 pt-2">
                        <a><img className="size-6" src="/src/assets/ig-logo.png"/></a>
                        <a><img className="size-6" src="/src/assets/x-logo.png"/></a>
                    </div>
                </div>
            )}

            {/* Body */}
            <div className="flex-1">
                {children}
            </div>

            {/* Footer */}
            <div className="w-full min-h-[150px] bg-white shadow-inner flex flex-col md:flex-row justify-between items-start md:items-center py-6 text-black px-5 lg:px-18 space-y-6 md:space-y-0">
                <div>
                    <h2 className="font-bold text-2xl">Maria F. Davila R.</h2>
                    <p className="text-gray-600">
                        PhD candidate in Computer Science at the University of Oldenburg,
                        specializing in tabular data synthesis with deep generative models.
                    </p>
                </div>
                <div id="social-media" className="flex flex-row space-x-4">
                    <a href="https://www.linkedin.com/in/maria-davila-restrepo/" target="_blank" rel="noopener noreferrer"><img className="size-7" src="/src/assets/linkedin-logo.svg"/></a>
                    <a href="https://github.com/mafedavila" target="_blank" rel="noopener noreferrer"><img className="size-7" src="/src/assets/github-logo.svg"/></a>
                </div>
            </div>
        </div>
    );
};
