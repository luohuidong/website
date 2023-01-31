import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import url from "node:url";
import type { ParameterizedContext } from "koa";

import { parseMarkdown, formatDate } from "../../utils/index.js";

export class PostController {
  private getPostsPath = () => {
    const postsPath = new URL("../../../../source/posts", import.meta.url);
    const result = url.fileURLToPath(postsPath);
    return result;
  };

  getPosts = async (ctx: ParameterizedContext) => {
    interface PostListItem {
      filename: string;
      title: string;
      date: string;
      tags: string[] | null;
    }
    const postsPath = this.getPostsPath();
    const postListData: PostListItem[] = [];
    const posts = fs.readdirSync(postsPath).reverse();
    const total = posts.length >= 10 ? 10 : posts.length;

    for (let i = 0; i < total; i++) {
      const postsDirPath = postsPath;
      const postFileName = posts[i];
      const filePath = path.join(postsDirPath, postFileName);
      const content = fs.readFileSync(filePath, {
        encoding: "utf-8",
      });
      const { data } = matter(content);
      postListData.push({
        ...data,
        filename: postFileName,
        date: formatDate(data.date),
      } as PostListItem);
    }

    ctx.body = {
      list: postListData,
    };
  };

  getPost = async (ctx: ParameterizedContext) => {
    const postsPath = this.getPostsPath();
    const params = ctx.params as {
      postfilename: string;
    };

    const { meta, content } = await parseMarkdown<{ date: string; tags: string[]; title: string }>(
      path.join(postsPath, params.postfilename)
    );

    ctx.body = {
      title: meta.title as string,
      date: formatDate(meta.date),
      content,
    };
  };
}
