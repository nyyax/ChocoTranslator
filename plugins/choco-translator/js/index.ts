import { React } from "@revenge-mod/react";
import { Design } from "@revenge-mod/discord/design";
import { translateToEnglish, translateToPortuguese } from "./translator";

function TranslatorScreen() {
    const [input, setInput] = React.useState("");
    const [output, setOutput] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const translate = async (direction: "pt-en" | "en-pt") => {
        if (!input.trim() || loading) return;

        setLoading(true);
        setOutput("Traduzindo...");

        try {
            const result = direction === "pt-en"
                ? await translateToEnglish(input)
                : await translateToPortuguese(input);

            setOutput(result);
        } catch (error) {
            setOutput(
                error instanceof Error
                    ? error.message
                    : "Erro ao traduzir."
            );
        } finally {
            setLoading(false);
        }
    };

    const { TableRowGroup, TableRow } = Design;

    return React.createElement(
        TableRowGroup,
        null,
        React.createElement(TableRow, {
            label: "Choco Translator",
            subLabel: "Interface de teste PT / EN"
        }),
        React.createElement(
            "TextInput" as any,
            {
                value: input,
                onChangeText: setInput,
                placeholder: "Digite o texto...",
                multiline: true
            }
        ),
        React.createElement(TableRow, {
            label: loading ? "Traduzindo..." : "Traduzir PT para EN",
            onPress: () => translate("pt-en")
        }),
        React.createElement(TableRow, {
            label: loading ? "Traduzindo..." : "Traduzir EN para PT",
            onPress: () => translate("en-pt")
        }),
        React.createElement(TableRow, {
            label: output || "A traducao aparecera aqui"
        })
    );
}

export default plugin({
    start({ logger }) {
        logger.log("Choco Translator iniciado");
    },

    SettingsComponent() {
        return React.createElement(TranslatorScreen);
    }
});