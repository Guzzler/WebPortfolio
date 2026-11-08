// All résumé-driven content for the home page lives here.
// Update this file when the résumé changes; components only render it.

export const profile = {
  name: "Sharang Pai",
  role: "Member of Technical Staff, Luma AI",
  email: "sharangpai123@gmail.com",
  links: {
    github: "https://www.github.com/Guzzler",
    linkedin: "https://www.linkedin.com/in/sharang-pai/",
    itch: "https://dpsguzzler.itch.io/",
  },
};

export const experience = [
  {
    company: "Luma AI",
    url: "https://lumalabs.ai",
    role: "Member of Technical Staff, Product Engineering",
    dates: "Feb 2026 – Present",
    summary:
      "I lead the Evaluations Engineering team, where we build multimodal evaluation pipelines, automate benchmarking, and develop agentic evaluation harnesses. For example, our evaluation infrastructure supported the Uni-1.1 launch, which helped put Luma at #3 among image generation labs on LMArena. I also contribute to Luma Agents, an agentic orchestration framework for creative studio and production work.",
  },
  {
    company: "Persona AI",
    note: "now Luma AI",
    url: "https://persona-ai.ai",
    role: "Founding ML Engineer",
    dates: "Jun 2024 – Feb 2026",
    summary:
      "Built the core AI platform for a multimodal avatar product for wellness, therapy and medical intake, from model integration and orchestration to application tooling. Owned the production avatar systems end to end: memory, moderation, low-latency inference and tools.",
  },
  {
    company: "UpDuo",
    note: "now Arcade",
    url: "https://www.arcade.co/",
    role: "Senior Machine Learning Intern",
    dates: "May – Aug 2023",
    summary:
      "Built LLM pipelines for session summaries and insights, and led a Flutter front-end rebuild that brought ML into workflows behind 10,000+ weekly sessions.",
  },
  {
    company: "RedBrick AI",
    url: "https://redbrickai.com/",
    role: "Founding Engineer",
    dates: "May 2021 – Mar 2022",
    summary:
      "Ran UI/UX development and client integrations. Architected a WebAssembly-assisted medical annotation workflow that made labeling faster and easier, and was part of the core team through Y Combinator and a $500K+ raise.",
  },
  {
    company: "Instamojo",
    url: "https://www.instamojo.com/",
    role: "Software Development Engineer",
    dates: "Jan 2019 – May 2021",
    summary:
      "Built and shipped payments and commerce products, including sachet loans and custom online stores, used by more than 2 million small businesses in India. Owned features across backend, frontend and rollout, and mentored new engineers.",
  },
];

export const earlierExperience = [
  { company: "Microsoft", role: "Intern, computer vision for workplace safety", year: "2018" },
  { company: "Conscia", role: "Software development intern", year: "2017" },
];

