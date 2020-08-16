import ReactMarkdown from "react-markdown/with-html";
import Link from "next/link";
import SEO from "components/Seo";

import { getContentFile, getSlugs } from "utils/posts";
import LayoutDrawer from "components/LayoutDrawer";
const LinkTo = ({ text, url }) => {
  return (
    <Link href={url}>
      <a className="text-4xl font-bold text-orange-600 font-display">{text}</a>
    </Link>
  );
};
export default function Lang({ content, frontmatter, items }) {
  return (
    <LayoutDrawer items={items}>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <article>
        <header className="mb-8">
          <h1 className="mb-2 text-6xl font-black leading-none font-display">
            {frontmatter.title}
          </h1>
        </header>
        <ReactMarkdown
          className="mb-4"
          escapeHtml={false}
          source={content}
          renderers={{ link: LinkTo }}
        />
      </article>
    </LayoutDrawer>
  );
}

export async function getStaticPaths() {
  //add paths
  const paths = getSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { lang } }) {
  //get file from default languages
  const postData = getContentFile(
    "introduction.md",
    `${process.cwd()}/content/manual/${lang}/introduction.md`
  );
  const items = getSlugs({
    dir: `${process.cwd()}/content/manual/${lang}`,
    isRescursive: true,
    parent: lang,
  });
  return { props: { ...postData, items } };
}
