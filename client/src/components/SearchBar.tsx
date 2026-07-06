import { Keyboard, Search } from "lucide-react";

type SearchBarProps = {
    placeholder?: string;
};

export default function SearchBar({
                                      placeholder = "SEARCH PRODUCT, DN SIZE, MATERIAL, OR ORDER #",
                                  }: SearchBarProps) {
    return (
        <section className="search-bar">
            <div className="search-icon">
                <Search size={28} />
            </div>

            <input type="text" placeholder={placeholder} />

            <button className="keyboard-button">
                <Keyboard size={16} />
                KEYBOARD
            </button>
        </section>
    );
}