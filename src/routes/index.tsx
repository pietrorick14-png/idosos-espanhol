import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import avatarEducacaoFisica from "@/assets/optimized/avatar-educacao-fisica.webp";
import avatarFisioterapeuta from "@/assets/optimized/avatar-fisioterapeuta.webp";
import avatarTerapeuta from "@/assets/optimized/avatar-terapeuta.webp";
import bonus1 from "@/assets/optimized/bonus1-600.webp";
import bonus2 from "@/assets/optimized/bonus2-600.webp";
import bonus3 from "@/assets/optimized/bonus3-600.webp";
import cog320 from "@/assets/optimized/cog-320.webp";
import dumbbell320 from "@/assets/optimized/dumbbell-320.webp";
import equip320 from "@/assets/optimized/equip-320.webp";
import eval320 from "@/assets/optimized/eval-320.webp";
import flex320 from "@/assets/optimized/flex-320.webp";
import hero480 from "@/assets/optimized/hero-480.webp";
import hero640 from "@/assets/optimized/hero-640.webp";
import hero768 from "@/assets/optimized/hero-768.webp";
import hero960 from "@/assets/optimized/hero-960.webp";
import mobility320 from "@/assets/optimized/mobility-320.webp";
import routine320 from "@/assets/optimized/routine-320.webp";
import walk320 from "@/assets/optimized/walk-320.webp";
import chat1 from "@/assets/optimized/chat1-480.webp";
import chat2 from "@/assets/optimized/chat2-480.webp";
import chat3 from "@/assets/optimized/chat3-480.webp";
import chat4 from "@/assets/optimized/chat4-480.webp";
import chat5 from "@/assets/optimized/chat5-480.webp";

const heroMockup = {
  url: hero960,
  srcSet: `${hero480} 480w, ${hero640} 640w, ${hero768} 768w, ${hero960} 960w`,
};
const pgFlex = { url: flex320 };
const pgEquip = { url: equip320 };
const pgCog = { url: cog320 };
const pgRoutine = { url: routine320 };
const pgEval = { url: eval320 };
const pgMobility = { url: mobility320 };
const pgDumbbell = { url: dumbbell320 };
const pgWalk = { url: walk320 };

export const Route = createFileRoute("/")({
  component: LandingPage,
});

/** Códigos de país soportados para precios/checkout localizados. */
type CountryCode = "CL" | "MX" | "CO" | "ES" | "OTHER";

interface CountryConfig {
  readonly country: string;
  readonly basic: string;
  readonly complete: string;
  readonly basicOld: string;
  readonly completeOld: string;
  readonly threshold: string;
  readonly bonus1: string;
  readonly bonus2: string;
  readonly bonus3: string;
  readonly checkoutBasic: string;
  readonly checkoutComplete: string;
}

const BASE_PRICES = {
  basic: "US$7",
  complete: "US$10",
  basicOld: "US$19",
  completeOld: "US$27",
  checkoutBasic: "https://pay.hotmart.com/D107385538N",
  checkoutComplete: "https://pay.hotmart.com/V107385465P",
} as const;

const CONFIG: Record<CountryCode, CountryConfig> = {
  CL: {
    ...BASE_PRICES,
    country: "Chile",
    threshold: "$12.000 CLP",
    bonus1: "$19.990 CLP",
    bonus2: "$19.990 CLP",
    bonus3: "$24.990 CLP",
  },
  MX: {
    ...BASE_PRICES,
    country: "México",
    threshold: "$250 MXN",
    bonus1: "$399 MXN",
    bonus2: "$399 MXN",
    bonus3: "$449 MXN",
  },
  CO: {
    ...BASE_PRICES,
    country: "Colombia",
    threshold: "$50.000 COP",
    bonus1: "$79.900 COP",
    bonus2: "$79.900 COP",
    bonus3: "$89.900 COP",
  },
  ES: {
    ...BASE_PRICES,
    country: "España",
    threshold: "€15",
    bonus1: "€19,90",
    bonus2: "€19,90",
    bonus3: "€24,90",
  },
  OTHER: {
    ...BASE_PRICES,
    country: "Internacional",
    threshold: "US$15",
    bonus1: "US$19",
    bonus2: "US$19",
    bonus3: "US$24",
  },
};

const SOCIAL_PROOF = [chat1, chat2, chat3, chat4, chat5] as const;

