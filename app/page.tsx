"use client";

import type { CSSProperties, FormEvent } from "react";
import { useState } from "react";

const useCases = [
  ["Satellite arrays", "Higher power payloads and denser constellations need lighter thermal rejection that can scale by module instead of by bespoke structure."],
  ["Orbital compute", "Space-based data centers and edge inference platforms turn sunlight into compute, then immediately hit a waste-heat ceiling."],
  ["Industrial spacecraft", "Mining, servicing, tug, and manufacturing vehicles need thermal systems sized for sustained work cycles rather than short bursts."],
];

const team = [
  {
    name: "Calder Russell",
    role: "CEO and Lead Engineer",
    copy: "Current MIT student pursuing aerospace engineering and applied mathematics, leading VoidCool's technical architecture across droplet radiator physics, spacecraft integration, and manufacturable thermal modules.",
    linkedin: "https://www.linkedin.com/in/calder-russell/",
  },
  {
    name: "Thermal Advisory",
    role: "Spacecraft heat transfer",
    copy: "Recruiting advisors across thermal-vacuum testing, fluid stability, droplet control, and radiator qualification.",
  },
  {
    name: "Manufacturing Partners",
    role: "Scale-up and integration",
    copy: "Engaging suppliers for precision emitters, recapture assemblies, flight materials, and repeatable module production.",
  },
];

const milestones = [
  ["Now", "Concept modeling and modular architecture"],
  ["2026", "Bench-scale droplet loop prototype"],
  ["2027", "Thermal-vacuum characterization"],
  ["2028", "Hosted payload flight demonstration"],
];

const droplets = Array.from({ length: 54 }, (_, index) => {
  const row = Math.floor(index / 9);
  const col = index % 9;
  return {
    "--x": `${39 + col * 5.1 + row * 1.15}%`,
    "--y": `${29 + row * 7 + ((col % 3) - 1) * 1.2}%`,
    "--size": `${4 + ((index + row) % 4)}px`,
    "--alpha": `${0.42 + (index % 5) * 0.1}`,
  } as CSSProperties;
});

