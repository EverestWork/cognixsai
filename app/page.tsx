// Internal workspace sites can read the authenticated OpenAI user from the
// forwarded request headers:
//
// import { headers } from "next/headers";
//
// export default async function Home() {
//   const requestHeaders = await headers();
//   const email = requestHeaders.get("oai-authenticated-user-email");
//   const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
//   const fullName =
//     encodedFullName &&
//     requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
//       "percent-encoded-utf-8"
//       ? decodeURIComponent(encodedFullName)
//       : null;
//   const displayName = fullName ?? email;
//   // ...
// }

import MotionLayer from "./motion";
import type { CSSProperties } from "react";
import Image from "next/image";

const Arrow = () => <span aria-hidden="true">↗</span>;

type TypeRevealMode = "letters" | "words";

const TypeReveal = ({
  text,
  mode,
}: {
  text: string;
  mode: TypeRevealMode;
}) => {
  const words = text.trim().split(/\s+/);
  const characterCount = words.reduce((total, word) => total + word.length, 0);
  const itemCount = mode === "letters" ? characterCount : words.length;
  const stepDuration = mode === "letters" ? 24 : 92;
  const animationDuration = mode === "letters" ? 150 : 360;
  const revealDuration =
    Math.max(0, itemCount - 1) * stepDuration + animationDuration + 100;
  let characterIndex = 0;

  return (
    <span
      className={`typing-text typing-text--${mode}`}
      data-type-reveal
      data-type-duration={revealDuration}
      aria-label={text}
      style={
        {
          "--typing-count": itemCount,
          "--typing-step": mode === "letters" ? "24ms" : "92ms",
        } as CSSProperties
      }
    >
      {words.map((word, wordIndex) => (
        <span
          className={`typing-word${wordIndex < words.length - 1 ? " typing-spaced" : ""}`}
          aria-hidden="true"
          key={`${word}-${wordIndex}`}
          style={
            mode === "words"
              ? ({ "--typing-index": wordIndex } as CSSProperties)
              : undefined
          }
        >
          {mode === "letters"
            ? Array.from(word).map((character, index) => {
                const typingIndex = characterIndex++;

                return (
                  <span
                    className="typing-letter"
                    key={`${character}-${index}`}
                    style={{ "--typing-index": typingIndex } as CSSProperties}
                  >
                    {character}
                  </span>
                );
              })
            : word}
        </span>
      ))}
      <span className="typing-caret" aria-hidden="true" />
    </span>
  );
};

const meetingHref =
  "mailto:contato@cognixs.ai?subject=Agendar%20diagn%C3%B3stico%20de%20IA&body=Ol%C3%A1%2C%20quero%20conversar%20sobre%20um%20processo%20da%20minha%20empresa.";

const solutions = [
  {
    number: "01",
    title: "Agentes de IA",
    text: "Profissionais digitais especializados que entendem contexto, usam ferramentas e executam tarefas com regras claras.",
    tags: ["Atendimento", "Comercial", "Operações"],
  },
  {
    number: "02",
    title: "Automação inteligente",
    text: "Fluxos que combinam IA, sistemas e pessoas para eliminar trabalho repetitivo sem perder controle.",
    tags: ["Processos", "Integrações", "Decisão"],
  },
  {
    number: "03",
    title: "Produtos com IA",
    text: "Aplicações próprias, copilotos e plataformas construídas para a realidade e os dados do seu negócio.",
    tags: ["Software", "Dados", "Experiência"],
  },
  {
    number: "04",
    title: "Estratégia e arquitetura",
    text: "Da identificação das oportunidades ao desenho técnico seguro, escalável e pronto para produção.",
    tags: ["Roadmap", "Governança", "Escala"],
  },
];

const applications = [
  {
    area: "Atendimento",
    title: "Resolva mais no primeiro contato",
    text: "Agentes que consultam sistemas, executam procedimentos aprovados e encaminham exceções com todo o contexto.",
  },
  {
    area: "Comercial",
    title: "Transforme intenção em oportunidade",
    text: "Qualificação, propostas, follow-up e inteligência comercial operando de forma integrada ao time.",
  },
  {
    area: "Backoffice",
    title: "Faça processos fluírem",
    text: "Leitura de documentos, conferências, cadastros e rotinas administrativas com rastreabilidade.",
  },
  {
    area: "TI e operações",
    title: "Antecipe e resolva incidentes",
    text: "Observabilidade, diagnóstico, execução controlada e documentação automática de cada intervenção.",
  },
  {
    area: "Conhecimento",
    title: "Ative o que a empresa já sabe",
    text: "Conhecimento corporativo acessível, contextualizado e conectado às ferramentas do dia a dia.",
  },
];

