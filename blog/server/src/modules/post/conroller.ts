import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import matter from "gray-matter";
import shiki from "shiki";
import url from "node:url";
import type { ParameterizedContext } from "koa";

import markedKatexExtension from "./markedKatexExtension.js";

export class PostController {
  private getPostsPath = () => {
    const postsPath = new URL("../../../../source/posts", import.meta.url);
    const result = url.fileURLToPath(postsPath);
    return result;
  };

  private formatDate = (date: string) => {
    const tmp = new Date(date);
    return `${tmp.getFullYear()}-${tmp.getMonth() + 1}-${tmp.getDate()}`;
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
        date: this.formatDate(data.date),
      } as PostListItem);
    }

    ctx.body = {
      list: postListData,
    };
  };

  getPost = async (ctx: ParameterizedContext) => {
    const postsPath = this.getPostsPath();
    const body = ctx.params as {
      postfilename: string;
    };

    const fileData = fs.readFileSync(path.join(postsPath, body.postfilename), {
      encoding: "utf-8",
    });

    const highlighter = await shiki.getHighlighter({
      theme: "nord",
    });

    let { data, content } = matter(fileData);
    marked.setOptions({
      highlight: function (code, lang) {
        return highlighter.codeToHtml(code, { lang });
      },
    });
    marked.use(markedKatexExtension());
    content = marked.parse(content);

    ctx.body = {
      title: data.title as string,
      date: this.formatDate(data.date),
      content,
    };
  };
}
