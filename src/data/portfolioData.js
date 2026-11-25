import projects from './projects.json';
import cbaForageCert from '../assets/images/certifications/cba-forage-new.jpg';
import tataForageCert from '../assets/images/certifications/tata-forage.jpg';
import jpmcForageCert from '../assets/images/certifications/jpmc-forage.jpg';
import aiCertsImage from '../assets/images/certifications/ai-certs.jpg';
import awsCertsImage from '../assets/images/certifications/aws-academy.jpg';
import calartsUiuxCert from '../assets/images/certifications/calarts-uiux.jpg';

// Portfolio data for Kunal Khaire
const portfolioData = {
    personalInfo: {
        name: "Kunal Khaire",
        title: "Full-Stack Developer & AI Application Builder",
        summary: "I build intelligent web applications, scalable backend systems, and meaningful digital experiences that turn complex ideas into practical solutions.",
        location: "Shirpur, Maharashtra, India",
        phone: "+91-9307056355",
        email: "kunalkhaire302@gmail.com",
        linkedin: "https://linkedin.com/in/kunal-khaire",
        github: "https://github.com/kunalkhaire302",
    },

    objective: "I’m pursuing a B.Tech in Information Technology, with expected graduation in 2027. I focus on building secure, responsive web apps and integrating AI where it helps users.",

    education: [
        {
            degree: "B.Tech in Information Technology",
            institution: "SVKM's NMIMS MPSTME",
            location: "Shirpur",
            duration: "2024-2027",
            type: "undergraduate",
        },
        {
            degree: "Diploma in Computer Science",
            institution: "R.C. Patel Polytechnic",
            location: "Shirpur",
            duration: "2022-2024",
            type: "diploma",
        },
    ],

    skills: {
        "Frontend": [
            { name: "React.js", icon: "FaReact" },
            { name: "Next.js", icon: "SiNextdotjs" },
            { name: "TypeScript", icon: "SiTypescript" },
            { name: "JavaScript (ES6+)", icon: "FaJs" },
            { name: "HTML5", icon: "FaHtml5" },
            { name: "CSS3", icon: "FaCss3Alt" },
            { name: "Tailwind CSS", icon: "SiTailwindcss" },
        ],
        "Backend": [
            { name: "Node.js", icon: "FaNode" },
            { name: "Express.js", icon: "SiExpress" },
            { name: "REST APIs", icon: "FaCode" },
            { name: "Socket.io", icon: "SiSocketdotio" },
            { name: "Prisma", icon: "SiPrisma" },
            { name: "FastAPI", icon: "SiFastapi" },
            { name: "ASP.NET Core", icon: "SiDotnet" },
        ],
        "Databases": [
            { name: "PostgreSQL", icon: "SiPostgresql" },
            { name: "MongoDB", icon: "SiMongodb" },
            { name: "Redis", icon: "SiRedis" },
        ],
        "Languages": [
            { name: "JavaScript", icon: "FaJs" },
            { name: "TypeScript", icon: "SiTypescript" },
            { name: "Python", icon: "FaPython" },
            { name: "C#", icon: "SiDotnet" },
            { name: "SQL", icon: "FaDatabase" },
        ],
        "AI / ML": [
            { name: "TensorFlow", icon: "SiTensorflow" },
            { name: "FastAPI Model Serving", icon: "SiFastapi" },
            { name: "AI Integration", icon: "FaBrain" },
        ],
        "Tools & Cloud": [
            { name: "Git", icon: "FaGitAlt" },
            { name: "GitHub", icon: "FaGithub" },
            { name: "Postman", icon: "SiPostman" },
            { name: "Firebase", icon: "SiFirebase" },
            { name: "BullMQ", icon: "FaCode" },
            { name: "Vercel", icon: "SiVercel" },
            { name: "Render", icon: "SiRender" },
            { name: "MongoDB Atlas", icon: "SiMongodb" },
        ],
        "Concepts": [
            { name: "RBAC", icon: "FaCode" },
            { name: "JWT Authentication", icon: "FaCode" },
            { name: "Real-Time Systems", icon: "FaCode" },
            { name: "REST API Design", icon: "FaCode" },
            { name: "Background Job Processing", icon: "FaCode" },
            { name: "Data Structures and Algorithms", icon: "FaBrain" },
        ],
    },

    experience: [
        {
            id: 5,
            position: "Full Stack Web Development Intern",
            company: "ElevanceSkills",
            duration: "Sep 2026",
            type: "Remote",
            achievements: [
                "Engineered AutoMarket, a production-grade used-car marketplace for buying and selling vehicles",
                "Implemented advanced search, filtering, seller workflows, and AI-powered intelligence",
                "Built using Next.js, React, TypeScript, ASP.NET Core, PostgreSQL, and Supabase",
            ],
        },
        {
            id: 4,
            position: "College Ambassador",
            company: "Techfest, IIT Bombay",
            duration: "Jul 2026 – Present",
            type: "Mumbai, India",
            achievements: [
                "Represented Techfest, IIT Bombay and promoted its events and opportunities among students",
                "Drove student engagement through outreach, communication, and peer networking",
                "Promoted innovation, competitions, learning opportunities, and student participation",
                "Supported Techfest initiatives focused on creativity, leadership, and innovation",
            ],
        },
        {
            id: 1,
            position: "Web Development Intern",
            company: "EasyBytes Web Solutions",
            duration: "Dec 2025",
            type: "Remote",
            achievements: [
                "Developed responsive UI components",
                "Optimized frontend code using HTML, CSS, and JavaScript",
            ],
        },

        {
            id: 3,
            position: "Web Development Intern",
            company: "N P IT Solutions",
            duration: "Apr-May 2023",
            type: "Remote",
            achievements: [
                "Designed responsive interfaces",
                "Improved frontend performance using HTML, CSS, and JavaScript",
            ],
        },
    ],

    projects,

    certifications: [
        {
            id: 6,
            title: "Visual Elements of User Interface Design",
            issuer: "California Institute of the Arts (Coursera)",
            date: "Nov 5, 2026",
            description: "Completed an online course authorized by California Institute of the Arts and offered through Coursera.",
            link: "https://coursera.org/verify/NQ9CW22KA7OQ",
            image: calartsUiuxCert,
        },
        {
            id: 4,
            title: "Managing Projects with AI",
            issuer: "AI CERTs (Coursera)",
            date: "Oct 3, 2026",
            description: "Completed comprehensive online course authorized by AI CERTs and offered through Coursera.",
            link: "https://coursera.org/verify/3KZ9BRWF4JGS",
            image: aiCertsImage,
        },
        {
            id: 5,
            title: "AWS Academy Graduate - Cloud Architecting",
            issuer: "AWS Academy",
            date: "Sep 17, 2026",
            description: "Completed 60 hours of Cloud Architecting training and earned the AWS Academy Graduate badge.",
            link: "https://www.credly.com/go/kQ0nlb17",
            image: awsCertsImage,
        },
        {
            id: 1,
            title: "Tata GenAI Powered Data Analytics Job Simulation",
            issuer: "Tata",
            date: "2025",
            description: "Completed comprehensive job simulation focused on GenAI-powered data analytics",
            image: tataForageCert,
        },
        {
            id: 2,
            title: "JPMorgan Chase & Co. — Software Engineering Job Simulation",
            issuer: "JPMorgan Chase & Co.",
            date: "2026",
            description: "Awarded to Kunal Khaire for completing the Software Engineering Job Simulation on February 14, 2026, covering Project Setup, Kafka, H2, and REST API development.",
            image: jpmcForageCert,
        },
        {
            id: 3,
            title: "Commonwealth Bank — Software Engineering Job Simulation",
            issuer: "Forage",
            date: "August 10, 2026",
            description: "Awarded to Kunal Khaire for completing the Commonwealth Bank Software Engineering Job Simulation through Forage in August 2026, covering practical tasks including modifying an existing .NET backend, modifying an existing React/Redux frontend, modifying client requests, code coverage, and creating a pull request.",
            image: cbaForageCert,
        },
    ],
};

export default portfolioData;
