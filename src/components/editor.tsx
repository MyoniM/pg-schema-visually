import React, { useEffect, useRef } from 'react';

import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { indentUnit } from '@codemirror/language';
import { indentWithTab } from '@codemirror/commands';
import { PostgreSQL, sql } from '@codemirror/lang-sql';
import { oneDarkTheme, oneDarkHighlightStyle } from '@codemirror/theme-one-dark';
import { syntaxHighlighting } from '@codemirror/language';

export default function Editor() {
  const codeRef = useRef('');

  const Theme = EditorView.theme({
    '&': {
      fontSize: '13pt',
    },
    '.cm-scroller': {
      overflow: 'auto',
      maxHeight: '100vh',
    },
  });

  useEffect(() => {
    const state = EditorState.create({
      extensions: [
        Theme,
        basicSetup,
        sql({ dialect: PostgreSQL, upperCaseKeywords: true }),
        indentUnit.of('    '),
        keymap.of([indentWithTab]),
        oneDarkTheme,
        syntaxHighlighting(oneDarkHighlightStyle),
        // EditorView.updateListener.of((e) => (codeRef.current = e.state.doc.toString())),
      ],
    });

    new EditorView({ state, parent: document.querySelector('#editor')! });
  }, []);

  return (
    // <div>
    <div id="editor" spellCheck="false"></div>
    // </div>
  );
}
