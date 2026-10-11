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
