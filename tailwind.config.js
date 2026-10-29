/** Colours come from CSS variables in src/index.css so they are defined once. */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: { brand: 'var(--brand-main)', ink: 'var(--ink)', soft: 'var(--soft)' },
    fontFamily: { display: ['Sora', 'sans-serif'], body: ['Inter', 'sans-serif'] },
  } },
  plugins: [],
}
