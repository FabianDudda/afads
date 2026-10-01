import { useEffect, useState } from 'react'

const variants = ['default', 'primary', 'danger', 'success'] as const

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [disabled, setDisabled] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <main>
      <header>
        <h1>ds-button in React</h1>
        <ds-button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle theme
        </ds-button>
      </header>

      <section>
        <h2>Variants</h2>
        <div className="row">
          {variants.map((variant) => (
            <ds-button key={variant} variant={variant}>
              {variant}
            </ds-button>
          ))}
        </div>
      </section>

      <section>
        <h2>Disabled (bound to state)</h2>
        <div className="row">
          <ds-button
            variant="primary"
            disabled={disabled}
            text={disabled ? 'Disabled' : 'Enabled'}
          />
          <label>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
            />
            disabled
          </label>
        </div>
      </section>

      <section>
        <h2>Events + dynamic text</h2>
        <div className="row">
          <ds-button
            variant="success"
            text={`Clicked ${count} times`}
            onClick={() => setCount((c) => c + 1)}
          />
          <ds-button variant="danger" onClick={() => setCount(0)}>
            Reset
          </ds-button>
        </div>
      </section>

      <section>
        <h2>Don't: dynamic child text</h2>
        <p>
          Child text is only read once, so this label stays at "Clicked 0 times" and the
          component logs a console warning. Use the <code>text</code> property instead.
        </p>
        <div className="row">
          <ds-button>Clicked {count} times</ds-button>
        </div>
      </section>
    </main>
  )
}

export default App
