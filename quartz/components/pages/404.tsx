import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg, ctx }: QuartzComponentProps) => {
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = ctx.argv.serve ? "/" : url.pathname

  return (
    <article class="not-found-container">
      <div class="not-found-card">
        <div class="not-found-badge">💀 ВЫ ПОГИБЛИ В ПУСТОТЕ</div>
        <h1 class="not-found-title">404</h1>
        <h2 class="not-found-subtitle">Балбес, ты куда вообще попал?!</h2>
        
        <p class="not-found-desc">
          Кажется, ты активировал сломанный портал, оступился в Энде или эту страницу 
          сгрыз взбесившийся крипер. В наших землях такого места нет (или Клим просто забыл его дописать).
        </p>

        <div class="not-found-actions">
          <a href={baseDir} class="btn-spawn">
            🏠 Телепортироваться на спавн
          </a>
          <a href="https://discord.gg/Ez3y9hqa8" target="_blank" rel="noopener noreferrer" class="btn-discord">
            💬 Пожаловаться в Discord
          </a>
        </div>

        <div class="not-found-tip">
          <span>💡 <b>Совет дня:</b> Не копай прямо под себя и проверяй ссылки, путник.</span>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
          if (typeof fetchData !== "undefined") {
            fetchData.then(function(index) {
              var basePath = document.body.dataset.basepath || "";
              if (basePath.length > 1 && basePath.endsWith("/")) {
                basePath = basePath.slice(0, -1);
              }
              var pathname = window.location.pathname;
              var hasBasePrefix = basePath.length > 1 && pathname.startsWith(basePath);
              if (hasBasePrefix) {
                pathname = pathname.slice(basePath.length);
              }
              if (pathname.startsWith("/")) {
                pathname = pathname.slice(1);
              }
              if (pathname.endsWith("/")) {
                pathname = pathname.slice(0, -1);
              }
              if (pathname.endsWith(".html")) {
                pathname = pathname.slice(0, -5);
              }
              if (pathname.endsWith("/index")) {
                pathname = pathname.slice(0, -6);
              }
              var lowered = pathname.toLowerCase();
              if (lowered !== pathname && index[lowered] != null) {
                var prefix = hasBasePrefix ? basePath : "";
                var target = prefix + (prefix.endsWith("/") ? "" : "/") + lowered;
                window.location.replace(target);
              }
            });
          }
          `,
        }}
      />
    </article>
  )
}

NotFound.css = `
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 55vh;
  padding: 2rem 1rem;
}

.not-found-card {
  max-width: 600px;
  width: 100%;
  text-align: center;
  background: var(--lightgray);
  border: 2px dashed var(--gray);
  border-radius: 16px;
  padding: 2.5rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.not-found-badge {
  display: inline-block;
  background: #dc2626;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 1px;
  padding: 0.35rem 1rem;
  border-radius: 9999px;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.not-found-title {
  font-size: 5rem;
  line-height: 1;
  margin: 0.5rem 0;
  color: var(--secondary);
  font-family: var(--codeFont);
  font-weight: 900;
  letter-spacing: 2px;
}

.not-found-subtitle {
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  color: var(--dark);
}

.not-found-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--darkgray);
  margin-bottom: 2rem;
}

.not-found-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 1.75rem;
}

.btn-spawn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--secondary);
  color: var(--light) !important;
  font-weight: 700;
  padding: 0.75rem 1.4rem;
  border-radius: 10px;
  text-decoration: none !important;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.btn-spawn:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.btn-discord {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #5865F2;
  color: #ffffff !important;
  font-weight: 700;
  padding: 0.75rem 1.4rem;
  border-radius: 10px;
  text-decoration: none !important;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.btn-discord:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.not-found-tip {
  font-size: 0.88rem;
  color: var(--gray);
  border-top: 1px solid var(--gray);
  padding-top: 1rem;
}
`

export default (() => NotFound) satisfies QuartzComponentConstructor