const STORAGE_KEY = "geoCountry";

const COUNTRY_SCRIPT = `(()=>{const config=${JSON.stringify(CONFIG)};const storageKey=${JSON.stringify(STORAGE_KEY)};const valid=code=>Object.prototype.hasOwnProperty.call(config,code);const guess=()=>{try{const lang=(navigator.language||"").toUpperCase();const tz=Intl.DateTimeFormat().resolvedOptions().timeZone||"";if(tz.includes("Santiago")||tz.includes("Easter"))return"CL";if(tz.includes("Mexico")||lang.includes("MX"))return"MX";if(tz.includes("Bogota")||lang.includes("CO"))return"CO";if(tz.includes("Madrid")||lang.includes("ES-ES"))return"ES"}catch{}return"OTHER"};const apply=code=>{const selected=valid(code)?code:"OTHER";const values=config[selected];document.querySelectorAll("[data-price]").forEach(node=>{const key=node.getAttribute("data-price");if(key&&key in values)node.textContent=values[key]});document.querySelectorAll("[data-checkout]").forEach(node=>{const key=node.getAttribute("data-checkout");if(key&&key in values)node.setAttribute("href",values[key])});const select=document.getElementById("country");if(select)select.value=selected};let country=guess();try{const saved=localStorage.getItem(storageKey);if(saved&&valid(saved))country=saved}catch{}apply(country);const select=document.getElementById("country");select?.addEventListener("change",event=>{const code=event.target.value;apply(code);try{localStorage.setItem(storageKey,code)}catch{}})})();`;

function Cta({
  href,
  children,
  className,
  checkoutKey,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  checkoutKey?: "checkoutBasic" | "checkoutComplete";
}) {
  return (
    <a className={className ? `cta ${className}` : "cta"} href={href} data-checkout={checkoutKey}>
      {children}
    </a>
  );
}

const FAQ_ITEMS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "¿Cómo recibo el material?",
    a: "Después de confirmar el pago, recibirás las instrucciones de acceso digital de forma inmediata.",
  },
  {
    q: "¿Funciona en el celular?",
    a: "Sí. Puedes abrir el material desde el celular, tablet o computadora y también imprimir las fichas cuando quieras.",
  },
  {
    q: "¿Necesito experiencia?",
    a: "El material está organizado por nivel y objetivo y contiene instrucciones claras. En contextos clínicos o de rehabilitación, úsalo de acuerdo con tu formación y las indicaciones profesionales correspondientes.",
  },
  {
    q: "¿Las actividades son fáciles de aplicar?",
    a: "Sí. Las fichas muestran de forma visual cómo realizar cada actividad y facilitan la preparación de las sesiones.",
  },
  { q: "¿El acceso es inmediato?", a: "Sí, después de la aprobación del pago." },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="faq-item">
      <summary className="faq-q">
        {question}
        <span className="plus" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="faq-a">{answer}</div>
    </details>
  );
}

