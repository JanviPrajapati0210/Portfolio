function Skills({ skillList }) {
  return (
    <section id="Skills" className="section">
      <h2 className="section__title"> Skills</h2>
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
