module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'navy-custom': '#001C3D',
        'gold-custom': '#A57B2F'
      }
    },
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      serif: ['Merriweather', 'Georgia', 'serif']
    }
  },
  plugins: []
}
