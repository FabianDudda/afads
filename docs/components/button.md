<ComponentHeader tag="my-button" />

## Examples

::: raw
<div class="component-example">
  <my-button>Click me</my-button>
  <my-button variant="primary">Click me</my-button>
  <my-button variant="danger">Click me</my-button>
  <my-button variant="success">Click me</my-button>
</div>
:::

```html
<my-button>Click me</my-button>
<my-button variant="primary">Click me</my-button>
<my-button variant="danger">Click me</my-button>
<my-button variant="success">Click me</my-button>
```

## Props

<PropsTable tag="my-button" />

## Usage

Use a button to trigger an action or event, such as submitting a form, opening a dialog, or confirming a decision. Use a button with an `href` to act as a CTA link.

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
  <my-button>Cancel</my-button>
  <my-button variant="primary">Save Document</my-button>
</div>
:::

#### Don’t:

Stack primary, danger, or success buttons next to one another

::: raw
<div class="component-example">
  <my-button variant="primary">Click me</my-button>
  <my-button variant="danger">Click me</my-button>
</div>

<div class="component-example">
  <my-button variant="success">Do a Good Thing!</my-button>
  <my-button variant="success">Do Another Good Thing!</my-button>
</div>
:::

---

### Links

Pass an `href` to render the button as an anchor element. Use this when the action navigates the user to a new page or location rather than triggering an in-page action.

::: raw
<div class="component-example">
  <my-button href="/get-started">Get started</my-button>
</div>
:::

```html
<my-button href="/get-started">Get started</my-button>
```

Don't use a link-button for actions that don't result in navigation — use a standard button instead.

### Disabled state

Use `disabled` to prevent interaction when an action is temporarily unavailable. Where possible, pair a disabled button with an explanation of why it's unavailable.

```html
<my-button disabled>Unavailable</my-button>
```

Avoid using `disabled` as a default state — if an action is never available in a given context, don't show the button at all.

### Accessibility

- Button text should clearly describe the action it triggers — avoid vague labels like "Click here" or "Submit"
- When using an icon alongside text, ensure the text is still present or an `aria-label` is provided
- Disabled buttons are not focusable by default; consider whether users need to know why the action is unavailable before removing it from the tab order

<style>
    .component-example {
        border: 1px solid #f6f6f6;
        border-radius: 6px;
        padding: 1.5rem;
        display: flex;
        gap: .5rem;
        margin-top: 1.25rem;
    }
</style>
