import {
    cardThemes
} from "../config/cardThemes";


export const getCardTheme = (
    theme
) => {

    const template =
        theme?.template ||
        "modern";


    const baseTheme =
        cardThemes[
        template
        ] ||
        cardThemes.modern;


    return {

        ...baseTheme,

        primaryColor:
            theme?.primaryColor ||
            baseTheme.primaryColor ||
            "#000000",

        secondaryColor:
            theme?.secondaryColor ||
            baseTheme.secondaryColor ||
            "#ffffff",

        fontFamily:
            theme?.fontFamily ||
            "Inter",

        buttonStyle:
            theme?.buttonStyle ||
            "rounded"

    };

};