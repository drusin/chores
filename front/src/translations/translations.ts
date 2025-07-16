import trnaslationsEn from './translations-en.json';
import trnaslationsDe from './translations-de.json';

const MAPPING: any = {
    'en': trnaslationsEn,
    'de': trnaslationsDe,
}

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

export default function(languages: readonly string[]) {
    const internalCode = findAvailableTranslationsCode(languages);
    const translationsFile = MAPPING[internalCode];
    return {
        translate: (translationName: string) => translate(translationsFile, translationName, internalCode),
        internalCode,
    };
}