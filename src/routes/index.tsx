import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import "@/styles/landing.css";

import heroMockup from "@/assets/img_4503e24c.webp.asset.json";
import pgFlex from "@/assets/img_730423d5.webp.asset.json";
import pgEquip from "@/assets/img_0bca2c5b.webp.asset.json";
import pgCog from "@/assets/img_1b60076b.webp.asset.json";
import pgRoutine from "@/assets/img_6ec751b6.webp.asset.json";
import pgEval from "@/assets/img_cb3023be.webp.asset.json";
import pgMobility from "@/assets/img_85380da0.webp.asset.json";
import pgDumbbell from "@/assets/img_1c1054d8.webp.asset.json";
import pgWalk from "@/assets/img_ea181c23.webp.asset.json";
import bonus1 from "@/assets/img_2986f7c0.webp.asset.json";
import bonus2 from "@/assets/img_4ab79d4e.webp.asset.json";
import bonus3 from "@/assets/img_f3e7e568.webp.asset.json";
import chat1 from "@/assets/img_257a9f11.webp.asset.json";
import chat2 from "@/assets/img_e1242935.webp.asset.json";
import chat3 from "@/assets/img_3fe58d31.webp.asset.json";
import chat4 from "@/assets/img_c2bef400.webp.asset.json";
import chat5 from "@/assets/img_e7971d40.webp.asset.json";

const TITLE = "+1000 Ejercicios Adaptados para Adultos Mayores";
const DESCRIPTION =
  "Kit con más de 1000 ejercicios y actividades adaptadas para adultos mayores, organizados por nivel y objetivo.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#fff9f1" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
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
  checkoutBasic: "#",
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

/** Capturas de pruebas sociales, tipadas para evitar inferencia vacía en el map. */
const SOCIAL_PROOF: ReadonlyArray<{ asset_id: string; url: string }> = [
  chat1,
  chat2,
  chat3,
  chat4,
  chat5,
];

const STORAGE_KEY = "geoCountry";

function isCountryCode(value: string | null): value is CountryCode {
  return value === "CL" || value === "MX" || value === "CO" || value === "ES" || value === "OTHER";
}

/** Estimación local por zona horaria/idioma, sin llamadas de red. */
function guessCountry(): CountryCode {
  try {
    const lang = (navigator.language || "").toUpperCase();
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.includes("Santiago") || tz.includes("Easter")) return "CL";
    if (tz.includes("Mexico") || lang.includes("MX")) return "MX";
    if (tz.includes("Bogota") || lang.includes("CO")) return "CO";
    if (tz.includes("Madrid") || lang.includes("ES-ES")) return "ES";
  } catch {
    // Entornos sin Intl/navigator: se usa el precio internacional.
  }
  return "OTHER";
}

