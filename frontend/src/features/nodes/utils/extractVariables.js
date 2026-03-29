export const extractVariables = (text) => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const variables = new Set();

    let match;
    while ((match = regex.exec(text)) !== null) {
        variables.add(match[1]);
    }

    return Array.from(variables);
};