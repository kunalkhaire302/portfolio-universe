import React, { useEffect, useRef, useState } from 'react';
import projects from '../data/projects.json';
import './ProjectStudy.css';

export function resolveProject(pathname) {
  const match = /^\/projects\/([a-z0-9-]+)\/?$/.exec(pathname);
  return match && projects.find(project => project.slug === match[1]);
}

function Picture({ image, hero }) {
  return <figure className="study-media">
    <img {...{ src: image.src, width: image.width, height: image.height, alt: image.alt }}
      loading={hero ? 'eager' : 'lazy'} />
    <figcaption>{image.caption}</figcaption>
  </figure>;
}

function Contents({ sections }) {
  const [active, setActive] = useState(sections[0].id);
  const menu = useRef(null);
  useEffect(() => {
    const current = () => {
      const section = [...sections].reverse().find(({ id }) =>
        document.getElementById(id).getBoundingClientRect().top <= 160);
      setActive(section?.id || sections[0].id);
    };
    current();
    window.addEventListener('scroll', current, { passive: true });
    window.addEventListener('resize', current);
    return () => {
      window.removeEventListener('scroll', current);
      window.removeEventListener('resize', current);
    };
  }, [sections]);
  const links = <ul>{sections.map(({id, title}) => <li key={id}>
    <a href={'#' + id} aria-current={active === id ? 'location' : undefined}
      onClick={() => { if (menu.current) menu.current.open = false; }}>{title}</a>
  </li>)}</ul>;
  return <nav aria-label="Article contents" className="study-contents">
    <div className="study-desktop"><strong>On this page</strong>{links}</div>
    <details ref={menu} className="study-mobile"><summary>On this page</summary>{links}</details>
  </nav>;
}

export default function ProjectStudy({ project: p }) {
  useEffect(() => {
    const title = (p?.title || 'Page not found') + ' | Kunal Khaire';
    const description = p?.description || 'Explore the project archive.';
    document.title = title;
    for (const name of ['description','twitter:description','og:description','twitter:title','og:title','og:type']) {
      const meta = document.querySelector('meta[' + (name.startsWith('og:') ? 'property' : 'name') + '="' + name + '"]');
      if (meta) meta.content = name.endsWith('title') ? title : name === 'og:type' ? 'article' : description;
    }
  }, [p]);
  if (!p) return <main className="study"><header className="study-hero">
    <small>404</small><h1>Page not found</h1><p>This project address is unavailable.</p>
    <a href="/#projects">Back to projects</a></header></main>;

  const sections = [
    { id: 'overview', title: 'At a glance', body: <>
      <ul className="technology-list">{p.technologies.map(t => <li key={t}>{t}</li>)}</ul>
      {p.role && <p>{p.role}</p>}{p.team && <p>{p.team}</p>}
      {p.upstream && <a href={p.upstream}>Upstream project on GitHub</a>}</> },
    { id: 'problem', title: 'The problem', body: p.problem },
    { id: 'solution', title: 'The solution', body: <><p>{p.solution}</p>
      {p.features && <ul className="study-list">{p.features.map(f => <li key={f}>{f}</li>)}</ul>}
      {p.screenshots?.map(image => <Picture key={image.src} image={image} />)}</> },
    { id: 'journey', title: 'User journey', body: <ol className="study-steps">{p.journey.map(s => <li key={s}>{s}</li>)}</ol> },
    { id: 'architecture', title: 'Architecture', body: p.architecture && <>
      <p>{p.architecture}</p>
      {p.requestPath && <figure className="study-flow">
        <figcaption>Request path</figcaption>
        <ol>{p.requestPath.map(layer => <li key={layer}>{layer}</li>)}</ol>
      </figure>}
    </> },
    { id: 'decisions', title: 'Engineering decisions', body: p.decision },
    { id: 'results', title: 'Results and limitations', body: (p.results || p.limitations) && <>{p.results && <p>{p.results}</p>}{p.limitations && <p>{p.limitations}</p>}</> },
  ].filter(s => s.body);
  const index = projects.indexOf(p);
  const adjacent = offset => projects[(index + offset + projects.length) % projects.length];
  return <main className="study"><article>
    <header className="study-hero">
      <a href={'/#project-' + p.id}>← Back to projects</a>
      <div className="study-meta">{p.category}<span>{p.status}</span></div>
      <h1>{p.title}</h1><p>{p.description}</p>
      <div className="study-actions"><a href={p.github}>GitHub ↗</a>{p.live && <a href={p.live}>Live demo ↗</a>}</div>
    </header>
    {p.heroImage && <Picture image={p.heroImage} hero />}
    <div className={'study-layout' + (p.featured ? ' study-layout--long' : '')}>
      {p.featured && <Contents sections={sections} />}
      <div>{sections.map(({id,title,body}) => <section id={id} key={id} className="study-section">
        <h2>{title}</h2>{typeof body === 'string' ? <p>{body}</p> : body}
      </section>)}</div>
    </div>
    <nav className="study-pagination" aria-label="More projects">
      {[-1,1].map(offset => <a key={offset} href={'/projects/' + adjacent(offset).slug}>
        <small>{offset < 0 ? 'Previous project' : 'Next project'}</small>{adjacent(offset).title}</a>)}
    </nav>
    <div className="study-end"><a href="/#projects">Back to projects</a><a href="/#contact">Get in touch</a></div>
  </article></main>;
}
