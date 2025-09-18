import React, { useState } from 'react';
import { PatientData } from '../../data/urodynamicData';

interface NomogramChartProps {
  data: PatientData;
  width?: number;
  height?: number;
}

export default function NomogramChart({ data, width = 500, height = 400 }: NomogramChartProps) {
  const [activeNomogram, setActiveNomogram] = useState<'schafer' | 'abrams'>('schafer');
  const { debitMetrie, etudePressionDebit } = data;

  const renderSchaferNomogram = () => {
    const scaleX = (width - 100) / 40; // 0-40 ml/s
    const scaleY = (height - 100) / 120; // 0-120 cmH2O

    // Zones du nomogramme de Schafer
    const zones = [
      { name: 'Obstruction forte', color: '#EF4444', opacity: 0.2, points: [[0, 40], [15, 80], [25, 100], [35, 120], [0, 120]] },
      { name: 'Obstruction modérée', color: '#F59E0B', opacity: 0.2, points: [[0, 20], [15, 40], [25, 60], [35, 80], [15, 80], [0, 40]] },
      { name: 'Équivoque', color: '#6B7280', opacity: 0.2, points: [[0, 10], [15, 20], [25, 40], [35, 60], [15, 40], [0, 20]] },
      { name: 'Normal', color: '#10B981', opacity: 0.2, points: [[0, 0], [15, 10], [25, 20], [35, 40], [40, 50], [40, 0]] }
    ];

    return (
      <svg width={width} height={height} className="border border-gray-200">
        {/* Grille */}
        <defs>
          <pattern id="schaferGrid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect x="60" y="20" width={width - 80} height={height - 80} fill="url(#schaferGrid)" />
        
        {/* Axes */}
        <line x1="60" y1={height - 60} x2={width - 20} y2={height - 60} stroke="#374151" strokeWidth="2" />
        <line x1="60" y1="20" x2="60" y2={height - 60} stroke="#374151" strokeWidth="2" />
        
        {/* Zones */}
        {zones.map((zone, index) => {
          const pathData = zone.points
            .map((point, i) => {
              const x = 60 + point[0] * scaleX;
              const y = height - 60 - point[1] * scaleY;
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
            })
            .join(' ') + ' Z';
          
          return (
            <g key={zone.name}>
              <path d={pathData} fill={zone.color} fillOpacity={zone.opacity} />
              <text 
                x={60 + zone.points[1][0] * scaleX + 20} 
                y={height - 60 - zone.points[1][1] * scaleY + 10} 
                className="text-xs font-medium" 
                fill={zone.color}
              >
                {zone.name}
              </text>
            </g>
          );
        })}
        
        {/* Graduations */}
        {Array.from({ length: 9 }, (_, i) => i * 5).map(flow => (
          <g key={flow}>
            <line x1={60 + flow * scaleX} y1={height - 60} x2={60 + flow * scaleX} y2={height - 55} stroke="#374151" />
            <text x={60 + flow * scaleX} y={height - 40} textAnchor="middle" className="text-xs fill-gray-600">
              {flow}
            </text>
          </g>
        ))}
        
        {Array.from({ length: 7 }, (_, i) => i * 20).map(pressure => (
          <g key={pressure}>
            <line x1="55" y1={height - 60 - pressure * scaleY} x2="60" y2={height - 60 - pressure * scaleY} stroke="#374151" />
            <text x="45" y={height - 56 - pressure * scaleY} textAnchor="end" className="text-xs fill-gray-600">
              {pressure}
            </text>
          </g>
        ))}
        
        {/* Point du patient */}
        <circle 
          cx={60 + debitMetrie.qMax * scaleX} 
          cy={height - 60 - etudePressionDebit.pressionDetrusorQmax * scaleY} 
          r="8" 
          fill="#DC2626" 
          stroke="white"
          strokeWidth="3"
        />
        
        {/* Labels des axes */}
        <text x={width / 2} y={height - 15} textAnchor="middle" className="text-sm fill-gray-700 font-medium">
          Débit maximum (ml/s)
        </text>
        <text x="25" y={height / 2} textAnchor="middle" className="text-sm fill-gray-700 font-medium" transform={`rotate(-90, 25, ${height / 2})`}>
          Pression détrusor au Qmax (cmH2O)
        </text>
        
        {/* Titre */}
        <text x={width / 2} y="15" textAnchor="middle" className="text-lg font-semibold fill-gray-800">
          Nomogramme de Schafer
        </text>
      </svg>
    );
  };

  const renderAbramsNomogram = () => {
    const scaleX = (width - 100) / 30; // 0-30 ml/s
    const scaleY = (height - 100) / 100; // 0-100 cmH2O

    // Lignes du nomogramme d'Abrams-Griffiths
    const lines = [
      { name: 'Obstruction', value: 40, color: '#EF4444' },
      { name: 'Équivoque', value: 20, color: '#F59E0B' },
      { name: 'Normal', value: 0, color: '#10B981' }
    ];

    return (
      <svg width={width} height={height} className="border border-gray-200">
        {/* Grille */}
        <rect x="60" y="20" width={width - 80} height={height - 80} fill="url(#schaferGrid)" />
        
        {/* Axes */}
        <line x1="60" y1={height - 60} x2={width - 20} y2={height - 60} stroke="#374151" strokeWidth="2" />
        <line x1="60" y1="20" x2="60" y2={height - 60} stroke="#374151" strokeWidth="2" />
        
        {/* Lignes d'obstruction */}
        {lines.map((line) => {
          const y = height - 60 - line.value * scaleY;
          return (
            <g key={line.name}>
              <line x1="60" y1={y} x2={width - 20} y2={y} stroke={line.color} strokeWidth="3" strokeDasharray="5,5" />
              <text x={width - 15} y={y - 5} className="text-xs font-medium" fill={line.color}>
                {line.name}
              </text>
            </g>
          );
        })}
        
        {/* Zone de classification */}
        <rect x="60" y={height - 60 - 40 * scaleY} width={width - 80} height={20 * scaleY} fill="#F59E0B" fillOpacity="0.1" />
        <rect x="60" y={height - 60 - 20 * scaleY} width={width - 80} height={20 * scaleY} fill="#10B981" fillOpacity="0.1" />
        
        {/* Graduations */}
        {Array.from({ length: 7 }, (_, i) => i * 5).map(flow => (
          <g key={flow}>
            <line x1={60 + flow * scaleX} y1={height - 60} x2={60 + flow * scaleX} y2={height - 55} stroke="#374151" />
            <text x={60 + flow * scaleX} y={height - 40} textAnchor="middle" className="text-xs fill-gray-600">
              {flow}
            </text>
          </g>
        ))}
        
        {Array.from({ length: 6 }, (_, i) => i * 20).map(pressure => (
          <g key={pressure}>
            <line x1="55" y1={height - 60 - pressure * scaleY} x2="60" y2={height - 60 - pressure * scaleY} stroke="#374151" />
            <text x="45" y={height - 56 - pressure * scaleY} textAnchor="end" className="text-xs fill-gray-600">
              {pressure}
            </text>
          </g>
        ))}
        
        {/* Point du patient */}
        <circle 
          cx={60 + debitMetrie.qMax * scaleX} 
          cy={height - 60 - etudePressionDebit.pressionDetrusorQmax * scaleY} 
          r="8" 
          fill="#DC2626" 
          stroke="white"
          strokeWidth="3"
        />
        
        {/* Labels des axes */}
        <text x={width / 2} y={height - 15} textAnchor="middle" className="text-sm fill-gray-700 font-medium">
          Débit maximum (ml/s)
        </text>
        <text x="25" y={height / 2} textAnchor="middle" className="text-sm fill-gray-700 font-medium" transform={`rotate(-90, 25, ${height / 2})`}>
          Pression détrusor au Qmax (cmH2O)
        </text>
        
        {/* Titre */}
        <text x={width / 2} y="15" textAnchor="middle" className="text-lg font-semibold fill-gray-800">
          Nomogramme d'Abrams-Griffiths
        </text>
      </svg>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-gray-900">Nomogrammes Interactifs</h4>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveNomogram('schafer')}
            className={`px-3 py-1 text-sm rounded ${
              activeNomogram === 'schafer' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Schafer
          </button>
          <button
            onClick={() => setActiveNomogram('abrams')}
            className={`px-3 py-1 text-sm rounded ${
              activeNomogram === 'abrams' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Abrams-Griffiths
          </button>
        </div>
      </div>
      
      {activeNomogram === 'schafer' ? renderSchaferNomogram() : renderAbramsNomogram()}
      
      {/* Interprétation */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h5 className="font-medium text-blue-900 mb-2">Interprétation</h5>
        <div className="text-sm text-blue-800">
          <p>
            <strong>Position du patient:</strong> Qmax = {debitMetrie.qMax} ml/s, 
            Pdet = {etudePressionDebit.pressionDetrusorQmax} cmH2O
          </p>
          {activeNomogram === 'schafer' && (
            <p className="mt-1">
              Le nomogramme de Schafer permet de classifier l'obstruction en fonction 
              de la relation pression-débit au moment du débit maximum.
            </p>
          )}
          {activeNomogram === 'abrams' && (
            <p className="mt-1">
              Le nomogramme d'Abrams-Griffiths utilise l'index d'obstruction 
              (Pdet.Qmax - 2×Qmax) pour classifier l'obstruction.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}