function Cta({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const isPlaceholder = href === "#";
  return (
    <a
      className={className ? `cta ${className}` : "cta"}
      href={href}
      onClick={(event) => {
        if (isPlaceholder) {
          event.preventDefault();
          window.alert("Checkout pendiente de configurar.");
        }
      }}
    >
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
  const [open, setOpen] = useState(false);
  return (
    <div className={open ? "faq-item open" : "faq-item"}>
      <button
        type="button"
        className="faq-q"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        style={{ width: "100%", background: "none", border: 0, textAlign: "left", font: "inherit" }}
      >
        {question}
        <span className="plus" aria-hidden="true">
          +
        </span>
      </button>
      <div className="faq-a">{answer}</div>
    </div>
  );
}

function LandingPage() {
  const [country, setCountry] = useState<CountryCode>("OTHER");
  const [today, setToday] = useState<string>("");
  const prices = CONFIG[country];

  // Solo en el cliente: fecha local y país detectado (evita mismatch de hidratación).
  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date()),
    );

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isCountryCode(saved)) {
      setCountry(saved);
      return;
    }
    setCountry(guessCountry());
  }, []);

  const handleCountryChange = (code: CountryCode) => {
    setCountry(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Almacenamiento bloqueado: la selección solo vale para esta sesión.
    }
  };

  return (
    <div className="lp-root">
      <div className="topbar">DESCUENTO VÁLIDO HASTA HOY {today}</div>

      <header className="hero">
        <div className="wrap">
          <div className="avatars">
            <img
              className="avatar"
              src="/images/profissional-fisioterapeuta.webp"
              alt="Fisioterapeuta"
              width={160}
              height={160}
            />
            <img
              className="avatar"
              src="/images/profissional-educacao-fisica.webp"
              alt="Profesional de educación física"
              width={160}
              height={160}
            />
            <img
              className="avatar"
              src="/images/profissional-terapeuta.webp"
              alt="Terapeuta ocupacional"
              width={160}
              height={160}
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
          <div className="hero-claim">para transformar tus sesiones</div>
          <div className="emoji">🧓✨</div>
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
                loading="lazy"
              />
              <img
                className="stack-img s2"
                src={pgEquip.url}
                alt="Página con equipos"
                loading="lazy"
              />
              <img className="stack-img s3" src={pgCog.url} alt="Página cognitiva" loading="lazy" />
              <img className="stack-img s4" src={pgRoutine.url} alt="Rutina final" loading="lazy" />
            </div>
            <div className="kit-benefits" aria-label="Principales ventajas del kit">
              <article className="kit-benefit">
                <span className="kit-benefit-number" aria-hidden="true">
                  01
                </span>
                <div className="kit-benefit-copy">
                  <h3>Todo organizado para ti</h3>
                  <p>
                    El <b>Kit +1000 Actividades</b> reúne ejercicios adaptados para adultos mayores,
                    organizados <b>por nivel, objetivo y tipo de ejercicio</b>, para que puedas
                    planificar y aplicar cada sesión con confianza.
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
              <img src={pgEquip.url} alt="Ejercicios con equipos" loading="lazy" />
              <h3>Ejercicios con Equipos</h3>
            </div>
            <div className="cat-card">
              <img src={pgFlex.url} alt="Ejercicios sin equipos" loading="lazy" />
              <h3>Ejercicios sin Equipos</h3>
            </div>
            <div className="cat-card">
              <img src={pgCog.url} alt="Ejercicios cognitivos" loading="lazy" />
              <h3>Ejercicios Cognitivos</h3>
            </div>
            <div className="cat-card">
              <img src={pgEval.url} alt="Guía de evaluación física" loading="lazy" />
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
            <img src={pgFlex.url} alt="Flexión anterior sentada" loading="lazy" />
            <img src={pgMobility.url} alt="Actividades de movilidad reducida" loading="lazy" />
            <img src={pgEquip.url} alt="Ejercicios con mancuernas" loading="lazy" />
            <img src={pgDumbbell.url} alt="Ejercicios con elástico" loading="lazy" />
            <img src={pgRoutine.url} alt="Rutina final" loading="lazy" />
            <img src={pgWalk.url} alt="Marcha con apoyo" loading="lazy" />
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
                Ideal para quienes necesitan más variedad en sus sesiones. Con este kit llegas a la
                sesión sabiendo exactamente qué vas a aplicar, sin improvisar.
              </p>
            </article>
            <article className="aud">
              <div className="ic">🏃</div>
              <h3>Profesionales de Educación Física</h3>
              <p>
                Perfecto para quienes trabajan con grupos de adultos mayores y necesitan actividades
                organizadas, seguras y listas para usar en el día a día.
              </p>
            </article>
            <article className="aud">
              <div className="ic">🤲</div>
              <h3>Cuidadores de Adultos Mayores</h3>
              <p>
                Incluso sin formación técnica, el material ofrece actividades simples y organizadas
                que pueden servir como apoyo en el acompañamiento y estimulación, respetando las
                indicaciones profesionales correspondientes.
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
                👉 Las actividades están organizadas por nivel y objetivo, con instrucciones simples
                y claras para facilitar la aplicación de cada actividad.
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
                👉 Aquí tienes +1000 actividades organizadas por categoría, listas para usar. Nunca
                más tendrás que improvisar una sesión.
              </p>
            </div>
            <div className="ob">
              <strong>“Es demasiado caro para el contenido”</strong>
              <p>
                👉 Por menos de {prices.threshold} te llevas el kit completo + 3 bonos. Es menos que
                una sesión individual.
              </p>
            </div>
          </div>
          <div className="gallery" style={{ marginTop: 22, gridTemplateColumns: "repeat(4,1fr)" }}>
            <img src={pgFlex.url} alt="Página del kit" loading="lazy" />
            <img src={pgEquip.url} alt="Página del kit" loading="lazy" />
            <img src={pgRoutine.url} alt="Página del kit" loading="lazy" />
            <img src={pgWalk.url} alt="Página del kit" loading="lazy" />
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
              <img src={bonus1.url} alt="Bono de movilidad reducida" loading="lazy" />
              <h3>+40 Actividades para Adultos Mayores con Movilidad Reducida</h3>
              <p>
                Ejercicios adaptados para adultos mayores en silla de ruedas o con dificultad para
                permanecer de pie. Organizados y listos para aplicar.
              </p>
              <div className="value">Valor: {prices.bonus1}</div>
              <div className="free">Hoy: Gratis</div>
            </article>
            <article className="bonus">
              <img src={bonus2.url} alt="Bono de recuperación física" loading="lazy" />
              <h3>+35 Actividades para Adultos Mayores en Recuperación Física</h3>
              <p>
                Ejercicios leves para personas en recuperación o con limitaciones físicas. Con una
                progresión organizada desde actividades más simples hasta niveles de mayor
                actividad.
              </p>
              <div className="value">Valor: {prices.bonus2}</div>
              <div className="free">Hoy: Gratis</div>
            </article>
            <article className="bonus">
              <img src={bonus3.url} alt="Guía de evaluación física" loading="lazy" />
              <h3>Guía de Evaluación Física para Adultos Mayores</h3>
              <p>
                Aprende a evaluar la movilidad y las limitaciones antes de comenzar. Más información
                para planificar cada sesión y acompañar mejor al paciente.
              </p>
              <div className="value">Valor: {prices.bonus3}</div>
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
              <div className="old-price">{prices.completeOld}</div>
              <div className="new-price">{prices.complete}</div>
              <div className="one-time">Pago único</div>
              <div className="mini-previews">
                <img src={pgMobility.url} alt="Vista previa del material" loading="lazy" />
                <img src={pgEquip.url} alt="Vista previa del material" loading="lazy" />
                <img src={pgCog.url} alt="Vista previa del material" loading="lazy" />
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
              <Cta href={prices.checkoutComplete}>¡QUIERO EL COMPLETO!</Cta>
            </article>

            <article className="price-card">
              <div className="delivery">⚡ ENTREGA DIGITAL</div>
              <h3>Kit Básico</h3>
              <div className="sub">Lo esencial para comenzar</div>
              <div className="old-price">{prices.basicOld}</div>
              <div className="new-price">{prices.basic}</div>
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
              <Cta href={prices.checkoutBasic}>ACCEDER AHORA</Cta>
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
                key={chat.asset_id}
                className="chat"
                src={chat.url}
                alt={`Prueba social ${index + 1}`}
                width={760}
                height={542}
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
            <select
              id="country"
              value={country}
              onChange={(event) => handleCountryChange(event.target.value as CountryCode)}
            >
              <option value="CL">Chile · CLP</option>
              <option value="MX">México · MXN</option>
              <option value="CO">Colombia · COP</option>
              <option value="ES">España · EUR</option>
              <option value="OTHER">Otro · USD</option>
            </select>
          </div>
        </div>
      </footer>
    </div>
  );
}
