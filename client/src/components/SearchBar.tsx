import { Search, X } from "lucide-react";

type SearchBarProps = {
    value?: string;
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
    placeholder?: string;
};

export default function SearchBar({
                                      value = "",
                                      onChange,
                                      onSubmit,
                                      placeholder = "Type product, DN size, pressure, or material...",
                                  }: SearchBarProps) {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSubmit?.(value.trim());
    }

    function handleClear() {
        onChange?.("");
        onSubmit?.("");
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <button className="search-icon-button" type="submit" aria-label="Search">
                <Search size={30} strokeWidth={2.5} />
            </button>

            <input
                value={value}
                onChange={(event) => onChange?.(event.target.value)}
                placeholder={placeholder}
                type="text"
            />

            {value && (
                <button
                    className="search-clear-button"
                    type="button"
                    onClick={handleClear}
                    aria-label="Clear search"
                >
                    <X size={18} />
                    Clear
                </button>
            )}
        </form>
    );
}