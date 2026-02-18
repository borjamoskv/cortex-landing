import { useState, useEffect } from "react";
import { clsx } from "clsx";

const CODE_EXAMPLES = [
  `from cortex import Cortex

# Initialize sovereign memory
mem = Cortex.client()

# Store a fact with vector embedding
fact = mem.store(
    "The user prefers dark mode interfaces.",
    source="user_prefs"
)

# Recall with semantic search
result = mem.search("What UI does the user like?")
print(result[0].content)
# Output: "The user prefers dark mode interfaces."
`,
];

export default function CodeTerminal() {
  const [text, setText] = useState("");
  const fullText = CODE_EXAMPLES[0];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 30); // Typing speed
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg rounded-lg overflow-hidden border border-white/10 bg-[#0F0F0F] shadow-2xl font-mono text-sm">
      <div className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
        <div className="ml-auto text-xs text-white/30">python — 3.12</div>
      </div>
      <div className="p-4 text-gray-300 overflow-x-auto min-h-[300px]">
        <pre className="whitespace-pre-wrap">
          <code dangerouslySetInnerHTML={{ 
              __html: text
                .replace(/from|import|def|return|class/g, '<span class="text-[#ccff00]">$&</span>')
                .replace(/".*?"/g, '<span class="text-[#a5d6ff]">$&</span>')
                .replace(/#.*/g, '<span class="text-gray-500">$&</span>')
                .replace(/\b(Cortex|mem|fact|result)\b/g, '<span class="text-[#6600ff] font-bold">$&</span>')
            }} 
          />
          <span className="inline-block w-2 h-4 ml-1 bg-[#ccff00] animate-pulse align-middle" />
        </pre>
      </div>
    </div>
  );
}
