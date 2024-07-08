/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'titan-one': ['Titan One', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
      colors: {
        light: '#FAFAFA',
        dark: '#3B4948',
        brick: '#EC8C6F',
        sky: {
          1: '#E8F3F3',
          2: '#BDF3F0',
          3: '#6FECE4',
          4: '#70DAD3',
          '4-40': 'rgb(112, 218, 211, .4)'
        },
        mustard: '#FFE979'
      }
    }
  },
  plugins: []
}
