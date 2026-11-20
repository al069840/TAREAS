import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const PHOTO_BUNNY = '/images/amigurumi-a.jpg';
const PHOTO_FLOPPY = '/images/amigurumi-b.jpg';

const lessons = [
  {
    title: 'Prepara tus materiales',
    short: 'Materiales',
    eyebrow: 'Antes de empezar',
    intro: 'No necesitas tener una caja llena de herramientas. Con lo básico puedes hacer tus primeras pruebas.',
    steps: [
      'Elige un hilo de grosor medio y un ganchillo acorde a su etiqueta. Para amigurumi suele funcionar uno ligeramente más pequeño, así el tejido queda cerrado.',
      'Ten a mano relleno, tijeras, una aguja lanera y un marcador de vueltas. Un trocito de hilo de otro color también sirve como marcador.',
      'Practica unos puntos con un hilo claro: te ayudará a distinguir cada puntada.'
    ],
    tip: 'Para tu primera pieza, usa hilo liso y de color claro. El hilo peludito es precioso, pero es más difícil ver los puntos.'
  },
  {
    title: 'Haz un anillo mágico',
    short: 'Anillo mágico',
    eyebrow: 'El comienzo de casi todo',
    intro: 'El anillo mágico permite empezar una pieza redonda y cerrar el centro sin dejar un agujero grande.',
    steps: [
      'Forma un aro con el hilo y deja un extremo suelto para poder tirar de él al final.',
      'Introduce el ganchillo en el aro y teje 6 puntos bajos dentro de él.',
      'Tira suavemente del extremo suelto hasta cerrar el centro. Coloca un marcador en el primer punto.'
    ],
    tip: 'No cortes el extremo enseguida: primero comprueba que el aro cierre bien.'
  },
  {
    title: 'Teje puntos y vueltas',
    short: 'Puntos y vueltas',
    eyebrow: 'Dale forma a tu pieza',
    intro: 'Con el punto bajo, los aumentos y las disminuciones puedes crear casi todas las formas básicas.',
    steps: [
      'Punto bajo (pb): entra en el punto, toma hilo, sácalo y pasa el hilo por las dos hebras del ganchillo.',
      'Aumento (aum): teje 2 puntos bajos dentro de un mismo punto. La vuelta tendrá más puntos y crecerá.',
      'Disminución (dis): une dos puntos en uno. Cuenta los puntos al terminar cada vuelta y mueve tu marcador.'
    ],
    tip: 'Si el patrón dice (1 pb, 1 aum) × 6, repite esa secuencia seis veces.'
  },
  {
    title: 'Rellena sin deformar',
    short: 'Relleno',
    eyebrow: 'Un poco de volumen',
    intro: 'El relleno transforma la pieza tejida en un muñeco suave. Añádelo poco a poco antes de cerrar.',
    steps: [
      'Desmenuza pequeñas porciones de relleno para repartirlas de manera uniforme.',
      'Coloca primero el relleno en las zonas pequeñas y luego en el centro de la pieza.',
      'Prueba la forma con las manos: debe sentirse firme, pero sin que el relleno se vea entre los puntos.'
    ],
    tip: 'Si la pieza se estira y aparecen huecos, retira un poco de relleno.'
  },
  {
    title: 'Arma tu amigurumi',
    short: 'Armado',
    eyebrow: 'Los detalles dan vida',
    intro: 'Antes de coser, acomoda todas las piezas con alfileres para comprobar que estén en el lugar que quieres.',
    steps: [
      'Ubica las piezas simétricamente y sujétalas de forma provisional.',
      'Con una aguja lanera y la hebra sobrante, cose alrededor de cada unión con puntadas pequeñas.',
      'Remata la hebra por dentro y borda los rasgos de la cara al final.'
    ],
    tip: 'Para un muñeco destinado a niños pequeños, prefiere los rasgos bordados frente a piezas pequeñas que puedan desprenderse.'
  }
];

const supplies = [
  { name: 'Hilo o estambre', note: 'Liso y claro para ver los puntos', mark: '◌' },
  { name: 'Ganchillo', note: 'Acorde al grosor del hilo', mark: '⌁' },
  { name: 'Relleno', note: 'Fibra para dar volumen', mark: '☁' },
  { name: 'Aguja lanera', note: 'Para unir y rematar', mark: '⌇' },
  { name: 'Marcador de vueltas', note: 'Para no perder el inicio', mark: '✳' },
  { name: 'Tijeras', note: 'Para los últimos detalles', mark: '✂' }
];

const glossary = [
  { term: 'Anillo mágico', definition: 'Aro ajustable en el que se tejen los primeros puntos de una pieza circular.' },
  { term: 'Punto bajo (pb)', definition: 'Puntada básica y compacta que se usa con frecuencia en amigurumis.' },
  { term: 'Aumento (aum)', definition: 'Dos puntos bajos tejidos en el mismo punto para ampliar una vuelta.' },
  { term: 'Disminución (dis)', definition: 'Dos puntos que se unen en uno para reducir el tamaño de una vuelta.' },
  { term: 'Vuelta', definition: 'Una serie completa de puntos alrededor de la pieza.' },
  { term: 'Rematar', definition: 'Asegurar y esconder una hebra al terminar de tejer o coser.' }
];

