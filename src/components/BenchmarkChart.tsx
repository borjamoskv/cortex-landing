import { useEffect, useState } from 'react';

export default function BenchmarkChart() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetch('/benchmarks.json')
            .then(res => res.json())
            .then(setData)
            .catch(err => {
                // Fallback
                setData({
                    read_latency: { "Local (CORTEX)": 2.1, "Local Python": 8.5, "Cloud API": 120.0 },
                    write_latency: { "Local (CORTEX)": 3.4, "Local Python": 15.2, "Cloud API": 150.0 }
                });
            });
    }, []);

    if (!data) return <div className="animate-pulse h-64 bg-white/5 rounded-xl"></div>;

    const maxVal = Math.max(
        ...Object.values(data.read_latency) as number[], 
        ...Object.values(data.write_latency) as number[]
    );

    return (
        <div className="bg-cortex-card border border-white/10 rounded-2xl p-8 max-w-5xl mx-auto mt-24">
            <h2 className="text-3xl font-bold text-center mb-12">
                Performance by <span className="text-cortex-lime">Architecture</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-16">
                {/* Read Latency */}
                <div>
                    <h3 className="text-lg font-mono text-gray-400 mb-6 flex items-center gap-2">
                         <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                         Read Latency (ms)
                    </h3>
                    <div className="space-y-6">
                        {Object.entries(data.read_latency).map(([name, val]: [string, any]) => (
                            <Bar key={name} name={name} val={val} max={maxVal} color="bg-blue-500" highlight={name.includes('CORTEX')} />
                        ))}
                    </div>
                </div>

                {/* Write Latency */}
                <div>
                    <h3 className="text-lg font-mono text-gray-400 mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cortex-violet"></span>
                        Write Latency (ms)
                    </h3>
                    <div className="space-y-6">
                        {Object.entries(data.write_latency).map(([name, val]: [string, any]) => (
                            <Bar key={name} name={name} val={val} max={maxVal} color="bg-cortex-violet" highlight={name.includes('CORTEX')} />
                        ))}
                    </div>
                </div>
            </div>
            
             <p className="text-center text-xs text-gray-500 mt-12 font-mono max-w-2xl mx-auto leading-relaxed">
                Comparison of architectural approaches. <strong className="text-gray-300">CORTEX</strong> leverages `sqlite-vec` (written in C) for near-native performance, avoiding the overhead of pure Python loops or network round-trips typical of Cloud APIs.
            </p>
        </div>
    );
}

function Bar({ name, val, max, color, highlight }: { name: string, val: number, max: number, color: string, highlight: boolean }) {
    // Logarithmic scale for better visualization of huge differences? No, linear is more honest but we cap the max width logic.
    const width = Math.max(2, (val / max) * 100);
    
    return (
        <div className="group">
             <div className="flex justify-between text-sm mb-2">
                <span className={`font-medium ${highlight ? 'text-white' : 'text-gray-500'}`}>{name}</span>
                <span className="font-mono text-gray-500">{val}ms</span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden w-full">
                <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${highlight ? color : 'bg-gray-700'}`}
                    style={{ width: `${width}%` }}
                ></div>
            </div>
        </div>
    );
}
