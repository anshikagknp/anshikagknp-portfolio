import allenhouse from "../assets/education/allenhouse.jpg";
import christchurch from "../assets/education/christchurch.jpg";
import ppn from "../assets/education/ppn.jpg";
import school from "../assets/education/school.jpg";

export const nav = [
  { id: "about", label: "About", no: "01" },
  { id: "stack", label: "Stack", no: "02" },
  { id: "work", label: "Work", no: "03" },
  { id: "education", label: "Education", no: "04" },
  { id: "certifications", label: "Certifications", no: "05" },
  { id: "contact", label: "Contact", no: "06" },
];

export const email = "anshikagknp@gmail.com";
export const socials = [
  { label: "GitHub", href: "https://github.com/anshikagknp" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anshikagknp" },
];

export const stats = [
  { value: 8.74, decimals: 2, label: "Current CGPA · MCA" },
  { value: 3, decimals: 0, label: "Full-stack projects shipped" },
  { value: 5, decimals: 0, label: "Certifications, in hand & in progress" },
];

export const marqueeSkills = [
  "Java",
  "Spring Boot",
  "Python",
  "Pandas",
  "REST APIs",
  "MySQL",
  "MongoDB",
  "Firebase",
  "Git",
  "Tailwind CSS",
  "Data Analysis",
  "React",
];

export const timeline = [
  {
    date: "2026",
    title: "MCA @ Allenhouse Institute of Technology",
    detail: "Master of Computer Applications — CGPA 8.74, in progress.",
  },
  {
    date: "2025",
    title: "Passed UGC-NET (Political Science)",
    detail: "Showed academic excellence and sincerity in the field.",
  },
  {
    date: "2024",
    title: "Completed MA, Political Science",
    detail: "Christ Church College — CGPA 7.86.",
  },
  {
    date: "2022",
    title: "Completed BA, Political Science",
    detail: "Pandit Prithi Nath College — Grade 83%.",
  },
  {
    date: "2019",
    title: "Cleared ISC (Class XII)",
    detail: "Pt. D. P. Mishra Memorial Public School — 92.75%.",
  },
  {
    date: "2017",
    title: "Cleared ICSE (Class X)",
    detail: "Pt. D. P. Mishra Memorial Public School — 94.20%.",
  },
].reverse();

export const stack = [
  { group: "Languages", items: ["Java", "Python", "JavaScript", "C", "HTML5", "CSS3", "SQL"] },
  { group: "Frameworks", items: ["Spring MVC", "Spring Data JPA", "Hibernate", "REST APIs", "React", "Tailwind CSS"] },
  { group: "Data & Analytics", items: ["NumPy", "Pandas", "Matplotlib", "Plotly", "Jupyter", "Streamlit"] },
  { group: "Databases", items: ["MySQL", "MongoDB", "PostgreSQL", "Cloud Firestore"] },
  { group: "Tooling", items: ["Git", "GitHub", "Vercel", "Maven", "Postman", "Firebase", "IntelliJ IDEA", "VS Code"] },
  { group: "Coursework", items: ["Data Structures", "DBMS", "OOP", "Operating Systems", "Computer Networks"] },
];

export const projects = [
  {
    index: "01",
    year: "2026",
    tag: "Data Analytics · Streamlit",
    title: "Gender Sensitization Data Analysis",
    description:
      "A full Python pipeline across three Jupyter notebooks — cleaning, exploratory analysis, and statistical testing — on a synthetic 1,000-row dataset built to safely reproduce published survey findings.",
    stats: [
      { value: 33, label: "visualizations" },
      { value: 3, label: "notebooks" },
      { value: 1000, label: "row dataset" },
    ],
    tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Plotly", "Streamlit"],
    live: "https://gender-sensitization-data-analysis.streamlit.app/",
    source: "https://github.com/anshikagknp/gender-sensitization-data-analysis",
    liveLabel: "Live dashboard",
  },
  {
    index: "02",
    year: "Jul 2026",
    tag: "Full-stack · Firebase",
    title: "FairShare — Expense Splitter",
    description:
      "A full-stack expense-splitting app that eliminates manual math for shared costs across any group size, with real-time balance recalculation and ₹0.01-precision validation for exact splits.",
    stats: [
      { value: 60, suffix: "%", label: "fewer transactions" },
      { literal: "±₹0.01", label: "split accuracy" },
      { value: 4, label: "CRUD operations" },
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Firebase Auth", "Cloud Firestore", "Responsive Design"],
    live: "https://fairshare-expense-splitter.vercel.app/",
    source: "https://github.com/anshikagknp/fairshare",
    liveLabel: "Live site",
  },
  {
    index: "03",
    year: "2026",
    tag: "SaaS frontend · Vercel",
    title: "AnnAI — Workflow Automation SaaS",
    description:
      "A fully responsive frontend for an AI workflow automation platform — landing page, pricing, FAQ, and an interactive dashboard, built from scratch and tuned for top-tier performance scores.",
    stats: [
      { value: 4, label: "core UIs" },
      { value: 93, label: "perf. score" },
      { value: 100, label: "SEO score" },
    ],
    tech: ["HTML5", "JavaScript", "Tailwind CSS", "Vercel"],
    live: "https://ann-ai-saas.vercel.app/",
    source: "https://github.com/anshikagknp/ann-ai-saas",
    liveLabel: "Live site",
  },
];

export const education = [
  {
    img: allenhouse,
    date: "Jul 2025 — Present",
    title: "Allenhouse Institute of Technology",
    course: "Master of Computer Applications",
    grades: ["CGPA 8.74"],
  },
  {
    img: christchurch,
    date: "Sep 2022 — Aug 2024",
    title: "Christ Church College",
    course: "Master of Arts, Political Science",
    grades: ["CGPA 7.86"],
  },
  {
    img: ppn,
    date: "Jul 2019 — Aug 2022",
    title: "Pandit Prithi Nath College",
    course: "Bachelor of Arts, Political Science",
    grades: ["Grade 83%"],
  },
  {
    img: school,
    date: "2015 — 2019",
    title: "Pt. D. P. Mishra Memorial Public School",
    course: "Class X (ICSE) & Class XII (ISC)",
    grades: ["ICSE 94.20%", "ISC 92.75%"],
  },
];

export const certifications = [
  {
    status: "In progress",
    badge: "E&ICT Academy, IIT Kanpur",
    title: "Full Stack Web Development — MERN Stack",
  },
  { status: "Complete", badge: "Kaggle", title: "Python" },
  { status: "Complete", badge: "HackerRank", title: "Problem Solving" },
  { status: "Complete", badge: "HackerRank", title: "Java" },
  { status: "Complete", badge: "UGC-NET", title: "Political Science" },
];
