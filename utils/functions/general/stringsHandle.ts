type AccentMap = {
    [accentedChar: string]: string;
};

export const removeAccents = (str: string): string => {
    const accentMap: AccentMap = {
        'á': 'a',
        'é': 'e',
        'í': 'i',
        'ó': 'o',
        'ú': 'u',
        'ü': 'u',
        'ñ': 'n',
        'Á': 'A',
        'É': 'E',
        'Í': 'I',
        'Ó': 'O',
        'Ú': 'U',
        'Ü': 'U',
        'Ñ': 'N'
    };

    return str.replace(/[áéíóúüñÁÉÍÓÚÜÑ]/g, (letter: string) => {
        return accentMap[letter];
    });
}