export const impact = [
  {
    title: "OpenShiksha",
    url: "https://openshiksha.org/",
    motif: "pencil",
    accent: "#2f9e8f",
    role: "Co-founder and developer",
    // Shown as a small two-era timeline on the card.
    eras: [
      { years: "2015 – 2017", label: "Original" },
      { years: "2026 – now", label: "Rework" },
    ],
    summary:
      "An open-source adaptive learning platform for students in underserved communities in India. We piloted it in schools, starting with my own, DPS Pune, and in 2026 I started reworking it.",
  },
  {
    title: "Pawthway",
    url: "https://pawthway-hackathon.web.app",
    motif: "paws",
    accent: "#f4795b", // Pawthway's own coral
    years: "2026",
    role: "Lead developer, with Eesha Shetty and Ritu Gala",
    summary:
      "A guided path from fostering a shelter dog to finding it a forever home: swipe-style matching, a daily care plan, and an adoption profile that writes itself from the foster's journal. Built on a small tool-calling agent on Claude.",
    links: [
      { label: "Code", url: "https://github.com/Guzzler/dogathon" },
      { label: "Built for Dogathon", url: "https://luma.com/rklrsomo" },
    ],
  },
  {
    title: "VaccinePost",
    url: "https://github.com/Guzzler/Cowin-Notification-System",
    motif: "bell",
    accent: "#3d7fd1",
    years: "2021",
    role: "Builder",
    summary:
      "A free, unbiased vaccine availability alert system built during India's COVID-19 second wave with React and AWS Lambda.",
    outcome: "Helped 10,000+ people get vaccinated",
  },
  {
    title: "Conservation event detection",
    url: "https://github.com/AIandSocialGoodLab",
    motif: "radar",
    accent: "#4f9a3a",
    role: "AI for Social Good Lab, CMU, with WWF",
    summary:
      "An LLM system for live, cross-lingual event detection that supports WWF conservation operations. Built in Dr. Fei Fang's lab.",
  },
  {
    title: "LLM security for mental health",
    url: "https://github.com/marliesgoes/llm-security-mental-health/tree/main",
    motif: "shield",
    accent: "#8a63c9",
    role: "Research, CMU",
    summary:
      "Research on making large language models safer to use in sensitive health conversations.",
  },
  {
    title: "JournalAI",
    // The app has been taken down, so the card has no link.
    status: "Retired",
    motif: "notebook",
    accent: "#d0912a",
    role: "Builder",
    summary:
      "A privacy-first AI journaling app built in Flutter on top of LLM pipelines.",
    outcome: "500+ users and 5,000+ journal entries",
  },
];

export const games = [
  {
    title: "Sweep of the Realm",
    thumbnail:
      "https://img.itch.zone/aW1nLzI2OTEwODI0LnBuZw==/315x250%23c/e%2BbTWT.png",
    url: "https://dpsguzzler.itch.io/sweep-of-the-realm",
    embedUrl: "https://itch.io/embed-upload/17309145?color=333333",
    // Unity canvas size of the build (from its index.html on itch).
    size: [960, 600],
    description:
      "A Roomba falls through a portal into a filthy medieval kingdom. The king calls it a curse. You call it a cleaning job.",
    year: "2026",
  },
  {
    title: "Zen Garden",
    thumbnail:
      "https://img.itch.zone/aW1nLzE3Nzg1NTEzLnBuZw==/315x250%23c/ilHY7P.png",
    url: "https://dpsguzzler.itch.io/zen-garden",
    embedUrl: "https://itch.io/embed-upload/11514825?color=ffffff",
    // Unity canvas size of the build (from its index.html on itch).
    size: [1650, 730],
    description: "Top-down survival as a zen monk tending a garden.",
    year: "2024",
  },
  {
    title: "Divided Destiny",
    thumbnail:
      "https://img.itch.zone/aW1nLzEyNzU0OTE0LnBuZw==/315x250%23c/O6Sg3r.png",
    url: "https://dpsguzzler.itch.io/divided-destiny",
    embedUrl: "https://itch.io/embed-upload/8289447?color=ffffff",
    // Unity canvas size of the build (from its index.html on itch).
    size: [1024, 768],
    description: "A puzzle platformer about personal identity.",
    year: "2023",
  },
  {
    title: "Love Farm",
    thumbnail:
      "https://img.itch.zone/aW1nLzEwNjY0MTI3LnBuZw==/315x250%23c/gpQ%2BOf.png",
    url: "https://mrmathur.itch.io/love-at-first-sight",
    embedUrl: "https://itch.io/embed-upload/6928454?color=FFFFFF",
    // Unity canvas size of the build (from its index.html on itch).
    size: [960, 600],
    description:
      "Reverse stealth: help a love-struck bunny avoid toxic relationships on the farm.",
    year: "2022",
  },
  {
    title: "InCUBE8",
    thumbnail:
      "https://img.itch.zone/aW1nLzk1MzI2ODkuanBn/315x250%23c/iE%2B53Q.jpg",
    url: "https://dpsguzzler.itch.io/incub",
    embedUrl: "https://itch.io/embed-upload/6173636?color=ffffff",
    // Unity canvas size of the build (from its index.html on itch).
    size: [960, 600],
    description: "A 3D puzzle game where you roll a die to activate platforms.",
    year: "2022",
  },
  {
    title: "The Afterlife Party",
    thumbnail:
      "https://img.itch.zone/aW1nLzgyNzMxNzMucG5n/315x250%23c/6Gx2FE.png",
    url: "https://dpsguzzler.itch.io/the-afterlife-party",
    embedUrl: "https://itch.io/embed-upload/5340536?color=FFFFFF",
    // Unity canvas size of the build (from its index.html on itch).
    size: [960, 600],
    description: "A puzzle platformer about cleansing a party of undead spirits.",
    year: "2022",
  },
];

