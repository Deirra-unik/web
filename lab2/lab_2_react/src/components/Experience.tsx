interface ExperienceItem {
  title: string;
  period: string;
  description: string;
  bullets?: string[];
  technologies?: string;
  links?: { label: string; href: string }[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Team Lead / Back-end Developer — MarketReveal",
    period: "September 2024 — Present",
    description:
      "MarketReveal is a project that automatically searches and collects listings from marketplaces like OLX, helping users quickly find the best products at competitive prices.",
    bullets: [
      "Led a team of 4 developers",
      "Coordinated tasks, quality control, and component integration",
    ],
    technologies:
      "TypeScript, Nest.js, GrammyJS, PostgreSQL, Sequelize, Redis, Git, GitHub, Docker, Docker-compose, SOLID, Jira, SCRUM.",
    links: [
      { label: "GitHub Repository", href: "#" },
      { label: "Live Project", href: "#" },
    ],
  },
  {
    title: "Back-end Developer — NDA Project",
    period: "March 2024 — September 2024",
    description: "Details are confidential (NDA).",
  },
  {
    title: "Back-end Developer — IMEI Checker (Telegram Bot)",
    period: "September 2023 — Present",
    description:
      "A Telegram bot wrapper for multiple existing IMEI checker services, providing more comfortable access to them inside Telegram.",
    technologies:
      "JavaScript, Express.js, GrammyJS, PostgreSQL, Sequelize, Redis, Docker, Docker-compose.",
  },
];

const Experience: React.FC = () => {
  return (
    <section className="py-8 border-b border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Experience</h2>
      <div className="flex flex-col gap-4">
        {experiences.map((item: ExperienceItem, index: number) => (
          <article
            key={index}
            className="bg-gray-50 rounded-xl p-5 border border-gray-100 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
            <p className="text-sm text-green-600 font-medium mb-3">{item.period}</p>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">{item.description}</p>

            {item.bullets && (
              <ul className="list-disc list-inside text-sm text-gray-600 mb-3 space-y-1">
                {item.bullets.map((bullet: string, i: number) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            )}

            {item.technologies && (
              <p className="text-sm text-gray-500 mb-3">
                <span className="font-semibold text-gray-700">Technologies: </span>
                {item.technologies}
              </p>
            )}

            {item.links && (
              <div className="flex gap-4">
                {item.links.map((link, i: number) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-green-600 hover:text-green-800 underline transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
