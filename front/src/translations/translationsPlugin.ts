import translations from "./translations.ts";

type TranslationsApiInstance = { translate: (translationName: string) => string; };

let translationsInstance: TranslationsApiInstance | null = null;

export function t(translationName: string) {
    if (!translationsInstance) {
        throw new Error('Translations has not been initialized. Did you forget to call init()?');
    }
    return translationsInstance.translate(translationName);
}

export function init() {
    translationsInstance = translations(navigator.languages);
}