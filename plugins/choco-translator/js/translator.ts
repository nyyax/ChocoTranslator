export type TranslationDirection = "pt-en" | "en-pt";

export async function translateText(
    text: string,
    direction: TranslationDirection
): Promise<string> {
    const input = text.trim();

    if (!input) {
        throw new Error("Digite um texto para traduzir.");
    }

    if (input.length > 450) {
        throw new Error("Limite de 450 caracteres por traducao.");
    }

    const source = direction === "pt-en" ? "pt" : "en";
    const target = direction === "pt-en" ? "en" : "pt";

    const url =
        "https://api.mymemory.translated.net/get?q=" +
        encodeURIComponent(input) +
        "&langpair=" +
        encodeURIComponent(source + "|" + target);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Servico de traducao indisponivel.");
    }

    const data = await response.json();

    if (
        data.responseStatus !== 200 ||
        typeof data.responseData?.translatedText !== "string"
    ) {
        throw new Error("Nao foi possivel traduzir o texto.");
    }

    return data.responseData.translatedText;
}

export async function translateToEnglish(text: string) {
    return translateText(text, "pt-en");
}

export async function translateToPortuguese(text: string) {
    return translateText(text, "en-pt");
}