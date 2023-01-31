import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import type { ParameterizedContext } from "koa";

import type { NoteConfig } from "./types";
import { parseMarkdown, formatDate } from "../../utils/index.js";

export class NoteController {
  private getNotesPath = () => {
    const postsPath = new URL("../../../../source/notes", import.meta.url);
    const result = url.fileURLToPath(postsPath);
    return result;
  };

  /** get All Notes */
  getNotes = async (ctx: ParameterizedContext) => {
    interface NotesListItem {
      noteDirName: string;
      noteTitle: string;
    }
    const notesPath = this.getNotesPath();
    const notesListData: NotesListItem[] = [];
    const notes = fs.readdirSync(notesPath);
    const total = notes.length >= 10 ? 10 : notes.length;

    for (let i = 0; i < total; i++) {
      const notesDirPath = notesPath;
      const noteDirName = notes[i];
      const noteConfigFilePath = path.join(notesDirPath, noteDirName, "config.json");
      const noteConfig: NoteConfig = JSON.parse(
        fs.readFileSync(noteConfigFilePath, {
          encoding: "utf-8",
        })
      );
      notesListData.push({
        noteTitle: noteConfig.title,
        noteDirName,
      } as NotesListItem);
    }

    ctx.body = {
      list: notesListData,
    };
  };

  /** get all posts of note */
  getNotePosts = async (ctx: ParameterizedContext) => {
    const notesPath = this.getNotesPath();
    const params = ctx.params as {
      notedirname: string;
    };

    const noteDirPath = path.join(notesPath, params.notedirname);
    const config = JSON.parse(
      fs.readFileSync(path.join(noteDirPath, "config.json"), {
        encoding: "utf-8",
      })
    ) as NoteConfig;

    ctx.body = {
      data: config,
    };
  };

  getPost = async (ctx: ParameterizedContext) => {
    const params = ctx.params as {
      notedirname: string;
      postlink: string;
    };

    const notePath = path.join(
      this.getNotesPath(),
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
