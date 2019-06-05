// Helper for creating new AST using map function
// https://github.com/azu/unist-util-map
// if you want to filter, use https://github.com/eush77/unist-util-filter
import map from "unist-util-map";
// Helper for converting plain text from Syntax-ed text(markdown AST
// https://github.com/azu/textlint-util-to-string
import StringSource from "textlint-util-to-string";
// Helper for splitting text to sentences
// https://github.com/azu/sentence-splitter
import {split as splitSentence, Syntax as SplitterSyntax} from "sentence-splitter";
// Helper for splitting text to words
// https://github.com/timjrobinson/split-string-words
import {splitWords} from "./split-words";
import ObjectAssign from "object-assign";

// Default options
const defaultOptions = {
    // max count of words >
    max: 50
};
/**
 * @param {TextLintRuleContext} context
 * @param {Object} options
 */
function report(context, options = {}) {
    const {Syntax, getSource, RuleError, report} = context;
    const maxWordCount = options.max ? options.max : defaultOptions.max;
    return {
        [Syntax.Paragraph](node){
            // replace code with dummy code
            // if you want to filter(remove) code, use https://github.com/eush77/unist-util-filter
            const filteredNode = map(node, (node) => {
                if (node.type === Syntax.Code) {
                    // only change `value` to dummy
                    return ObjectAssign({}, node, {
                        value: "code"
                    });
                }
                return node;
            });
            const source = new StringSource(filteredNode);
            // text in a paragraph
            const text = source.toString();
            // get sentences from Paragraph
            const sentences = splitSentence(text).filter(node => {
                // ignore break line
                return node.type === SplitterSyntax.Sentence;
            });
            // text in a sentence
            sentences.forEach(sentence => {
                /* sentence object is a node
                {
                    type: "Sentence",
                    raw: text,
                    value: text,
                    loc: loc,
                    range: range
                };
                 */
                const sentenceText = sentence.value;
                console.log(sentenceText);
                // words in a sentence
                const words = splitWords(sentenceText);
                // over count of word, then report error
                if (words.length > maxWordCount) {
                    // get original index value of sentence.loc.start
                    const originalIndex = source.originalIndexFromPosition(sentence.loc.start);
                    const ruleError = new RuleError(`Exceeds the maximum word count of ${maxWordCount}.`, {
                        index: originalIndex
                    });
                    report(node, ruleError);
                }
            });
        }
    };
}
module.exports = report;
