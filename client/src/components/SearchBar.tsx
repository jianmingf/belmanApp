import { Keyboard, Search } from "lucide-react";

type SearchBarProps = {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
};

export default function SearchBar({
                                      placeholder = "SEARCH PRODUCT, DN SIZE, MATERIAL, OR ORDER #",
                                      value = "",
                                      onChange,
                                  }: SearchBarProps) {
    return (
        <section className="search-bar">
            <div className="search-icon">
                <Search size={28} />
            </div>

            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(event) => onChange?.(event.target.value)}
            />

            <button className="keyboard-button">
                <Keyboard size={16} />
                KEYBOARD
            </button>
        </section>
    );
}