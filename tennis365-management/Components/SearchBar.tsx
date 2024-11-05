interface SearchBarProps {
    onSearch?: (e:React.ChangeEvent<HTMLInputElement>) => void;
    keyword: string;
    placeholder: string;
}

export default function SearchBar({onSearch, keyword, placeholder}: SearchBarProps) {

// const debounce = (func: (...args:any[])=>void, delay: number) => {
//     let timer: NodeJS.Timeout;
//     return function(this:any,...args:any[]) {
//         clearTimeout(timer);
//         timer = setTimeout(() => func.apply(this, args), delay)
//     }
// }

  return (
    <>
      <input type="text" placeholder={placeholder} onChange={onSearch} value={keyword} />
    </>
  );
}
