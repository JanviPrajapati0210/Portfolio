const PROJECTS = [
  {
    id: 'civic-voice',
    name: 'Civic Voice',
    blurb:
      'Full-stack AI-powered civic issue reporting platform built for the VIBE2SHIP hackathon. Includes an autonomous agent pipeline for duplicate detection, priority scoring, and dispatch notes.',
    stack: ['React', 'TypeScript', 'Express', 'Gemini API'],
  },
  {
    id: 'vidsnap-ai',
    name: 'VidSnap AI',
    blurb:
      'AI-powered video reel generation platform built during a summer internship, turning long-form input into short, captioned reels automatically.',
    stack: ['FastAPI', 'Flask', 'MongoDB Atlas', 'FFmpeg'],
  },
  
];

function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="section__title section__title--projects"> Projects</h2>
      <div className="projects">
        {PROJECTS.map((p) => (
          <article key={p.id} className="projects__card">
            <h3>{p.name}</h3>
            <p>{p.blurb}</p>
            <ul className="projects__stack">
              {p.stack.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
