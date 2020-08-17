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
      isRescursive && isFolder
        ? findItems({ dir: filePath, isRescursive, parent: name, hasContent })
        : [];
    const content =
      hasContent && !isFolder ? getContentFile(name, filePath) : null;
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
    const _children = children?.length ? getSlugsFromList(children) : [];
    paths.push({
      params: {
        slug,
        lang,
        section,
        content,
        children: _children,
      },
    });
    paths = [...paths, ..._children];
  });
  return paths;
}

export function getPostsSlugs({
  isRescursive = false,
  hasContent = false,
  hasFilter = true,
  lang = null,
  dir = null,
} = {}) {
  const pathsFolders = findItems({
    dir: dir || contentPath,
    isRescursive,
    hasContent,
    parent: lang,
  });
  const items = formatSlugs(pathsFolders, lang);

  const sortedItems = items.sort(
    (a, b) => a.params.isFolder - b.params.isFolder
  );
  const paths = getSlugsFromList(sortedItems);
  //filter
  let posts = hasFilter
    ? paths.filter(({ params: { lang: _lang, slug, section } }) =>
        section && lang ? _lang === lang : _lang && slug
      )
    : paths;

  return posts;
}

function formatSlugs(items, lang = null) {
  const _items = items.map(
    ({ name, parent, isFolder, isRescursive, children, content }) => {
      const _name = name.replace(".md", "");
      const _slug = !isFolder && parent && parent !== lang ? _name : null;
      const _section = (isFolder && parent) || parent === lang ? _name : parent;
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
  return items.sort((a, b) => a.params.isFolder - b.params.isFolder);
}

export function getPostBySlug({ lang, section, slug }) {
  const items = getPostsSlugs({
    dir: `${contentPath}/${lang}`,
    isRescursive: true,
    hasContent: true,
    lang,
  });

  const postIndex = items.findIndex(
    ({ params }) =>
      params.lang === lang && params.section === section && params.slug === slug
  );

  const {
    params: { content: { frontmatter, content, excerpt } = {} },
  } = items[postIndex];

  const previousPost = items[postIndex - 1]?.params?.content || null;
  const nextPost = items[postIndex + 1]?.params?.content || null;

  return { frontmatter, post: { content, excerpt }, previousPost, nextPost };
}
function getPostIndex(items = [], { lang, section }) {
  //check valid
  if (!items?.length) return {};
  let postIndex = items.findIndex(
    ({ params }) => params.lang === lang && params.section === section
  );
  const { params: sectionPost } = items[postIndex] || {};

  if (!sectionPost?.content)
    return getPostIndex(sectionPost?.children || [], { lang, section });

  //get next and prev
  const previousPost = items[postIndex - 1]?.params?.content || null;
  const nextPost = items[postIndex + 1]?.params?.content || null;
  //return data
  return { sectionPost, previousPost, nextPost };
}

export function getPostBySection({ lang, section }) {
  const items = getPostsSlugs({
    dir: `${contentPath}/${lang}`,
    isRescursive: true,
    hasContent: true,
    hasFilter: false,
    lang,
  });

  const { sectionPost, previousPost = null, nextPost = null } = getPostIndex(
    items,
    {
      lang,
      section,
    }
  );
  //check if it is child
  const { frontmatter = null, content = null, excerpt = null } =
    sectionPost?.content || {};
  return { frontmatter, post: { content, excerpt }, previousPost, nextPost };
}
