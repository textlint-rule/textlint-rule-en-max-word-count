export function splitWords(string: string) {
    if (!string) return [];

    const match = string.match(/"(?:\\"|[^"])+"|[^\s]+/g);
    if (!match) {
        return [];
    }
    // Remove quotes from start and end of quoted strings matched above
    return match
        .map(function (word) {
            return word.replace(/^\"|\"$/g, "");
        });
}
