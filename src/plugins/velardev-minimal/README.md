# velardev minimal

Editorial look for the garden: Newsreader serif for text, system UI font for the
top bar and tags, a single accent colour, and a light/dark switch (top right).

- **Colours and fonts:** `styles/minimal.css`, the `--vm-*` variables at the top.
- **Switch:** follows the system theme the first time, then remembers the choice in
  `localStorage` (`velardev-theme`). Early script in `templates/head.njk` avoids a flash.
- **Logo:** the template draws an `<img>`, which browsers rasterize (jagged on iOS Safari). `hooks/logo-tema.js` swaps it for the same drawing inlined as `<svg>` (`assets/brand/velardev-logo-claro.svg`), and `minimal.css` colours it per theme with `--vm-logo-tinta` / `--vm-logo-acento`.
- **Structured data:** `templates/head.njk` emits schema.org JSON-LD: `Person` + `WebSite` on the home pages and a `BlogPosting` on every post (it needs the note's `date`; `keywords` only if it has tags). `hooks/json-ld.js` serializes it (drops empty fields, escapes `<`). The `Person` data (job title, employer, links) is written by hand in that template.
- **Fonts:** Newsreader (SIL OFL, see `assets/fonts/OFL.txt`), self-hosted, latin subset.
- **Disable:** `src/plugins/plugins.json` → `{"plugins": {"velardev-minimal": {"enabled": false}}}`.
- It only adds files in this folder; it does not edit the template, so template updates keep working.
