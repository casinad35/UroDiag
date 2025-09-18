import React from 'react';
import { PatientData } from '../../data/urodynamicData';

interface FlowChartProps {
  data: PatientData;
  width?: number;
  height?: number;
}

export default function FlowChart({ data, width = 400, height = 300 }: FlowChartProps) {
  const { debitMetrie } = data;
  
  // Génération des points de la courbe de débitmétrie
  const generateFlowCurve = () => {
    const points: { x: number; y: number }[] = [];
    const totalTime = debitMetrie.tempsVidange;
    const qMax = debitMetrie.qMax;
    const qMoyen = debitMetrie.qMoyen;
    const tempsQmax = debitMetrie.tempsJusquQmax || totalTime * 0.3;
    const tempsLatence = debitMetrie.tempsLatence;
    
    // Génération selon la forme de débitmétrie
    for (let t = 0; t <= totalTime; t += 0.5) {
      let flow = 0;
      
      if (t < tempsLatence) {
        flow = 0;
      } else {
        const adjustedTime = t - tempsLatence;
        const adjustedTotal = totalTime - tempsLatence;
        const adjustedQmaxTime = tempsQmax - tempsLatence;
        
        switch (debitMetrie.formeDebitmetrie) {
          case 'normale':
            if (adjustedTime <= adjustedQmaxTime) {
              flow = (qMax * adjustedTime) / adjustedQmaxTime;
            } else {
              const remainingTime = adjustedTotal - adjustedQmaxTime;
              const timeFromPeak = adjustedTime - adjustedQmaxTime;
              flow = qMax * Math.exp(-2 * timeFromPeak / remainingTime);
            }
            break;
            
          case 'en_plateau':
            if (adjustedTime <= adjustedQmaxTime * 0.5) {
              flow = (qMax * adjustedTime) / (adjustedQmaxTime * 0.5);
            } else if (adjustedTime <= adjustedQmaxTime * 1.5) {
              flow = qMax * (0.9 + 0.1 * Math.sin(adjustedTime * 2));
            } else {
              flow = qMax * Math.exp(-1.5 * (adjustedTime - adjustedQmaxTime * 1.5) / (adjustedTotal - adjustedQmaxTime * 1.5));
            }
            break;
            
          case 'intermittente':
            const cycles = Math.floor(adjustedTime / (adjustedTotal / 4));
            const cycleTime = adjustedTime % (adjustedTotal / 4);
            if (cycleTime < (adjustedTotal / 8)) {
              flow = qMax * 0.8 * Math.sin((cycleTime * Math.PI) / (adjustedTotal / 8));
            } else {
              flow = 0;
            }
            break;
            
          case 'en_cloche':
            const normalizedTime = adjustedTime / adjustedTotal;
            flow = qMax * Math.exp(-Math.pow((normalizedTime - 0.3) / 0.2, 2));
            break;
            
          default:
            flow = qMoyen;
        }
      }
      
      points.push({ x: t, y: Math.max(0, flow) });
    }
    
    return points;
  };

  const points = generateFlowCurve();
  const maxFlow = Math.max(...points.map(p => p.y));
  const scaleX = (width - 80) / debitMetrie.tempsVidange;
  const scaleY = (height - 80) / Math.max(maxFlow, debitMetrie.qMax);

  const pathData = points
    .map((point, index) => {
      const x = 60 + point.x * scaleX;
      const y = height - 40 - point.y * scaleY;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Courbe de Débitmétrie</h4>
      <svg width={width} height={height} className="border border-gray-100">
        {/* Grille */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#grid)" />
        
        {/* Axes */}
        <line x1="60" y1={height - 40} x2={width - 20} y2={height - 40} stroke="#374151" strokeWidth="2" />
        <line x1="60" y1="20" x2="60" y2={height - 40} stroke="#374151" strokeWidth="2" />
        
        {/* Labels des axes */}
        <text x={width / 2} y={height - 10} textAnchor="middle" className="text-sm fill-gray-600">
          Temps (s)
        </text>
        <text x="20" y={height / 2} textAnchor="middle" className="text-sm fill-gray-600" transform={`rotate(-90, 20, ${height / 2})`}>
          Débit (ml/s)
        </text>
        
        {/* Graduations X */}
        {Array.from({ length: Math.ceil(debitMetrie.tempsVidange / 5) + 1 }, (_, i) => i * 5).map(time => (
          <g key={time}>
            <line x1={60 + time * scaleX} y1={height - 40} x2={60 + time * scaleX} y2={height - 35} stroke="#374151" />
            <text x={60 + time * scaleX} y={height - 25} textAnchor="middle" className="text-xs fill-gray-500">
              {time}
            </text>
          </g>
        ))}
        
        {/* Graduations Y */}
        {Array.from({ length: Math.ceil(Math.max(maxFlow, debitMetrie.qMax) / 5) + 1 }, (_, i) => i * 5).map(flow => (
          <g key={flow}>
            <line x1="55" y1={height - 40 - flow * scaleY} x2="60" y2={height - 40 - flow * scaleY} stroke="#374151" />
            <text x="50" y={height - 36 - flow * scaleY} textAnchor="end" className="text-xs fill-gray-500">
              {flow}
            </text>
          </g>
        ))}
        
        {/* Courbe de débit */}
        <path d={pathData} fill="none" stroke="#3B82F6" strokeWidth="3" />
        
        {/* Marqueurs importants */}
        {/* Qmax */}
        <circle 
          cx={60 + (debitMetrie.tempsJusquQmax || debitMetrie.tempsVidange * 0.3) * scaleX} 
          cy={height - 40 - debitMetrie.qMax * scaleY} 
          r="4" 
          fill="#EF4444" 
        />
        <text 
          x={60 + (debitMetrie.tempsJusquQmax || debitMetrie.tempsVidange * 0.3) * scaleX + 10} 
          y={height - 40 - debitMetrie.qMax * scaleY - 10} 
          className="text-xs fill-red-600 font-semibold"
        >
          Qmax: {debitMetrie.qMax} ml/s
        </text>
        
        {/* Zone normale */}
        <rect 
          x="60" 
          y={height - 40 - 25 * scaleY} 
          width={(width - 80)} 
          height={10 * scaleY} 
          fill="#10B981" 
          fillOpacity="0.1" 
        />
        <text x="70" y={height - 40 - 20 * scaleY + 5} className="text-xs fill-green-600">
          Zone normale (15-25 ml/s)
        </text>
      </svg>
      
      {/* Légende */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">Qmax:</span> {debitMetrie.qMax} ml/s
        </div>
        <div>
          <span className="font-medium">Q moyen:</span> {debitMetrie.qMoyen} ml/s
        </div>
        <div>
          <span className="font-medium">Volume:</span> {debitMetrie.volumeVide} ml
        </div>
        <div>
          <span className="font-medium">Temps:</span> {debitMetrie.tempsVidange} s
        </div>
      </div>
    </div>
  );
}