export const education = [
  {
    degree: "MS, Artificial Intelligence and Innovation",
    school: "Carnegie Mellon University",
    year: "2024",
    detail: "GPA 4.0 / 4.0",
    coursework:
      "Large Language Models, Advanced NLP, Intro to Deep Learning, AI Engineering, On-device Machine Learning, Software for Startups",
  },
  {
    degree: "BTech, Computer and Communication Engineering",
    school: "Manipal Institute of Technology",
    year: "2019",
    detail: "GPA 9.64 / 10, Gold Medalist",
    coursework:
      "Operating Systems, Databases, Computer Architecture, Embedded Systems, Neural Networks and Fuzzy Logic, Data Mining",
  },
];

// Skills section. Each AI item has its own hover animation (fx); languages
// show a typed snippet; technologies show where I used them.
export const aiSystems = [
  { label: "LLMs", fx: "tokens", note: "Pipelines, fine-tuning, inference" },
  { label: "Agentic systems", fx: "agents", note: "Orchestration and tool use, Luma Agents" },
  { label: "Self-improving systems", fx: "versions", note: "Loops that evaluate and improve themselves" },
  { label: "Multimodal evaluation", fx: "meter", note: "Image and video model evals" },
  { label: "Benchmarking", fx: "rank", note: "Harness infrastructure behind Uni-1.1" },
  { label: "Low-latency inference", fx: "latency", note: "Real-time avatars at Persona" },
  { label: "Safety and moderation", fx: "shield", note: "LLMs in sensitive health settings" },
  { label: "Deep learning", fx: "layers", note: "MS in AI at Carnegie Mellon" },
];

export const languages = [
  { label: "Python", code: ">>> import torch" },
  { label: "TypeScript", code: "const me: Builder" },
  { label: "JavaScript", code: "ideas.map(ship)" },
  { label: "SQL", code: "SELECT * FROM impact;" },
  { label: "Go", code: "go serve()" },
  { label: "Dart", code: "Widget build(ctx)" },
  { label: "Java", code: "public static void" },
  { label: "C/C++", code: "while (*p++)" },
  { label: "WebAssembly", code: "(module (func))" },
  { label: "HTML/CSS", code: '<div class="me">' },
];

export const technologies = [
  { label: "React", used: "This site, RedBrick AI, Instamojo, VaccinePost" },
  { label: "FastAPI", used: "Persona's avatar platform" },
  { label: "Django", used: "Instamojo, OpenShiksha" },
  { label: "Flask", used: "APIs and prototypes" },
  { label: "Flutter", used: "JournalAI, UpDuo" },
  { label: "SwiftUI", used: "Persona" },
  { label: "PyTorch", used: "Model training and research" },
  { label: "Pandas and NumPy", used: "Eval and data analysis" },
  { label: "Unity", used: "All six games in the arcade" },
  { label: "AWS", used: "VaccinePost, RedBrick AI" },
];

export const interests = [
  { label: "AI for social good", fx: "sprout" },
  { label: "Social entrepreneurship", fx: "coin" },
  { label: "Human-computer interaction", fx: "click" },
  { label: "Low-resource system design", fx: "signal" },
  { label: "Mental health technology", fx: "heart" },
  { label: "Game design", fx: "dpad" },
];

export const offScreen = [
  { label: "Building games", fx: "blocks" },
  { label: "Football", fx: "football" },
  { label: "Basketball", fx: "basketball" },
  { label: "Board games", fx: "dice" },
  { label: "League of Legends", fx: "gg" },
  { label: "PC gaming", fx: "wasd" },
];
