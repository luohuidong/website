import katex from "katex";
import type { KatexOptions } from "katex";
import { marked } from "marked";

export default function (options: KatexOptions = {}) {
  return {
    extensions: [inlineKatex(options), blockKatex(options)],
  };
}

function inlineKatex(options: KatexOptions): marked.TokenizerAndRendererExtension {
  return {
    name: "inlineKatex",
    level: "inline",
    start(src: string) {
      return src.indexOf("$");
    },
    tokenizer(src) {
      const match = src.match(/^\$+([^$\n]+?)\$+/);
      if (match) {
        return {
          type: "inlineKatex",
          raw: match[0],
          text: match[1].trim(),
        };
      }
    },
    renderer(token) {
      return katex.renderToString(token.text, { displayMode: false, output: "mathml", ...options });
    },
  };
}

function blockKatex(options: KatexOptions): marked.TokenizerAndRendererExtension {
  return {
    name: "blockKatex",
    level: "block",
    start(src: string) {
      return src.indexOf("\n$$");
    },
    tokenizer(src) {
      const match = src.match(/^\$\$+\n([^$]+?)\n\$\$+\n/);
      if (match) {
        return {
          type: "blockKatex",
          raw: match[0],
          text: match[1].trim(),
        };
      }
    },
    renderer(token) {
      return `<p>${katex.renderToString(token.text, {
        displayMode: true,
        output: "mathml",
        ...options,
      })}</p>`;
    },
  };
}
