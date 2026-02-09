import { Input } from "./input";

export function ChipInput({
  value = [],
  onChange,
  placeholder,
}: {
  value?: string[];
  onChange: (val: string[]) => void;
  placeholder: string;
}) {
  const safeValue = value ?? [];

  return (
    <div className="space-y-2">
      <Input
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.currentTarget.value) {
            e.preventDefault();
            onChange([...safeValue, e.currentTarget.value]);
            e.currentTarget.value = "";
          }
        }}
        className="bg-white/5 border-white/10 text-white"
      />

      <div className="flex flex-wrap gap-2">
        {safeValue.map((item, i) => (
          <span
            key={i}
            className="rounded-full bg-white/10 px-3 py-1 text-xs text-white"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
