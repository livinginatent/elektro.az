
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // or wherever your files are
  ],
  theme: {
    extend: {
      colors: {
        customblue: "#023e8a", // base color
        light: "#3B82F6", // optional light variant
        dark: "#1E40AF", // optional dark variant
        electric: "#00FFAB", // single custom color
      },
    },
  },
  plugins: [],
};
