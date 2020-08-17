import Link from "next/link";
import ReactMarkdown from "react-markdown/with-html";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import Image from "components/Image";
import SEO from "components/Seo";
import { getPostsSlugs, getPostBySection, getSlugs } from "utils/posts";
import LayoutDrawer from "components/LayoutDrawer";

const CodeBlock = ({ language, value }) => {
  return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>;
};

// const LinkTo = ({ text, url }) => {
//   return (
//     <Link href={url}>
//       <a className="text-4xl font-bold text-orange-600 font-display">{text}</a>
//     </Link>
//   );
// };

// const MarkdownImage = ({ alt, src }) => (
//   <Image
//     alt={alt}
//     src={require(`../../../../content/assets/${src}`)}
//     previewSrc={require(`../../../../content/assets/${src}?lqip`)}
//     className="w-full"
//   />
// );

export default function Section({
  post,
  frontmatter,
  nextPost,
  previousPost,
  items,
}) {
  return frontmatter ? (
    <LayoutDrawer items={items}>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description || post.excerpt}
      />

      <article>
        <header className="mb-8">
          <h1 className="mb-2 text-6xl font-black leading-none font-display">
            {frontmatter.title}
          </h1>
        </header>
        <ReactMarkdown
          className="mb-4"
          escapeHtml={false}
          source={post.content}
          renderers={{
            code: CodeBlock /* link: LinkTo,*/,
            /*image: MarkdownImage, */
          }}
        />
        <hr className="mt-4" />
      </article>
      <nav className="flex justify-between mb-10">
        {previousPost ? (
          <Link href={"/manual/[slug]"} as={`/manual/${previousPost.slug}`}>
            <a className="text-lg font-bold">
              ← {previousPost.frontmatter.title}
            </a>
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link href={"/manual/[slug]"} as={`/manual/${nextPost.slug}`}>
            <a className="text-lg font-bold">{nextPost.frontmatter.title} →</a>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </LayoutDrawer>
  ) : null;
}

export async function getStaticPaths() {
  let paths = getPostsSlugs({
    isRescursive: true,
    hasFilter: false,
  });
  //filter
  let posts = paths.filter(
    ({ params: { lang, slug, section } }) => section && lang && !slug
  );
  return {
    paths: posts,
    fallback: false,
  };
}

export async function getStaticProps({ params: { lang, section } }) {
  const postData = getPostBySection({ lang, section });
  const items = getSlugs({
    dir: `${process.cwd()}/content/manual/${lang}`,
    isRescursive: true,
    parent: lang,
  });
  return { props: { ...postData, items } };
}
