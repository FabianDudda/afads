# Design Tokens

Design tokens are the named values (colors, spacing, type, radii, shadows, motion) that every component is built from. They live in `@my-ds/tokens` and are shipped as CSS custom properties prefixed with `--ds-`.

## Architecture

Tokens are organised in three layers. Each layer only references the one below it.

| Layer         | Example                                          | Purpose                                                                 |
| ------------- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| **Primitive** | `--ds-color-indigo-600`, `--ds-space-4`          | The raw palette and scales. They carry no meaning. Don't use them in components. |
| **Semantic**  | `--ds-color-primary-solid`, `--ds-space-md`      | Named by role. Theme-aware. **Components use these.**                  |
| **Component** | `--ds-button-bg`                                 | Public knobs for a single component, mapped to semantic tokens.         |

```css
/* primitive */ --ds-color-indigo-600: #4f46e5;
/* semantic  */ --ds-color-primary-solid: var(--ds-color-indigo-600);
/* component */ --ds-button-bg: var(--ds-color-primary-solid);
```

Source files are [DTCG](https://www.designtokens.org/)-format JSON in `packages/tokens/src`, built with Style Dictionary:

```
packages/tokens/src/
├── primitive/        color, space, typography, shape, motion
└── semantic/
    ├── base.json     aliases that are identical in every theme
    ├── light.json    theme colors + shadows
    └── dark.json
```

## Usage

```js
import "@my-ds/tokens/tokens.css";
import "@my-ds/components/dist/bundle.css";
```

```css
.card {
  background: var(--ds-color-surface-raised);
  color: var(--ds-color-text-default);
  padding: var(--ds-space-lg);
  border-radius: var(--ds-radius-lg);
  box-shadow: var(--ds-shadow-md);
}
```

In JavaScript, `vars` gives theme-aware references and `tokens` gives the full metadata:

```js
import { vars, tokens } from "@my-ds/tokens";

vars.colorPrimarySolid; // "var(--ds-color-primary-solid)"
```

## Theming & dark mode

The light theme is the default. Dark mode is applied:

1. **Automatically**, when the user's OS prefers a dark color scheme, or
2. **Explicitly**, with `data-theme` on `<html>` (or any element, to theme a subtree):

```html
<html data-theme="dark">
  …
  <section data-theme="light">Always light, even inside a dark page.</section>
</html>
```

`data-theme="light"` opts out of the automatic dark mode. Use the theme toggle in the top bar to preview every token on this page in both themes.

## Color

### Intents

Every intent has the same set of tokens:

- `solid`, `solid-hover` and `on-solid`: a strong fill (e.g. a primary button) and the text on it
- `subtle`, `subtle-hover` and `on-subtle`: a tinted fill (e.g. badges, alerts, soft buttons) and the text on it
- `text`: the intent color used as text on a default surface
- `border`: the intent color used for outlines

All `on-*` / `text` pairs meet WCAG AA contrast (4.5:1) in both themes.

#### Primary

<TokenList group="color.primary" preview="swatch" />

#### Danger

<TokenList group="color.danger" preview="swatch" />

#### Success

<TokenList group="color.success" preview="swatch" />

#### Warning

<TokenList group="color.warning" preview="swatch" />

#### Info

<TokenList group="color.info" preview="swatch" />

### Surface

<TokenList group="color.surface" preview="swatch" />

### Text

<TokenList group="color.text" preview="swatch" />

### Border

<TokenList group="color.border" preview="swatch" />

### Other

<TokenList group="color.focus-ring" preview="swatch" />
<TokenList group="color.backdrop" preview="swatch" />

### Palette

The primitive palette. It's for reference only. Reach for a semantic token instead.

<ColorPalette />

## Spacing

Based on a 4px grid.

<TokenList group="space" preview="size" />

## Typography

### Font family

<TokenList group="font.family" />

### Font size

<TokenList group="font.size" preview="font-size" />

### Font weight

<TokenList group="font.weight" />

### Line height

<TokenList group="font.line-height" />

## Shape

### Radius

<TokenList group="radius" preview="radius" />

### Border width

<TokenList group="border-width" />
<TokenList group="focus-ring" />

## Elevation

<TokenList group="shadow" preview="shadow" />

## Motion

<TokenList group="motion.duration" />
<TokenList group="motion.easing" />
