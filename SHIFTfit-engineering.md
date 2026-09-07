# ShiftFit Engineering Mode

ShiftFit uses a lightweight engineering workflow inspired by disciplined agent-assisted development practices.

## Development loop

1. **Analyse** — inspect the existing implementation before changing it.
2. **Plan** — identify the smallest set of files and components that should change.
3. **Implement** — make focused changes; avoid stacking unnecessary patch scripts.
4. **Test** — verify JavaScript syntax and affected functionality.
5. **Review** — check for regressions, duplicated logic, security issues, and mobile responsiveness.
6. **Verify live** — compare the deployed UI against the approved reference when working on visual features.
7. **Record** — document important architectural decisions so future work continues from the current state.

## Rules for ShiftFit

- Prefer fixing the underlying component/module over adding another visual patch.
- Preserve existing working features unless the change explicitly replaces them.
- Keep authentication, user data, and AI secrets out of client-side code.
- Treat Supabase Row Level Security as mandatory for user-owned cloud data.
- Do not expose API keys in the browser.
- Test mobile layouts first because the primary product experience is mobile.
- Before declaring a UI task complete, compare the live result with the target screenshot/recording.
- For larger changes, use a focused branch and pull request rather than making unrelated edits directly on `main`.

## Current architecture note

The current app is a legacy/monolithic PWA foundation with a large `index.html` and a collection of feature modules and UI loaders. The immediate goal is to finish the visual foundation, then progressively consolidate temporary patch layers into maintainable feature modules as functionality is expanded.

## Definition of done

A ShiftFit change is not considered complete until:

- the code is syntactically valid;
- existing navigation and core flows still work;
- the mobile layout is checked;
- the change does not introduce duplicate UI or competing loaders;
- security-sensitive data remains server-side;
- and, for UI work, the deployed result has been visually verified.
