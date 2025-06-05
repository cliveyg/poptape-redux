export function isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/i;
    return uuidRegex.test(uuid);
}

export function getFieldFromToken(token, field) {
    const tokenArray = token.split(".")
    const base64decoded = JSON.parse(atob(tokenArray[1]))
    return base64decoded[field]
}