module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'bg-img': "url('/bg.png')"
      })

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