function LandingPage() {
  const prices = CONFIG.OTHER;

  return (
    <div className="lp-root">
      <main>
        <header className="hero">
          <div className="wrap">
            <div className="avatars">
              <img
                className="avatar"
                src={avatarFisioterapeuta}
                alt="Fisioterapeuta"
                width={160}
                height={160}
                decoding="async"
                loading="lazy"
              />
              <img
                className="avatar"
                src={avatarEducacaoFisica}
                alt="Profesional de educación física"
                width={160}
                height={160}
                decoding="async"
                loading="lazy"
              />
              <img
                className="avatar"
                src={avatarTerapeuta}
                alt="Terapeuta ocupacional"
                width={160}
                height={160}
                decoding="async"
                loading="lazy"
              />
            </div>
            <div className="users">
              <b>+1.700</b> profesionales usándolo
            </div>
            <h1>
              <span className="accent">+1000</span>
              <br />
              EJERCICIOS
              <br />
              ADAPTADOS PARA
              <br />
              ADULTOS MAYORES
            </h1>
            <div className="eyebrow">
              <em>ejercicios adaptados, organizados por nivel y objetivo</em>
            </div>
            <div className="pain-row">
              <div className="pain">Sin preparar la sesión desde cero</div>
              <div className="pain">Sin improvisar durante la sesión</div>
            </div>
            <div className="steps">
              <span className="step">
                <span className="step-icon">▣</span>Abre
              </span>
              <span className="arrow">›</span>
              <span className="step">
                <span className="step-icon">☝</span>Elige
              </span>
              <span className="arrow">›</span>
              <span className="step">
                <span className="step-icon">✓</span>Aplica
              </span>
            </div>
            <div className="hero-mockup" aria-label="Mockup del kit">
              <img
                src={heroMockup.url}
                srcSet={heroMockup.srcSet}
                sizes="(max-width: 850px) calc(100vw - 22px), 960px"
                alt="Mockup del kit en español con tablet y celular"
                width={1400}
                height={787}
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </header>

        <section className="soft">
          <div className="wrap">
            <h2 className="section-title">
              ¿Por qué los profesionales eligen <em>este kit?</em>
            </h2>
            <div className="two-col">
              <div className="product-stack">
                <img
                  className="stack-img s1"
                  src={pgFlex.url}
                  alt="Página de flexibilidad"
                  width={787}
                  height={900}
                  decoding="async"
                  loading="lazy"
                />
                <img
                  className="stack-img s2"
                  src={pgEquip.url}
                  alt="Página con equipos"
                  width={787}
                  height={900}
                  decoding="async"
                  loading="lazy"
                />
                <img
                  className="stack-img s3"
                  src={pgCog.url}
                  alt="Página cognitiva"
                  width={720}
                  height={900}
                  decoding="async"
                  loading="lazy"
                />
                <img
                  className="stack-img s4"
                  src={pgRoutine.url}
                  alt="Rutina final"
                  width={787}
                  height={900}
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <div className="kit-benefits" aria-label="Principales ventajas del kit">
                <article className="kit-benefit">
                  <span className="kit-benefit-number" aria-hidden="true">
                    01
                  </span>
                  <div className="kit-benefit-copy">
                    <h3>Todo organizado para ti</h3>
                    <p>
                      El <b>Kit +1000 Actividades</b> reúne ejercicios adaptados para adultos
                      mayores, organizados <b>por nivel, objetivo y tipo de ejercicio</b>, para que
                      puedas planificar y aplicar cada sesión con confianza.
                    </p>
                  </div>
                </article>

                <article className="kit-benefit">
                  <span className="kit-benefit-number" aria-hidden="true">
                    02
                  </span>
                  <div className="kit-benefit-copy">
                    <h3>Más claridad, menos improvisación</h3>
                    <p>
                      Tendrás{" "}
                      <b>
                        fichas, ejercicios ilustrados, progresiones organizadas y bonos exclusivos
                      </b>{" "}
                      listos para usar en sesiones individuales o grupales.
                    </p>
                  </div>
                </article>

                <article className="kit-benefit kit-benefit-highlight">
                  <span className="kit-benefit-number" aria-hidden="true">
                    03
                  </span>
                  <div className="kit-benefit-copy">
                    <h3>Sesiones con más calidad</h3>
                    <p>
                      Trabaja con más confianza y ayuda a tus pacientes a conquistar mayor
                      <b> autonomía, movilidad y calidad de vida</b> en el día a día.
                    </p>
                  </div>
                </article>
              </div>
            </div>

            <div className="category-grid">
              <div className="cat-card">
                <img
                  src={pgEquip.url}
                  alt="Ejercicios con equipos"
                  width={787}
                  height={900}
                  decoding="async"
                  loading="lazy"
                />
                <h3>Ejercicios con Equipos</h3>
              </div>
              <div className="cat-card">
                <img
                  src={pgFlex.url}
                  alt="Ejercicios sin equipos"
                  width={787}
                  height={900}
                  decoding="async"
                  loading="lazy"
                />
                <h3>Ejercicios sin Equipos</h3>
              </div>
              <div className="cat-card">
                <img
                  src={pgCog.url}
                  alt="Ejercicios cognitivos"
                  width={720}
                  height={900}
                  decoding="async"
                  loading="lazy"
                />
                <h3>Ejercicios Cognitivos</h3>
              </div>
              <div className="cat-card">
                <img
                  src={pgEval.url}
                  alt="Guía de evaluación física"
                  width={675}
                  height={900}
                  decoding="async"
                  loading="lazy"
                />
                <h3>Guía de Evaluación Física</h3>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 30 }}>
              <Cta href="#kit-completo">QUIERO MI KIT AHORA →</Cta>
              <div className="trust">
                🛡 Compra 100% segura · Acceso inmediato · Garantía de 7 días
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <h2 className="section-title">
              Mira un poco <em>de las páginas</em>
            </h2>
            <div className="gallery">
              <img
                src={pgFlex.url}
                alt="Flexión anterior sentada"
                width={787}
                height={900}
                decoding="async"
                loading="lazy"
              />
              <img
                src={pgMobility.url}
                alt="Actividades de movilidad reducida"
                width={720}
                height={900}
                decoding="async"
                loading="lazy"
              />
              <img
                src={pgEquip.url}
                alt="Ejercicios con mancuernas"
                width={787}
                height={900}
                decoding="async"
                loading="lazy"
              />
              <img
                src={pgDumbbell.url}
                alt="Ejercicios con elástico"
                width={720}
                height={900}
                decoding="async"
                loading="lazy"
              />
              <img
                src={pgRoutine.url}
                alt="Rutina final"
                width={787}
                height={900}
                decoding="async"
                loading="lazy"
              />
              <img
                src={pgWalk.url}
                alt="Marcha con apoyo"
                width={787}
                height={900}
                decoding="async"
                loading="lazy"
              />
            </div>
            <div className="check-grid">
              <div className="check">Actividades organizadas por nivel y objetivo</div>
              <div className="check">Ejercicios ilustrados paso a paso</div>
              <div className="check">Progresiones adaptadas según nivel y condición</div>
              <div className="check">Fichas listas para imprimir y aplicar</div>
              <div className="check">Bonos exclusivos para casos especiales</div>
              <div className="check">Acceso digital desde el celular o la computadora</div>
            </div>
          </div>
        </section>

        <section className="warm">
          <div className="wrap">
            <h2 className="section-title">
              Para Quién Es <em>Este Material</em>
            </h2>
            <div className="aud-grid">
              <article className="aud">
                <div className="ic">🩺</div>
                <h3>Fisioterapeutas y Kinesiólogos</h3>
                <p>
                  Ideal para quienes necesitan más variedad en sus sesiones. Con este kit llegas a
                  la sesión sabiendo exactamente qué vas a aplicar, sin improvisar.
                </p>
              </article>
              <article className="aud">
                <div className="ic">🏃</div>
                <h3>Profesionales de Educación Física</h3>
                <p>
                  Perfecto para quienes trabajan con grupos de adultos mayores y necesitan
                  actividades organizadas, seguras y listas para usar en el día a día.
                </p>
              </article>
              <article className="aud">
                <div className="ic">🤲</div>
                <h3>Cuidadores de Adultos Mayores</h3>
                <p>
                  Incluso sin formación técnica, el material ofrece actividades simples y
                  organizadas que pueden servir como apoyo en el acompañamiento y estimulación,
                  respetando las indicaciones profesionales correspondientes.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section>
          <div className="narrow">
            <div className="objections">
              <div className="ob">
                <strong>“¿Voy a tener que ser especialista para aplicarlo?”</strong>
                <p>
                  👉 Las actividades están organizadas por nivel y objetivo, con instrucciones
                  simples y claras para facilitar la aplicación de cada actividad.
                </p>
              </div>
              <div className="ob">
                <strong>“Mis adultos mayores tienen movilidad reducida”</strong>
                <p>
                  👉 Hay un bono exclusivo con +40 actividades adaptadas para personas con movilidad
                  reducida o que están en recuperación.
                </p>
              </div>
              <div className="ob">
                <strong>“Ya tengo material parecido”</strong>
                <p>
                  👉 Aquí tienes +1000 actividades organizadas por categoría, listas para usar.
                  Nunca más tendrás que improvisar una sesión.
                </p>
              </div>
              <div className="ob">
                <strong>“Es demasiado caro para el contenido”</strong>
                <p>
                  👉 Por menos de <span data-price="threshold">{prices.threshold}</span> te llevas
                  el kit completo + 3 bonos. Es menos que una sesión individual.
                </p>
              </div>
            </div>
            <div className="gallery objection-gallery">
              <img
                src={pgFlex.url}
                alt="Página del kit"
                width={787}
                height={900}
                decoding="async"
                loading="lazy"
              />
              <img
                src={pgEquip.url}
                alt="Página del kit"
                width={787}
                height={900}
                decoding="async"
                loading="lazy"
              />
              <img
                src={pgRoutine.url}
                alt="Página del kit"
                width={787}
                height={900}
                decoding="async"
                loading="lazy"
              />
              <img
                src={pgWalk.url}
                alt="Página del kit"
                width={787}
                height={900}
                decoding="async"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="soft">
          <div className="wrap">
            <div className="bonus-label">Bonos exclusivos</div>
            <h2 className="section-title">
              También te llevas esto <em>gratis</em>
            </h2>
            <p style={{ textAlign: "center", color: "#68716f", margin: "-8px auto 25px" }}>
              3 bonos exclusivos para que tengas todavía más opciones al trabajar con diferentes
              necesidades y niveles de movilidad.
            </p>
            <div className="bonus-grid">
              <article className="bonus">
                <img
                  src={bonus1}
                  alt="Bono de movilidad reducida"
                  width={900}
                  height={900}
                  decoding="async"
                  loading="lazy"
                />
                <h3>+40 Actividades para Adultos Mayores con Movilidad Reducida</h3>
                <p>
                  Ejercicios adaptados para adultos mayores en silla de ruedas o con dificultad para
                  permanecer de pie. Organizados y listos para aplicar.
                </p>
                <div className="value">
                  Valor: <span data-price="bonus1">{prices.bonus1}</span>
                </div>
                <div className="free">Hoy: Gratis</div>
              </article>
              <article className="bonus">
                <img
                  src={bonus2}
                  alt="Bono de recuperación física"
                  width={900}
                  height={900}
                  decoding="async"
                  loading="lazy"
                />
                <h3>+35 Actividades para Adultos Mayores en Recuperación Física</h3>
                <p>
                  Ejercicios leves para personas en recuperación o con limitaciones físicas. Con una
                  progresión organizada desde actividades más simples hasta niveles de mayor
                  actividad.
                </p>
                <div className="value">
                  Valor: <span data-price="bonus2">{prices.bonus2}</span>
                </div>
                <div className="free">Hoy: Gratis</div>
              </article>
              <article className="bonus">
                <img
                  src={bonus3}
                  alt="Guía de evaluación física"
                  width={900}
                  height={900}
                  decoding="async"
                  loading="lazy"
                />
                <h3>Guía de Evaluación Física para Adultos Mayores</h3>
                <p>
                  Aprende a evaluar la movilidad y las limitaciones antes de comenzar. Más
                  información para planificar cada sesión y acompañar mejor al paciente.
                </p>
                <div className="value">
                  Valor: <span data-price="bonus3">{prices.bonus3}</span>
                </div>
                <div className="free">Hoy: Gratis</div>
              </article>
            </div>
          </div>
        </section>

        <section id="pricing">
          <div className="wrap">
            <div className="pricing-head">
              <h2 className="section-title">
                Elige la mejor <em>opción para ti</em>
              </h2>
              <p>
                Invierte en actividades de calidad para la atención de adultos mayores por un valor
                simbólico.
              </p>
            </div>
            <div className="pricing-grid">
              <article id="kit-completo" className="price-card featured">
                <div className="badge">Más Elegido</div>
                <div className="delivery">⚡ ENTREGA DIGITAL</div>
                <h3>Kit Completo</h3>
                <div className="sub">Acceso total + bonos exclusivos</div>
                <div className="old-price" data-price="completeOld">
                  {prices.completeOld}
                </div>
                <div className="new-price" data-price="complete">
                  {prices.complete}
                </div>
                <div className="one-time">Pago único</div>
                <div className="mini-previews">
                  <img
                    src={pgMobility.url}
                    alt="Vista previa del material"
                    width={720}
                    height={900}
                    decoding="async"
                    loading="lazy"
                  />
                  <img
                    src={pgEquip.url}
                    alt="Vista previa del material"
                    width={787}
                    height={900}
                    decoding="async"
                    loading="lazy"
                  />
                  <img
                    src={pgCog.url}
                    alt="Vista previa del material"
                    width={720}
                    height={900}
                    decoding="async"
                    loading="lazy"
                  />
                </div>
                <ul className="features">
                  <li>+1000 Actividades y Ejercicios para Adultos Mayores</li>
                  <li>Organizados por nivel y objetivo</li>
                  <li>Acceso digital</li>
                  <li>Actualizaciones mensuales</li>
                  <li>Soporte prioritario</li>
                  <li>Garantía de 7 días</li>
                </ul>
                <div style={{ fontWeight: 900 }}>Bonos incluidos</div>
                <ul className="features">
                  <li>🎁 +40 Actividades para Movilidad Reducida</li>
                  <li>🎁 +35 Actividades para Recuperación Física</li>
                  <li>🎁 Guía de Evaluación Física para Adultos Mayores</li>
                </ul>
                <Cta href={prices.checkoutComplete} checkoutKey="checkoutComplete">
                  ¡QUIERO EL COMPLETO!
                </Cta>
              </article>

              <article className="price-card">
                <div className="delivery">⚡ ENTREGA DIGITAL</div>
                <h3>Kit Básico</h3>
                <div className="sub">Lo esencial para comenzar</div>
                <div className="old-price" data-price="basicOld">
                  {prices.basicOld}
                </div>
                <div className="new-price" data-price="basic">
                  {prices.basic}
                </div>
                <div className="one-time">Pago único</div>
                <ul className="features">
                  <li>La mitad del material</li>
                  <li>Actividades organizadas por nivel</li>
                  <li>Aplicaciones prácticas en las sesiones</li>
                  <li>Acceso digital</li>
                </ul>
                <div style={{ fontWeight: 900, marginTop: 16 }}>No incluye</div>
                <ul className="features no">
                  <li>+40 Actividades para Movilidad Reducida</li>
                  <li>+35 Actividades para Recuperación Física</li>
                  <li>Guía de Evaluación Física</li>
                </ul>
                <Cta href={prices.checkoutBasic} checkoutKey="checkoutBasic">
                  ACCEDER AHORA
                </Cta>
              </article>
            </div>
          </div>
        </section>

        <section className="soft">
          <div className="wrap">
            <h2 className="section-title">
              Lo Que Dicen Nuestros <em>Clientes</em>
            </h2>
            <p style={{ textAlign: "center", color: "#6b7278", marginTop: -8 }}>
              Mensajes reales de profesionales que ya están aplicando el material en sus sesiones.
            </p>
            <div className="social-carousel" aria-label="Pruebas sociales">
              {SOCIAL_PROOF.map((chat, index) => (
                <img
                  key={chat}
                  className="chat"
                  src={chat}
                  alt={`Prueba social ${index + 1}`}
                  width={760}
                  height={542}
                  decoding="async"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="guarantee">
              <div className="shield">🛡️</div>
              <h2>
                Garantía de <em style={{ color: "var(--green)" }}>7 Días</em>
              </h2>
              <p>Pruébalo sin riesgo. Si no te gusta, te devolvemos tu dinero, sin preguntas.</p>
              <Cta href="#kit-completo">COMPRAR CON SEGURIDAD</Cta>
            </div>
          </div>
        </section>

        <section className="warm">
          <div className="faq">
            <h2 className="section-title">
              Preguntas <em>Frecuentes</em>
            </h2>
            <p style={{ textAlign: "center", color: "#68716f", marginTop: -10 }}>
              Resolvemos esas dudas que suelen aparecer antes de comprar.
            </p>
            {FAQ_ITEMS.map((item) => (
              <FaqItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <div className="brand">MANUAL DE LOS ADULTOS MAYORES</div>
          <div>© 2026 MANUAL DE LOS ADULTOS MAYORES. Todos los derechos reservados.</div>
          <div className="legal">
            Material autorizado para uso personal y profesional en la atención y acompañamiento de
            adultos mayores.
            <br />
            Este material no sustituye la orientación médica ni la evaluación o atención de un
            profesional de la salud cualificado.
          </div>
          <div className="geo">
            🌎 <label htmlFor="country">País:</label>
            <select id="country" defaultValue="OTHER">
              <option value="CL">Chile · CLP</option>
              <option value="MX">México · MXN</option>
              <option value="CO">Colombia · COP</option>
              <option value="ES">España · EUR</option>
              <option value="OTHER">Otro · USD</option>
            </select>
          </div>
        </div>
      </footer>
      <script dangerouslySetInnerHTML={{ __html: COUNTRY_SCRIPT }} />
    </div>
  );
}
