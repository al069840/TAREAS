import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const projects = [
  {
    number: '01',
    title: 'Fora de Lugar',
    type: 'VIDEOJUEGO · GODOT',
    description: 'Un juego sobre estudiar, trabajar y construir un hogar lejos de casa. Incluye minijuegos para convivir y conectar con estudiantes foráneos.',
    tags: ['Godot', 'Pixel art', 'Narrativa'],
    accent: 'coral',
    symbol: '✦',
    links: [
      { label: 'Jugar demo ↗', href: 'https://al075462uacammx.itch.io/fora-de-lugar-demo' },
      { label: 'Ver sitio ↗', href: 'https://fora-pagina-informativa.pages.dev/' },
    ],
  },
  {
    number: '02',
    title: 'Kirbyoncé',
    type: 'JUEGO · PROGRAMACIÓN',
    description: 'Un jueguito de Kirby con personalidad de diva pop y un menú para personalizar la experiencia: velocidad, tamaño y colores.',
    tags: ['Java', 'Interfaz', 'Juego'],
    accent: 'pink',
    symbol: '♡',
    links: [],
  },
  {
    number: '03',
    title: 'Entre Hilos',
    type: 'SITIO WEB · HOBBY',
    description: 'Una página para compartir mi hobby: aprender crochet y crear amigurumis, explicando los primeros pasos de manera sencilla.',
    tags: ['GitHub Pages', 'Diseño web', 'Amigurumi'],
    accent: 'lilac',
    symbol: '✿',
    links: [{ label: 'Visitar sitio ↗', href: 'https://al069840.github.io/TAREAS/' }],
  },
  {
    number: '04',
    title: 'NASA Space Apps Challenge',
    type: 'HACKATHON · COLABORACIÓN',
    description: 'Participé con mi equipo en el reto internacional de NASA Space Apps. Este video muestra el trabajo presentado por el equipo.',
    tags: ['NASA Space Apps', 'Trabajo en equipo', 'Innovación'],
    accent: 'mint',
    symbol: '✧',
    links: [{ label: 'Ver presentación ↗', href: 'https://www.youtube.com/watch?v=nL31a0s6I7Y' }],
  },
];

const academic = [
  { icon: '⌁', title: 'Control de temperatura', text: 'Práctica con Arduino, sensor DHT11, relé e histéresis para controlar un foco.' },
  { icon: '▦', title: 'Cafetería de Cofi y Casandra', text: 'Modelado de datos para Apache Cassandra: consultas, modelo lógico y sentencias CQL.' },
  { icon: '✿', title: 'Arte y diseño para juegos', text: 'Personajes, escenarios, sprites y elementos visuales en pixel art para proyectos propios.' },
];

function PixelSparkle({ className = '' }) {
  return <span className={`sparkle ${className}`} aria-hidden="true">✦</span>;
}

function Header() {
  return (
    <header className="topbar">
      <a className="wordmark" href="#inicio" aria-label="Ir al inicio">mf<span>.exe</span><i>✦</i></a>
      <nav aria-label="Navegación principal">
        <a href="#proyectos">proyectos</a>
        <a href="#sobre-mi">sobre mí</a>
        <a href="#contacto" className="nav-contact">contacto <span>↗</span></a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-copy">
        <div className="status"><span className="status-dot" /> PORTAFOLIO CARGADO <span className="status-version">v.2026</span></div>
        <p className="eyebrow">HOLA, SOY MARIA FERNANDA <span>♡</span></p>
        <h1>Creo cosas<br /><em>que cuentan</em><br />historias<span className="period">.</span></h1>
        <p className="hero-text">Estudiante de Tecnología de Software, creadora de videojuegos y diseñadora de experiencias digitales. Me gusta mezclar código, ideas y un poquito de glitter.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#proyectos">Explorar proyectos <span>↓</span></a>
          <a className="button button-ghost" href="#sobre-mi">Conóceme <span>↗</span></a>
        </div>
        <div className="hero-footnote"><span className="tiny-cross">+</span> HECHO CON CURIOSIDAD EN CAMPECHE, MX</div>
        <div className="hero-badges"><span>✦ GAME DEV</span><span>⌘ SOFTWARE</span><span>♡ PIXEL ART</span></div>
      </div>
      <div className="hero-art" aria-label="Ilustración pixel art de mi portafolio">
        <div className="art-grid" />
        <PixelSparkle className="sparkle-one" />
        <PixelSparkle className="sparkle-two" />
        <figure className="hero-image-frame">
          <img src="./assets/mi-portafolio.png" alt="Ilustración pixel art con el título Mi Portafolio" />
        </figure>
      </div>
      <div className="scroll-cue"><span /> SCROLL PARA EXPLORAR</div>
    </section>
  );
}

