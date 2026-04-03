import type { BundledLanguage } from "shiki";

export type Language = {
	id: BundledLanguage;
	name: string;
	aliases?: string[];
};

export const LANGUAGES: Language[] = [
	{ id: "javascript", name: "JavaScript", aliases: ["js"] },
	{ id: "typescript", name: "TypeScript", aliases: ["ts"] },
	{ id: "jsx", name: "JSX" },
	{ id: "tsx", name: "TSX" },
	{ id: "python", name: "Python", aliases: ["py"] },
	{ id: "java", name: "Java" },
	{ id: "go", name: "Go" },
	{ id: "rust", name: "Rust", aliases: ["rs"] },
	{ id: "c", name: "C" },
	{ id: "cpp", name: "C++", aliases: ["c++"] },
	{ id: "html", name: "HTML" },
	{ id: "css", name: "CSS" },
	{ id: "sql", name: "SQL" },
	{ id: "ruby", name: "Ruby", aliases: ["rb"] },
	{ id: "php", name: "PHP" },
	{ id: "swift", name: "Swift" },
	{ id: "kotlin", name: "Kotlin", aliases: ["kt"] },
	{ id: "bash", name: "Bash", aliases: ["sh", "shell"] },
	{ id: "json", name: "JSON" },
	{ id: "yaml", name: "YAML", aliases: ["yml"] },
];

export function findLanguageById(id: string): Language | undefined {
	return LANGUAGES.find((lang) => lang.id === id || lang.aliases?.includes(id));
}
