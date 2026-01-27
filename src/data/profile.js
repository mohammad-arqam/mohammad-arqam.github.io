export const profile = {
  name: "Mohammad Arqam",
  headline: "Software Engineering Intern • Full-Stack + Distributed Systems • React / Node / Networking",
  location: "Winnipeg, MB",
  resume: "/Mohammad_Arqam_Resume.pdf",
  socials: {
    github: "https://github.com/mohammad-arqam",
    linkedin: "https://linkedin.com/in/mohammadarqam",
  },
  about: [
    "Computer Science student with hands-on experience building low-level networking systems, distributed architectures, and production-style full-stack applications.",
    "Strong background in socket programming, concurrency, protocol design, system performance analysis, and user-facing application development."
  ],
  skills: [
    "Java", "C", "C++", "Python", "SQL", "JavaScript", "HTML", "React", "Node.js",
    "TCP/IP Sockets", "Concurrency", "REST APIs", "PostgreSQL", "Neo4j",
    "Docker", "Git/GitHub", "GitHub Actions", "Linux CLI"
  ],
  coursework: [
    "Data Structures & Algorithms",
    "Operating Systems",
    "Distributed Systems",
    "Databases",
    "Software Engineering",
    "Human-Computer Interaction",
    "Artificial Intelligence",
    "Computer Networks"
  ],
  highlights: [
    { label: "Focus", value: "Full-stack + Systems" },
    { label: "Strengths", value: "Networking + APIs" },
    { label: "Stack", value: "React / Node / SQL" },
  ],
  experience: [
    {
      role: "Vehicle Service Agent",
      company: "Hertz Car Rental",
      dates: "Aug 2025 – Present",
      bullets: [
        "Operated under strict timelines to inspect, document, and prepare vehicles while coordinating with teammates.",
        "Maintained operational throughput and safety compliance in a fast-paced environment."
      ]
    },
    {
      role: "Security Guard",
      company: "Impact Security",
      dates: "2022 – 2024",
      bullets: [
        "Conducted patrols, enforced policies, handled incidents, and produced detailed reports in high-pressure environments."
      ]
    }
  ],
  projects: [
    {
      title: "TableTrack",
      tag: "Full-stack",
      stack: ["React", "Node.js", "Express", "PostgreSQL", "Docker", "GitHub Actions"],
      blurb:
        "Service-oriented restaurant reservation & management platform with authentication, RBAC, REST APIs, transactional booking integrity, and responsive UI.",
      links: {
        repo: "https://github.com/mohammad-arqam/TableTrack",
        demo: "",
      },
      featured: true,
    },
    {
      title: "TreeDrive",
      tag: "Systems",
      stack: ["Python", "TCP Sockets", "Concurrency", "Protocol Design"],
      blurb:
        "Stateful file sharing server with a custom app-layer protocol over TCP supporting authenticated upload/download/delete and metadata queries; load-tested with concurrent clients.",
      links: { repo: "https://github.com/mohammad-arqam/Distributed-TreeDrive-SocketServer", demo: "" },
      featured: true,
    },
    {
      title: "TreeOne",
      tag: "Systems",
      stack: ["Python", "HTTP", "Multithreading", "C (sockets)"],
      blurb:
        "Multi-threaded HTTP server with request parsing and routing; integrated with TreeDrive via sockets and built a C-based HTTP screen scraper for automated robustness testing.",
      links: { repo: "https://github.com/mohammad-arqam/Distributed-TreeSharingWeb", demo: "" },
      featured: false,
    },
    {
      title: "TreePeer",
      tag: "Distributed",
      stack: ["Python", "P2P", "Gossip Protocols", "Eventual Consistency"],
      blurb:
        "Decentralized P2P file sharing with gossip-based peer discovery and metadata sync; designed ANNOUNCE/GET_FILE/DELETE/replication messages and a live HTML stats dashboard.",
      links: { repo: "https://github.com/mohammad-arqam/Distributed-P2PFileSharing", demo: "" },
      featured: true,
    },
{
  title: "StudyBuddy",
  tag: "Mobile",
  stack: ["Java", "Android", "SQLite", "Espresso Testing"],
  blurb:
    "Android flashcard and quiz application built in a team environment, featuring local persistence, modular activities, and automated UI testing.",
  links: { repo: "https://github.com/mohammad-arqam/Group-Android-StudyBuddy", demo: "" },
  featured: true,
},
    {
      title: "Demeter’s Garden",
      tag: "Web",
      stack: ["HTML", "CSS", "JavaScript"],
      blurb:
        "Restaurant discovery & reservation web app with dynamic UI for browsing restaurants, menus, reviews, and reservation management with a focus on usability and accessibility.",
      links: { repo: "https://github.com/mohammad-arqam/Group-DemetersGarden", demo: "" },
      featured: true,
    },
    {
      title: "Garbage Collection Simulator",
      tag: "Systems",
      stack: ["C", "Memory Management"],
      blurb:
        "Fixed-size heap allocator featuring reference counting, compaction, and memory reuse with diagnostic tools to inspect heap state and debug fragmentation/leaks.",
      links: { repo: "https://github.com/mohammad-arqam/C-GarbageManagement", demo: "" },
      featured: false,
    }
  ],
};
