# textlint-rule-en-max-word-count [![Actions Status: test](https://github.com/textlint-rule/textlint-rule-en-max-word-count/workflows/test/badge.svg)](https://github.com/textlint-rule/textlint-rule-en-max-word-count/actions?query=workflow%3A"test")

[textlint](https://github.com/textlint/textlint "textlint") rule that specify the maximum word count of a sentence.

## Installation

    npm install textlint-rule-en-max-word-count

## Usage

Via `.textlintrc`(Recommended)

```js
{
    "rules": {
        "en-max-word-count": {
            "max" : 50
        }
    }
}
```

Via CLI

```
textlint --rule en-max-word-count README.md
```


### Options

`.textlintrc` options.

```js
{
    "rules": {
        "en-max-word-count": {
            // max count of word >
            "max" : 50
        }
    }
}
```

## Example


### OK :green_heart:

max: 4

    This is a pen.

### NG :negative_squared_cross_mark:

max: 4

    So, this is a pen.
    
    // => Exceeds the maximum word count of 4.
    



## Tests

     npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT