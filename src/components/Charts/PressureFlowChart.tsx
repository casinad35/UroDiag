import React from 'react';
import { PatientData } from '../../data/urodynamicData';

interface PressureFlowChartProps {
  data: PatientData;
  width?: number;
  height?: number;
}

export default function PressureFlowChart({ data, width = 500, height = 350 }: PressureFlowChartProps) {
  const { etudePressionDebit, debitMetrie } = data;
  
  // Génération des points pression-débit
  const generatePressureFlowPoints = () => {
    const points: { x: number; y: number }[] = [];
    const maxFlow = debitMetrie.qMax;
    const pDetQmax = etudePressionDebit.pressionDetrusorQmax;
    
    // Simulation d'une courbe pression-débit réaliste
    for (let flow = 0; flow <= maxFlow * 1.2; flow += 0.5) {
      let pressure;
      
      if (flow === 0) {
        pressure = 0;
      } else if (flow <= maxFlow) {
        // Relation pression-débit normale
        const ratio = flow / maxFlow;
        pressure = pDetQmax * (0.3 + 0.7 * ratio);
      } else {
        // Extrapolation au-delà du Qmax
        pressure = pDetQmax * (1 + 0.5 * (flow - maxFlow) / maxFlow);
      }
      
      points.push({ x: flow, y: pressure });
    }
    
    return points;
  };

  const points = generatePressureFlowPoints();
  const maxPressure = Math.max(...points.map(p => p.y), 100);
  const maxFlowDisplay = Math.max(debitMetrie.qMax * 1.5, 30);
  
  const scaleX = (width - 120) / maxFlowDisplay;
  const scaleY = (height - 100) / maxPressure;

  const pathData = points
    .map((point, index) => {
      const x = 80 + point.x * scaleX;
      const y = height - 60 - point.y * scaleY;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Nomogrammes de référence
  const schaferLines = [
    { name: 'Obstruction forte', points: [[0, 40], [10, 60], [20, 80], [30, 100]], color: '#EF4444' },
    { name: 'Obstruction modérée', points: [[0, 20], [10, 35], [20, 50], [30, 65]], color: '#F59E0B' },
    { name: 'Normal', points: [[0, 10], [10, 20], [20, 30], [30, 40]], color: '#10B981' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">Graphique Pression-Débit</h4>
      
      <svg width={width} height={height} className="border border-gray-100">
        {/* Grille */}
        <defs>
          <pattern id="pressureGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#pressureGrid)" />
        
        {/* Axes */}
        <line x1="80" y1={height - 60} x2={width - 20} y2={height - 60} stroke="#374151" strokeWidth="2" />
        <line x1="80" y1="40" x2="80" y2={height - 60} stroke="#374151" strokeWidth="2" />
        
        {/* Labels des axes */}
        <text x={width / 2} y={height - 20} textAnchor="middle" className="text-sm fill-gray-600">
          Débit (ml/s)
        </text>
        <text x="30" y={height / 2} textAnchor="middle" className="text-sm fill-gray-600" transform={`rotate(-90, 30, ${height / 2})`}>
          Pression détrusor (cmH2O)
        </text>
        
        {/* Graduations X */}
        {Array.from({ length: Math.ceil(maxFlowDisplay / 5) + 1 }, (_, i) => i * 5).map(flow => (
          <g key={flow}>
            <line x1={80 + flow * scaleX} y1={height - 60} x2={80 + flow * scaleX} y2={height - 55} stroke="#374151" />
            <text x={80 + flow * scaleX} y={height - 40} textAnchor="middle" className="text-xs fill-gray-500">
              {flow}
            </text>
          </g>
        ))}
        
        {/* Graduations Y */}
        {Array.from({ length: Math.ceil(maxPressure / 20) + 1 }, (_, i) => i * 20).map(pressure => (
          <g key={pressure}>
            <line x1="75" y1={height - 60 - pressure * scaleY} x2="80" y2={height - 60 - pressure * scaleY} stroke="#374151" />
            <text x="70" y={height - 56 - pressure * scaleY} textAnchor="end" className="text-xs fill-gray-500">
              {pressure}
            </text>
          </g>
        ))}
        
        {/* Lignes de référence Schafer sans textes */}
        {schaferLines.map((line, index) => {
          const pathRef = line.points
            .map((point, i) => {
              const x = 80 + point[0] * scaleX;
              const y = height - 60 - point[1] * scaleY;
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ');
          
          return (
            <g key={line.name}>
              <path d={pathRef} fill="none" stroke={line.color} strokeWidth="2" strokeDasharray="5,5" opacity="0.7" />
            </g>
          );
        })}
        
        {/* Courbe du patient */}
        <path d={pathData} fill="none" stroke="#3B82F6" strokeWidth="4" />
        
        {/* Point Qmax */}
        <circle 
          cx={80 + debitMetrie.qMax * scaleX} 
          cy={height - 60 - etudePressionDebit.pressionDetrusorQmax * scaleY} 
          r="6" 
          fill="#DC2626" 
          stroke="white"
          strokeWidth="2"
        />
        <text 
          x={80 + debitMetrie.qMax * scaleX + 10} 
          y={height - 60 - etudePressionDebit.pressionDetrusorQmax * scaleY - 10} 
          className="text-xs fill-red-600 font-semibold"
        >
          Qmax: {debitMetrie.qMax} ml/s
        </text>
        <text 
          x={80 + debitMetrie.qMax * scaleX + 10} 
          y={height - 60 - etudePressionDebit.pressionDetrusorQmax * scaleY + 5} 
          className="text-xs fill-red-600 font-semibold"
        >
          Pdet: {etudePressionDebit.pressionDetrusorQmax} cmH2O
        </text>
      </svg>
      
      {/* Légende des lignes de référence */}
      <div className="mt-4 mb-4">
        <h5 className="text-sm font-medium text-gray-700 mb-2">Lignes de référence (Nomogramme de Schafer)</h5>
        <div className="flex flex-wrap gap-4">
          {schaferLines.map((line) => (
            <div key={line.name} className="flex items-center">
              <div 
                className="w-6 h-0.5 mr-2 opacity-70"
                style={{ 
                  backgroundColor: line.color,
                  borderTop: `2px dashed ${line.color}`
                }}
              ></div>
              <span className="text-xs" style={{ color: line.color }}>
                {line.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Indices calculés */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">Index d'obstruction:</span> {etudePressionDebit.indexObstruction}
        </div>
        <div>
          <span className="font-medium">Index de contractilité:</span> {etudePressionDebit.indexContractilite}
        </div>
        <div>
          <span className="font-medium">Résistance urétrale:</span> {etudePressionDebit.resistanceUretrale}
        </div>
        <div>
          <span className="font-medium">Conductance urétrale:</span> {etudePressionDebit.conductanceUretrale}
        </div>
      </div>
    </div>
  );
}