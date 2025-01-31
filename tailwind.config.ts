const config = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', 
    './public/index.html',
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontWeight: {
        extrabold: '900',
        heavy: '700', // Adăugăm aici greutatea de 700 pentru Avenir Heavy
      },
      spacing: {
        '120px': '120px',
        '20px': '20px',
      },
      letterSpacing: {
        'neg-2percent': '-0.03em',
        '-1p': '-0.01em',
      },
      colors: {
        'dark-gray': '#1a1a1a',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        ekMukta: ['"Ek Mukta"', 'sans-serif'],
        interLight: ['"Inter"', 'sans-serif'],
        avenirRoman: ['Avenir', 'sans-serif'],
        avenirHeavy: ['Avenir', 'sans-serif'], // Definim Avenir Heavy aici
        inter: ['Inter', 'sans-serif'],
      },
      screens: {
        xs: '650px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

module.exports = config;
