import matter from "gray-matter";
import fs from "fs";
import path from "path";
import cfg from "../cfg";

const contentPath = `${process.cwd()}/content/${cfg.contentPath}`;

export function findItems({
  dir,
  isRescursive = false,
  parent = null,
  hasContent = false,
} = {}) {
  const folders = fs.readdirSync(dir).map((name) => {
    const filePath = path.join(dir, name);
    const fileStat = fs.lstatSync(filePath);
    const isFolder = fileStat.isDirectory();
    const children =
      (isRescursive &&
        isFolder &&
        findItems({ dir: filePath, isRescursive, parent: name, hasContent })) ||
      [];
    const content =
      (hasContent && !isFolder && getContentFile(name, filePath)) || null;
    return {
      name,
      parent,
      isFolder,
      isRescursive,
      children,
      content,
    };
  });
  return folders;
}
export function getContentFile(filename, file) {
  // Get raw content from file
  const markdownWithMetadata = fs.readFileSync(file).toString();

  // Parse markdown, get frontmatter data, excerpt and content.
  const { data, excerpt, content } = matter(markdownWithMetadata);

  const frontmatter = {
    ...data,
    date: data.date ? getFormattedDate(data.date) : null,
  };

  // Remove .md file extension from post name
  const slug = filename.replace(".md", "");

  return {
    slug,
    frontmatter,
    excerpt,
    content,
  };
}

// Get day in format: Month day, Year. e.g. April 19, 2020
function getFormattedDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date?.toLocaleDateString("en-US", options) || null;

  return formattedDate;
}

function getSlugsFromList(items) {
  let paths = [];
  items.forEach(({ params: { slug, lang, section, children, content } }) => {
    paths.push({
      params: {
        slug,
        lang,
        section,
        content,
      },
    });
    const _children = children?.length ? getSlugsFromList(children) : [];
    paths = [...paths, ..._children];
  });
  return paths;
}

export function getPostsSlugs({
  isRescursive = false,
  hasContent = true,
} = {}) {
  const pathsFolders = findItems({
    dir: contentPath,
    isRescursive,
    hasContent,
  });
  const items = formatSlugs(pathsFolders);
  const paths = getSlugsFromList(items);
  //filter
  let posts = paths.filter(
    ({ params: { lang, slug, section } }) => section && lang && slug
  );
  return posts;
}

function formatSlugs(items, lang = null) {
  const _items = items.map(
    ({ name, parent, isFolder, isRescursive, children, content }) => {
      const _name = name.replace(".md", "");
      const _slug = !isFolder && parent ? _name : null;
      const _section = isFolder && parent ? _name : parent;
      const _lang = !parent ? _name : lang;
      const _children = children?.length ? formatSlugs(children, _lang) : [];
      const _content = content
        ? { ...content, slug: _slug, lang: _lang, section: _section }
        : null;
      return {
        params: {
          slug: _slug,
          lang: _lang,
          section: _section,
          isFolder,
          children: _children,
          content: _content,
          parent,
        },
      };
    }
  );
  return _items;
}
export function getSlugs({
  dir = contentPath,
  isRescursive = false,
  parent = null,
  hasContent = false,
} = {}) {
  const paths = findItems({ dir, isRescursive, parent, hasContent });
  const items = formatSlugs(paths, parent);
  return items;
}

export function getPostBySlug({ lang, section, slug }) {
  const items = getPostsSlugs({
    dir: `${contentPath}/${lang}`,
    isRescursive: true,
    hasContent: true,
  });

  const postIndex = items.findIndex(
    ({ params }) =>
      params.lang === lang && params.section === section && params.slug === slug
  );

  const {
    params: { content: { frontmatter, content, excerpt } = {} },
  } = items[postIndex];

  const previousPost = items[postIndex + 1]?.params?.content || null;
  const nextPost = items[postIndex - 1]?.params?.content || null;

  return { frontmatter, post: { content, excerpt }, previousPost, nextPost };
}
