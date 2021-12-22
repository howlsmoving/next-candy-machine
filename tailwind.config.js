module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      
      fontFamily: {
        kong: ["Kongtext", "sans-serif"]
      },



      backgroundImage: (theme) => ({
        'bg-img': "url('/bg.png')"
      }),
      
    },
  },
};
