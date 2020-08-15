import matter from "gray-matter";
import fs from "fs";
import path from "path";
import cfg from "../cfg";

const contentPath = `${process.cwd()}/content/${cfg.contentPath}`;

export function findItems(dir, isRescursive = false, parent = null) {
  const folders = fs.readdirSync(dir).map((name) => {
    const filePath = path.join(dir, name);
    const fileStat = fs.lstatSync(filePath);
    const isFolder = fileStat.isDirectory();
    const children =
      (isRescursive && isFolder && findItems(filePath, isRescursive, name)) ||
      [];
    const content = (!isFolder && getContentFile(name, filePath)) || null;
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
    //TODO: DELETE
    date: (data.date && getFormattedDate(data.date)) || null,
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

export function getPostFolders() {
  // Get all posts folders located in `content/posts`
  const postFolders = fs
    .readdirSync(`${process.cwd()}/content/posts`)
    .map((folderName) => ({
      directory: folderName,
      filename: `${folderName}.md`,
    }));
  const folders = findItems(contentPath);
  return { postFolders, folders };
}

// Get day in format: Month day, Year. e.g. April 19, 2020
function getFormattedDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}

export function getSortedPosts() {
  const { postFolders, folders } = getPostFolders();

  const posts = postFolders
    .map(({ filename, directory }) => {
      // Get raw content from file
      const markdownWithMetadata = fs
        .readFileSync(`content/posts/${directory}/${filename}`)
        .toString();

      // Parse markdown, get frontmatter data, excerpt and content.
      const { data, excerpt, content } = matter(markdownWithMetadata);

      const frontmatter = {
        ...data,
        date: getFormattedDate(data.date),
      };

      // Remove .md file extension from post name
      const slug = filename.replace(".md", "");

      return {
        slug,
        frontmatter,
        excerpt,
        content,
      };
    })
    .sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );

  return { posts, folders };
}

export function getPostsSlugs(rescursive = false) {
  const { postFolders, folders } = getPostFolders(rescursive);

  const paths = folders.map(({ parent, filename }) => ({
    params: {
      slug: filename.replace(".md", ""),
      lang: parent,
    },
  }));

  return paths;
}
export function getSlugs(isRescursive = false) {
  const paths = findItems(contentPath, isRescursive).map(({ parent, name }) => {
    const slug = name.replace(".md", "");
    return {
      params: {
        slug: slug,
        lang: isRescursive ? parent : slug,
      },
    };
  });
  return paths;
}

export function getPostBySlug(slug) {
  const { posts, folders } = getSortedPosts();

  const postIndex = posts.findIndex(({ slug: postSlug }) => postSlug === slug);

  const { frontmatter, content, excerpt } = posts[postIndex];

  const previousPost = posts[postIndex + 1];
  const nextPost = posts[postIndex - 1];

  return { frontmatter, post: { content, excerpt }, previousPost, nextPost };
}
