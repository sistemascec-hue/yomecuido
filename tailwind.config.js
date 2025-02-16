/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/**/**/*.{js,jsx,ts,tsx}", // Incluye subcarpetas anidadas como (tabs)
  ],
  theme: {
    extend: {
      colors: {
        welcomeBackground: "#21ABA5",
        appBackground: "#98CECB",
        buttonBackground: "#03363D",
        text: "#03363D",
        buttonText: "#FFFFFF",
      },
      fontFamily: {
        roboto: ["RobotoSlab-Regular"],
        robotoBold: ["RobotoSlab-Bold"],
        robotoSemiBold: ["RobotoSlab-SemiBold"],
      },
      fontSize: {
        text: "20px",
        title: "32px",
        subtitle: "24px",
        subtitle2: "20px",
        button: "20px",
      },
    },
  },
  plugins: [],
};
