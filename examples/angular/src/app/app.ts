import { CUSTOM_ELEMENTS_SCHEMA, Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  // Lets Angular compile unknown tags like <ds-button> and bind to their properties.
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <main>
      <header>
        <h1>ds-button in Angular</h1>
        <ds-button text="Toggle theme" (click)="toggleTheme()"></ds-button>
      </header>

      <section>
        <h2>Variants</h2>
        <div class="row">
          @for (variant of variants; track variant) {
            <ds-button [variant]="variant" [text]="variant"></ds-button>
          }
        </div>
      </section>

      <section>
        <h2>Disabled (bound to state)</h2>
        <div class="row">
          <ds-button
            variant="primary"
            [disabled]="disabled()"
            [text]="disabled() ? 'Disabled' : 'Enabled'"
          ></ds-button>
          <label>
            <input
              type="checkbox"
              [checked]="disabled()"
              (change)="disabled.set($any($event.target).checked)"
            />
            disabled
          </label>
        </div>
      </section>

      <section>
        <h2>Events + dynamic text</h2>
        <div class="row">
          <ds-button
            variant="success"
            [text]="'Clicked ' + count() + ' times'"
            (click)="count.set(count() + 1)"
          ></ds-button>
          <ds-button variant="danger" text="Reset" (click)="count.set(0)"></ds-button>
        </div>
      </section>

      <section>
        <h2>Don't: interpolated child text</h2>
        <p>
          Angular adds the text after the component has rendered, so the button stays empty, the
          text ends up next to it, and the component logs a console warning. Use
          <code>[text]</code> instead.
        </p>
        <div class="row">
          <ds-button>Clicked {{ count() }} times</ds-button>
        </div>
      </section>
    </main>
  `,
})
export class App {
  protected readonly variants = ['default', 'primary', 'danger', 'success'] as const;
  protected readonly theme = signal<'light' | 'dark'>('light');
  protected readonly disabled = signal(false);
  protected readonly count = signal(0);

  constructor() {
    effect(() => {
      document.documentElement.dataset['theme'] = this.theme();
    });
  }

  protected toggleTheme() {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }
}
