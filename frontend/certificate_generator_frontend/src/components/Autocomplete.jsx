// src/components/Autocomplete.jsx
import { useEffect, useMemo, useRef, useState } from "react";

export default function Autocomplete({
  label,
  items = [],
  displayKey = "name",
  onSelect,
  placeholder = ""
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const boxRef = useRef();

  const list = useMemo(() => {
    const q = (query || "").toLowerCase().trim();
    if (!q) return items.slice(0, 8);
    return items
      .filter(i => (i[displayKey] || "").toLowerCase().startsWith(q))
      .slice(0, 8);
  }, [query, items, displayKey]);

  useEffect(() => {
    function onDoc(e) {
      if (!boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={boxRef} className="w-full">
      <label className="block text-sm font-medium font-dinarBold mb-6 pt-3">
        {label}
      </label>
      <div className="relative">
        <input
          className=" w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#008DC3] focus:shadow-md"
          value={selected ? selected[displayKey] : query}
          placeholder={placeholder}
          onChange={e => {
            setSelected(null);
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        {open && (
          <div className="absolute z-20 mt-1 w-full bg-white shadow rounded-lg border">
            {list.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">No results</div>
            ) : (
              list.map(item => (
                <button
                  key={item._id}
                  type="button"
                  className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setSelected(item);
                    setQuery("");
                    setOpen(false);
                    onSelect(item);
                  }}
                >
                  {item[displayKey]}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
