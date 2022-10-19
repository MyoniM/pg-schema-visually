import nearley from 'nearley';

import { grammarWrapper } from './schemaGrammar';

function parse(strCode: string) {
  try {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammarWrapper()));

    parser.feed(strCode);

    const parseResult = parser.results;
    if (parseResult.length === 0 || parseResult.length > 1) return { ast: [], error: 'Invalid syntax' };
    return { ast: parseResult[0], error: undefined };
  } catch (error) {
    return { ast: [], error };
  }
}

export { parse };