export default function Home() {
  const [status, setStatus] = useState("Ready to route mission inquiries.");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name")?.toString().trim() ?? "",
      email: data.get("email")?.toString().trim() ?? "",
      company: data.get("company")?.toString().trim() ?? "",
      interest: data.get("interest")?.toString().trim() ?? "",
      message: data.get("message")?.toString().trim() ?? "",
    };

    setIsSubmitting(true);
    setStatus("Sending your inquiry...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to send inquiry.");
      }

      setStatus(`Thanks, ${payload.name || "there"}. Your inquiry was sent to Calder.`);
      form.reset();
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Unable to send inquiry. Please email calderr@mit.edu directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="VoidCool home">
          <span className="brand-mark" aria-hidden="true" />
          <span>VoidCool</span>
        </a>
        <div className="nav-links">
          <a href="#technology">Technology</a>
          <a href="#markets">Markets</a>
          <a href="#team">Team</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">Modular liquid droplet radiators</p>
          <h1>VoidCool</h1>
          <p className="hero-copy">
            Mass-manufacturable heat rejection for the next generation of sun-powered space infrastructure.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">Request technical brief</a>
            <a className="button button-secondary" href="#technology">Explore architecture</a>
          </div>
        </div>
        <div className="mission-panel" aria-label="VoidCool mission metrics">
          <div><span>Use case</span><strong>Megawatt-class orbital systems</strong></div>
          <div><span>Form factor</span><strong>Swappable radiator modules</strong></div>
          <div><span>Design goal</span><strong>High surface area, lower mass</strong></div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="section-header split">
          <div>
            <p className="eyebrow">The constraint layer</p>
            <h2>Heat is becoming the hard limit on what can be built in orbit.</h2>
          </div>
          <p>
            Space platforms can gather abundant solar power, but every watt used by electronics, propulsion support, robotics, sensors, or compute becomes waste heat. In vacuum, there is no air to carry that heat away.
          </p>
        </div>
        <div className="problem-grid">
          <article><span>01</span><h3>Radiation is the path out</h3><p>Heat rejection depends on radiating energy into space, making surface area and temperature control mission-level constraints.</p></article>
          <article><span>02</span><h3>Mass scales too quickly</h3><p>Conventional radiator area can become a launch-cost penalty as spacecraft move toward higher duty cycles and power density.</p></article>
          <article><span>03</span><h3>Infrastructure wants standard parts</h3><p>Satellite arrays, orbital compute, and industrial spacecraft need repeatable thermal modules instead of one-off radiator geometry.</p></article>
        </div>
      </section>

      <section className="image-band" aria-label="Orbital thermal context">
        <img src="https://svs.gsfc.nasa.gov/vis/a030000/a031300/a031347/pettit-irosa_med.jpg" alt="International Space Station solar arrays above Earth" />
        <div>
          <p className="eyebrow">Designed for orbital scale</p>
          <h2>More sunlight means more power. More power means more heat.</h2>
          <p>VoidCool is developing radiator modules for spacecraft operators who need heat rejection to scale with infrastructure, not hold it back.</p>
        </div>
      </section>

      <section className="section technology" id="technology">
        <div className="section-header">
          <p className="eyebrow">Architecture</p>
          <h2>A liquid droplet radiator, packaged as a repeatable module.</h2>
          <p>
            The concept uses a controlled working fluid loop that emits a thin droplet sheet into vacuum, lets the droplets radiate heat directly, then recaptures and recirculates them inside a modular spacecraft interface.
          </p>
        </div>
        <div className="tech-layout">
          <div className="radiator-visual" aria-hidden="true">
            <div className="bus" />
            <div className="emitter" />
            <div className="collector" />
            <div className="droplet-field">
              {droplets.map((style, index) => <span key={index} style={style} />)}
            </div>
            <div className="heat-tag">waste heat in</div>
            <div className="cold-tag">radiative flux out</div>
          </div>
          <div className="steps">
            <article><span>1</span><h3>Absorb heat</h3><p>Interface with spacecraft payloads, buses, or compute racks.</p></article>
            <article><span>2</span><h3>Emit droplets</h3><p>Create a high-area sheet of controlled liquid micro-droplets.</p></article>
            <article><span>3</span><h3>Radiate to space</h3><p>Reject thermal energy without relying on convection or fans.</p></article>
            <article><span>4</span><h3>Recapture fluid</h3><p>Close the loop for repeated operation and modular servicing.</p></article>
          </div>
        </div>
      </section>

      <section className="section markets" id="markets">
        <div className="section-header split">
          <div>
            <p className="eyebrow">Where it matters</p>
            <h2>Built for the space economy's highest heat loads.</h2>
          </div>
          <p>
            VoidCool is focused on customers whose missions become more valuable when power, compute, and duty cycle can increase without a matching radiator mass penalty.
          </p>
        </div>
        <div className="market-grid">
          {useCases.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="roadmap">
        <div><p className="eyebrow">Development path</p><h2>From fluid loop to flight demonstration.</h2></div>
        <div className="timeline">
          {milestones.map(([date, copy]) => <div key={date}><strong>{date}</strong><span>{copy}</span></div>)}
        </div>
      </section>

      <section className="section team" id="team">
        <div className="section-header">
          <p className="eyebrow">Team</p>
          <h2>A founding company for the thermal infrastructure era.</h2>
          <p>VoidCool is led by founder Calder Russell and is assembling spacecraft thermal, precision fluidics, and scalable manufacturing talent around one core belief: space hardware needs standard thermal building blocks.</p>
        </div>
        <div className="team-grid">
          {team.map(({ name, role, copy, linkedin }) => (
            <article key={name}>
              <div className="avatar" aria-hidden="true">{name.split(" ").map((word) => word[0]).join("").slice(0, 2)}</div>
              <span>{role}</span>
              <h3>{name}</h3>
              <p>{copy}</p>
              {linkedin ? (
                <a className="profile-link" href={linkedin} target="_blank" rel="noreferrer">
                  LinkedIn profile
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-copy">
          <p className="eyebrow">Contact</p>
          <h2>Help us design the heat rejection layer for serious space power.</h2>
          <p>Reach out for investor conversations, spacecraft integration discussions, advisor roles, manufacturing partnerships, or early technical feedback.</p>
          <div className="contact-routing"><span>Mission inquiries</span><strong>calderr@mit.edu</strong></div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name<input name="name" type="text" placeholder="Your name" required /></label>
          <label>Work email<input name="email" type="email" placeholder="you@company.com" required /></label>
          <label>Company<input name="company" type="text" placeholder="Company or lab" /></label>
          <label>Interest<select name="interest" defaultValue="Technical brief"><option>Technical brief</option><option>Investor conversation</option><option>Spacecraft integration</option><option>Manufacturing partnership</option><option>Joining the team</option></select></label>
          <label className="full">Message<textarea name="message" placeholder="Tell us what you are building and the thermal challenge you are solving." rows={5} /></label>
          <button className="button button-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send inquiry"}
          </button>
          <p className="form-status" aria-live="polite">{status}</p>
        </form>
      </section>
    </main>
  );
}