function Ticker() {
  const items = ['SOFTWARE', 'PIXEL ART', 'VIDEOJUEGOS', 'IDEAS CON HISTORIA', 'AMIGURUMIS', 'CREATIVIDAD'];
  return (
    <div className="ticker" aria-label="Mis intereses">
      <div className="ticker-track">{[...items, ...items].map((item, index) => <span key={`${item}-${index}`}>{item}<b>✦</b></span>)}</div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className={`project-card reveal ${project.accent}`}>
      <div className="project-top"><span className="project-number">{project.number} / PROJECT</span><span className="project-symbol">{project.symbol}</span></div>
      <div className="project-illustration"><div className="illust-orb">{project.symbol}</div><span className="illust-star star-a">✦</span><span className="illust-star star-b">✧</span><span className="illust-grid-label">MF_STUDIO.exe</span><span className="illust-lines" /></div>
      <div className="project-info">
        <p className="project-type">{project.type}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="tag-list">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <div className="project-links">
          {project.links.length ? project.links.map(link => <a key={link.label} href={link.href} target="_blank" rel="noreferrer">{link.label}</a>) : <span className="soon-label">PROYECTO ACADÉMICO <span>✦</span></span>}
        </div>
      </div>
    </article>
  );
}

function About() {
  return (
    <section className="about-section section-wrap reveal" id="sobre-mi">
      <div className="section-heading about-title"><p className="eyebrow">01 — UN POCO SOBRE MÍ</p><h2>La persona detrás<br />del <em>pixel.</em></h2><figure className="about-portrait"><img src="./assets/maria-fernanda.png" alt="Retrato de Maria Fernanda" /><figcaption>THE PERSON BEHIND THE PIXEL <span>✦</span></figcaption></figure></div>
      <div className="about-content">
        <p className="about-lead">Soy Maria Fernanda Suarez Arias, estudiante de Tecnología de Software en Campeche. Disfruto crear proyectos que mezclan tecnología con creatividad: desde un juego con una historia cercana hasta una página para enseñar algo que me encanta.</p>
        <p className="about-note">Cuando no estoy programando, probablemente estoy haciendo crochet, dibujando un personaje o pensando en mi siguiente idea. <span>✿</span></p>
        <div className="skills-block"><p className="mini-label">MI CAJITA DE HERRAMIENTAS</p><div className="skill-pills"><span>React <small>aprendiendo</small></span><span>Java</span><span>Godot</span><span>Arduino</span><span>HTML / CSS</span><span>Cassandra</span><span>Pixel art</span><span>GitHub Pages</span></div></div>
      </div>
    </section>
  );
}

function Certificate() {
  return (
    <section className="certificate section-wrap reveal">
      <div className="cert-stamp">CERT<br />IFIED<br /><b>✦</b></div>
      <div className="cert-main"><p className="eyebrow">02 — APRENDIZAJE CONTINUO</p><h2>Redes que conectan.</h2><p>Certificado de Cisco Networking Academy en <strong>Introduction to Networks</strong>. Una base para comprender cómo se comunican los dispositivos y cómo se construyen las redes.</p></div>
      <div className="cert-meta"><span>CISCO<br />NETWORKING ACADEMY</span><span className="cert-line" /><span>INTRODUCTION<br />TO NETWORKS</span></div>
    </section>
  );
}

function Academic() {
  return (
    <section className="academic-section section-wrap reveal">
      <div className="section-heading compact"><p className="eyebrow">03 — EN MI CUADERNO</p><h2>Más experimentos<br /><em>y proyectos.</em></h2></div>
      <div className="academic-list">{academic.map((item, i) => <article className="academic-item" key={item.title}><span className="academic-icon">{item.icon}</span><span className="academic-num">0{i + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><span className="academic-arrow">↗</span></article>)}</div>
    </section>
  );
}

function Contact() {
  return (
    <footer className="contact-section reveal" id="contacto">
      <div className="contact-inner"><div><p className="eyebrow">04 — SIGUIENTE NIVEL</p><h2>¿Hacemos algo<br /><em>bonito?</em></h2><p className="contact-text">Estoy abierta a colaborar, aprender y convertir nuevas ideas en proyectos.</p></div><a className="contact-button" href="https://github.com/al069840" target="_blank" rel="noreferrer">Encuéntrame <span>↗</span></a><PixelSparkle className="footer-sparkle" /></div>
      <div className="footer-bottom"><a className="wordmark" href="#inicio">mf<span>.exe</span><i>✦</i></a><span>DISEÑADO CON ♥, CAFÉ Y PIXELES</span><a href="#inicio">VOLVER ARRIBA ↑</a></div>
    </footer>
  );
}

function App() {
  React.useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <><div className="page-shell"><Header /><main><Hero /><Ticker /><section className="projects-section section-wrap" id="proyectos"><div className="section-heading projects-heading"><div><p className="eyebrow">00 — MIS COSAS FAVORITAS</p><h2>Unos proyectos<br /><em>con corazón.</em></h2></div><p className="section-aside">Cada idea empieza en algún lugar.<br />Estas empezaron aquí <span>↓</span></p></div><div className="project-stats" aria-label="Resumen de proyectos"><div className="stat-tile"><strong>04</strong><span>PROYECTOS<br />DESTACADOS</span><i>✦</i></div><div className="stat-tile"><strong>01</strong><span>NASA SPACE<br />APPS CHALLENGE</span><i>✧</i></div><div className="stat-tile"><strong>01</strong><span>CISCO<br />CERTIFICATE</span><i>⌘</i></div></div><div className="project-grid">{projects.map(project => <ProjectCard project={project} key={project.number} />)}</div></section><About /><Certificate /><Academic /><Contact /></main></div></>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);

