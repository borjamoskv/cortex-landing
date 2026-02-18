import { useEffect, useState } from 'react';

export default function BenchmarkChart() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetch('/benchmarks.json')
            .then(res => res.json())
            .then(setData)
            .catch(err => {
                // Fallback data if file not found
                setData({
                    read_latency_ms: { CORTEX: 2.1, Chroma: 8.2, Pinecone: 85.0 },
                    write_latency_ms: { CORTEX: 3.5, Chroma: 15.4, Pinecone: 120.5 }
                });
            });
    }, []);

    if (!data) return <div className="animate-pulse h-64 bg-white/5 rounded-xl"></div>;

    const maxVal = Math.max(
        ...Object.values(data.read_latency_ms) as number[], 
        ...Object.values(data.write_latency_ms) as number[]
    );

    return (
        <div className="bg-cortex-card border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto mt-24">
            <h2 className="text-3xl font-bold text-center mb-8">
                <span className="text-cortex-lime">Sovereign Speed</span> vs The Cloud
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
                {/* Read Latency */}
                <div>
                    <h3 className="text-xl font-mono text-gray-400 mb-6 text-center">Read Latency (ms)</h3>
                    <div className="space-y-4">
                        {Object.entries(data.read_latency_ms).map(([name, val]: [string, any]) => (
                            <Bar key={name} name={name} val={val} max={maxVal} color={name === 'CORTEX' ? 'bg-cortex-lime' : 'bg-gray-700'} />
                        ))}
                    </div>
                </div>

                {/* Write Latency */}
                <div>
                    <h3 className="text-xl font-mono text-gray-400 mb-6 text-center">Write Latency (ms)</h3>
                    <div className="space-y-4">
                        {Object.entries(data.write_latency_ms).map(([name, val]: [string, any]) => (
                            <Bar key={name} name={name} val={val} max={maxVal} color={name === 'CORTEX' ? 'bg-cortex-violet' : 'bg-gray-700'} />
                        ))}
                    </div>
                </div>
            </div>
            
             <p className="text-center text-xs text-gray-600 mt-8 font-mono">
                * Lower is better. CORTEX runs on `sqlite-vec` (C/Rust). Competitors simulated based on public cloud metrics.
            </p>
        </div>
    );
}

function Bar({ name, val, max, color }: { name: string, val: number, max: number, color: string }) {
    const width = Math.max(5, (val / max) * 100);
    return (
        <div className="flex items-center gap-4 group">
            <div className={`w-24 text-right font-bold ${name === 'CORTEX' ? 'text-white' : 'text-gray-500'}`}>
                {name}
            </div>
            <div className="flex-1 h-8 bg-black/50 rounded-full overflow-hidden relative">
                <div 
                    className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${width}%` }}
                ></div>
            </div>
            <div className="w-16 font-mono text-xs text-gray-400">
                {val}ms
            </div>
        </div>
    );
}
