const skills: string[] = [
  "JavaScript, TypeScript",
  "HTML / CSS",
  "Express.js, Nest.js",
  "React, Redux",
  "GrammyJS",
  "PostgreSQL, Sequelize",
  "Redis",
  "Git, GitHub",
  "Docker, Docker-compose",
  "HTTP / HTTPS, REST API",
  "Clean Code, SOLID Principles",
  "Jira, SCRUM",
];

interface Language {
  name: string;
  level: string;
}

const languages: Language[] = [
  { name: "Ukrainian", level: "C2 (Native)" },
  { name: "English", level: "B1 (Intermediate)" },
];

const Skills: React.FC = () => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2>
      <ul className="flex flex-wrap gap-2 mb-8">
        {skills.map((skill: string, index: number) => (
          <li
            key={index}
            className="bg-gray-900 text-green-400 text-sm font-medium px-3 py-1 rounded-full"
          >
            {skill}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Languages</h2>
      <ul className="flex flex-wrap gap-3">
        {languages.map((lang: Language, index: number) => (
          <li
            key={index}
            className="bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg border border-gray-200"
          >
            <span className="font-semibold">{lang.name}</span> — {lang.level}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
