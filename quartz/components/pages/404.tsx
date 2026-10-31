import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg, ctx }: QuartzComponentProps) => {
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = ctx.argv.serve ? "/" : url.pathname

  return (
    <article class="popover-hint">
      <h1>404: Страница не найдена</h1>
      <p>
        <strong>Балбес, ты куда вообще попал?!</strong>
      </p>
      <p>
        Кажется, ты активировал сломанный портал, оступился на краю Энда или эту страницу
        сгрыз взбесившийся крипер. В базе знаний <code>mc.concept-cult.cz</code> такого места не существует (или Клим просто забыл его написать).
      </p>

      <blockquote class="callout danger" data-callout="danger">
        <div class="callout-title">
          <div class="callout-icon"></div>
          <div class="callout-title-inner">
            <p>Вы погибли в пустоте</p>
          </div>
        </div>
        <div class="callout-content">
          <p>
            <strong>Совет:</strong> никогда не копай прямо под себя и проверяй правильность введённого URL.
          </p>
        </div>
      </blockquote>

      <p>
        Что можно сделать:
      </p>
      <ul>
        <li>
          🏠 <a href={baseDir} class="internal">Телепортироваться на главную страницу (Спавн)</a>
        </li>
        <li>
          💬 <a href="https://discord.gg/Ez3y9hqa8" class="external">Зайти в Discord</a> и спросить у админов, куда подевалась страница
        </li>
      </ul>

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
