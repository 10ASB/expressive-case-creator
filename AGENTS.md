<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep project templates in a typed shared data module and expose session edits through a shared React provider, so gallery and case-study views stay consistent without implying saved data.
- Keep shareable work, about, contact, and case-study pages as individual TanStack routes with leaf metadata, so each page can be linked directly.
- Keep contact identity in a shared module and compose contact messages as mailto drafts, so email links stay consistent without implying automatic delivery.
- Derive project counts, categories, and next-project navigation from the shared project list; keep external actions outside the case-study card link to avoid nested anchors.
- Lazy-load the R3F hero scene behind ClientOnly while keeping portfolio routes server-rendered; derive scene colors from CSS tokens and use local Lightformers to avoid external environment dependencies.
- Keep dossier facts and skill tiers in shared browser-safe data, so portfolio pages and terminal outputs stay aligned; tiers are illustrative toolkit categories, not fabricated proficiency measurements.
- Keep the terminal as a finite client-side command simulator, never execute visitor input as actual shell commands.
- Use AI SDK UI-message streaming and AI Elements for the session-only assistant, with server-held prompts and secrets; persist access denials in a service-role-only circuit breaker rather than storing visitor conversations.
- Fetch only the fixed public GitHub profile, repositories, and public activity without credentials, so live telemetry cannot expose private GitHub data.
- Keep the dossier chapter pages as independent leaf routes and the gallery at work.index, so case-study URLs retain their existing paths.
- Scope character chapter palettes through local semantic CSS variables and share chapter marks, so visual themes do not alter portfolio facts or leak into adjacent chapters.
