
import React from 'react';
import { motion } from 'framer-motion';

const benchmarks = [
  { metric: 'Embedding', cortex: '0.1ms (Local ONNX)', cloud: '~50ms (API)', advantage: '99.8%' },
  { metric: 'Search', cortex: '8ms (Local)', cloud: '~200ms (API)', advantage: '96%' },
  { metric: 'Store', cortex: '12ms (Local)', cloud: '~150ms (API)', advantage: '92%' },
  { metric: 'Cost', cortex: '$0.00 / token', cloud: '$0.0001 / token', advantage: 'Infinity' },
];

const features = [
  {
    title: 'Sovereignty',
    desc: 'Zero network calls. Your data never leaves localhost. No API keys. No leaks.',
    icon: '🛡️'
  },
  {
    title: 'Cryptographic Ledger',
    desc: 'SHA-256 hash-chained history. If a bit flips or is tampered with, the chain breaks.',
    icon: '⛓️'
  },
  {
    title: 'Graph RAG',
    desc: 'Automatic knowledge graph construction. Connects entities and relations seamlessly.',
    icon: '🕸️'
  },
  {
    title: 'Temporal Facts',
    desc: 'Every memory has valid_from and valid_until. Query the state of mind at any past point.',
    icon: '⏳'
  }
];

export default function Specs() {
  return (
    <section className="py-24 bg-[#0A0A0A] text-gray-300 relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                HARD <span className="text-[#CCFF00]">SPECS</span>
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                No magic. Just engineering. <br/>
                Benchmark running on MacBook Air M2 vs Cloud API.
            </p>
        </div>

        {/* Benchmarks Table */}
        <div className="mb-24 overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-[#333] text-gray-500 font-mono text-sm uppercase tracking-wider">
                        <th className="py-4 px-6">Metric</th>
                        <th className="py-4 px-6 text-[#CCFF00]">CORTEX (Local)</th>
                        <th className="py-4 px-6">Cloud (Mem0/Pinecone)</th>
                        <th className="py-4 px-6 text-right">Advantage</th>
                    </tr>
                </thead>
                <tbody className="font-mono">
                    {benchmarks.map((row, i) => (
                        <motion.tr 
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="border-b border-[#222] hover:bg-[#111] transition-colors"
                        >
                            <td className="py-6 px-6 font-bold text-white">{row.metric}</td>
                            <td className="py-6 px-6 text-[#CCFF00]">{row.cortex}</td>
                            <td className="py-6 px-6 text-gray-500">{row.cloud}</td>
                            <td className="py-6 px-6 text-right text-[#CCFF00]">{row.advantage}</td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="p-6 border border-[#222] bg-[#050505] hover:border-[#CCFF00] hover:-translate-y-1 transition-all duration-300 group"
                >
                    <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{feat.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#CCFF00] transition-colors">{feat.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                        {feat.desc}
                    </p>
                </motion.div>
            ))}
        </div>

      </div>
    </section>
  );
}
