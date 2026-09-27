import { Elena, html, nothing } from "@elenajs/core";

/**
 * A standard button component used to trigger actions and events. Definitely not a `<div>`.
 *
 * @displayName Button
 * @status alpha
 *
 * @cssprop [--my-button-text] - Overrides the default text color.
 * @cssprop [--my-button-bg] - Overrides the default background color.
 * @cssprop [--my-button-font] - Overrides the default font family.
 */
export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static props = ["disabled", "href", "variant"];

  /**
   * Whether or not the button is in a disabled state
   *
   * @property
   * @type {boolean}
   */
  disabled = false;

  /**
   * Where the button should link to, will also force the component to render as a link.
   *
   * @property
   * @type {string}
   */
  href = "";

  /**
   * The style variant of the component.
   * @property
   * @type {"default" | "primary" | "danger" | "success" }
   */
  variant = "default";

  /**
   * Renders a button: <button>.
   *
   * @internal
   */
  renderButton(template) {
    return html`
      <button class="my-button" ${this.disabled ? "disabled" : nothing}>${template}</button>
    `;
  }

  /**
   * Renders a link: <a href="#">.
   *
   * @internal
   */
  renderLink(template) {
    return html` <a class="my-button" href="${this.href}"> ${template} </a> `;
  }

  /**
   * Renders the html template, calls `renderLink()` or `renderButton()` depending on whether or not an `href` prop is present.
   * @internal
   */
  render() {
    const markup = html` ${this.text ? html`<span>${this.text}</span>` : nothing} `;
    return this.href ? this.renderLink(markup) : this.renderButton(markup);
  }
}

MyButton.define();
