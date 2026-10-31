import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg, ctx }: QuartzComponentProps) => {
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = ctx.argv.serve ? "/" : url.pathname

  return (
    <article class="popover-hint">
      <div class="hud-terminal" style="margin-top: 2rem;">
        <div class="hud-item">
          <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#ef4444;box-shadow:0 0 8px rgba(239,68,68,0.7);"></span>
          <span class="hud-label">TELEMETRY_ALERT:</span>
          <span class="hud-accent">SECTOR_NOT_FOUND</span>
        </div>
        <span class="hud-divider">/</span>
        <div class="hud-item">
          <span class="hud-label">CODE:</span>
          <span class="hud-value">404</span>
        </div>
      </div>

      <h1>404 // СБОЙ МАРШРУТИЗАЦИИ СЕКТОРА</h1>

      <blockquote class="callout danger" data-callout="danger">
        <div class="callout-title">
          <span>CRITICAL: COORDINATE RESOLUTION FAILURE</span>
        </div>
        <div class="callout-content">
          <p>
            Запрошенный узел координат не зарегистрирован в базе данных кластера <code>mc.concept-cult.cz</code>. 
            Возможно, пространственный маяк был деактивирован, сектор перемещён в закрытый архив или ссылка повреждена.
          </p>
        </div>
      </blockquote>

      <p style="font-family: var(--codeFont); font-size: 0.84rem; color: var(--text-muted); margin: 1.5rem 0;">
        ПРОТОКОЛ ВОССТАНОВЛЕНИЯ СВЯЗИ:
      </p>

      <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem;">
        <a href={baseDir} class="coord-tag" style="font-size: 0.8rem; padding: 0.5rem 1rem; color: #ededed !important; border-color: var(--accent-technical) !important;">
          [← RECONNECT // ROOT_GATEWAY]
        </a>
        <a href="https://discord.gg/Ez3y9hqa8" target="_blank" rel="noopener noreferrer" class="coord-tag" style="font-size: 0.8rem; padding: 0.5rem 1rem;">
          [DISCORD_DISPATCH // REPORT_ISSUE ↗]
        </a>
      </div>

      <div class="spec-footer">
        <div><span>TRACE_ID: ERR_UNRESOLVED_ROUTE</span></div>
        <div><span>CLUSTER: CONCEPT_CULT_NODE_01</span></div>
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

export default (() => NotFound) satisfies QuartzComponentConstructor
