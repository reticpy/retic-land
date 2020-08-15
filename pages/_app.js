import "styles/global.css";
import "typeface-open-sans";
import "typeface-merriweather";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { orange, blue } from "@material-ui/core/colors";

const theme = createMuiTheme({
  status: {
    danger: orange[500],
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    textColor: "#fff",
    background: {
      default: "#475050",
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
