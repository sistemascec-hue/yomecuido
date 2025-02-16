
const fonts = (theme) => ({
  text: {
    fontFamily: "sugo-extra-light",
    fontSize: 18,
    color: theme === "dark" ? "#F0F0F3" : "#03363D",
  },
  title: {
    fontFamily: "sugo-trial",
    fontSize: 32,
  },
  subtitle: {
    fontFamily: "sugo-trial",
    fontSize: 24,
    
  },
  subtitle2: {
    fontFamily: "sugo-trial",
    fontSize: 20,
  },
  button: {
    fontFamily: "sugo-trial",
    fontSize: 20,
    color: "#FFFFFF", // Botones siempre tienen texto blanco
  },
});

export default fonts;
