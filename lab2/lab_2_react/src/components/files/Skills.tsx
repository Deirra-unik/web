function Skills() {
  const skills = [
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

  const languages = [
    "Ukrainian — C2 (Native)",
    "English — B1 (Intermediate)",
  ];

  return (
    <section>
      <h2>Skills</h2>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h2>Languages</h2>
      <ul>
        {languages.map((lang, index) => (
          <li key={index}>{lang}</li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
