<ComponentHeader tag="ds-button" />

## Playground

<Playground tag="ds-button" />

## Examples

::: raw
<div class="component-example">
  <ds-button>Click me</ds-button>
  <ds-button variant="primary">Click me</ds-button>
  <ds-button variant="danger">Click me</ds-button>
  <ds-button variant="success">Click me</ds-button>
</div>
:::

```html
<ds-button>Click me</ds-button>
<ds-button variant="primary">Click me</ds-button>
<ds-button variant="danger">Click me</ds-button>
<ds-button variant="success">Click me</ds-button>
```

## Props

<PropsTable tag="ds-button" />

## Usage

Use a button to trigger an action or event, such as submitting a form, opening a dialog, or confirming a decision.

### Variants

Use `variant` to communicate the intent of the action.

- **Default** — for secondary or low-priority actions
- **Primary** — for the single, primary action on a page or in a section; use sparingly
- **Danger** — for destructive or irreversible actions, such as deleting or removing
- **Success** — for confirming a positive outcome, such as saving or completing

Avoid using multiple primary or danger buttons in close proximity. If everything is high priority, nothing is.

---

#### Do:

Place primary buttons _after_ default buttons if you need to stack two buttons together:

::: raw
<div class="component-example">
  <ds-button>Cancel</ds-button>
  <ds-button variant="primary">Save Document</ds-button>
</div>
:::

#### Don’t:

Stack primary, danger, or success buttons next to one another

::: raw
<div class="component-example">
  <ds-button variant="primary">Click me</ds-button>
  <ds-button variant="danger">Click me</ds-button>
</div>

<div class="component-example">
  <ds-button variant="success">Do a Good Thing!</ds-button>
  <ds-button variant="success">Do Another Good Thing!</ds-button>
</div>
:::

---

### Disabled state

Use `disabled` to prevent interaction when an action is temporarily unavailable. Where possible, pair a disabled button with an explanation of why it's unavailable.

Disabled buttons look the same regardless of `variant`.

::: raw
<div class="component-example">
  <ds-button disabled>Unavailable</ds-button>
  <ds-button variant="primary" disabled>Unavailable</ds-button>
  <ds-button variant="danger" disabled>Unavailable</ds-button>
</div>
:::

```html
<ds-button disabled>Unavailable</ds-button>
```

Avoid using `disabled` as a default state — if an action is never available in a given context, don't show the button at all.

### Accessibility

- Button text should clearly describe the action it triggers — avoid vague labels like "Click here" or "Submit"
- When using an icon alongside text, ensure the text is still present or an `aria-label` is provided
- Disabled buttons are not focusable by default; consider whether users need to know why the action is unavailable before removing it from the tab order

<style>
    .component-example {
        border: 1px solid var(--ds-color-border-quiet, #e4e4e7);
        border-radius: 6px;
        padding: 1.5rem;
        display: flex;
        gap: .5rem;
        margin-top: 1.25rem;
    }
</style>
