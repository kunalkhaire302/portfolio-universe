// Portfolio data for Kunal Khaire
export const portfolioData = {
    personalInfo: {
        name: "Kunal Khaire",
        title: "Web Developer & IT Undergraduate",
        location: "Shirpur, Maharashtra, India",
        phone: "+91-9307056355",
        email: "kunalkhaire302@gmail.com",
        linkedin: "https://linkedin.com/in/kunal-khaire",
        github: "https://github.com/kunalkhaire302",
    },

    objective: "Web Developer and Information Technology undergraduate with hands-on experience building secure, responsive web applications through GitHub projects. Skilled in HTML, CSS, JavaScript, React.js, Node.js, and Python, with a focus on clean code and scalable solutions.",

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
        "Web Technologies": [
            { name: "HTML5", level: "advanced", icon: "FaHtml5" },
            { name: "CSS3", level: "advanced", icon: "FaCss3Alt" },
            { name: "JavaScript", level: "advanced", icon: "FaJs" },
            { name: "React.js", level: "intermediate", icon: "FaReact" },
        ],
        "Backend": [
            { name: "Node.js", level: "intermediate", icon: "FaNode" },
        ],
        "Programming": [
            { name: "Python", level: "advanced", icon: "FaPython" },
            { name: "Java", level: "intermediate", icon: "FaJava" },
        ],
        "Database": [
            { name: "Oracle Database", level: "intermediate", icon: "FaDatabase" },
        ],
        "Tools": [
            { name: "Git", level: "advanced", icon: "FaGitAlt" },
            { name: "GitHub", level: "advanced", icon: "FaGithub" },
            { name: "Power BI", level: "intermediate", icon: "SiPowerbi" },
            { name: "Figma", level: "intermediate", icon: "FaFigma" },
            { name: "Unreal Engine", level: "beginner", icon: "SiUnrealengine" },
        ],
    },

    experience: [
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
            id: 2,
            position: "Web Development Intern",
            company: "Cognifyz Technologies",
            duration: "Nov 2025",
            type: "Remote",
            achievements: [
                "Built and improved web applications",
                "Collaborated remotely with development teams",
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

    projects: [
        {
            id: 1,
            title: "Portfolio Universe",
            description: "Visually rich, space-themed personal portfolio showcasing skills and projects with interactive animations.",
            technologies: ["HTML5", "CSS3", "JavaScript", "React.js"],
            github: "https://github.com/kunalkhaire302/portfolio-universe",
            features: [
                "Space-themed interactive UI",
                "Smooth Framer Motion transitions",
                "Performance optimized",
            ],
            color: "project-purple",
            icon: "FaRocket",
        },
        {
            id: 2,
            title: "Stock Market Dashboard",
            description: "Dynamic web application utilizing real-time data to visualize stock trends and market performance.",
            technologies: ["JavaScript", "HTML5", "CSS3", "REST API"],
            github: "https://github.com/kunalkhaire302/Stock-Market-Dashboard",
            features: [
                "Real-time stock data visualization",
                "Interactive charts and graphs",
                "User-friendly interface",
            ],
            color: "neon-teal",
            icon: "FaChartLine",
        },
        {
            id: 3,
            title: "Craigslist Mumbai Redesign",
            description: "Modern redesign of Craigslist Mumbai focusing on enhanced usability and mobile responsiveness.",
            technologies: ["HTML5", "CSS3", "JavaScript", "UI/UX"],
            github: "https://github.com/kunalkhaire302/Redesign-Online-Craigslist-Mumbai",
            features: [
                "Modern user-centric design",
                "Improved navigation & search",
                "Mobile-first responsive layout",
            ],
            color: "electric-blue",
            icon: "FaShoppingCart",
        },
        {
            id: 4,
            title: "File Sharing Website",
            description: "Secure upload/download system with authentication and encryption",
            technologies: ["HTML", "CSS", "JavaScript", "Node.js"],
            github: "https://github.com/kunalkhaire302/File-Sharing",
            features: [
                "Secure file upload and download",
                "User authentication",
                "End-to-end encryption",
            ],
            color: "electric-blue",
            icon: "FaLock",
        },
        {
            id: 5,
            title: "Smart Guard: Attendance System",
            description: "Attendance monitoring and behavior analytics system",
            technologies: ["Python", "HTML", "CSS", "JavaScript"],
            github: "https://github.com/kunalkhaire302/Smart-Guard-Attendance-Behaviour-Analytics-System",
            features: [
                "Real-time attendance tracking",
                "Behavior pattern analysis",
                "Analytics dashboard",
            ],
            color: "neon-teal",
            icon: "FaUserShield",
        },
        {
            id: 6,
            title: "EvolveX System",
            description: "Web-based system optimization application",
            technologies: ["Python", "HTML", "CSS", "JavaScript"],
            github: "https://github.com/kunalkhaire302/evolvexsystem",
            features: [
                "System performance optimization",
                "User-friendly web interface",
                "Real-time monitoring",
            ],
            color: "project-purple",
            icon: "FaCog",
        },
        {
            id: 7,
            title: "SmartCSV: Intelligent CSV Analytics Platform",
            description: "Automated CSV processing and data insights system",
            technologies: ["Python", "Flask", "Pandas", "NumPy", "Scikit-learn", "HTML", "CSS", "JavaScript", "Chart.js"],
            github: "https://github.com/kunalkhaire302/SmartCSV",
            features: [
                "ETL pipeline for CSV data",
                "Statistical analysis and visualization",
                "AI-generated data summaries",
                "Interactive analytics dashboard",
            ],
            color: "neon-teal",
            icon: "FaChartBar",
        },
        {
            id: 8,
            title: "House Rent Predictor",
            description: "AI-based system to predict house rental prices using machine learning models",
            technologies: ["Python", "Machine Learning", "Pandas", "NumPy", "Scikit-learn", "HTML", "CSS", "JavaScript"],
            live: "https://house-rent-predictor-three.vercel.app/",
            features: [
                "Predict rent based on location and features",
                "Data preprocessing and feature engineering",
                "Machine learning model integration",
                "Interactive user input interface",
            ],
            color: "electric-blue",
            icon: "FaHome",
        },
        {
            id: 9,
            title: "AI Money Mentor",
            description: "AI-powered personal finance assistant that provides smart financial insights and guidance",
            technologies: ["Python", "Machine Learning", "NLP", "Pandas", "NumPy", "Scikit-learn", "HTML", "CSS", "JavaScript", "Node.js"],
            live: "https://ai-money-mentor-1.onrender.com/",
            features: [
                "Track and analyze spending patterns",
                "Personalized financial advice using AI",
                "Budget planning and expense categorization",
                "Interactive chatbot for financial queries",
            ],
            color: "project-purple",
            icon: "FaWallet",
        },
        {
            id: 10,
            title: "Carbon Footprint AI",
            description: "AI-powered system to analyze and estimate carbon emissions based on user activities and lifestyle patterns",
            technologies: ["Python", "Machine Learning", "Data Analysis", "Pandas", "NumPy", "Scikit-learn", "HTML", "CSS", "JavaScript", "Node.js"],
            live: "https://carbon-footprint-ai.onrender.com/",
            features: [
                "Calculate carbon footprint from daily activities",
                "AI-based emission prediction and analysis",
                "Personalized sustainability recommendations",
                "Interactive dashboard for tracking environmental impact",
            ],
            color: "neon-teal",
            icon: "FaLeaf",
        },
        {
            id: 11,
            title: "NEXBANK_DBA",
            description: "Database-driven banking management system for handling transactions, accounts, and customer data efficiently",
            technologies: ["SQL", "DBMS", "MySQL/PostgreSQL", "Python", "Java", "HTML", "CSS", "JavaScript"],
            live: "https://nexbank-dba.onrender.com/",
            features: [
                "Manage customer accounts and banking records",
                "Secure transaction processing and data handling",
                "Relational database design and normalization",
                "CRUD operations with backend integration",
            ],
            color: "electric-blue",
            icon: "FaUniversity",
        },
    ],

    certifications: [
        {
            id: 1,
            title: "Tata GenAI Powered Data Analytics Job Simulation",
            issuer: "Tata",
            date: "2025",
            description: "Completed comprehensive job simulation focused on GenAI-powered data analytics",
        },
        {
            id: 2,
            title: "JPMorgan Chase & Co. — Software Engineering Job Simulation",
            issuer: "JPMorgan Chase & Co.",
            date: "2026",
            description: "Awarded to Kunal Khaire for completing the Software Engineering Job Simulation on February 14, 2026, covering Project Setup, Kafka, H2, and REST API development.",
        },
    ],
};

export default portfolioData;
