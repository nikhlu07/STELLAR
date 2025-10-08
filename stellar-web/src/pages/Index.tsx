
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const Index = () => {
    React.useEffect(() => {
        // Simple scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        });

        const hiddenElements = document.querySelectorAll('section > div');
        hiddenElements.forEach(el => observer.observe(el));

        // Add a style tag for the animation
        const style = document.createElement('style');
        style.innerHTML = `
            .fade-in-up {
                animation: fadeInUp 0.8s ease-out forwards;
            }
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
        // Hide elements initially
        document.querySelectorAll('section > div:not(:first-child)').forEach(el => {
            if (el instanceof HTMLElement) {
                el.style.opacity = '0';
            }
        });

        // Header scroll effect
        const header = document.querySelector('header');
        const handleScroll = () => {
            if (header) {
                if (window.scrollY > 10) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
            hiddenElements.forEach(el => observer.unobserve(el));
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <style>{`
                body {
                    background-color: #FFFFFF;
                    color: #1A1A2E;
                    font-family: 'Space Mono', monospace;
                    background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
                    background-size: 20px 20px;
                    background-position: 0 0, 10px 10px;
                }
                header.scrolled {
                    background-color: rgba(255, 255, 255, 0.8);
                    -webkit-backdrop-filter: blur(10px);
                    backdrop-filter: blur(10px);
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                }
                .font-lufga {
                    font-family: 'Lufga', sans-serif;
                }
                .font-space-mono {
                    font-family: 'Space Mono', monospace;
                }
                .electric-violet-text {
                    color: #5C27FE;
                }
                .electric-violet-bg {
                    background-color: #5C27FE;
                }
                .electric-violet-border {
                    border-color: #5C27FE;
                }
                /* Custom glow effect */
                .glow-effect-soft {
                     box-shadow: 0 0 15px rgba(92, 39, 254, 0.5);
                }

                /* Gradient text */
                .text-gradient {
                    background: linear-gradient(90deg, #1A1A2E, #5C27FE);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .card-bg {
                    background-color: #F9FAFB;
                    border: 1px solid #E5E7EB;
                }

                /* SVG Animations */
                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.8; }
                }
                .orbit {
                    animation: rotate 60s linear infinite;
                    transform-origin: center;
                }
                .orbit-reverse {
                    animation: rotate 90s linear infinite reverse;
                    transform-origin: center;
                }
                .pulse {
                    animation: pulse 4s ease-in-out infinite;
                }

                /* --- NEW VISUALS & ANIMATIONS --- */
                .card-hover-effect {
                    transition: all 0.3s ease-in-out;
                }
                .card-hover-effect:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05), 0 0 25px rgba(92, 39, 254, 0.4);
                    border-color: #5C27FE !important; /* Use important to override existing border */
                }
                .table-row-hover-effect tbody tr {
                    transition: background-color 0.3s ease;
                }
                .table-row-hover-effect tbody tr:hover {
                    background-color: #eef2ff; /* A light violet tone */
                }
                @keyframes pulse-slow {
                    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(92, 39, 254, 0.7); }
                    70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(92, 39, 254, 0); }
                    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(92, 39, 254, 0); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 2s infinite;
                }
            `}</style>
            <div className="overflow-x-hidden">
                <div className="relative z-10">
                    {/* Header */}
                    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out">
                        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                {/* Logo */}
                                <img src="logo.svg" className="h-10 w-10" alt="Stellar Logo" />
                                <span className="font-lufga text-2xl font-bold text-gray-900 tracking-wider">STELLAR</span>
                            </div>
                            <nav className="hidden md:flex items-center space-x-8 text-gray-700">
                                <a href="#mission" className="hover:electric-violet-text transition-colors duration-300">Mission</a>
                                <a href="#how-it-works" className="hover:electric-violet-text transition-colors duration-300">How It Works</a>
                                <a href="#technology" className="hover:electric-violet-text transition-colors duration-300">Technology</a>
                                <a href="#roadmap" className="hover:electric-violet-text transition-colors duration-300">Roadmap</a>
                                <a href="#tokenomics" className="hover:electric-violet-text transition-colors duration-300">Tokenomics</a>
                            </nav>
                            <Link to="/connect" className="hidden md:block electric-violet-bg text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-transform duration-300 transform hover:scale-105">Launch App</Link>
                            <button className="md:hidden text-gray-900">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        </div>
                    </header>

                    <main>
                        {/* Hero Section */}
                        <section className="h-screen w-full flex items-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-grid-gray-200/[0.4] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10"></div>
                            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
                                <div className="text-center lg:text-left">
                                    <h1 className="font-lufga text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-black leading-tight">
                                        Making The Invisible <span className="electric-violet-text">Visible</span>.
                                    </h1>
                                    <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-gray-600">
                                        STELLAR transforms farmland into verifiable, bankable assets using a tri-layered trust architecture of satellite AI, human verification, and an immutable space-oracle.
                                    </p>
                                    <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
                                        <a href="#mission" className="w-full sm:w-auto electric-violet-bg text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 glow-effect-soft">
                                            Discover How
                                        </a>


                                        <Button asChild className="w-full sm:w-auto bg-transparent border-2 electric-violet-border electric-violet-text font-bold py-3 px-8 rounded-lg hover:bg-violet-50 transition-colors duration-300" size="lg">
                                            <Link to="/connect">Launch App</Link>
                                        </Button>
                                    </div>
                                </div>
                                <div className="hidden lg:flex items-center justify-center -mt-16 lg:-mt-0">
                                    {/* Animated Planet SVG */}
                                    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg">
                                        <defs>
                                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                                <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
                                                <feMerge>
                                                    <feMergeNode in="coloredBlur"/>
                                                    <feMergeNode in="SourceGraphic"/>
                                                </feMerge>
                                            </filter>
                                            <radialGradient id="planetGradient" cx="50%" cy="50%" r="50%" fx="25%" fy="25%">
                                                <stop offset="0%" style={{stopColor:'#7c56ff', stopOpacity:1}} />
                                                <stop offset="100%" style={{stopColor:'#5C27FE', stopOpacity:1}} />
                                            </radialGradient>
                                        </defs>

                                        {/* Planet */}
                                        <circle cx="250" cy="250" r="100" fill="url(#planetGradient)" />
                                        <circle cx="250" cy="250" r="105" fill="#5C27FE" opacity="0.5" filter="url(#glow)" />
                                        <circle className="pulse" cx="250" cy="250" r="100" fill="transparent" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>


                                        {/* Orbit 1 */}
                                        <ellipse cx="250" cy="250" rx="150" ry="150" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2 6"/>
                                        {/* Satellite 1 */}
                                        <g>
                                            <circle cx="100" cy="250" r="6" fill="#1A1A2E"/>
                                            <animateMotion dur="10s" repeatCount="indefinite" path="M100,250 a150,150 0 1,0 300,0 a150,150 0 1,0 -300,0" />
                                        </g>

                                        {/* Orbit 2 */}
                                         <ellipse cx="250" cy="250" rx="200" ry="80" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2 6"/>
                                         {/* Satellite 2 */}
                                        <g>
                                            <rect x="-5" y="-5" width="10" height="10" fill="#5C27FE" transform="rotate(45)">
                                                <animateMotion dur="15s" repeatCount="indefinite" path="M250,170 a200,80 0 1,0 0.001,0" />
                                            </rect>
                                        </g>

                                        {/* Orbit 3 */}
                                        <ellipse cx="250" cy="250" rx="120" ry="220" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2 6"/>
                                        {/* Satellite 3 */}
                                        <g>
                                            <circle r="5" fill="#1A1A2E">
                                                 <animateMotion dur="20s" repeatCount="indefinite" path="M250,30 a120,220 0 1,0 0.001,0" />
                                            </circle>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </section>

                        {/* The Problem Section */}
                        <section id="mission" className="py-20">
                            <div className="container mx-auto px-6">
                                <div className="text-center mb-16">
                                    <h2 className="font-lufga text-3xl md:text-4xl font-bold">Operating in the Financial <span className="electric-violet-text">Void</span></h2>
                                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">500 million smallholder farmers are invisible to traditional finance. Their land, their work, their harvests—unverifiable and unbankable. Until now.</p>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <div className="card-bg p-8 rounded-xl text-center card-hover-effect">
                                        <svg className="w-16 h-16 mx-auto electric-violet-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" /></svg>
                                        <h3 className="font-lufga text-2xl font-bold mt-4">Invisible Productivity</h3>
                                        <p className="mt-2 text-gray-600">Land and harvests exist in physical reality but are invisible to digital finance systems, locking farmers out of fair credit.</p>
                                    </div>
                                    <div className="card-bg p-8 rounded-xl text-center card-hover-effect border-2 electric-violet-border glow-effect-soft">
                                         <svg className="w-16 h-16 mx-auto electric-violet-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <h3 className="font-lufga text-2xl font-bold mt-4">The STELLAR Solution</h3>
                                        <p className="mt-2 text-gray-700">We make the invisible **visible**, the unverifiable **verifiable**, and the unbankable **bankable**, creating a trust protocol for the real world.</p>
                                    </div>
                                    <div className="card-bg p-8 rounded-xl text-center card-hover-effect">
                                       <svg className="w-16 h-16 mx-auto electric-violet-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                                        <h3 className="font-lufga text-2xl font-bold mt-4">Instant Capital</h3>
                                        <p className="mt-2 text-gray-600">Unlock fair-priced capital for the smallholder farmers who feed billions, breaking the cycle of predatory lending.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* How It Works Section */}
                        <section id="how-it-works" className="py-20">
                            <div className="container mx-auto px-6">
                                <div className="text-center mb-16">
                                    <h2 className="font-lufga text-3xl md:text-4xl font-bold">The Tri-Layered Trust <span className="electric-violet-text">Architecture</span></h2>
                                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">An unforgeable chain of custody from satellite observation to on-chain permanence.</p>
                                </div>

                                <div className="relative">
                                    {/* Connecting Line */}
                                    <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gray-300"></div>

                                    <div className="grid lg:grid-cols-3 gap-12 relative">
                                         {/* Card 1 */}
                                        <div className="card-bg p-8 rounded-xl text-center card-hover-effect">
                                            <div className="relative w-24 h-24 mx-auto flex items-center justify-center rounded-full bg-white border-4 border-gray-200 mb-4">
                                                <span className="font-lufga text-4xl font-bold electric-violet-text">1</span>
                                            </div>
                                            <h3 className="font-lufga text-xl font-bold">LAYER ONE: The Orbital Mind</h3>
                                            <p className="mt-2 text-gray-600 text-sm">AI decodes satellite data to generate a Farm Intelligence Score—your land's credit rating written in photons from space.</p>
                                        </div>
                                         {/* Card 2 */}
                                         <div className="card-bg p-8 rounded-xl text-center card-hover-effect">
                                            <div className="relative w-24 h-24 mx-auto flex items-center justify-center rounded-full bg-white border-4 border-gray-200 mb-4">
                                                 <span className="font-lufga text-4xl font-bold electric-violet-text">2</span>
                                            </div>
                                            <h3 className="font-lufga text-xl font-bold">LAYER TWO: The Human Mesh</h3>
                                            <p className="mt-2 text-gray-600 text-sm">A DePIN network of Verifier Corps provides ground truth, staking tokens on their honesty and ensuring data integrity.</p>
                                        </div>
                                         {/* Card 3 */}
                                         <div className="card-bg p-8 rounded-xl text-center card-hover-effect">
                                            <div className="relative w-24 h-24 mx-auto flex items-center justify-center rounded-full bg-white border-4 border-gray-200 mb-4">
                                                 <span className="font-lufga text-4xl font-bold electric-violet-text">3</span>
                                            </div>
                                            <h3 className="font-lufga text-xl font-bold">LAYER THREE: The Cosmic Notary</h3>
                                            <p className="mt-2 text-gray-600 text-sm">Reports ascend to the CTC-0 orbital constellation for an immutable, geospacial, and cryptographic seal from space itself.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Technology Section */}
                        <section id="technology" className="py-20">
                            <div className="container mx-auto px-6">
                                <div className="text-center mb-12">
                                    <h2 className="font-lufga text-3xl md:text-4xl font-bold">Technology <span className="electric-violet-text">Matrix</span></h2>
                                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">We leverage a robust, decentralized technology stack to build a protocol you can trust.</p>
                                </div>
                                <div className="max-w-4xl mx-auto card-bg rounded-xl overflow-hidden shadow-lg">
                                    <table className="w-full text-left font-space-mono table-row-hover-effect">
                                        <thead className="bg-gray-100 border-b-2 border-gray-200">
                                            <tr>
                                                <th className="p-4 font-lufga text-gray-800 tracking-wider">Domain</th>
                                                <th className="p-4 font-lufga text-gray-800 tracking-wider">Technology</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-gray-200">
                                                <td className="p-4 font-bold">Smart Contracts</td>
                                                <td className="p-4">Solidity, OpenZeppelin, Hardhat</td>
                                            </tr>
                                            <tr className="border-b border-gray-200">
                                                <td className="p-4 font-bold">Blockchain</td>
                                                <td className="p-4">Creditcoin (testnet deployment)</td>
                                            </tr>
                                            <tr className="border-b border-gray-200">
                                                <td className="p-4 font-bold">Backend Logic</td>
                                                <td className="p-4">Node.js (Express), Python (FastAPI)</td>
                                            </tr>
                                            <tr className="border-b border-gray-200">
                                                <td className="p-4 font-bold">Satellite Processing</td>
                                                <td className="p-4">Python, Google Earth Engine, Sentinel Hub API</td>
                                            </tr>
                                            <tr className="border-b border-gray-200">
                                                <td className="p-4 font-bold">Frontend</td>
                                                <td className="p-4">Next.js 14, React 18, Ethers.js, Tailwind CSS</td>
                                            </tr>
                                            <tr className="border-b border-gray-200">
                                                <td className="p-4 font-bold">Identity</td>
                                                <td className="p-4">Creditcoin Credal API</td>
                                            </tr>
                                            <tr className="border-b border-gray-200">
                                                <td className="p-4 font-bold">Token Economics</td>
                                                <td className="p-4">CTC (staking, gas, rewards)</td>
                                            </tr>
                                            <tr className="border-b border-gray-200">
                                                <td className="p-4 font-bold">Storage</td>
                                                <td className="p-4">IPFS (distributed file system for verification media)</td>
                                            </tr>
                                            <tr>
                                                <td className="p-4 font-bold">Oracles</td>
                                                <td className="p-4">Weather APIs, Mandi price feeds, CTC-0 (simulated in Phase 1)</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>

                        {/* Roadmap Section */}
                        <section id="roadmap" className="py-20">
                            <div className="container mx-auto px-6">
                                <div className="text-center mb-16">
                                    <h2 className="font-lufga text-3xl md:text-4xl font-bold">Mission <span className="electric-violet-text">Roadmap</span></h2>
                                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Our initialization sequence is underway. Join us as we scale from local simulation to global deployment.</p>
                                </div>
                                <div className="relative max-w-2xl mx-auto">
                                    {/* Vertical line */}
                                    <div className="absolute left-5 top-5 h-full w-0.5 bg-gray-200"></div>
                                    <div className="space-y-12 relative">
                                        {/* Phase 0 */}
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full electric-violet-bg flex items-center justify-center text-white font-bold z-10 animate-pulse-slow">0</div>
                                            <div className="pl-8">
                                                <div className="font-lufga text-xl font-bold">Phase 0: Demo-Ready</div>
                                                <p className="text-gray-600">Core contracts deployed, single-farm demo functional.</p>
                                            </div>
                                        </div>
                                        {/* Phase 1 */}
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full electric-violet-bg flex items-center justify-center text-white font-bold z-10 animate-pulse-slow">1</div>
                                            <div className="pl-8">
                                                <div className="font-lufga text-xl font-bold">Phase 1: Trust Network</div>
                                                <p className="text-gray-600">Verifier network operational, 10+ test Trust Circles.</p>
                                            </div>
                                        </div>
                                        {/* Phase 2 */}
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full electric-violet-bg flex items-center justify-center text-white font-bold z-10 animate-pulse-slow">2</div>
                                            <div className="pl-8">
                                                <div className="font-lufga text-xl font-bold">Phase 2: Orbital Seal</div>
                                                <p className="text-gray-600">CTC-0 integration (or simulation), testnet deployment.</p>
                                            </div>
                                        </div>
                                         {/* Phase 3 */}
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold z-10">3</div>
                                            <div className="pl-8">
                                                <div className="font-lufga text-xl font-bold text-gray-500">Phase 3: Pilot Deployment</div>
                                                <p className="text-gray-500">100-farm pilot in Punjab with partner NBFC.</p>
                                            </div>
                                        </div>
                                         {/* Phase 4 */}
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold z-10">4</div>
                                            <div className="pl-8">
                                                <div className="font-lufga text-xl font-bold text-gray-500">Phase 4: Scale</div>
                                                <p className="text-gray-500">Expand to 5 Indian states and international replication.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Tokenomics Section */}
                        <section id="tokenomics" className="py-20">
                            <div className="container mx-auto px-6">
                                <div className="text-center mb-16">
                                    <h2 className="font-lufga text-3xl md:text-4xl font-bold">The CTC <span className="electric-violet-text">Economy</span></h2>
                                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">The CTC token powers the STELLAR ecosystem, incentivizing participation and securing the protocol.</p>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    <div className="card-bg p-8 rounded-xl card-hover-effect">
                                        <h3 className="font-lufga text-2xl font-bold mb-4 electric-violet-text">Demand Drivers</h3>
                                        <ul className="space-y-2 text-gray-600 list-disc list-inside">
                                            <li>Verifier staking</li>
                                            <li>Transaction gas</li>
                                            <li>Premium features</li>
                                            <li>Loan interest</li>
                                        </ul>
                                    </div>
                                    <div className="card-bg p-8 rounded-xl card-hover-effect">
                                        <h3 className="font-lufga text-2xl font-bold mb-4 electric-violet-text">Supply Sinks</h3>
                                        <ul className="space-y-2 text-gray-600 list-disc list-inside">
                                            <li>Staking locks</li>
                                            <li>Slashing events</li>
                                            <li>Protocol revenue</li>
                                            <li>Liquidity mining</li>
                                        </ul>
                                    </div>
                                    <div className="card-bg p-8 rounded-xl card-hover-effect">
                                        <h3 className="font-lufga text-2xl font-bold mb-4 electric-violet-text">Reward Mechanisms</h3>
                                        <ul className="space-y-2 text-gray-600 list-disc list-inside">
                                            <li>Verification payouts</li>
                                            <li>Reputation bonuses</li>
                                            <li>Referral rewards</li>
                                            <li>Community governance</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* CTA Section */}
                        <section className="py-20">
                            <div className="container mx-auto px-6">
                                <div className="card-bg rounded-xl p-10 md:p-16 text-center border-2 electric-violet-border glow-effect-soft">
                                    <h2 className="font-lufga text-3xl md:text-4xl font-bold">Join The Mission</h2>
                                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Whether you're a farmer seeking fair credit or a technologist ready to build the future of finance, your journey starts here.</p>
                                    <div className="mt-8">
                                         <Link to="/connect" className="electric-violet-bg text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 glow-effect-soft">
                                            Launch The STELLAR App
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>

                    {/* Footer */}
                    <footer className="border-t border-gray-200 mt-20">
                        <div className="container mx-auto px-6 py-8 text-center text-gray-500">
                            <div className="flex justify-center items-center space-x-3 mb-4">
                                <img src="logo.svg" className="h-5 w-5" alt="Stellar Logo" />
                                <span className="font-lufga font-bold text-lg">STELLAR</span>
                            </div>
                            <p>&copy; 2025 STELLAR Protocol. All Rights Reserved.</p>
                            <p className="text-sm mt-1">Satellite Trusted Evaluation & Lending Ledger Architecture Record</p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

export default Index;
