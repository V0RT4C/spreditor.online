module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
      extend: {
        colors: {
          primary: `rgb(var(--color-primary))`,
          secondary: `var(--color-secondary)`,
          accent: `var(--color-accent)`
        },
        textColor: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          accent: `var(--color-accent)`
        },
        borderColor: {
          primary: 'var(--border-primary)'
        }
      }
  },
  plugins: []
};