const pattern = [
  ['Vuelta 1', 'Anillo mágico con 6 pb', '6 puntos'],
  ['Vuelta 2', '1 aum en cada punto', '12 puntos'],
  ['Vuelta 3', '(1 pb, 1 aum) × 6', '18 puntos'],
  ['Vueltas 4–6', '1 pb en cada punto', '18 puntos'],
  ['Vuelta 7', '(1 pb, 1 dis) × 6; rellena', '12 puntos'],
  ['Vuelta 8', '6 dis; cierra y remata', '6 puntos']
];

function Sparkle({ className = '' }) {
  return <span aria-hidden="true" className={`sparkle ${className}`}>✦</span>;
}

function App() {
  const [activeLesson, setActiveLesson] = useState(1);
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem('entre-hilos-materiales') || '[]'); }
    catch { return []; }
  });
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { localStorage.setItem('entre-hilos-materiales', JSON.stringify(checked)); }, [checked]);

  const toggleSupply = (name) => {
    setChecked(current => current.includes(name) ? current.filter(item => item !== name) : [...current, name]);
  };

  const lesson = lessons[activeLesson];
  const filteredGlossary = glossary.filter(item => `${item.term} ${item.definition}`.toLocaleLowerCase('es').includes(query.toLocaleLowerCase('es')));

  const selectLesson = (index) => {
    setActiveLesson(index);
    document.getElementById('guia')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="header-inner container">
          <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Entre Hilos, volver al inicio">
            <span className="brand-ball" aria-hidden="true">◉</span>
            <span>Entre Hilos</span><span className="brand-heart" aria-hidden="true">♡</span>
          </a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </button>
          <nav className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Navegación principal">
            <a href="#inicio" onClick={closeMenu}>Inicio</a>
            <a href="#materiales" onClick={closeMenu}>Materiales</a>
            <a href="#guia" onClick={closeMenu}>Técnicas</a>
            <a href="#proyecto" onClick={closeMenu}>Primer proyecto</a>
            <a href="#glosario" onClick={closeMenu}>Glosario</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-glow"></div>
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow"><span aria-hidden="true">✳</span> Guía para empezar desde cero</span>
              <h1>De un ovillo a tu <em>primer amigurumi.</em></h1>
              <p>Aprende a tejer muñequitos a tu ritmo: conoce los materiales, practica las técnicas básicas y crea tu primera pieza paso a paso.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#guia">Empezar a aprender</a>
                <a className="button button-outline" href="#materiales">Ver materiales</a>
              </div>
              <div className="hero-note"><span aria-hidden="true">♡</span> Un punto a la vez, sin prisas.</div>
            </div>
            <div className="hero-art" aria-label="Dos amigurumis tejidos a crochet">
              <div className="hero-photo hero-photo-back"><img src={PHOTO_FLOPPY} alt="Amigurumi color crema de orejas caídas y carita bordada en azul" /></div>
              <div className="hero-photo hero-photo-front"><img src={PHOTO_BUNNY} alt="Amigurumi blanco con orejas largas y bufanda rosa" /></div>
              <div className="photo-sticker"><span aria-hidden="true">✦</span> hechos con cariño <span aria-hidden="true">✦</span></div>
              <Sparkle className="sparkle-one" /><Sparkle className="sparkle-two" />
            </div>
          </div>
          <div className="hero-bottom-wave" aria-hidden="true"></div>
        </section>

        <section className="intro-strip container" aria-label="Ruta de aprendizaje">
          <div className="intro-heading"><span className="little-star" aria-hidden="true">✳</span><span>Tu ruta<br /><strong>de aprendizaje</strong></span></div>
          <div className="route">
            {lessons.map((item, index) => (
              <button key={item.short} type="button" onClick={() => selectLesson(index)} className={`route-step ${activeLesson === index ? 'route-active' : ''}`} aria-label={`Ir a ${item.short}`}>
                <span className="route-dot">{index + 1}</span>
                <span>{item.short}</span>
              </button>
            ))}
          </div>
        </section>

        <section id="materiales" className="section supplies-section">
          <div className="container">
            <div className="section-heading split-heading">
              <div><span className="eyebrow">Antes del primer punto</span><h2>Arma tu pequeño <em>kit de tejido</em></h2></div>
              <p>Marca lo que ya tienes. La lista se guarda en este navegador para que puedas continuar después.</p>
            </div>
            <div className="supplies-grid">
              {supplies.map(item => (
                <button key={item.name} type="button" aria-pressed={checked.includes(item.name)} onClick={() => toggleSupply(item.name)} className={`supply-card ${checked.includes(item.name) ? 'supply-checked' : ''}`}>
                  <span className="supply-icon" aria-hidden="true">{item.mark}</span>
                  <span className="supply-text"><strong>{item.name}</strong><small>{item.note}</small></span>
                  <span className="checkmark" aria-hidden="true">{checked.includes(item.name) ? '✓' : '+'}</span>
                </button>
              ))}
            </div>
            <div className="supply-status" role="status">{checked.length === 0 ? 'Empieza marcando los materiales que ya tienes.' : `${checked.length} de ${supplies.length} materiales listos. ¡Vas muy bien!`}</div>
          </div>
        </section>

        <section id="guia" className="section guide-section">
          <div className="container">
            <div className="section-heading guide-heading"><span className="eyebrow">Aprende conmigo</span><h2>Tu guía, <em>paso a paso</em></h2><p>Elige una etapa para ver sus instrucciones. Puedes volver a cualquiera cuando lo necesites.</p></div>
            <div className="lesson-layout">
              <div className="lesson-nav" aria-label="Etapas de la guía">
                {lessons.map((item, index) => <button key={item.short} type="button" className={`lesson-tab ${index === activeLesson ? 'lesson-tab-active' : ''}`} onClick={() => setActiveLesson(index)} aria-current={index === activeLesson ? 'step' : undefined}><span className="lesson-number">{String(index + 1).padStart(2, '0')}</span><span>{item.short}</span><span className="lesson-indicator" aria-hidden="true">✦</span></button>)}
              </div>
              <article className="lesson-card">
                <div className="lesson-topline"><span>Etapa {activeLesson + 1} de {lessons.length}</span><div className="progress-track" aria-label={`Progreso: etapa ${activeLesson + 1} de ${lessons.length}`}><span style={{ width: `${((activeLesson + 1) / lessons.length) * 100}%` }}></span></div></div>
                <span className="eyebrow lesson-eyebrow">{lesson.eyebrow}</span>
                <h3>{lesson.title}</h3>
                <p className="lesson-intro">{lesson.intro}</p>
                <ol className="lesson-steps">{lesson.steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol>
                <div className="tip-box"><span aria-hidden="true">✧</span><p><strong>Tip entre hilos:</strong> {lesson.tip}</p></div>
                <div className="lesson-actions">
                  {activeLesson > 0 && <button type="button" className="text-button" onClick={() => setActiveLesson(activeLesson - 1)}>Paso anterior</button>}
                  {activeLesson < lessons.length - 1 ? <button type="button" className="button button-primary" onClick={() => setActiveLesson(activeLesson + 1)}>Siguiente paso</button> : <a className="button button-primary" href="#proyecto">Ir al primer proyecto</a>}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="proyecto" className="section project-section">
          <div className="container project-grid">
            <div className="project-copy">
              <span className="eyebrow">Ahora sí, manos al hilo</span>
              <h2>Tu primer proyecto: <em>una mini bolita</em></h2>
              <p>Una forma redondita es perfecta para practicar vueltas, aumentos, disminuciones y relleno. Al final puedes bordarle una carita y convertirla en tu primer amigurumi.</p>
              <div className="pattern-card">
                <div className="pattern-title"><strong>Patrón de práctica</strong><span>pb = punto bajo · aum = aumento · dis = disminución</span></div>
                <div className="pattern-rows">
                  {pattern.map(([round, instruction, count]) => <div className="pattern-row" key={round}><strong>{round}</strong><span>{instruction}</span><small>{count}</small></div>)}
                </div>
              </div>
              <p className="project-footnote">Al cerrar, pasa la hebra por los puntos restantes, ajusta suavemente y escóndela dentro de la pieza.</p>
            </div>
            <div className="project-gallery">
              <div className="gallery-label"><span aria-hidden="true">♡</span> Lo que puede nacer de tus primeras puntadas</div>
              <figure className="gallery-main"><img src={PHOTO_FLOPPY} alt="Amigurumi crema de orejas caídas sobre una tela suave" /><figcaption>Inspírate con las formas suaves y una carita bordada.</figcaption></figure>
              <figure className="gallery-small"><img src={PHOTO_BUNNY} alt="Amigurumi blanco con bufanda rosa" /><figcaption>Los accesorios le dan personalidad a cada creación.</figcaption></figure>
              <Sparkle className="gallery-sparkle" />
            </div>
          </div>
        </section>

        <section id="glosario" className="section glossary-section">
          <div className="container glossary-grid">
            <div className="glossary-intro"><span className="eyebrow">Para que nada suene a chino</span><h2>Un glosario <em>sin enredos</em></h2><p>Estos son los términos que encontrarás más seguido al leer patrones de amigurumi.</p><div className="yarn-doodle" aria-hidden="true">♡ 〰 ✳</div></div>
            <div className="glossary-panel">
              <label htmlFor="glossary-search">Busca una palabra</label>
              <input id="glossary-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Por ejemplo: aumento" />
              <div className="glossary-items">{filteredGlossary.length ? filteredGlossary.map(item => <details key={item.term}><summary>{item.term}<span aria-hidden="true">+</span></summary><p>{item.definition}</p></details>) : <p className="no-results">No encontramos esa palabra. Prueba con otra.</p>}</div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer"><div className="container footer-inner"><div><strong>Entre Hilos <span aria-hidden="true">♡</span></strong><p>Aprender también es ir punto por punto.</p></div><a href="#inicio">Volver al inicio</a></div></footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
