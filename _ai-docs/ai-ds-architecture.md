# The architecture is:
- Figma → JSON (via sync, e.g. Tokens Studio) → Style Dictionary
- Style Dictionary (with sd-transforms) → generates themes for any library (v0, Tailwind, MUI, etc.)
- The source of truth is the unchanging foundations JSON
- Each library consumes a theme generated from the same token source, via a mapping/transform
# Key:
- Foundations JSON never changes shape
- All library themes are generated via mapping functions from this JSON
- No library (v0, MUI, Tailwind) is a dependency for the others
- If v0 is removed, MUI and DDS still work