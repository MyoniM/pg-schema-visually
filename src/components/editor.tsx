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
import { generateViewData } from '../utils/generateViewData';

export default function Editor() {
  const { setViewData } = useContext(CodeContext);

  const Theme = EditorView.theme({
    '&': {
      fontSize: '13pt',
    },
    '.cm-scroller': {
      overflow: 'auto',
      maxHeight: '100vh',
    },
  });

  // the whole purpose of this function is to preserve view state while displaying error
  // last successful view data is stored on state so visualizer always shows that data
  // when error is thrown it will be added on the viewData state and it will be displayed as overlay
  const setHandler = (stringCode: string) => {
    const { viewData, errorMessage } = generateViewData(stringCode);
    if (errorMessage != null) setViewData((prevData: any) => ({ ...prevData, errorMessage }));
    else setViewData((_: any) => ({ successfulViewData: viewData }));
  };

  const debouncedSetCode = debounce(setHandler, 300);

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
