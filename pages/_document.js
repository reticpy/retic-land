import Document, { Head, Main, NextScript, Html } from "next/document";

import {ServerStyleSheets} from '@material-ui/core/styles';
import { getSiteMetaData } from "utils/helpers";
export default class MyDocument extends Document {
  render() {
    const siteMetadata = getSiteMetaData();

    return (
      <Html lang={siteMetadata.language}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {

	// Render app and page and get the context of the page with collected side effects.
	const sheets = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;

	ctx.renderPage = () => originalRenderPage({
		enhanceApp: App => props => sheets.collect(<App {...props} />),
	});

	const initialProps = await Document.getInitialProps(ctx);

	return {
		...initialProps, // Styles fragment is rendered after the app and page rendering finish.
		styles: (<React.Fragment>
			{initialProps.styles}
			{sheets.getStyleElement()}
		</React.Fragment>),
	};
};
