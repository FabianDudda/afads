import '@my-ds/tokens/tokens.css'
import '@my-ds/components/dist/bundle.css'
// Side-effect import: registers <ds-button> and friends.
import '@my-ds/components'
import './index.css'

const $ = (selector) => document.querySelector(selector)

let theme = 'light'
let count = 0

$('#theme-toggle').addEventListener('click', () => {
  theme = theme === 'light' ? 'dark' : 'light'
  document.documentElement.dataset.theme = theme
})

const disabledButton = $('#disabled-button')
$('#disabled-checkbox').addEventListener('change', (e) => {
  disabledButton.disabled = e.target.checked
  disabledButton.text = e.target.checked ? 'Disabled' : 'Enabled'
})

const countButton = $('#count-button')
const staleButton = $('#stale-button')

function setCount(value) {
  count = value
  countButton.text = `Clicked ${count} times`
  // Don't: this replaces the rendered <button> with plain text instead of updating the label.
  staleButton.textContent = `Clicked ${count} times`
}

countButton.addEventListener('click', () => setCount(count + 1))
$('#reset-button').addEventListener('click', () => setCount(0))
