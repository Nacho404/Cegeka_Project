import TextField from "@mui/material/TextField/TextField";
import { useEffect, useState } from "react";

const SearchBar = ({onSearchSubmit} :any) => {
    const [term, setTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const debounceTime = 500

    useEffect(() => {
        const timer = setTimeout(() => setTerm(debouncedTerm), debounceTime)
        return () => clearTimeout(timer)
    }, [debouncedTerm]);

    useEffect(() => {
        onSearchSubmit(term);
    }, [term]);

    return (
        <TextField 
            id="outlined-basic"
            label="Search"
            variant="standard"
            onChange={e => setDebouncedTerm(e.target.value)}
            value={debouncedTerm}
        />
      );
}

export default SearchBar;