export default function Home() {
  return (
    <main>
      <MotionLayer />
      <section className="hero" id="inicio">
        <header className="site-header shell">
          <a className="brand" href="#inicio">
            <Image
              src="/cognixs-logo-dark.png"
              alt="Cognixs.ai"
              width={1778}
              height={350}
              priority
              unoptimized
            />
          </a>

          <nav className="nav-links" aria-label="Navegação principal">
            <a href="#solucoes">Soluções</a>
            <a href="#processo">Como funciona</a>
            <a href="#aplicacoes">Aplicações</a>
            <a href="#empresa">Empresa</a>
          </nav>

          <a className="header-cta" href={meetingHref}>
            Agendar diagnóstico
          </a>
        </header>

        <div className="hero-art" aria-hidden="true">
          <img src="/hero-flow.png" alt="" />
        </div>
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-interface" aria-hidden="true">
          <div className="signal-card signal-card-one">
            <span className="signal-status" />
            <div>
              <small>CONTEXTO</small>
              <strong>Processo compreendido</strong>
            </div>
          </div>
          <div className="signal-card signal-card-two">
            <span className="signal-icon">↳</span>
            <div>
              <small>EXECUÇÃO</small>
              <strong>Agente em operação</strong>
            </div>
          </div>
          <div className="signal-card signal-card-three">
            <span className="signal-status approved" />
            <div>
              <small>CONTROLE</small>
              <strong>Aprovação humana</strong>
            </div>
          </div>
        </div>

        <div className="hero-content shell">
          <div className="hero-copy">
            <p className="eyebrow">
              <span />
              Inteligência artificial para empresas
            </p>
            <h1>
              IA que elimina gargalos e faz sua empresa <em>operar melhor.</em>
            </h1>
            <p className="hero-lead">
              Transformamos processos lentos, filas e tarefas manuais em
              agentes e automações que trabalham com seu time — com segurança,
              integração e controle.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={meetingHref}>
                Agendar diagnóstico de 30 min <Arrow />
              </a>
              <a className="button button-secondary" href="#processo">
                Ver como funciona
              </a>
            </div>
            <p className="hero-proof">
              <span>Sem compromisso</span>
              <i />
              <span>Foco no seu processo</span>
              <i />
              <span>Caminho prático</span>
            </p>
          </div>
        </div>
      </section>

      <section className="capability-strip" aria-label="Competências Cognixs">
        <div className="marquee-track">
          {[0, 1].map((group) => (
            <div className="marquee-group" aria-hidden={group === 1} key={group}>
              <span>Agentes de IA</span><i />
              <span>Automação</span><i />
              <span>Integrações</span><i />
              <span>Produtos de IA</span><i />
              <span>Observabilidade</span><i />
              <span>Governança</span><i />
            </div>
          ))}
        </div>
      </section>

      <section className="intro-section" id="empresa" data-section-motion>
        <div className="shell intro-grid">
          <div className="opportunity-column" data-reveal>
            <p className="section-kicker">IA aplicada ao trabalho real</p>
            <div
              className="opportunity-visual"
              aria-label="Copiar, conferir, responder e decidir convergem para uma oportunidade de IA"
            >
              <div className="opportunity-grid" aria-hidden="true" />
              <span className="opportunity-ring ring-one" aria-hidden="true" />
              <span className="opportunity-ring ring-two" aria-hidden="true" />
              <span className="opportunity-scan" aria-hidden="true" />
              <div className="opportunity-core">
                <span className="core-signal" aria-hidden="true" />
                <small>OPORTUNIDADE</small>
                <strong>IA</strong>
                <em>identificada</em>
              </div>
              <span className="work-node node-copy">COPIAR</span>
              <span className="work-node node-check">CONFERIR</span>
              <span className="work-node node-answer">RESPONDER</span>
              <span className="work-node node-decide">DECIDIR</span>
              <span className="opportunity-status">
                <i aria-hidden="true" />
                analisando processo
              </span>
            </div>
          </div>
          <div className="intro-copy" data-reveal>
            <h2>
              <TypeReveal mode="letters" text="Se um processo depende de copiar, conferir, responder ou decidir, existe uma oportunidade de IA." />
            </h2>
            <p>
              Você não precisa começar escolhendo modelo ou ferramenta. Comece
              por algo que custa tempo, dinheiro ou experiência. A Cognixs.ai
              transforma esse ponto de atrito em uma solução que opera de
              verdade.
            </p>
          </div>
        </div>
      </section>

      <section className="diagnostic-section section" data-section-motion>
        <div className="shell">
          <div className="diagnostic-heading" data-reveal>
            <p className="section-kicker">Reconhece algum destes sinais?</p>
            <h2><TypeReveal mode="words" text="O problema aparece antes da tecnologia." /></h2>
          </div>
          <div className="problem-grid">
            <article data-reveal>
              <span>01</span>
              <h3>Seu time responde as mesmas perguntas todos os dias.</h3>
              <p>Conhecimento disperso, filas e dependência de pessoas específicas.</p>
            </article>
            <article data-reveal>
              <span>02</span>
              <h3>O processo só anda quando alguém copia e confere dados.</h3>
              <p>Planilhas, e-mails e sistemas que não conversam entre si.</p>
            </article>
            <article data-reveal>
              <span>03</span>
              <h3>A decisão chega tarde porque falta contexto no momento certo.</h3>
              <p>Informação existe, mas não está conectada à execução.</p>
            </article>
          </div>
          <div className="diagnostic-cta" data-reveal>
            <div>
              <strong>Leve um processo para a conversa.</strong>
              <span>Nós identificamos onde a IA pode gerar o primeiro ganho.</span>
            </div>
            <a className="text-link" href={meetingHref}>
              Agendar diagnóstico <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="solutions section" id="solucoes" data-section-motion>
        <div className="shell">
          <div className="section-heading" data-reveal>
            <div>
              <p className="section-kicker">O que construímos</p>
              <h2><TypeReveal mode="letters" text="Soluções desenhadas para gerar impacto, não apenas respostas." /></h2>
            </div>
            <p>
              Começamos pelo problema e combinamos as tecnologias certas para
              entregar uma solução confiável, integrada e mensurável.
            </p>
          </div>

          <div className="solution-grid">
            {solutions.map((solution) => (
              <article className="solution-card" data-reveal key={solution.number}>
                <div className="card-topline">
                  <span>{solution.number}</span>
                  <i aria-hidden="true">↗</i>
                </div>
                <h3>{solution.title}</h3>
                <p>{solution.text}</p>
                <div className="tag-list" aria-label="Áreas relacionadas">
                  {solution.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="evo-section" data-section-motion>
        <div className="shell evo-grid">
          <div className="evo-copy" data-reveal>
            <p className="section-kicker">Cognixs Evo</p>
            <h2><TypeReveal mode="words" text="Uma inteligência que coordena todo o trabalho." /></h2>
            <p>
              Nossa camada de orquestração conecta agentes especializados,
              contexto empresarial, regras e ferramentas. Cada decisão pode
              ser acompanhada, aprovada e auditada.
            </p>
            <ul>
              <li>Agentes com papéis e limites definidos</li>
              <li>Integração com sistemas e bases de conhecimento</li>
              <li>Supervisão humana nos pontos de maior risco</li>
            </ul>
          </div>

          <div className="evo-visual" data-reveal aria-label="Fluxo da Cognixs Evo">
            <div className="flow-label flow-input">Contexto + intenção</div>
            <div className="flow-line flow-line-one" />
            <div className="evo-core">
              <span className="core-orbit" />
              <span className="core-dot" />
              <small>ORQUESTRAÇÃO</small>
              <strong>Cognixs Evo</strong>
            </div>
            <div className="flow-line flow-line-two" />
            <div className="agent-row">
              <span>Agente comercial</span>
              <span>Agente operacional</span>
              <span>Agente especialista</span>
            </div>
          </div>
        </div>
      </section>

      <section className="process section" id="processo" data-section-motion>
        <div className="shell">
          <div className="section-heading process-heading" data-reveal>
            <div>
              <p className="section-kicker">Como fazemos</p>
              <h2><TypeReveal mode="letters" text="Da oportunidade à operação." /></h2>
            </div>
            <p>
              Um processo direto, com decisões técnicas e de negócio tomadas
              em conjunto.
            </p>
          </div>

          <ol className="process-list">
            <li data-reveal>
              <span>01</span>
              <div>
                <h3>Descobrir</h3>
                <p>Mapeamos o problema, os processos, os dados e o impacto esperado.</p>
              </div>
            </li>
            <li data-reveal>
              <span>02</span>
              <div>
                <h3>Desenhar</h3>
                <p>Definimos arquitetura, experiência, integrações, riscos e métricas.</p>
              </div>
            </li>
            <li data-reveal>
              <span>03</span>
              <div>
                <h3>Construir</h3>
                <p>Desenvolvemos, testamos e conectamos a solução ao ambiente real.</p>
              </div>
            </li>
            <li data-reveal>
              <span>04</span>
              <div>
                <h3>Operar e evoluir</h3>
                <p>Acompanhamos resultados, comportamento e oportunidades de melhoria.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="applications section" id="aplicacoes" data-section-motion>
        <div className="shell">
          <div className="section-heading" data-reveal>
            <div>
              <p className="section-kicker">Onde a IA gera valor</p>
              <h2><TypeReveal mode="words" text="Uma tecnologia. Diferentes frentes de transformação." /></h2>
            </div>
            <p>
              Priorizamos aplicações que melhoram a experiência, reduzem
              esforço operacional ou criam novas fontes de receita.
            </p>
          </div>

          <div className="application-grid">
            {applications.map((application, index) => (
              <article className={index === 0 ? "application-card featured" : "application-card"} data-reveal key={application.area}>
                <span>{application.area}</span>
                <h3>{application.title}</h3>
                <p>{application.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="control-section" data-section-motion>
        <div className="shell control-grid">
          <div data-reveal>
            <p className="section-kicker">Confiança por arquitetura</p>
            <h2><TypeReveal mode="letters" text="Autonomia onde faz sentido. Controle onde importa." /></h2>
          </div>
          <div className="control-list" data-reveal>
            <article>
              <span>01</span>
              <div>
                <h3>Regras antes da execução</h3>
                <p>Permissões, limites e caminhos de aprovação definidos desde o desenho.</p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Humano no comando</h3>
                <p>Decisões sensíveis chegam às pessoas certas com contexto suficiente.</p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Rastreabilidade de ponta a ponta</h3>
                <p>Cada ação, decisão e resultado pode ser observado e melhorado.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contato" data-section-motion>
        <div className="contact-glow" aria-hidden="true" />
        <div className="shell contact-content" data-reveal>
          <p className="section-kicker">Próximo passo</p>
          <h2><TypeReveal mode="words" text="Traga um processo. Saia da reunião com um caminho." /></h2>
          <p>
            Em 30 minutos, entendemos o gargalo, avaliamos a viabilidade e
            mostramos qual seria o primeiro passo para colocar a IA em operação.
          </p>
          <div className="meeting-points">
            <span>Diagnóstico do processo</span>
            <span>Riscos e integrações</span>
            <span>Próximo passo recomendado</span>
          </div>
          <a
            className="button button-primary contact-button"
            href={meetingHref}
          >
            Agendar diagnóstico de 30 min <Arrow />
          </a>
        </div>
      </section>

      <a className="floating-meeting" href={meetingHref}>
        <span className="floating-pulse" />
        Agendar diagnóstico
        <Arrow />
      </a>

      <footer>
        <div className="shell footer-grid">
          <a className="brand" href="#inicio">
            <Image
              src="/cognixs-logo-dark.png"
              alt="Cognixs.ai"
              width={1778}
              height={350}
              unoptimized
            />
          </a>
          <p>Inteligência artificial construída para operar.</p>
          <div>
            <a href="#solucoes">Soluções</a>
            <a href="#processo">Como funciona</a>
            <a href="#contato">Contato</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 Cognixs.ai</span>
          <span>IA para empresas</span>
        </div>
      </footer>
    </main>
  );
}
