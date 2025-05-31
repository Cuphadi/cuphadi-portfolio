import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import {
    Github,
    Linkedin,
    Mail,
    User,
    Briefcase,
    LayoutGrid,
    MessageSquare,
    Music,
    Gamepad2,
    BookOpen,
    Youtube,
   // Spotify,
    ChevronDown,
    ChevronUp,
    Code,
    Users,
    Trophy,
    GraduationCap,
    Zap,
    Heart,
    BrainCircuit,
    Terminal,
    Layers3,
    Code2,
    Database,
    BarChart,
    Lightbulb,
    ScrollText,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    Download,
    Twitter,
    Calendar,
    Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { cn } from '@/lib/utils';

// Placeholder image - replace with your actual image
const abdulhadiImage = "/me.png";

// --- Helper Components ---

// Navigation Bar Component
const NavBar = ({ 
  cursorPosition, 
  activeSection, 
  scrollToSection 
}: { 
  cursorPosition: { x: number; y: number };
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}) => {
    const navItems = [
        { id: 'about', icon: <User />, title: 'About' },
        { id: 'career', icon: <Briefcase />, title: 'Career' },
        { id: 'projects', icon: <LayoutGrid />, title: 'Projects' },
        { id: 'skills', icon: <Trophy />, title: 'Skills, Certificates & Awards'
 },
        { id: 'services', icon: <Zap />, title: 'Services' },
        { id: 'contact', icon: <MessageSquare />, title: 'Contact' }
    ];
    const [tooltipContent, setTooltipContent] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const showTooltip = (content: string, element: HTMLElement) => {
        if (tooltipTimeoutRef.current) {
            clearTimeout(tooltipTimeoutRef.current);
        }
        setTooltipContent(content);
        const rect = element.getBoundingClientRect();
        setTooltipPosition({
            x: rect.left + rect.width / 2, // Center horizontally
            y: rect.bottom + 10, // Position below the element
        });
    };

    const hideTooltip = () => {
        tooltipTimeoutRef.current = setTimeout(() => {
            setTooltipContent('');
        }, 100); // Short delay to prevent flickering
    };

    useEffect(() => {
        return () => {
            if (tooltipTimeoutRef.current) {
                clearTimeout(tooltipTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-auto">
            <div
                className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full
                           border border-white/10 shadow-lg"
                style={{
                    borderRadius: '50px',
                    padding: '6px',
                    paddingLeft: '10px',
                    paddingRight: '10px',
                }}
            />
            <nav className="relative flex items-center justify-center gap-6 px-2">
                {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                        <div
                            key={item.id}
                            className="relative flex flex-col items-center"
                            onMouseEnter={(e) => showTooltip(item.title, e.currentTarget)}
                            onMouseLeave={hideTooltip}
                        >
                            <motion.button
                                onClick={() => scrollToSection(item.id)}
                                className={cn(
                                    "relative rounded-full p-2 transition-colors",
                                    "focus:outline-none focus:ring-2 focus:ring-white/50",
                                    isActive
                                        ? "text-white bg-gradient-to-r from-purple-500 to-blue-500"
                                        : "text-gray-400 hover:text-white hover:bg-white/10"
                                )}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {item.icon}
                            </motion.button>
                            {tooltipContent && item.title === tooltipContent && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="absolute top-full mt-2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none z-50 whitespace-nowrap"
                                >
                                    {tooltipContent}
                                    <div 
                                        className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"
                                    />
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </div>
    );
};

// Enhanced Background Component
const EnhancedBackground = ({ cursorPosition }: { cursorPosition: { x: number; y: number } }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>(0);
    const particlesRef = useRef<{
        x: number;
        y: number;
        size: number;
        color: string;
        opacity: number;
        speed: number;
        angle: number;
        spin: number;
        orbitRadius: number;
        orbitAngle: number;
        centerX: number;
        centerY: number;
        type: 'dot' | 'line' | 'circle';
        life: number;
        maxLife: number;
    }[]>([]);

    const gradientRef = useRef<{
        currentColors: { h: number; s: number; l: number }[];
        targetColors: { h: number; s: number; l: number }[];
        nextColors: { h: number; s: number; l: number }[];
        transitionProgress: number;
        isTransitioning: boolean;
        holdCounter: number;
        currentSchemeIndex: number;
    }>({
        currentColors: [
            { h: 220, s: 70, l: 15 },
            { h: 225, s: 70, l: 10 },
            { h: 230, s: 70, l: 5 }
        ],
        targetColors: [
            { h: 220, s: 70, l: 15 },
            { h: 225, s: 70, l: 10 },
            { h: 230, s: 70, l: 5 }
        ],
        nextColors: [
            { h: 220, s: 70, l: 15 },
            { h: 225, s: 70, l: 10 },
            { h: 230, s: 70, l: 5 }
        ],
        transitionProgress: 0,
        isTransitioning: false,
        holdCounter: 0,
        currentSchemeIndex: 0
    });

    const colorSchemes = [
        // AI/Data Science theme (deep blues)
        [
            { h: 220, s: 70, l: 15 },
            { h: 225, s: 70, l: 10 },
            { h: 230, s: 70, l: 5 }
        ],
        // Education theme (emerald)
        [
            { h: 160, s: 70, l: 15 },
            { h: 165, s: 70, l: 10 },
            { h: 170, s: 70, l: 5 }
        ],
        // Voice Acting theme (royal purple)
        [
            { h: 270, s: 70, l: 15 },
            { h: 275, s: 70, l: 10 },
            { h: 280, s: 70, l: 5 }
        ]
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const particleCount = 100;
        const types = ['dot', 'line', 'circle'] as const;

        const resizeCanvas = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize particles with more variety
        if (particlesRef.current.length === 0) {
            for (let i = 0; i < particleCount; i++) {
                const type = types[Math.floor(Math.random() * types.length)];
                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: type === 'dot' ? 2 : type === 'line' ? 1 : 3,
                    color: `hsl(${Math.random() * 60 + 220}, 70%, 50%)`,
                    opacity: 0.4,
                    speed: 0.05 + Math.random() * 0.1,
                    angle: Math.random() * Math.PI * 2,
                    spin: (Math.random() - 0.5) * 0.005,
                    orbitRadius: 5 + Math.random() * 20,
                    orbitAngle: Math.random() * Math.PI * 2,
                    centerX: Math.random() * canvas.width,
                    centerY: Math.random() * canvas.height,
                    type,
                    life: Math.random() * 100,
                    maxLife: 100 + Math.random() * 200
                });
            }
        }

        const updateGradientColors = () => {
            const { 
                currentColors, 
                targetColors, 
                nextColors,
                transitionProgress, 
                isTransitioning,
                holdCounter,
                currentSchemeIndex
            } = gradientRef.current;

            if (!isTransitioning) {
                gradientRef.current.holdCounter++;
                
                if (holdCounter >= 300) {
                    if (!isTransitioning) {
                        const nextIndex = (currentSchemeIndex + 1) % colorSchemes.length;
                        gradientRef.current.nextColors = colorSchemes[nextIndex];
                        gradientRef.current.isTransitioning = true;
                        gradientRef.current.transitionProgress = 0;
                    }
                }
                return currentColors;
            }

            gradientRef.current.transitionProgress += 0.00001; // Much slower transition

            if (transitionProgress >= 1) {
                gradientRef.current.currentColors = [...targetColors];
                gradientRef.current.targetColors = [...nextColors];
                gradientRef.current.isTransitioning = false;
                gradientRef.current.holdCounter = 0;
                gradientRef.current.currentSchemeIndex = (currentSchemeIndex + 1) % colorSchemes.length;
                return currentColors;
            }

            const easedProgress = transitionProgress < 0.5
                ? 4 * transitionProgress * transitionProgress * transitionProgress
                : 1 - Math.pow(-2 * transitionProgress + 2, 3) / 2;

            return currentColors.map((current, i) => {
                const target = targetColors[i];
                let hueDiff = target.h - current.h;
                
                if (Math.abs(hueDiff) > 180) {
                    hueDiff = hueDiff > 0 ? hueDiff - 360 : hueDiff + 360;
                }
                
                const h = (current.h + hueDiff * easedProgress + 360) % 360;
                const s = current.s + (target.s - current.s) * easedProgress;
                const l = current.l + (target.l - current.l) * easedProgress;
                
                return { h, s, l };
            });
        };

        const drawGradientBackground = () => {
            const colors = updateGradientColors();
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            
            colors.forEach((color, i) => {
                gradient.addColorStop(i / (colors.length - 1), 
                    `hsla(${color.h}, ${color.s}%, ${color.l}%, 1)`);
            });

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        const drawWaveEffect = (time: number) => {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 2;

            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 2);

                for (let x = 0; x < canvas.width; x += 10) {
                    const y = Math.sin(x * 0.01 + time * 0.001 + i) * 50 + canvas.height / 2;
                    ctx.lineTo(x, y);
                }

                const colors = updateGradientColors();
                ctx.strokeStyle = `hsla(${colors[i].h}, ${colors[i].s}%, 50%, 0.1)`;
                ctx.stroke();
            }
        };

        const drawParticles = (time: number) => {
            particlesRef.current.forEach(p => {
                p.life += 0.5;
                if (p.life > p.maxLife) {
                    p.life = 0;
                    p.x = Math.random() * canvas.width;
                    p.y = Math.random() * canvas.height;
                }

                const lifeRatio = p.life / p.maxLife;
                const opacity = Math.sin(lifeRatio * Math.PI) * p.opacity;

                // Gentle cursor interaction
                const dx = cursorPosition.x - p.x;
                const dy = cursorPosition.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const force = (150 - distance) / 3000;
                    p.x -= dx * force;
                    p.y -= dy * force;
                }

                // Draw based on particle type
                ctx.beginPath();
                const colors = updateGradientColors();
                const baseColor = colors[Math.floor(Math.random() * colors.length)];
                
                switch (p.type) {
                    case 'dot':
                        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                        ctx.fillStyle = `hsla(${baseColor.h}, ${baseColor.s}%, 50%, ${opacity})`;
                ctx.fill();
                        break;
                    case 'line':
                        const length = p.size * 10;
                        ctx.moveTo(p.x - length/2, p.y);
                        ctx.lineTo(p.x + length/2, p.y);
                        ctx.strokeStyle = `hsla(${baseColor.h}, ${baseColor.s}%, 50%, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        break;
                    case 'circle':
                        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
                        ctx.strokeStyle = `hsla(${baseColor.h}, ${baseColor.s}%, 50%, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        break;
                }

                // Draw connecting lines between nearby particles
                particlesRef.current.forEach(p2 => {
                    if (p !== p2) {
                        const dx = p.x - p2.x;
                        const dy = p.y - p2.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < 100) {
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = `hsla(${baseColor.h}, ${baseColor.s}%, 50%, ${0.1 * (1 - distance / 100)})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                });
            });
        };

        const animate = (time: number) => {
            if (!ctx || !canvas) return;

            drawGradientBackground();
            drawWaveEffect(time);
            drawParticles(time);

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate(0);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [cursorPosition]);

    return (
        <>
            <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black pointer-events-none" />
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-0 pointer-events-none"
                style={{ mixBlendMode: 'screen' }}
            />
        </>
    );
};

// --- Section Components ---

// About Section Component
const AboutSection = () => {
    const [typedText, setTypedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    const roles = [
        "Data Scientist",
        "AI Engineer",
        "Composer",
        "Game Designer",
        "Educator",
        "Content Creator",
        "Storyteller",
        "Computer Scientist"
    ];

    useEffect(() => {
        const currentRole = roles[currentRoleIndex];
        
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (typedText.length < currentRole.length) {
                    setTypedText(currentRole.slice(0, typedText.length + 1));
                    setTypingSpeed(150);
                } else {
                    setTypingSpeed(2000);
                    setIsDeleting(true);
                }
            } else {
                if (typedText.length > 0) {
                    setTypedText(currentRole.slice(0, typedText.length - 1));
                    setTypingSpeed(50);
                } else {
                    setIsDeleting(false);
                    setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
                    setTypingSpeed(200);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [typedText, isDeleting, currentRoleIndex, roles, typingSpeed]);

    return (
        <section id="about" className="flex items-center justify-center min-h-screen py-16">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                {/* Left Side: Name and Title */}
                <div className="text-center md:text-left space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
                    >
                        Abdulhadi Zubailah
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="relative"
                    >
                        <div className="font-mono text-lg sm:text-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-4 rounded-lg shadow-lg backdrop-blur-sm">
                            <span className="text-white font-medium">I am a </span>
                            <span className="text-white font-bold relative">
                                {typedText}
                                <span className="absolute -right-1 top-0 animate-pulse text-white">|</span>
                            </span>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="mt-4"
                    >
                        <a
                            href="/Abdulhadi_Zubailah_CV8.pdf"
                            download
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <Download className="w-5 h-5" />
                            Download CV
                        </a>
                    </motion.div>
                </div>

                {/* Middle: Cartoon Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center"
                >
                    <img
                        src={abdulhadiImage}
                        alt="Abdulhadi Zubailah"
                        className="rounded-full shadow-2xl max-w-[300px] md:max-w-[400px] mix-blend-luminosity hover:mix-blend-normal transition-all duration-300"
                        style={{
                            filter: 'brightness(1.2) contrast(1.1)',
                            backgroundColor: 'transparent',
                            WebkitMaskImage: '-webkit-radial-gradient(white, black)', // This helps with Safari rendering
                        }}
                    />
                </motion.div>

                {/* Right Side: About Me Description */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-gray-400 text-base sm:text-lg leading-relaxed font-sans font-normal tracking-wide"
                >
                    <p>
                    Hey! I'm Abdulhadi Zubailah, a Computer Science graduate (First Honor!) at your service, and I'm excited about the intersection of tech and creativity. By day, I'm all about teaching and mentoring – diving into data science, AI, data analysis, dashboard development, and sharing my love for all things tech. I'm committed to helping others unlock their potential and build awesome things.
                    </p>
                    <p className="mt-4">
                    But that's just half the story! When I'm not working with data, I'm exploring my creative side. I compose music, design games, do voice acting, create content, and write stories. I believe in the power of storytelling and design to captivate and inspire. I'm always eager to learn, collaborate, and push the boundaries of what's possible.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

// Career Section Component
interface TeamMember {
    name: string;
    role: string;
    twitter: string;
    linkedin: string;
}

interface Game {
    name: string;
    link: string;
    image: string;
}

interface TimelineItem {
    title: string;
    subtitle: string;
    date: string;
    description: string;
    icon: React.ReactNode;
    side: string;
    type?: string;
    team?: TeamMember[];
    games?: Game[];
    role?: string;
    videoUrl?: string;
    course?: string;
}

const CareerSection = () => {
    const timelineItems: TimelineItem[] = [
        {
            title: "Teaching & Learning Technology Associate",
            subtitle: "KFUPM",
            date: "May 2025 - Present",
            description: "My role involves integrating technology to foster innovation across various disciplines, designing workshops, mentoring students, and supporting the Deanship's academic development initiatives.",
            icon: <Users className="w-5 h-5 text-blue-400" />,
            side: "left",
            type: "Full-time"
        },
        {
            title: "Associate IT System Analyst",
            subtitle: "Aramco UD&CSD",
            date: "January 2025 - April 2025",
            description: "Developed AI solutions using Python, including LLM function calling and agentic AI architectures, chatbots (FastAPI, OpenShift deployment), and camera-based applications with face-tracking (MediaPipe or similar), within an Agile/Scrum framework using Azure DevOps.",
            icon: <BrainCircuit className="w-5 h-5 text-green-400" />,
            side: "left",
            type: "Full-time"
        },
        {
            title: "Teaching Assistant",
            subtitle: "KAUST Academy",
            date: "November 2024 - Present",
            description: "Led AI labs for 100+ students, providing hands-on instruction and comprehensive support, including grading and mentorship, with excellent student feedback (9+/10).",
            icon: <Users className="w-5 h-5 text-purple-400" />,
            side: "left",
            type: "Seasonal"
        },
        {
            title: "Data Scientist",
            subtitle: "Mozn",
            date: "December 2024 - January 2025",
            description: "Engineered a knowledge graph-based recommendation engine, utilizing Neo4j, Hugging Face embeddings, and ETL pipelines for PDF data extraction."
,
            icon: <BrainCircuit className="w-5 h-5 text-yellow-400" />,
            side: "left",
            type: "Full-time"
        },
        {
            title: "Instructor",
            subtitle: "Shaguf",
            date: "August 2022 - September 2024",
            description: "Created and taught Python & C programming course and a math course, achieving high student satisfaction ratings.",
            icon: <Users className="w-5 h-5 text-orange-400" />,
            side: "left",
            type: "Seasonal"
        },
        {
            title: "Teaching Assistant",
            subtitle: "KFUPM",
            date: "February 2022 - May 2024",
            description: "Worked as Lab Instructor, graded assignments, and provided academic support in Digital Logic Design & Python subjects.",
            icon: <Users className="w-5 h-5 text-red-400" />,
            side: "left",
            type: "Part-time"
        },
        {
            title: "Engineering Intern",
            subtitle: "Baker Hughes DTC",
            date: "June 2023 - August 2023",
            description: "Developed NLP and Data Science solutions, including interactive Streamlit dashboards for AI model showcasing & data visualization, and the creation of a management system.",
            icon: <BrainCircuit className="w-5 h-5 text-indigo-400" />,
            side: "left",
            type: "Full-time"
        },
        {
            title: "AI Summer Program",
            subtitle: "KAUST Academy",
            date: "June 2024 - August 2024",
            description: "As one of 200 participants selected for the KAUST AI Summer Program from 10,000+ applicants, I studied and applied advanced AI topics, including Reinforcement Learning, Generative AI, and NLP, and contributed to a project that developed autonomous UAV swarms using Reinforcement Learning to combat wildfires.",
            icon: <GraduationCap className="w-5 h-5 text-blue-400" />,
            side: "right"
        },
        {
            title: "Bachelor of Science in Computer Science",
            subtitle: "King Fahd University of Petroleum and Minerals (KFUPM)",
            date: "2019 - 2024",
            description: "Obtained a Bachelor of Science in Computer Science from KFUPM, graduating with a GPA of 3.944/4.000 and awarded First Honor Distinction 5 times. Key coursework included Mathematics (Calculus, Linear Algebra, Statistics, Discrete Math) and major Computer Science subjects such as Object-Oriented Programming, Data Structures, Algorithms, AI, Computer Graphics, and Game Programming.",
            icon: <GraduationCap className="w-5 h-5 text-green-400" />,
            side: "right"
        },
        {
            title: "The Global Researcher Program",
            subtitle: "Duke Summer Academy",
            date: "2018",
            description: "Participated in Duke University's three-week Summer Academy (Global Researcher program), an elite program focused on providing academically motivated students from around the world with an international academic and residential experience to foster a global perspective.",
            icon: <GraduationCap className="w-5 h-5 text-purple-400" />,
            side: "right"
        }
    ];

    const careerItems = timelineItems.filter(item => item.side === "left");
    const educationItems = timelineItems.filter(item => item.side === "right");
    const volunteeringItems = [
        {
            title: "KFUPM Google Club",
            subtitle: "Technical Member",
            date: "September 2023 - May 2024",
            description: "As a Technical Member, I developed and delivered workshops on modern Data Science, AI, and Game Design tools (e.g., Streamlit) and served as a mentor and organizer for related Data Science and AI bootcamps, providing guidance and support to participants.",
            icon: <Code className="w-5 h-5 text-blue-400" />
        },
        {
            title: "KFUPM IE Club",
            subtitle: "Head of Modern Games & Various Roles",
            date: "September 2019 - May 2024",
            description: "During my 5-year involvement with the KFUPM IE Club, I served in leadership roles including Head of Modern Games and Event Supervisor, where I led teams to organize 50+ large-scale gaming events (tournaments, workshops, game development sessions, board game design workshops), directed financial decisions, revitalized club engagement through innovative formats, and received a 'Years of Service Honor.'",
            icon: <Gamepad2 className="w-5 h-5 text-purple-400" />
        },
        {
            title: "KFUPM Computer Club",
            subtitle: "Academic Division Member",
            date: "October 2022 - July 2023",
            description: "Contributed to the KFUPM Computer Club Academic Division by conducting 5+ help sessions on computer science subjects to aid in exam preparation and developing a Course Evaluation page using Notion to gather insights for optimal course preparation strategies.",
            icon: <Terminal className="w-5 h-5 text-green-400" />
        }
    ];

    return (
        <section id="career" className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-12">Career Journey</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Career Column */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white text-center mb-6">Professional Experience</h3>
                        {careerItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="rounded-full p-3 shadow-lg bg-white/10 border border-white/10 flex-shrink-0">
                                        {item.icon}
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md rounded-lg p-4 shadow-md flex-grow">
                                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                                        <p className="text-sm text-gray-400">{item.subtitle}</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs text-gray-500">{item.date}</p>
                                            <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white">
                                                {item.type}
                                            </span>
                                        </div>
                                        <p className="text-gray-300 mt-2">{item.description}</p>
                                        
                                        {/* Team Section */}
                                        {item.team && (
                                            <div className="mt-4">
                                                <h4 className="text-sm font-semibold text-white mb-2">Team Members:</h4>
                                                <div className="space-y-2">
                                                    {item.team.map((member, idx) => (
                                                        <div key={idx} className="flex items-center justify-between text-sm">
                                                            <span className="text-gray-300">{member.name} - {member.role}</span>
                                                            <div className="flex gap-2">
                                                                <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                                                    <Twitter className="w-4 h-4" />
                                                                </a>
                                                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                                                    <Linkedin className="w-4 h-4" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Games Section */}
                                        {item.games && (
                                            <div className="mt-4">
                                                <h4 className="text-sm font-semibold text-white mb-2">Games Developed:</h4>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {item.games.map((game, idx) => (
                                                        <a
                                                            key={idx}
                                                            href={game.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group relative overflow-hidden rounded-lg"
                                                        >
                                                            <img
                                                                src={game.image}
                                                                alt={game.name}
                                                                className="w-full h-32 object-cover transition-transform group-hover:scale-105"
                                                            />
                                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <span className="text-white font-medium">{game.name}</span>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Education Column */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white text-center mb-6">Education</h3>
                        {educationItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="rounded-full p-3 shadow-lg bg-white/10 border border-white/10 flex-shrink-0">
                                        {item.icon}
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md rounded-lg p-4 shadow-md flex-grow">
                                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                                        <p className="text-sm text-gray-400">{item.subtitle}</p>
                                        <p className="text-xs text-gray-500 mb-2">{item.date}</p>
                                        <p className="text-gray-300">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Volunteering Column */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white text-center mb-6">Leadership & Volunteering</h3>
                        {volunteeringItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="rounded-full p-3 shadow-lg bg-white/10 border border-white/10 flex-shrink-0">
                                        {item.icon}
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-md rounded-lg p-4 shadow-md flex-grow">
                                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                                        <p className="text-sm text-gray-400">{item.subtitle}</p>
                                        <p className="text-xs text-gray-500 mb-2">{item.date}</p>
                                        <p className="text-gray-300">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Projects Section Component
const ProjectsSection = () => {

    const musicProjects = [
        {
            title: "University Gamedev League 2022",
            description: "Original soundtracks and sound effects created for the competition games. Each game had its unique theme and required different musical approaches to enhance the gameplay experience.",
            note: "Note: Cyber Diaper's soundtrack is an interactive experience. To fully experience it, please play the game.",
            soundcloudEmbed: `<iframe width="100%" height="450" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1656267031&color=%23a1a69e&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/hadizubailah" title="hadizubailah" target="_blank" style="color: #cccccc; text-decoration: none;">hadizubailah</a> · <a href="https://soundcloud.com/hadizubailah/sets/university-gamedev-league-2022" title="University Gamedev League 2022 - Slaughtered" target="_blank" style="color: #cccccc; text-decoration: none;">University Gamedev League 2022 - Slaughtered</a></div>`
        },
        {
            title: "Album 1",
            spotifyUrl: "https://open.spotify.com/embed/album/1gWQTJgc4fXEyc7i5zsewI?utm_source=generator",
            youtubeUrl: "https://www.youtube.com/embed/VIDEO_ID_1?si=YOUR_PLAYLIST_ID", // Replace VIDEO_ID_1
        },
        {
            title: "Album 2",
            spotifyUrl: "https://open.spotify.com/embed/album/2TQvBzcMvLhG9j55vXQYjE?utm_source=generator",
            youtubeUrl: "https://www.youtube.com/embed/VIDEO_ID_2?si=YOUR_PLAYLIST_ID", // Replace VIDEO_ID_2
        },
        // Add more albums as needed
    ];

    const gameProjects = [
        {
            title: "University Gamedev League 2022 Competition",
            description: `As part of the "Slaughtered" team representing our university, we participated in an international game development competition hosted by Nine66. This intense competition challenged us to create a new video game every month for 4 months, each following specific themes and rules.

My role as the Sound Engineer & Music Producer was crucial in creating immersive audio experiences for each game. I composed original soundtracks, designed sound effects, and implemented audio systems that enhanced the gameplay experience. Beyond my primary role, I actively contributed to the creative process, participating in brainstorming sessions and helping shape the core concepts of our games.

Our team's dedication and collaborative spirit led us to achieve 3rd place in the competition, a testament to our hard work and innovative approach to game development.`,
            role: "Sound Engineer, Music Composer & Game Designer",
            technologies: ["Unity", "Ableton Live", "Audacity"],
            team: [
                { name: "Hebah Alshawarib", role: "Artist/UI", twitter: "https://twitter.com/iMono3_", linkedin: "https://www.linkedin.com/in/hebahalshawarib/" },
                { name: "Mahdi Al-Malallah", role: "Game Designer", twitter: "https://twitter.com/Mahdi_AMA", linkedin: "https://www.linkedin.com/in/mahdiama/" },
                { name: "Mohammed Asiri", role: "Programmer", twitter: "https://twitter.com/MoAsiri_1", linkedin: "https://www.linkedin.com/in/mohammed-y-asiri/" },
                { name: "Rayan Al-Buraiki", role: "Programmer/Technical Artist", twitter: "https://twitter.com/RayanAlburaiki", linkedin: "https://www.linkedin.com/in/rayan-al-buraiki-a65696b3/" },
                { name: "Abbad Al-Abbad", role: "Project Manager/Programmer", twitter: "https://twitter.com/Visual_sanity", linkedin: "https://www.linkedin.com/in/abbad-alabbad/" }
            ],
            games: [
                { name: "Flux", link: "https://slaughtered.itch.io/flux", image: "https://img.itch.zone/aW1nLzEyMzY5Mjc4LnBuZw==/315x250%23c/wJdKDv.png" },
                { name: "Space Ballerina", link: "https://slaughtered.itch.io/spaceballerina", image: "https://cross-community.org/wp-content/themes/jbc/img/holder.png" },
                { name: "Cyber Diaper", link: "https://slaughtered.itch.io/cyberdiaper", image: "https://img.itch.zone/aW1nLzEyMzY4OTcwLnBuZw==/315x250%23c/PrVuWh.png" },
                { name: "The Finger Business", link: "https://slaughtered.itch.io/thefingerbusiness", image: "https://img.itch.zone/aW1nLzEyNjY3ODcyLnBuZw==/315x250%23c/BNBnJ9.png" }
            ],
            date: "Feb 2023 - Jul 2023"
        },
        {
            title: "Death Well Told",
            description: `"Death Well Told" was an educational project developed as part of the SWE 302 Game Programming course, where our primary goal was to learn and apply game development principles in a practical setting.

The game is a turn-based experience set in purgatory, where souls face each other in a deadly game of Russian roulette devised by Death. Players must strategically use a revolver with mixed blank and real bullets, along with various items that can help or hinder them, creating an atmosphere of tension and psychological warfare.

As a learning project, it allowed me to explore multiple aspects of game development. In my roles as Game Designer, Voice Actor, Music Composer, and Narrative Director, I learned how to craft compelling game mechanics, create immersive audio experiences, and develop engaging narratives. The project was particularly valuable in understanding how different elements of game design work together to create a cohesive player experience.

While we may consider expanding it into a full commercial game in the future, its primary value was as a hands-on learning experience in game development, storytelling, and team collaboration.`,
            role: "Game Designer, Voice Actor, Music Composer & Narrative Director",
            technologies: ["Unity", "Ableton Live", "Audacity"],
            team: [
                { name: "Hadi Alsinan", role: "Game Tester", twitter: "https://twitter.com/placeholder", linkedin: "https://www.linkedin.com/in/hadi-alsinan/" },
                { name: "Ali Alabdulaal", role: "3D Artist", twitter: "https://twitter.com/placeholder", linkedin: "https://www.linkedin.com/in/ali-alabdulaal-a1b256240/" },
                { name: "Abdullah Alshomali", role: "Programmer", twitter: "https://twitter.com/placeholder", linkedin: "https://www.linkedin.com/in/abdullah-alshomli/" }
            ],
            videoUrl: "https://www.youtube.com/watch?v=yGP1yzB-cvI",
            date: "Feb 2024 - Apr 2024",
            course: "SWE 302 - Game Programming"
        }
    ];

    const educatorProjects = [
        {
            title: "YouTube Channel: Algorithmatics",
            description: "A channel that explains Computer Science & Math concepts with animation and in Arabic! (Coming soon...)",
            youtubeChannelUrl: "https://www.youtube.com/embed/UCoK23FYfa5r-3j8dJMZj9iQ?si=YOUR_PLAYLIST_ID", // Replace CHANNEL_ID
        },
        {
            title: "Shaguf Courses",
            description: "University-level instructor for programming and mathematics courses",
            courses: [
                {
                    name: "ICS 104 | Introduction to Programming in Python and C",
                    description: "A foundational programming course at KFUPM covering Python and C programming languages. Topics range from basic data types to object-oriented programming with classes.",
                    institution: "King Fahd University of Petroleum & Minerals",
                    enrolledStudents: "120+",
                    url: "https://shaguf.com/subject/401"
                },
                {
                    name: "MATH 101 | Finite Mathematics",
                    description: "A specialized mathematics course at PSU designed for finance students, focusing on practical mathematical concepts and applications in business.",
                    institution: "Prince Sultan University",
                    enrolledStudents: "60+",
                    url: "https://shaguf.com/subject/980"
                }
            ],
            shagufProfileUrl: "https://shaguf.com/instructor/info/439",
        }
    ];

    interface TechProject {
        title: string;
        description: string;
        technologies: string[];
        imageUrl?: string;
        videoUrl?: string;
        team?: TeamMember[];
        date?: string;
        place?: string;
    }

    const techProjects: TechProject[] = [
        {
            title: "Traffic Flow Optimization Using Deep Reinforcement Learning Enabled Traffic Lights Network",
            description: `As a multidisciplinary team of Computer Science, Electrical Engineering, and Industrial Engineering students at KFUPM, our senior project tackled real-world traffic congestion. This capstone initiative integrated our diverse expertise to develop an intelligent traffic light network powered by Deep Reinforcement Learning (DRL). Leveraging Python for core development, we utilized YOLO for real-time object detection from camera feeds and Streamlit to create an intuitive interface for visualizing our system's performance. Our DRL model learned to dynamically adapt to real-time traffic conditions simulated using SUMO (Simulation of Urban MObility), optimizing flow by significantly reducing wait times and maximizing throughput. Arduino played a role in physically implementing or simulating the traffic light control aspect.\n\nOur comprehensive solution encompassed the entire pipeline: processing camera feeds using Computer Vision with YOLO, extracting crucial traffic data, feeding this information to our sophisticated DRL model (developed in Python and trained within the SUMO environment), and subsequently updating intersection traffic light states (potentially controlled or simulated via Arduino). The Streamlit application provided a user-friendly way to monitor the system's effectiveness. This approach improves vehicular movement and promises to lower emissions and enhance overall urban mobility.\n\nThis project underscores our ability to collaborate effectively across disciplines and apply cutting-edge technologies to solve tangible problems. Demonstrating proficiency in Computer Vision (YOLO), Deep Reinforcement Learning (in Python, simulated with SUMO), and rapid application development (Streamlit), with potential hardware interfacing (Arduino), our system lays a robust foundation for future advancements in smart city technologies.`,
            technologies: ["Python", "YOLO", "Streamlit", "SUMO", "Arduino", "Deep Reinforcement Learning", "Computer Vision"],
            imageUrl: "/capstone.png",
            videoUrl: "https://www.youtube.com/watch?v=eSZWBXlDl3c&ab_channel=AbdulhadiZubailah",
            team: [
                { name: "Tariq Madkhali", role: "Computer Scientist", twitter: "", linkedin: "https://www.linkedin.com/in/tariq-madkhali-a69815198/" },
                { name: "Mohammed Almutlaq", role: "Electrical Engineer", twitter: "", linkedin: "https://www.linkedin.com/in/mohammed-almutlaq-38a2b221b/" },
                { name: "Abdulrahman Hajjar", role: "Electrical Engineer", twitter: "", linkedin: "https://www.linkedin.com/in/hajjarabdulrahman/" },
                { name: "Abdulrahman Alajlan", role: "Industrial Engineer", twitter: "", linkedin: "https://www.linkedin.com/in/abdulrahman-alajlan-capm%C2%AE%EF%B8%8F-b0a383275/" },
                { name: "Abdulmohsen Al-Eisa", role: "Industrial Engineer", twitter: "", linkedin: "https://www.linkedin.com/in/abdulmohsen-al-eisa-022434257/" }
            ]
        },
        {
            title: "Firefly: Autonomous UAV Swarms for Wildfire Combat Utilizing Swarm Intelligence",
            description: `This project is an autonomous UAV swarm system designed for wildfire combat using swarm intelligence and multi-agent deep reinforcement learning. The project addresses the significant financial and logistical challenges associated with traditional firefighting methods, which incur substantial damage costs (estimated between $394 billion and $893 billion) and high indirect aerial costs (ranging from $9,000 to $63,000 per hour). The core idea is to leverage a team of unmanned aerial vehicles (UAVs) that can autonomously coordinate their actions to extinguish wildfires more efficiently and effectively. The current work focuses on demonstrating the feasibility of this approach in a simplified, discrete environment, with the ultimate goal of scaling it up to realistic 3D physics-based simulations.\n\nThe methodology employed in FireFly utilizes a reinforcement learning (RL)-based system with two key elements: a simulation environment that accurately models fire spread dynamics and agent movement, and a neural network designed to learn optimal firefighting strategies for the agents within this environment. The observation space for each agent in the multi-agent system includes a layered volume representing crucial environmental information, such as the state of the fire cells, other agent positions, static barriers, vegetation density, and wind velocity. The agents' action space consists of six directional movements and the ability to perform a fire-retardant splash. The underlying architecture incorporates a 3-layered convolutional neural network (CNN) that processes the features of the observation volume to produce action-log probabilities and a value function. The training process involves parallelizing the RLlib training of the agents on a cluster of CPUs and GPUs to efficiently determine the best combination of high-reward definitions that minimize the number of burnt trees.\n\nThe initial results from the discrete environment are promising, indicating that the multi-agent system is capable of achieving a decent reward, with the crucial value function able to capture variance in the observations, leading to highly explained variance and superior agent performance compared to a random agent. Future work will focus on extending this research to partial observability scenarios and more complex, realistic 3D physics-based simulations, potentially using the KAUST Aerial Robotics and Drone Academy (KARDC) infrastructure. The long-term vision is to develop a robust multi-agent system that can significantly improve wildfire suppression efforts by enabling faster, more coordinated, and ultimately more effective interventions.\n\nNote: We developed both the environment and the agent training system for this project as part of the KAUST Academy capstone program.`,
            technologies: [
                "Python", "Reinforcement Learning", "AgileRL", "PettingZoo", "SuperSuit", "Torch", "NumPy", "tqdm", "fastrand", "Gymnasium", "imageio", "Pillow", "PyYAML", "wandb"
            ],
            imageUrl: "/firefly.png",
            videoUrl: "/swarm.mp4",
            team: [
                { name: "Abderrahmane Balah", role: "Computer Scientist", twitter: "", linkedin: "https://www.linkedin.com/in/abderrahmane-balah/" },
                { name: "Mohammed Abushwarib", role: "Computer Scientist", twitter: "", linkedin: "https://www.linkedin.com/in/m-abushawarib/" },
                { name: "Ahmad Alkhabbaz", role: "Software Engineer", twitter: "", linkedin: "https://www.linkedin.com/in/ahmad-alkhabbaz/" },
                { name: "Muhab Abubaker", role: "Software Engineer", twitter: "", linkedin: "https://www.linkedin.com/in/muhab-abubaker2001/" }
            ],
            date: "June 2024 - August 2024",
            place: "KAUST Academy"
        }
    ];

    const skillCategories = [
        {
            title: "Programming Languages",
            icon: <Code2 className="w-6 h-6" />,
            skills: ["Python", "Java", "JavaScript", "C", "C#", "MATLAB", "R", "SQL"]
        },
        {
            title: "Tools & Platforms",
            icon: <Layers3 className="w-6 h-6" />,
            skills: ["Docker", "Tableau", "MySQL", "Neo4j", "Power BI"]
        },
        {
            title: "Python Frameworks",
            icon: <Code className="w-6 h-6" />,
            skills: ["TensorFlow", "PyTorch", "Transformers", "SciKit-Learn", "SpaCy", "OpenCV", "FastAPI", "Streamlit"]
        },
        {
            title: "AI & ML Techniques",
            icon: <BrainCircuit className="w-6 h-6" />,
            skills: ["Reinforcement Learning", "Generative AI", "NLP", "Computer Vision", "Unsupervised Learning"]
        },
        {
            title: "Data Science & Visualization",
            icon: <BarChart className="w-6 h-6" />,
            skills: ["NumPy", "Pandas", "Seaborn", "Plotly", "ETL Pipelines", "Knowledge Graphs", "Data Visualization"]
        },
        {
            title: "Soft Skills",
            icon: <Users className="w-6 h-6" />,
            skills: ["Agile/Scrum", "Leadership", "Mentorship", "Critical Thinking", "Creativity", "Communication"]
        }
    ];

    const certificates = [
        {
            title: "Natural Language Processing Specialization",
            issuer: "DeepLearning.AI",
            icon: <ScrollText className="w-5 h-5 text-blue-400" />,
            url: "https://www.coursera.org/account/accomplishments/specialization/V3VLNSYBYXAE",
            date: "2022"
        },
        {
            title: "Business Analytics",
            issuer: "Udacity & Misk Academy",
            icon: <ScrollText className="w-5 h-5 text-green-400" />,
            url: "https://www.udacity.com/certificate/WMXRFVMX",
            date: "2021"
        },
        {
            title: "Game Design Specialization",
            issuer: "California Institute of the Arts",
            icon: <ScrollText className="w-5 h-5 text-purple-400" />,
            url: "https://www.coursera.org/account/accomplishments/specialization/MQFELMP8PPZ5",
            date: "2024"
        },
        {
            title: "Google Advanced Data Analytics",
            issuer: "Google",
            icon: <ScrollText className="w-5 h-5 text-yellow-400" />,
            url: "https://www.coursera.org/account/accomplishments/professional-cert/BD2WNGPECSDE",
            date: "2024"
        },
        {
            title: "INE Certified Junior Data Science",
            issuer: "INE",
            icon: <ScrollText className="w-5 h-5 text-red-400" />,
            url: "https://certs.ine.com/b018af16-98df-4f6e-bbea-f2eedf9a7654#acc.P2fsrky7",
            date: "2024"
        }
    ];

    const renderMusicProjects = () => {
        return (
            <div className="space-y-8">
                {musicProjects.map((project, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* First Column: University Gamedev League Project */}
                        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                                    {project.title}
                                </h3>
                                {project.description && (
                                    <p className="text-gray-300 leading-relaxed">
                                        {project.description}
                                    </p>
                                )}
                                {project.note && (
                                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                                        <p className="text-yellow-400 text-sm flex items-center gap-2">
                                            <Info className="w-4 h-4" />
                                            {project.note}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* SoundCloud Embed */}
                            {project.soundcloudEmbed && (
                                <div>
                                    <div dangerouslySetInnerHTML={{ __html: project.soundcloudEmbed }} />
                                </div>
                            )}
                        </div>

                        {/* Second Column: Other Music Projects */}
                        {project.spotifyUrl && project.youtubeUrl && (
                            <div className="space-y-6">
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe
                                    src={project.spotifyUrl}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                    className="rounded-lg shadow-lg"
                                ></iframe>
                            </div>
                            <div className="aspect-w-16 aspect-h-9">
                                <iframe
                                    src={project.youtubeUrl}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    loading="lazy"
                                    className="rounded-lg shadow-lg"
                                ></iframe>
                            </div>
                        </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const renderGameProjects = () => {
        return (
            <div className="space-y-8">
                {gameProjects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                                    {project.title}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {project.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        Team Project
                                    </span>
                                    {project.course && (
                                        <span className="flex items-center gap-1">
                                            <BookOpen className="w-4 h-4" />
                                            {project.course}
                                        </span>
                                    )}
                                    {project.title === "University Gamedev League 2022 Competition" && (
                                        <span className="flex items-center gap-1">
                                            <Trophy className="w-4 h-4" />
                                            3rd Place Winner
                                        </span>
                                    )}
                                </div>
                            </div>

                            {project.title === "Death Well Told" ? (
                                // Special layout for Death Well Told
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Left side: Description */}
                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-gray-300 leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>
                                    {/* Right side: Video */}
                                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-black/20">
                                        <iframe
                                            src={project.videoUrl ? `${project.videoUrl.replace('watch?v=', 'embed/')}?autoplay=0` : ''}
                                            title={`${project.title} Gameplay`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        ></iframe>
                                    </div>
                                </div>
                            ) : (
                                // Default layout for other projects
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-gray-300 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                            )}

                            {/* Team Section */}
                            {project.team && project.team.length > 0 && (
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Users className="w-5 h-5 text-purple-400" />
                                        Team Members
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {project.team.map((member, idx) => (
                                            <div 
                                                key={idx} 
                                                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                                            >
                                                <div className="space-y-1">
                                                    <span className="text-white font-medium">{member.name}</span>
                                                    <span className="text-sm text-gray-400 block">{member.role}</span>
                                                </div>
                                                <div className="flex gap-3">
                                                    {member.linkedin && (
                                                        <a 
                                                            href={member.linkedin} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer" 
                                                            className="text-blue-400 hover:text-blue-300 transition-colors"
                                                            aria-label={`${member.name}'s LinkedIn`}
                                                        >
                                                            <Linkedin className="w-5 h-5" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Games Grid for University Gamedev League project */}
                            {project.games && project.games.length > 0 && (
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Gamepad2 className="w-5 h-5 text-purple-400" />
                                        Games Developed
                                    </h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {project.games.map((game, idx) => (
                                            <a
                                                key={idx}
                                                href={game.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-white/5 border border-white/10 hover:border-purple-400/50 transition-all duration-300"
                                            >
                                                <img
                                                    src={game.image}
                                                    alt={game.name}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                    <span className="text-white font-medium">{game.name}</span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Technologies and Role */}
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 rounded-full text-sm bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium">
                                    {project.role}
                                </span>
                                {project.technologies.map((tech, idx) => (
                                    <span 
                                        key={idx} 
                                        className="px-4 py-2 rounded-full text-sm bg-white/10 text-gray-300 hover:bg-white/20 transition-colors"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    };

    const renderEducatorProjects = () => {
        return (
            <div className="space-y-8">
                {/* YouTube Channel */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">{educatorProjects[0].title}</h3>
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe
                            src={educatorProjects[0].youtubeChannelUrl}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                            className="rounded-lg shadow-lg"
                        ></iframe>
                    </div>
                    <p className="text-gray-400 mt-2">{educatorProjects[0].description}</p>
                </div>

                {/* Shaguf Courses */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">{educatorProjects[1].title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {educatorProjects[1]?.courses?.map((course, index) => (
                            <motion.a
                                key={index}
                                href={course.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                            {course.name}
                                        </h4>
                                        <p className="text-sm text-gray-400">{course.institution}</p>
                                        <p className="text-sm text-gray-300">{course.description}</p>
                                        <p className="text-sm text-blue-400">
                                            <Users className="w-4 h-4 inline-block mr-1" />
                                            {course.enrolledStudents} Students Enrolled
                                        </p>
                                    </div>
                                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                    <a
                        href={educatorProjects[1].shagufProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-4 text-blue-400 hover:text-blue-300 hover:underline"
                    >
                        View my Shaguf Profile
                        <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                </div>
            </div>
        );
    };

    const renderTechProjects = () => {
        return (
            <div className="space-y-8">
                {techProjects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                                    {project.title}
                                </h3>
                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                    {project.date && (
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {project.date}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        Capstone Project
                                    </span>
                                    {project.place && (
                                        <span className="flex items-center gap-1">
                                            <BookOpen className="w-4 h-4" />
                                            {project.place}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left: Description */}
                                <div className="prose prose-invert max-w-none flex-1 w-full">
                                    <p className="text-gray-300 leading-relaxed text-base whitespace-pre-line">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {project.technologies.map((tech, idx) => (
                                            <span 
                                                key={idx} 
                                                className="px-4 py-2 rounded-full text-sm bg-white/10 text-gray-300 hover:bg-white/20 transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                {/* Right: YouTube Button above Poster */}
                                <div className="flex flex-col items-center justify-center w-full min-w-[500px] md:min-w-[600px] gap-6">
                                    {project.videoUrl && (
                                        project.videoUrl.endsWith('.mp4') ? (
                                            <video controls autoPlay loop muted className="rounded-lg w-full max-w-xl shadow-2xl border-2 border-white/20 mb-2">
                                                <source src={project.videoUrl} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : (
                                            <a
                                                href={project.videoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 text-white font-bold text-lg shadow-lg hover:from-red-700 hover:to-purple-700 transition-all duration-300 focus:outline-none"
                                            >
                                                <Youtube className="w-7 h-7 text-white" />
                                                Watch Project Demo on YouTube
                                            </a>
                                        )
                                    )}
                                    {project.imageUrl && (
                                        <a href={project.imageUrl} target="_blank" rel="noopener noreferrer" className="focus:outline-none">
                                            <img src={project.imageUrl} alt={project.title} className="rounded-lg w-full max-w-xl shadow-2xl border-2 border-white/20 cursor-zoom-in transition-transform hover:scale-105" />
                                        </a>
                                    )}
                                </div>
                            </div>
                            {/* Team Section for Tech Projects - now below the grid, full width */}
                            {project.team && project.team.length > 0 && (
                                <div className="mt-8 space-y-4 w-full">
                                    <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Users className="w-5 h-5 text-purple-400" />
                                        Team Members
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {project.team.map((member, idx) => (
                                            <div 
                                                key={idx} 
                                                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                                            >
                                                <div className="space-y-1">
                                                    <span className="text-white font-medium">{member.name}</span>
                                                    <span className="text-sm text-gray-400 block">{member.role}</span>
                                                </div>
                                                <div className="flex gap-3">
                                                    {member.linkedin && (
                                                        <a 
                                                            href={member.linkedin} 
                                                            target="_blank" 
                                                            rel="noopener noreferrer" 
                                                            className="text-blue-400 hover:text-blue-300 transition-colors"
                                                            aria-label={`${member.name}'s LinkedIn`}
                                                        >
                                                            <Linkedin className="w-5 h-5" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    };

    const renderSkillsAndCertificates = () => {
        return (
            <div className="space-y-12">
                {/* Skills Grid */}
                <div>
                    <h3 className="text-2xl font-semibold text-white mb-8 flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 mr-2" />
                        Skills 
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skillCategories.map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="p-2 rounded-lg bg-white/10 mr-3">
                                        {category.icon}
                                    </div>
                                    <h4 className="text-lg font-semibold text-white">{category.title}</h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="px-3 py-1 rounded-full text-sm bg-white/10 text-gray-300 hover:bg-white/20 transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Certificates */}
                <div>
                    <h3 className="text-2xl font-semibold text-white mb-8 flex items-center justify-center">
                        <Trophy className="w-6 h-6 mr-2" />
                        Certifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificates.map((cert, index) => (
                            <motion.a
                                key={index}
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                            >
                                <div className="flex items-start">
                                    <div className="p-2 rounded-lg bg-white/10 mr-4">
                                        {cert.icon}
                                    </div>
                                    <div className="flex-grow">
                                        <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                            {cert.title}
                                        </h4>
                                        <p className="text-sm text-gray-400">{cert.issuer}</p>
                                        <p className="text-xs text-gray-500 mt-1">{cert.date}</p>
                                    </div>
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
                                        <ExternalLink className="w-5 h-5 text-blue-400" />
                                    </div>
                                </div>
                                <div className="mt-3 text-xs text-blue-400/80 opacity-0 group-hover:opacity-100 transition-all">
                                    Click to verify certificate →
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section id="projects" className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-12">Project Portfolio</h2>
                <Tabs defaultValue="games" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full p-1">
                        <TabsTrigger 
                            value="games" 
                            className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-full flex items-center justify-center"
                        >
                            <Gamepad2 className="w-4 h-4 mr-2" /> Games
                        </TabsTrigger>
                        <TabsTrigger 
                            value="educator" 
                            className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-full flex items-center justify-center"
                        >
                            <BookOpen className="w-4 h-4 mr-2" /> Educator
                        </TabsTrigger>
                        <TabsTrigger 
                            value="tech" 
                            className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white rounded-full flex items-center justify-center"
                        >
                            <BrainCircuit className="w-4 h-4 mr-2" /> Tech
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="games" className="mt-6">{renderGameProjects()}</TabsContent>
                    <TabsContent value="educator" className="mt-6">{renderEducatorProjects()}</TabsContent>
                    <TabsContent value="tech" className="mt-6">{renderTechProjects()}</TabsContent>
                </Tabs>
            </div>
        </section>
    );
};

// Contact Section Component
const ContactSection = () => {
    return (
        <section id="contact" className="py-16">
            <div className="container mx-auto px-4">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
                >
                    Let's Connect
                </motion.h2>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white/5 backdrop-blur-md rounded-2xl p-12 shadow-lg w-full mx-auto border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Left Side: Description */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-col justify-center"
                        >
                            <motion.p 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="text-gray-300 text-3xl mb-8 font-light leading-relaxed tracking-wide"
                            >
                                Want to know more about me, collaborate on a project, utilize one of my services, or simply to say hello?
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-4xl font-medium leading-tight tracking-tight"
                            >
                                Drop me a line and I'll get back as soon as possible.
                            </motion.p>
                        </motion.div>

                        {/* Right Side: Contact Links */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="space-y-6"
                        >
                            <a
                                href="mailto:hadi2009z@gmail.com"
                                className="group flex items-center gap-6 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all">
                                    <Mail className="w-8 h-8 text-purple-400" />
                            </div>
                            <div>
                                    <p className="text-sm text-gray-400">Email</p>
                                    <p className="text-white group-hover:text-blue-400 transition-colors text-xl">hadi2009z@gmail.com</p>
                            </div>
                            </a>
                            <a
                                href="https://linkedin.com/in/abdulhadi-zubailah"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                className="group flex items-center gap-6 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition-all">
                                    <Linkedin className="w-8 h-8 text-blue-400" />
                    </div>
                                <div>
                                    <p className="text-sm text-gray-400">LinkedIn</p>
                                    <p className="text-white group-hover:text-blue-400 transition-colors text-xl">Abdulhadi Zubailah</p>
                                </div>
                            </a>
                            <a
                                href="https://github.com/Cuphadi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                className="group flex items-center gap-6 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="p-4 rounded-lg bg-gradient-to-br from-gray-500/20 to-gray-600/20 group-hover:from-gray-500/30 group-hover:to-gray-600/30 transition-all">
                                    <Github className="w-8 h-8 text-gray-400" />
                    </div>
                                <div>
                                    <p className="text-sm text-gray-400">GitHub</p>
                                    <p className="text-white group-hover:text-blue-400 transition-colors text-xl">Cuphadi</p>
                </div>
                            </a>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Add Services Section Component
const ServicesSection = () => {
    const services = [
        {
            title: "Music Composition",
            icon: <Music className="w-8 h-8" />,
            description: "Professional music composition services for various media. Mostly Orchestral/Fantasy pieces with emphasis on piano.",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            title: "Private Teaching Sessions",
            icon: <Users className="w-8 h-8" />,
            description: "One-on-one tutoring in Python, AI Theory/Applications, and more in the realm of Computer Science & Math.",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            title: "Python Development",
            icon: <Code className="w-8 h-8" />,
            description: "Custom Python applications, automation scripts, and data analysis tools.",
            gradient: "from-green-500 to-emerald-500"
        },
        {
            title: "Narrative/Story Design",
            icon: <BookOpen className="w-8 h-8" />,
            description: "Compelling storytelling and narrative design for games and media.",
            gradient: "from-yellow-500 to-orange-500"
        },
        {
            title: "Voice Over/Acting",
            icon: <MessageSquare className="w-8 h-8" />,
            description: "Professional voice acting and narration services.",
            gradient: "from-red-500 to-pink-500"
        },
        {
            title: "Streamlit Dashboard Development",
            icon: <Layers3 className="w-8 h-8" />,
            description: "Interactive data visualization dashboards using Streamlit.",
            gradient: "from-indigo-500 to-purple-500"
        }
    ];

    return (
        <section id="services" className="py-16">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: false }}
                    className="text-3xl font-bold text-center text-white mb-12"
                >
                    Services
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: false }}
                            className={`bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 
                                      hover:scale-105 transition-all duration-300 cursor-pointer
                                      hover:bg-gradient-to-br ${service.gradient}`}
                        >
                            <div className="flex items-center justify-center mb-4">
                                <div className="p-3 rounded-full bg-white/10">
                                    {service.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white text-center mb-2">
                                {service.title}
                            </h3>
                            <p className="text-gray-300 text-center">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Skills and Certificates Section Component
const SkillsAndCertificates = () => {
    const skillCategories = [
        {
            title: "Programming Languages",
            icon: <Code2 className="w-6 h-6" />,
            skills: ["Python", "Java", "JavaScript", "C", "C#", "MATLAB", "R", "SQL"]
        },
        {
            title: "Tools & Platforms",
            icon: <Layers3 className="w-6 h-6" />,
            skills: ["Docker", "Tableau", "MySQL", "Neo4j", "Power BI"]
        },
        {
            title: "Python Frameworks",
            icon: <Code className="w-6 h-6" />,
            skills: ["TensorFlow", "PyTorch", "Transformers", "SciKit-Learn", "SpaCy", "OpenCV", "FastAPI", "Streamlit"]
        },
        {
            title: "AI & ML Techniques",
            icon: <BrainCircuit className="w-6 h-6" />,
            skills: ["Reinforcement Learning", "Generative AI", "NLP", "Computer Vision", "Unsupervised Learning"]
        },
        {
            title: "Data Science & Visualization",
            icon: <BarChart className="w-6 h-6" />,
            skills: ["NumPy", "Pandas", "Seaborn", "Plotly", "ETL Pipelines", "Knowledge Graphs", "Data Visualization"]
        },
        {
            title: "Soft Skills",
            icon: <Users className="w-6 h-6" />,
            skills: ["Agile/Scrum", "Leadership", "Mentorship", "Critical Thinking", "Creativity", "Communication"]
        }
    ];

    const certificates = [
        {
            title: "Natural Language Processing Specialization",
            issuer: "DeepLearning.AI",
            icon: <ScrollText className="w-5 h-5 text-blue-400" />,
            url: "https://www.coursera.org/account/accomplishments/specialization/V3VLNSYBYXAE",
            date: "2022"
        },
        {
            title: "Business Analytics",
            issuer: "Udacity & Misk Academy",
            icon: <ScrollText className="w-5 h-5 text-green-400" />,
            url: "https://www.udacity.com/certificate/WMXRFVMX",
            date: "2021"
        },
        {
            title: "Game Design Specialization",
            issuer: "California Institute of the Arts",
            icon: <ScrollText className="w-5 h-5 text-purple-400" />,
            url: "https://www.coursera.org/account/accomplishments/specialization/MQFELMP8PPZ5",
            date: "2024"
        },
        {
            title: "Google Advanced Data Analytics",
            issuer: "Google",
            icon: <ScrollText className="w-5 h-5 text-yellow-400" />,
            url: "https://www.coursera.org/account/accomplishments/professional-cert/BD2WNGPECSDE",
            date: "2024"
        },
        {
            title: "INE Certified Junior Data Science",
            issuer: "INE",
            icon: <ScrollText className="w-5 h-5 text-red-400" />,
            url: "https://certs.ine.com/b018af16-98df-4f6e-bbea-f2eedf9a7654#acc.P2fsrky7",
            date: "2024"
        }
    ];

    const awards = [
        {
            title: "First Honor Distinction",
            description: "Awarded for maintaining a GPA of 3.944/4.000 throughout my Computer Science degree at KFUPM.",
            date: "May 2024",
            image: "/awards/First Honor Award.jpeg",
            type: "image"
        },
        {
            title: "Peer Tutoring Program Excellence Award",
            description: "Recognized as oine of the best students in the Peer Tutoring program for the Python & C programming languages course.",
            date: "January 2024",
            image: "/awards/Tutor Award.jpeg",
            type: "image"
        },
        {
            title: "I&E Club Years of Service Award",
            description: "Awarded for 5 years of service with the club upper management.",
            date: "May 2024",
            image: "/awards/I&E Service Award.jpeg",
            type: "image"
        },
        {
            title: "KAUST Academy AI Program TA Recognition",
            description: "Awarded for exceptional performance as a teaching assistant at KAUST Academy AI Advanced Stage.",
            date: "February 2025",
            image: "/awards/Abdulhadi Zubailah - 2025 Advanced TA.png",
            type: "image"
        },
        {
            title: "Google Developer Student Club Recognition",
            description: "Recognized for leadership and contributions to the Google Developer Student Club at KFUPM.",
            date: "May 2024",
            image: "/awards/GDSC.png",
            type: "image"
        }
    ];

    const renderCertificates = () => (
        <div>
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center justify-center">
                <ScrollText className="w-6 h-6 mr-2" />
                Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert, index) => (
                    <motion.a
                        key={index}
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                    >
                        <div className="flex items-start">
                            <div className="p-2 rounded-lg bg-white/10 mr-4">
                                {cert.icon}
                            </div>
                            <div className="flex-grow">
                                <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                    {cert.title}
                                </h4>
                                <p className="text-sm text-gray-400">{cert.issuer}</p>
                                <p className="text-xs text-gray-500 mt-1">{cert.date}</p>
                            </div>
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
                                <ExternalLink className="w-5 h-5 text-blue-400" />
                            </div>
                        </div>
                        <div className="mt-3 text-xs text-blue-400/80 opacity-0 group-hover:opacity-100 transition-all">
                            Click to verify certificate →
                        </div>
                    </motion.a>
                ))}
            </div>
        </div>
    );

    const AwardsCarousel = () => {
        const [emblaRef, emblaApi] = useEmblaCarousel({
            align: "start",
            loop: true,
            skipSnaps: false,
            inViewThreshold: 0.7
        });

        const scrollPrev = useCallback(() => {
            if (emblaApi) emblaApi.scrollPrev();
        }, [emblaApi]);

        const scrollNext = useCallback(() => {
            if (emblaApi) emblaApi.scrollNext();
        }, [emblaApi]);

        useEffect(() => {
            if (!emblaApi) return;

            const autoplay = () => {
                emblaApi.scrollNext();
            };

            const interval = setInterval(autoplay, 5000);
            return () => clearInterval(interval);
        }, [emblaApi]);

        return (
            <div className="mt-16">
                <h3 className="text-2xl font-semibold text-white mb-8 flex items-center justify-center">
                    <Trophy className="w-6 h-6 mr-2" />
                    Awards & Recognition
                </h3>
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {awards.map((award, index) => (
                            <div key={index} className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333333%] px-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all"
                                >
                                    <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                                        <img
                                            src={award.image}
                                            alt={award.title}
                                            className="absolute inset-0 w-full h-full object-contain bg-white/5"
                                        />
                                    </div>
                                    <h4 className="text-lg font-semibold text-white mb-2">
                                        {award.title}
                                    </h4>
                                    <p className="text-sm text-gray-400 mb-2">
                                        {award.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-500">
                                            {award.date}
                                        </span>
                                        <a
                                            href={award.image}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.open(award.image, '_blank', 'noopener,noreferrer');
                                            }}
                                        >
                                            View Image
                                            <ExternalLink className="w-4 h-4 ml-1" />
                                        </a>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-4 mt-6">
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={scrollPrev}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                        onClick={scrollNext}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <section id="skills" className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-12">Skills, Certificates & Awards</h2>
                
                {/* Skills Grid */}
                <div className="mb-16">
                    <h3 className="text-2xl font-semibold text-white mb-8 flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 mr-2" />
                        Skills 
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skillCategories.map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="p-2 rounded-lg bg-white/10 mr-3">
                                        {category.icon}
                                    </div>
                                    <h4 className="text-lg font-semibold text-white">{category.title}</h4>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="px-3 py-1 rounded-full text-sm bg-white/10 text-gray-300 hover:bg-white/20 transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Certificates */}
                {renderCertificates()}

                {/* Awards */}
                <AwardsCarousel />
            </div>
        </section>
    );
};

// Main App Component
const PortfolioApp = () => {
    const cursorPositionRef = useRef({ x: 0, y: 0 });
    const [activeSection, setActiveSection] = useState<string>('about');
    const sectionRefs = {
        about: useRef<HTMLElement>(null),
        career: useRef<HTMLElement>(null),
        projects: useRef<HTMLElement>(null),
        skills: useRef<HTMLElement>(null),
        services: useRef<HTMLElement>(null),
        contact: useRef<HTMLElement>(null),
    };

    const handleMouseMove = useCallback((event: MouseEvent) => {
        cursorPositionRef.current = { x: event.clientX, y: event.clientY };
        // Remove the state update that was causing re-renders
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);

        const handleScroll = () => {
            const scrollY = window.scrollY;
            let closestSection = 'about';
            let closestDistance = Number.MAX_SAFE_INTEGER;

            // Determine which section is in view
            for (const key in sectionRefs) {
                const section = sectionRefs[key as keyof typeof sectionRefs].current;
                if (section) {
                    const sectionTop = section.offsetTop;
                    const distance = Math.abs(sectionTop - scrollY);

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestSection = key;
                    }
                }
            }
            setActiveSection(closestSection);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleMouseMove]);

    return (
        <div className="bg-gray-900 min-h-screen relative overflow-hidden">
            <EnhancedBackground cursorPosition={cursorPositionRef.current} />
            <NavBar
                cursorPosition={cursorPositionRef.current}
                activeSection={activeSection}
                scrollToSection={(sectionId) => {
                    const section = document.getElementById(sectionId);
                    if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                        setActiveSection(sectionId);
                    }
                }}
            />
            <main className="relative z-10">
                <motion.section ref={sectionRefs.about}>
                    <AboutSection />
                </motion.section>

                <motion.section ref={sectionRefs.career}>
                    <CareerSection />
                </motion.section>

                <motion.section ref={sectionRefs.projects}>
                    <ProjectsSection />
                </motion.section>

                <motion.section ref={sectionRefs.skills}>
                    <SkillsAndCertificates />
                </motion.section>

                <motion.section ref={sectionRefs.services}>
                    <ServicesSection />
                </motion.section>

                <motion.section ref={sectionRefs.contact}>
                    <ContactSection />
                </motion.section>
            </main>
        </div>
    );
};

export default PortfolioApp;


