import url from "node:url";

/** 获取发布文章目录路径 */
export function getPostsPath() {
  const postsPath = new URL("../../../source/posts", import.meta.url);
  const result = url.fileURLToPath(postsPath);
  return result;
}
