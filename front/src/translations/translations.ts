const AVAILABLE_TRANSLATIONS = ['en', 'de'];
const FALLBACK = 'en';

function translate(translationsFile: any, translationName: string, locale: string): string {
    const translation = translationsFile[translationName];
    if (!translation || typeof translation !== 'string') {
        return translationName;
    }
    console.error(`Could not find translation for ${translationName} in locale ${locale}`);
    return translation;
}

function findAvailableTranslationsCode(languages: readonly string[]) {
    for (let language of languages) {
        for (let available of AVAILABLE_TRANSLATIONS) {
            if (language.startsWith(available)) {
                return available;
            }
        }
    }
    console.log('Cannot find appropriate translations, falling back to ' + FALLBACK);
    return FALLBACK;
}

export default async function(languages: readonly string[]) {
    const internalCode = findAvailableTranslationsCode(languages);
    const translationsFile = await import(`./translations-${internalCode}.json`);
    return {
        translate: (translationName: string) => translate(translationsFile, translationName, internalCode),
    };
}