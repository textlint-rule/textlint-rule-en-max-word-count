const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
import rule from "../src/textlint-rule-en-max-word-count";
// ruleName, rule, { valid, invalid }
tester.run("max-word-count", rule, {
    valid: [
        // no match
        {
            text: "This is pen.",
            options: {
                max: 3
            }
        },
        // replace Code block to a word
        {
            text: "This is `code is a word`.",
            options: {
                max: 3
            }
        },
        {
            text: `

### JMS Messaging Properties

#### \`ep.jms.type\`

Developer Default: \`org.apache.activemq.pool.PooledConnectionFactory\`

The Java Class type of the JMS Broker Connection Factory.\t

#### \`ep.jms.factory\`

Developer Default: \`org.apache.activemq.jndi.JNDIReferenceFactory\`

The JNDI resource factory used by the application.\t

#### \`ep.jms.url\`

Developer Default: \`tcp://localhost:61616\`

The URL of the JMS broker.
`
        }
    ],
    invalid: [
        // single match
        {
            text: "This is a pen.",
            options: {
                max: 3
            },
            errors: [
                {
                    message: "Exceeds the maximum word count of 3.",
                    line: 1,
                    column: 1
                }
            ]
        },
        // multiple match in multiple lines
        {
            text: `This is a pen.
            
This is not a pen.`,
            options: {
                max: 3
            },
            errors: [
                {
                    message: "Exceeds the maximum word count of 3.",
                    line: 1,
                    column: 1
                },
                {
                    message: "Exceeds the maximum word count of 3.",
                    line: 3,
                    column: 1
                }
            ]
        },
        // multiple hit items in a line
        {
            text: "This is a pen.This is not a pen.",
            options: {
                max: 3
            },
            errors: [
                {
                    message: "Exceeds the maximum word count of 3.",
                    line: 1,
                    column: 1
                },
                {
                    message: "Exceeds the maximum word count of 3.",
                    line: 1,
                    column: 15
                }
            ]
        },
        // It is a single sentence
        {
            text: "This is a pen This is not a pen.",
            options: {
                max: 3
            },
            errors: [
                {
                    message: "Exceeds the maximum word count of 3.",
                    line: 1,
                    column: 1
                }
            ]
        }
    ]
});
