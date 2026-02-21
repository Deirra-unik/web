interface EducationItem {
  institution: string;
  degree: string;
  period: string;
}

const educationList: EducationItem[] = [
  {
    institution: "Lviv Polytechnic National University",
    degree: "Cyber Security",
    period: "September 2023 — Present",
  },
];

const Education: React.FC = () => {
  return (
    <section className="py-8 border-b border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Education</h2>
      <div className="flex flex-col gap-4">
        {educationList.map((item: EducationItem, index: number) => (
          <article
            key={index}
            className="bg-gray-50 rounded-xl p-5 border border-gray-100 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.institution}</h3>
            <p className="text-sm text-green-600 font-medium mb-1">{item.degree}</p>
            <p className="text-sm text-gray-500">{item.period}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Education;
