import { useEffect, useContext } from 'react';

import debounce from 'lodash/debounce';

import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { indentUnit } from '@codemirror/language';
import { indentWithTab } from '@codemirror/commands';
import { PostgreSQL, sql } from '@codemirror/lang-sql';
import { oneDarkTheme, oneDarkHighlightStyle } from '@codemirror/theme-one-dark';
import { syntaxHighlighting } from '@codemirror/language';

import { CodeContext } from '../App';

export default function Editor() {
  const { setCode } = useContext(CodeContext);

  const Theme = EditorView.theme({
    '&': {
      fontSize: '13pt',
    },
    '.cm-scroller': {
      overflow: 'auto',
      maxHeight: '100vh',
    },
  });

  const debouncedSetCode = debounce(setCode, 300);

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
        EditorView.updateListener.of((e) => {
          debouncedSetCode(e.state.doc.toString());
        }),
      ],
    });

    new EditorView({ state, parent: document.querySelector('#editor')! });
  }, []);

  return <div id="editor" spellCheck="false"></div>;
}
