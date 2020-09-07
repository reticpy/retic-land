import "styles/global.css";
import "typeface-open-sans";
import "typeface-merriweather";
import { createMuiTheme , ThemeProvider  } from "@material-ui/core";

// import { ThemeProvider } from 'styled-components'
import { orange, blue } from "@material-ui/core/colors";

const theme = createMuiTheme({
  status: {
    danger: orange[500],
  },
  typography: {
    fontFamily:
      "Roboto,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif",
  },
  palette: {
    textColor: "#fff",
    darkColor: "rgba(0, 0, 0, 0.87)",
    background: {
      // default: "#475050",
    },
    primary: blue,
    secondary: blue,
    link: "#3f83f8",
  },
});

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
