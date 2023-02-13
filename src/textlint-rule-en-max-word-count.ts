// Helper for converting plain text from Syntax-ed text(markdown AST
// https://github.com/azu/textlint-util-to-string
import { StringSource } from "textlint-util-to-string";
// Helper for splitting text to sentences
// https://github.com/azu/sentence-splitter
import { splitAST, SentenceSplitterSyntax } from "sentence-splitter";
// Helper for splitting text to words
// https://github.com/timjrobinson/split-string-words
import { splitWords } from "./split-words";
import { TextlintRuleModule } from "@textlint/types";
import type { TxtNode } from "@textlint/ast-node-types";

// Default options
const defaultOptions = {
    // max count of words >
    max: 50
};
export type Options = {
    max?: number;
}
const report: TextlintRuleModule<Options> = (context, options = {}) => {
    const { Syntax, RuleError, report } = context;
    const maxWordCount = options.max ? options.max : defaultOptions.max;
    return {
        [Syntax.Paragraph](node) {
            const sentenceRootNode = splitAST(node);
            // get sentences from Paragraph
            const sentences = sentenceRootNode.children.filter(node => {
                return node.type === SentenceSplitterSyntax.Sentence;
            });
            sentences.forEach(sentence => {
                const source = new StringSource(sentence, {
                    replacer({ node, maskValue }) {
                        // replace code with dummy code because code will include any words, but we don't want to count it
                        if (node.type === Syntax.Code) {
                            return maskValue("_");
                        }
                        return;
                    },
                });
                const sentenceText = source.toString();
                /* sentence object is a node
                {
                    type: "Sentence",
                    raw: text,
                    value: text,
                    loc: loc,
                    range: range
                };
                 */
                // words in a sentence
                const words = splitWords(sentenceText);
                // over count of word, then report error
                if (words.length > maxWordCount) {
                    // get original index value of sentence.loc.start
                    const sentenceFragment = `${words.slice(0, 3).join(' ')} ...`;
                    const ruleError = new RuleError(`Maximum word count (${maxWordCount}) exceeded (${words.length}) by "${sentenceFragment}".`);
                    report(sentence as TxtNode, ruleError);
                }
            });
        }
    };
}

export default report
