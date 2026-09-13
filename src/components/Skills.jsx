function Skills({ skillList }) {
  return (
    <section id="skills" className="section">
      <h2 className="section__title section__title--skills"> Skills</h2>
      <ul className="skills">
        {skillList.map((s) => (
          <li key={s} className="skills__tag">
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;
