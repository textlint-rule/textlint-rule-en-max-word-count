export function splitWords(string) {
    if (!string) return [];

    const match = string.match(/"(?:\\"|[^"])+"|[^\s]+/g);
    if (!match) {
        return [];
    }
    return match
        .map(function(word) { return word.replace(/^\"|\"$/g, ""); });  // Remove quotes from start and end of quoted strings matched above
}
