module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      
      fontFamily: {
        kong: "'Kongtext', san-serif",
      },



      backgroundImage: (theme) => ({
        'bg-img': "url('/bg.png')"
      }),
      
    },
  },
};
