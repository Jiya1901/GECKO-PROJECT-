import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';

interface NumericalSimulationProps {
  area: number;
  angle: number;
}

export const NumericalSimulation: React.FC<NumericalSimulationProps> = ({ area, angle }) => {
  // F ∝ (A / d^2) * cos(theta)
  // Updated Logic: 0-16 is Approach (Force = 0)
  const calculateForce = (a: number, deg: number) => {
    if (deg <= 16) return 0;
    
    // Smooth ramp up from 16 to 25
    if (deg <= 25) {
      const p = (deg - 16) / 9;
      return a * p;
    }

    const rad = (deg * Math.PI) / 180;
    return a * Math.cos(rad);
  };

  const currentForce = calculateForce(area, angle);

  const data = Array.from({ length: 91 }, (_, i) => ({
    angle: i,
    force: calculateForce(area, i),
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-brand-primary/10 p-4 rounded-xl border border-brand-primary/20">
          <p className="text-xs uppercase tracking-wider text-brand-secondary font-bold">Surface Area (A)</p>
          <p className="text-2xl font-mono">{area.toFixed(1)} µm²</p>
        </div>
        <div className="bg-brand-primary/10 p-4 rounded-xl border border-brand-primary/20">
          <p className="text-xs uppercase tracking-wider text-brand-secondary font-bold">Contact Angle (θ)</p>
          <p className="text-2xl font-mono">{angle}°</p>
        </div>
        <div className="bg-brand-primary/10 p-4 rounded-xl border border-brand-primary/20">
          <p className="text-xs uppercase tracking-wider text-brand-secondary font-bold">Adhesion Force (F)</p>
          <p className="text-2xl font-mono text-brand-primary">{currentForce.toFixed(2)} nN</p>
        </div>
      </div>

      <div className="h-[300px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="angle" 
              label={{ value: 'Angle (θ)', position: 'insideBottom', offset: -5 }} 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              label={{ value: 'Force (F)', angle: -90, position: 'insideLeft' }} 
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <ReferenceArea x1={0} x2={16} fill="#94a3b8" fillOpacity={0.1} label="Approach" />
            <ReferenceArea x1={17} x2={45} fill="#10b981" fillOpacity={0.1} label="Strong Grip" />
            <ReferenceArea x1={46} x2={90} fill="#ef4444" fillOpacity={0.1} label="Detachment" />
            <Line 
              type="monotone" 
              dataKey="force" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={false}
              activeDot={{ r: 6, fill: '#064e3b' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Statistical Data Table */}
      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase font-bold">
            <tr>
              <th className="px-4 py-2">Angle Range</th>
              <th className="px-4 py-2">Simulation State</th>
              <th className="px-4 py-2">Force Efficiency</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="px-4 py-2">0° - 16°</td>
              <td className="px-4 py-2 text-slate-500 font-bold">Approach</td>
              <td className="px-4 py-2">0%</td>
            </tr>
            <tr>
              <td className="px-4 py-2">17° - 45°</td>
              <td className="px-4 py-2 text-brand-primary font-bold">Optimal Grip</td>
              <td className="px-4 py-2">70% - 100%</td>
            </tr>
            <tr>
              <td className="px-4 py-2">46° - 90°</td>
              <td className="px-4 py-2 text-red-500 font-bold">Detachment</td>
              <td className="px-4 py-2">&lt; 70%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
