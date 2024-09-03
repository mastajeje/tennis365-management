interface SearchBarProps {
    onSearch?: (e:React.ChangeEvent<HTMLInputElement>) => void;
    keyword: string;
    placeholder: string;
}

export default function SearchBar({onSearch, keyword, placeholder}: SearchBarProps) {

  return (
    <>
      <input type="text" placeholder={placeholder} onChange={onSearch} value={keyword} />
    </>
  );
}
