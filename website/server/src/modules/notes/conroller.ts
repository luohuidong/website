import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import type { ParameterizedContext } from "koa";

import type { NotebookConfig } from "./types";
import { parseMarkdown, formatDate } from "../../utils/index.js";

export class NoteController {
  private getNotebooksPath = () => {
    const notebooksPath = new URL("../../../../source/notebooks", import.meta.url);
    const result = url.fileURLToPath(notebooksPath);
    return result;
  };

  /** get All Notebooks */
  getNotebooks = async (ctx: ParameterizedContext) => {
    interface NotebooksItem {
      notebookDirName: string;
      notebookTitle: string;
      notebookConfig: NotebookConfig;
    }
    const notebooksPath = this.getNotebooksPath();
    const notebooksListData: NotebooksItem[] = [];
    const notebooks = fs.readdirSync(notebooksPath);
    const total = notebooks.length >= 10 ? 10 : notebooks.length;

    for (let i = 0; i < total; i++) {
      const notebookDirName = notebooks[i];
      const notebookConfigFilePath = path.join(notebooksPath, notebookDirName, "config.json");
      const notebookConfig: NotebookConfig = JSON.parse(
        fs.readFileSync(notebookConfigFilePath, {
          encoding: "utf-8",
        })
      );

      notebooksListData.push({
        notebookTitle: notebookConfig.title,
        notebookDirName: notebookDirName,
        notebookConfig,
      } as NotebooksItem);
    }

    ctx.body = {
      list: notebooksListData,
    };
  };

  /** get all posts of note */
  getNotebookPosts = async (ctx: ParameterizedContext) => {
    const notebooksPath = this.getNotebooksPath();
    const params = ctx.params as {
      notebookDirName: string;
    };

    const notebookDirPath = path.join(notebooksPath, params.notebookDirName);
    const notebookConfig = JSON.parse(
      fs.readFileSync(path.join(notebookDirPath, "config.json"), {
        encoding: "utf-8",
      })
    ) as NotebookConfig;

    ctx.body = {
      data: notebookConfig,
    };
  };

  getPost = async (ctx: ParameterizedContext) => {
    const params = ctx.params as {
      notedirname: string;
      postlink: string;
    };

    const notePath = path.join(
      this.getNotebooksPath(),
      params.notedirname,
      decodeURIComponent(params.postlink)
    );
    const data = await parseMarkdown<{
      title: string;
      date: string;
    }>(notePath);

    ctx.body = {
      data: {
        meta: {
          title: data.meta.title,
          date: formatDate(data.meta.date),
        },
        content: data.content,
      },
    };
  };
}
