import React, { useState } from 'react';
import { DiagnosticResult } from '../data/urodynamicData';
import { AlertCircle, FileText, TrendingUp, Users, AlertTriangle, Calculator, Target, Info, MousePointer, BarChart3, Activity, Download } from 'lucide-react';
import FlowChart from './Charts/FlowChart';
import PressureFlowChart from './Charts/PressureFlowChart';
import NomogramChart from './Charts/NomogramChart';
import NormalValuesComparison from './Charts/NormalValuesComparison';

interface ResultsPageProps {
  result: DiagnosticResult | null;
  onNewExam: () => void;
}

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Calculer la position optimale
    let top = rect.bottom + 8;
    let left = rect.left;
    
    // Si le tooltip dépasse en bas, le placer au-dessus
    if (top + 120 > viewportHeight) {
      top = rect.top - 120 - 8;
    }
    
    // Si le tooltip dépasse à droite, l'ajuster
    if (left + 320 > viewportWidth) {
      left = viewportWidth - 320 - 16;
    }
    
    // Si le tooltip dépasse à gauche, l'ajuster
    if (left < 16) {
      left = 16;
    }
    
    setPosition({ top, left });
    setIsVisible(true);
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          className="fixed z-50 w-80 p-3 text-sm bg-white border border-gray-300 rounded-lg shadow-xl"
          style={{ 
            top: `${position.top}px`, 
            left: `${position.left}px`,
            maxWidth: 'calc(100vw - 32px)'
          }}
        >
          <div className="text-gray-800 leading-relaxed">
            {content}
          </div>
        </div>
      )}
    </div>
  );
}

// Fonction pour formater les formes de débitmétrie
const formatFormeDebitmetrie = (forme: string): string => {
  const formes: Record<string, string> = {
    'normale': 'Normale',
    'en_plateau': 'En plateau',
    'intermittente': 'Intermittente',
    'en_cloche': 'En cloche'
  };
  return formes[forme] || forme;
};

// Fonction pour convertir SVG en image
const svgToImage = (svgElement: SVGElement): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      // Obtenir les dimensions du SVG
      const svgRect = svgElement.getBoundingClientRect();
      canvas.width = svgRect.width || 500;
      canvas.height = svgRect.height || 350;
      
      img.onload = () => {
        if (ctx) {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        } else {
          reject(new Error('Canvas context not available'));
        }
      };
      
      img.onerror = () => reject(new Error('Failed to load SVG'));
      
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      img.src = url;
    } catch (error) {
      reject(error);
    }
  });
};

// Fonction pour capturer les graphiques
const captureCharts = async (result: DiagnosticResult): Promise<{ [key: string]: string }> => {
  const charts: { [key: string]: string } = {};
  
  try {
    // Créer des éléments temporaires pour les graphiques
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.width = '600px';
    tempContainer.style.height = '400px';
    document.body.appendChild(tempContainer);

    // Fonction helper pour créer et capturer un graphique
    const createAndCaptureChart = async (chartType: string, ChartComponent: any, props: any) => {
      return new Promise<string>((resolve, reject) => {
        try {
          // Créer un conteneur React temporaire
          const chartContainer = document.createElement('div');
          tempContainer.appendChild(chartContainer);
          
          // Importer React et ReactDOM dynamiquement
          import('react').then(React => {
            import('react-dom/client').then(ReactDOM => {
              const root = ReactDOM.createRoot(chartContainer);
              
              // Rendre le composant
              root.render(React.createElement(ChartComponent, props));
              
              // Attendre que le rendu soit terminé
              setTimeout(() => {
                const svgElement = chartContainer.querySelector('svg');
                if (svgElement) {
                  svgToImage(svgElement)
                    .then(imageData => {
                      root.unmount();
                      tempContainer.removeChild(chartContainer);
                      resolve(imageData);
                    })
                    .catch(reject);
                } else {
                  root.unmount();
                  tempContainer.removeChild(chartContainer);
                  reject(new Error(`No SVG found for ${chartType}`));
                }
              }, 1000);
            }).catch(reject);
          }).catch(reject);
        } catch (error) {
          reject(error);
        }
      });
    };

    // Capturer chaque graphique
    if (result.patientData) {
      try {
        charts.flow = await createAndCaptureChart('flow', FlowChart, { 
          data: result.patientData, 
          width: 500, 
          height: 350 
        });
      } catch (error) {
        console.warn('Failed to capture flow chart:', error);
      }

      try {
        charts.pressure = await createAndCaptureChart('pressure', PressureFlowChart, { 
          data: result.patientData, 
          width: 500, 
          height: 350 
        });
      } catch (error) {
        console.warn('Failed to capture pressure chart:', error);
      }

      try {
        charts.nomogram = await createAndCaptureChart('nomogram', NomogramChart, { 
          data: result.patientData, 
          width: 500, 
          height: 400 
        });
      } catch (error) {
        console.warn('Failed to capture nomogram chart:', error);
      }
    }

    // Nettoyer
    document.body.removeChild(tempContainer);
    
  } catch (error) {
    console.error('Error capturing charts:', error);
  }
  
  return charts;
};

// Fonction pour générer le PDF amélioré avec graphiques
const generatePDF = async (result: DiagnosticResult) => {
  try {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();
    
    // Configuration des couleurs
    const colors = {
      primary: [41, 98, 255],      // Bleu principal
      secondary: [99, 102, 241],   // Indigo
      success: [34, 197, 94],      // Vert
      warning: [251, 191, 36],     // Jaune
      danger: [239, 68, 68],       // Rouge
      gray: [107, 114, 128],       // Gris
      lightGray: [243, 244, 246],  // Gris clair
      white: [255, 255, 255],      // Blanc
      black: [0, 0, 0]             // Noir
    };
    
    // Configuration
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const lineHeight = 6;
    let yPosition = margin;
    
    // Fonction pour ajouter du texte avec retour à la ligne automatique
    const addText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10, color = colors.black) => {
      doc.setTextColor(color[0], color[1], color[2]);
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return y + (lines.length * lineHeight);
    };
    
    // Fonction pour ajouter un rectangle coloré
    const addColoredRect = (x: number, y: number, width: number, height: number, fillColor: number[], strokeColor?: number[]) => {
      doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
      if (strokeColor) {
        doc.setDrawColor(strokeColor[0], strokeColor[1], strokeColor[2]);
        doc.rect(x, y, width, height, 'FD');
      } else {
        doc.rect(x, y, width, height, 'F');
      }
    };
    
    // Fonction pour créer un tableau avec largeurs personnalisées
    const addTableWithCustomWidths = (headers: string[], rows: string[][], startY: number, colWidths: number[], headerColor = colors.primary, alternateRows = true) => {
      const tableWidth = pageWidth - 2 * margin;
      const rowHeight = 8;
      let currentY = startY;
      
      // En-têtes
      addColoredRect(margin, currentY, tableWidth, rowHeight, headerColor);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      
      let currentX = margin;
      headers.forEach((header, index) => {
        doc.text(header, currentX + 2, currentY + 6);
        currentX += colWidths[index];
      });
      
      currentY += rowHeight;
      
      // Lignes de données
      doc.setFont('helvetica', 'normal');
      rows.forEach((row, rowIndex) => {
        const bgColor = alternateRows && rowIndex % 2 === 1 ? colors.lightGray : colors.white;
        addColoredRect(margin, currentY, tableWidth, rowHeight, bgColor, colors.gray);
        
        doc.setTextColor(colors.black[0], colors.black[1], colors.black[2]);
        currentX = margin;
        row.forEach((cell, colIndex) => {
          // Tronquer le texte si nécessaire
          const maxWidth = colWidths[colIndex] - 4;
          const truncatedText = doc.splitTextToSize(cell, maxWidth)[0] || cell;
          doc.text(truncatedText, currentX + 2, currentY + 6);
          currentX += colWidths[colIndex];
        });
        
        currentY += rowHeight;
      });
      
      return currentY + 5;
    };
    
    // Fonction pour créer un tableau standard
    const addTable = (headers: string[], rows: string[][], startY: number, headerColor = colors.primary, alternateRows = true) => {
      const tableWidth = pageWidth - 2 * margin;
      const colWidth = tableWidth / headers.length;
      const colWidths = new Array(headers.length).fill(colWidth);
      return addTableWithCustomWidths(headers, rows, startY, colWidths, headerColor, alternateRows);
    };
    
    // Fonction pour vérifier si on a besoin d'une nouvelle page
    const checkNewPage = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
    };
    
    // Fonction pour ajouter une section avec en-tête coloré
    const addSection = (title: string, color = colors.primary) => {
      checkNewPage(20);
      addColoredRect(margin, yPosition, pageWidth - 2 * margin, 12, color);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(title, margin + 5, yPosition + 8);
      yPosition += 17;
    };
    
    // En-tête principal
    addColoredRect(0, 0, pageWidth, 40, colors.primary);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('RAPPORT D\'ANALYSE URODYNAMIQUE', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Analyse Diagnostique Complète et Recommandations Personnalisées', pageWidth / 2, 30, { align: 'center' });
    
    yPosition = 50;
    
    // Informations générales dans un encadré
    addColoredRect(margin, yPosition, pageWidth - 2 * margin, 25, colors.lightGray, colors.gray);
    doc.setTextColor(colors.black[0], colors.black[1], colors.black[2]);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date de génération: ${new Date().toLocaleDateString('fr-FR')}`, margin + 5, yPosition + 8);
    doc.text(`Heure: ${new Date().toLocaleTimeString('fr-FR')}`, margin + 5, yPosition + 16);
    yPosition += 35;
    
    // 1. Informations Patient
    addSection('1. INFORMATIONS PATIENT', colors.primary);
    
    if (result.patientData) {
      const patientHeaders = ['Paramètre', 'Valeur'];
      const patientRows = [
        ['Nom', result.patientData.nomPatient || 'Non renseigné'],
        ['Âge', `${result.patientData.age} ans`],
        ['Sexe', result.patientData.sexe === 'M' ? 'Masculin' : 'Féminin'],
        ['Résidu post-mictionnel', `${result.patientData.residuPostMictionnel} ml`]
      ];
      
      yPosition = addTable(patientHeaders, patientRows, yPosition, colors.primary);
    }
    
    // 2. Profil Clinique
    addSection('2. PROFIL CLINIQUE', colors.secondary);
    
    if (result.patientData) {
      if (result.patientData.symptomes.length > 0) {
        yPosition = addText('Symptômes:', margin, yPosition, pageWidth - 2 * margin, 11, colors.black);
        yPosition = addText(`• ${result.patientData.symptomes.join(', ')}`, margin + 10, yPosition, pageWidth - 2 * margin - 10, 10, colors.gray);
        yPosition += 5;
      }
      
      if (result.patientData.antecedents.length > 0) {
        yPosition = addText('Antécédents:', margin, yPosition, pageWidth - 2 * margin, 11, colors.black);
        yPosition = addText(`• ${result.patientData.antecedents.join(', ')}`, margin + 10, yPosition, pageWidth - 2 * margin - 10, 10, colors.gray);
        yPosition += 5;
      }
      
      if (result.patientData.traitements.length > 0) {
        yPosition = addText('Traitements en cours:', margin, yPosition, pageWidth - 2 * margin, 11, colors.black);
        yPosition = addText(`• ${result.patientData.traitements.join(', ')}`, margin + 10, yPosition, pageWidth - 2 * margin - 10, 10, colors.gray);
        yPosition += 5;
      }
    }
    
    // 3. Résultats Urodynamiques
    addSection('3. RÉSULTATS URODYNAMIQUES', colors.success);
    
    if (result.patientData) {
      // 3.1 Débitmétrie
      doc.setTextColor(colors.success[0], colors.success[1], colors.success[2]);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      yPosition = addText('3.1. Débitmétrie', margin, yPosition, pageWidth - 2 * margin, 12, colors.success);
      
      const debitHeaders = ['Paramètre', 'Valeur', 'Unité'];
      const debitRows = [
        ['Qmax', result.patientData.debitMetrie.qMax.toString(), 'ml/s'],
        ['Q moyen', result.patientData.debitMetrie.qMoyen.toString(), 'ml/s'],
        ['Volume vidé', result.patientData.debitMetrie.volumeVide.toString(), 'ml'],
        ['Temps vidange', result.patientData.debitMetrie.tempsVidange.toString(), 's'],
        ['Forme', formatFormeDebitmetrie(result.patientData.debitMetrie.formeDebitmetrie), '—']
      ];
      
      yPosition = addTable(debitHeaders, debitRows, yPosition, colors.success);
      
      // 3.2 Cystométrie
      checkNewPage(60);
      yPosition = addText('3.2. Cystométrie', margin, yPosition, pageWidth - 2 * margin, 12, colors.success);
      
      const cystoHeaders = ['Paramètre', 'Valeur', 'Unité'];
      const cystoRows = [
        ['Capacité vésicale', result.patientData.cystometrie.capaciteVesicale.toString(), 'ml'],
        ['Compliance', result.patientData.cystometrie.compliance.toString(), 'ml/cmH2O'],
        ['Premier besoin', result.patientData.cystometrie.premierBesoin.toString(), 'ml'],
        ['Contractions involontaires', result.patientData.cystometrie.contractionsInvolontaires, '—']
      ];
      
      yPosition = addTable(cystoHeaders, cystoRows, yPosition, colors.success);
    }
    
    // 4. Index Calculés et Nomogrammes
    addSection('4. INDEX CALCULÉS ET NOMOGRAMMES', colors.warning);
    
    if (Object.keys(result.indexCalcules).length > 0) {
      const indexHeaders = ['Index', 'Valeur'];
      const indexRows = Object.entries(result.indexCalcules).map(([index, valeur]) => [
        index, 
        valeur.toFixed(1)
      ]);
      
      yPosition = addTable(indexHeaders, indexRows, yPosition, colors.warning);
    }
    
    if (result.nomogrammes.schafer || result.nomogrammes.abramsGriffiths) {
      const nomogramHeaders = ['Nomogramme', 'Résultat'];
      const nomogramRows = [];
      
      if (result.nomogrammes.schafer) {
        nomogramRows.push(['Schafer', result.nomogrammes.schafer]);
      }
      if (result.nomogrammes.abramsGriffiths) {
        nomogramRows.push(['Abrams-Griffiths', result.nomogrammes.abramsGriffiths]);
      }
      
      yPosition = addTable(nomogramHeaders, nomogramRows, yPosition, colors.warning);
    }
    
    // 5. Diagnostic Principal
    addSection('5. DIAGNOSTIC PRINCIPAL', colors.danger);
    
    addColoredRect(margin, yPosition, pageWidth - 2 * margin, 20, [254, 242, 242], colors.danger);
    doc.setTextColor(colors.danger[0], colors.danger[1], colors.danger[2]);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    yPosition = addText(result.diagnostic, margin + 5, yPosition + 7, pageWidth - 2 * margin - 10, 14, colors.danger);
    yPosition += 15;
    
    // Alertes critiques
    if (result.alertesCritiques.length > 0) {
      yPosition = addText('⚠ ALERTES CRITIQUES:', margin, yPosition, pageWidth - 2 * margin, 12, colors.danger);
      result.alertesCritiques.forEach(alerte => {
        yPosition = addText(`• ${alerte}`, margin + 10, yPosition, pageWidth - 2 * margin - 10, 10, colors.danger);
      });
      yPosition += 10;
    }
    
    // 6. Recommandations
    addSection('6. RECOMMANDATIONS THÉRAPEUTIQUES', colors.success);
    
    const recommandationHeaders = ['N°', 'Recommandation'];
    const recommandationRows = result.recommandations.map((rec, index) => [
      `${index + 1}`,
      rec.label
    ]);
    
    // Largeurs personnalisées : 15% pour le numéro, 85% pour la recommandation
    const tableWidth = pageWidth - 2 * margin;
    const recommandationWidths = [tableWidth * 0.15, tableWidth * 0.85];
    yPosition = addTableWithCustomWidths(recommandationHeaders, recommandationRows, yPosition, recommandationWidths, colors.success);
    
    // 7. Examens Complémentaires
    if (result.examensComplementaires.length > 0) {
      addSection('7. EXAMENS COMPLÉMENTAIRES', colors.secondary);
      
      const examenHeaders = ['N°', 'Examen Recommandé'];
      const examenRows = result.examensComplementaires.map((examen, index) => [
        `${index + 1}`,
        examen.label
      ]);
      
      // Largeurs personnalisées : 15% pour le numéro, 85% pour l'examen
      const examenWidths = [tableWidth * 0.15, tableWidth * 0.85];
      yPosition = addTableWithCustomWidths(examenHeaders, examenRows, yPosition, examenWidths, colors.secondary);
    }
    
    // 8. Surveillance
    if (result.surveillance.length > 0) {
      addSection('8. PLAN DE SURVEILLANCE', colors.warning);
      
      const surveillanceHeaders = ['N°', 'Élément de Surveillance'];
      const surveillanceRows = result.surveillance.map((surv, index) => [
        `${index + 1}`,
        surv.label
      ]);
      
      // Largeurs personnalisées : 15% pour le numéro, 85% pour la surveillance
      const surveillanceWidths = [tableWidth * 0.15, tableWidth * 0.85];
      yPosition = addTableWithCustomWidths(surveillanceHeaders, surveillanceRows, yPosition, surveillanceWidths, colors.warning);
    }
    
    // 9. Pièges Diagnostiques
    if (result.pieges.length > 0) {
      addSection('9. PIÈGES DIAGNOSTIQUES À ÉVITER', colors.danger);
      
      const piegeHeaders = ['N°', 'Piège à Éviter'];
      const piegeRows = result.pieges.map((piege, index) => [
        `${index + 1}`,
        piege.label
      ]);
      
      // Largeurs personnalisées : 15% pour le numéro, 85% pour le piège
      const piegeWidths = [tableWidth * 0.15, tableWidth * 0.85];
      yPosition = addTableWithCustomWidths(piegeHeaders, piegeRows, yPosition, piegeWidths, colors.danger);
    }
    
    // 10. GRAPHIQUES ET ANALYSES VISUELLES
    console.log('Début de la capture des graphiques...');
    const charts = await captureCharts(result);
    console.log('Graphiques capturés:', Object.keys(charts));
    
    if (Object.keys(charts).length > 0) {
      // Nouvelle page pour les graphiques
      doc.addPage();
      yPosition = margin;
      
      addSection('10. GRAPHIQUES ET ANALYSES VISUELLES', colors.secondary);
      
      const chartWidth = 160; // Largeur des graphiques dans le PDF
      const chartHeight = 120; // Hauteur des graphiques dans le PDF
      const chartSpacing = 20; // Espacement entre les graphiques
      
      let currentY = yPosition;
      
      // Placer les graphiques l'un au-dessus de l'autre (verticalement)
      const chartEntries = Object.entries(charts);
      
      for (let i = 0; i < chartEntries.length; i++) {
        const [chartType, imageData] = chartEntries[i];
        
        // Vérifier si on a besoin d'une nouvelle page
        if (currentY + chartHeight + 40 > pageHeight - margin) {
          doc.addPage();
          currentY = margin + 20;
        }
        
        try {
          // Ajouter le titre du graphique
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
          
          let chartTitle = '';
          switch (chartType) {
            case 'flow':
              chartTitle = 'Courbe de Débitmétrie';
              break;
            case 'pressure':
              chartTitle = 'Graphique Pression-Débit';
              break;
            case 'nomogram':
              chartTitle = 'Nomogrammes Interactifs';
              break;
            default:
              chartTitle = 'Graphique';
          }
          
          // Centrer le titre
          doc.text(chartTitle, pageWidth / 2, currentY, { align: 'center' });
          
          // Centrer l'image du graphique
          const xPos = (pageWidth - chartWidth) / 2;
          doc.addImage(imageData, 'PNG', xPos, currentY + 10, chartWidth, chartHeight);
          
          currentY += chartHeight + chartSpacing + 20; // Passer au graphique suivant
          
        } catch (error) {
          console.error(`Erreur lors de l'ajout du graphique ${chartType}:`, error);
          
          // Dessiner un rectangle de remplacement en cas d'erreur
          const xPos = (pageWidth - chartWidth) / 2;
          doc.setDrawColor(colors.gray[0], colors.gray[1], colors.gray[2]);
          doc.rect(xPos, currentY + 10, chartWidth, chartHeight);
          doc.setFontSize(10);
          doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
          doc.text('Graphique non disponible', pageWidth / 2, currentY + chartHeight/2 + 10, { align: 'center' });
          
          currentY += chartHeight + chartSpacing + 20;
        }
      }
      
      // Ajouter une note explicative
      if (chartEntries.length > 0) {
        currentY += 10;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
        yPosition = addText(
          'Note: Ces graphiques fournissent une représentation visuelle des données urodynamiques et facilitent l\'interprétation clinique des résultats.',
          margin,
          currentY,
          pageWidth - 2 * margin,
          10,
          colors.gray
        );
      }
    }
    
    // Footer avec design moderne
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      
      // Ligne de séparation
      doc.setDrawColor(colors.gray[0], colors.gray[1], colors.gray[2]);
      doc.line(margin, pageHeight - 25, pageWidth - margin, pageHeight - 25);
      
      // Informations du footer
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
      doc.text(`Page ${i} / ${totalPages}`, pageWidth - margin, pageHeight - 15, { align: 'right' });
      doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, pageWidth - margin, pageHeight - 10, { align: 'right' });
      doc.text('UroDiag - Analyse Urodynamique', margin, pageHeight - 10);
    }
    
    // Télécharger le PDF
    const fileName = `Rapport_Urodynamique_${result.patientData?.nomPatient?.replace(/\s+/g, '_') || 'Patient'}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
  }
};

export default function ResultsPage({ result, onNewExam }: ResultsPageProps) {
  const [activeChartTab, setActiveChartTab] = useState('flow');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Aucun Résultat Disponible</h2>
          <p className="text-gray-600 mb-6">Veuillez d'abord effectuer un examen pour voir les résultats.</p>
          <button
            onClick={onNewExam}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Commencer un Examen
          </button>
        </div>
      </div>
    );
  }

  const formatNumber = (value: number | string): string => {
    if (typeof value === 'string') return value;
    
    // Si c'est un nombre entier, l'afficher sans décimale
    if (Number.isInteger(value)) {
      return value.toString();
    }
    
    // Sinon, l'afficher avec une décimale
    return value.toFixed(1);
  };

  const handleGeneratePDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await generatePDF(result);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const chartTabs = [
    { id: 'flow', label: 'Débitmétrie', icon: BarChart3 },
    { id: 'pressure', label: 'Pression-Débit', icon: Activity },
    { id: 'nomogram', label: 'Nomogrammes', icon: Target },
    { id: 'comparison', label: 'Valeurs Normales', icon: Calculator }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 print:bg-white print:py-4 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 print:px-2">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 print:shadow-none print:border print:border-gray-300">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 print:bg-blue-600">
            <div className="flex items-center">
              <div>
                <h1 className="text-2xl font-bold text-white print:text-xl">Rapport d'Analyse Urodynamique Complète</h1>
                <p className="text-blue-100 mt-1 print:text-blue-200">Résultats détaillés avec graphiques et nomogrammes interactifs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info pour les tooltips */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 print:hidden">
          <div className="flex items-center">
            <MousePointer className="w-5 h-5 text-blue-600 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">Information Interactive</h3>
              <p className="text-sm text-blue-700 mt-1">
                Passez votre curseur sur chaque recommandation, examen complémentaire, traitement, surveillance ou piège 
                pour obtenir des explications détaillées et comprendre le raisonnement médical.
              </p>
            </div>
          </div>
        </div>

        {/* Alertes critiques */}
        {result.alertesCritiques.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded print:border print:border-red-400">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800">Alertes Critiques</h3>
                <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                  {result.alertesCritiques.map((alerte, index) => (
                    <li key={index}>{alerte}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Diagnostic Principal */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 print:shadow-none print:border print:border-gray-300">
          <div className="p-6 print:p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 print:text-lg">Diagnostic Principal</h2>
              <div className="flex items-center space-x-2 print:hidden">
                {result.certitudeDiagnostique && (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.certitudeDiagnostique === 'Élevée' ? 'bg-green-100 text-green-800' :
                    result.certitudeDiagnostique === 'Modérée' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    Certitude: {result.certitudeDiagnostique}
                  </span>
                )}
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded print:border print:border-blue-400">
              <h3 className="text-lg font-medium text-blue-900 print:text-base">{result.diagnostic}</h3>
            </div>
          </div>
        </div>

        {/* Graphiques et Analyses */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 print:shadow-none print:border print:border-gray-300">
          <div className="border-b border-gray-200 print:hidden">
            <nav className="flex space-x-8 px-6">
              {chartTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveChartTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeChartTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6 print:p-4">
            {activeChartTab === 'flow' && result.patientData && (
              <FlowChart data={result.patientData} />
            )}
            {activeChartTab === 'pressure' && result.patientData && (
              <PressureFlowChart data={result.patientData} />
            )}
            {activeChartTab === 'nomogram' && result.patientData && (
              <NomogramChart data={result.patientData} />
            )}
            {activeChartTab === 'comparison' && result.patientData && (
              <NormalValuesComparison data={result.patientData} />
            )}
          </div>
        </div>

        {/* Index Calculés et Nomogrammes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 print:gap-4">
          {/* Index Calculés */}
          {Object.keys(result.indexCalcules).length > 0 && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none print:border print:border-gray-300">
              <div className="bg-purple-50 px-6 py-4 border-b border-purple-100 print:bg-purple-100 print:p-3">
                <div className="flex items-center">
                  <Calculator className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="text-lg font-semibold text-purple-800 print:text-base">Index Calculés</h3>
                </div>
              </div>
              <div className="p-6 print:p-4">
                <div className="space-y-3">
                  {Object.entries(result.indexCalcules).map(([index, valeur]) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 print:text-sm">{index}:</span>
                      <span className="text-lg font-bold text-purple-600 print:text-base">
                        {formatNumber(valeur)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Nomogrammes */}
          {(result.nomogrammes.schafer || result.nomogrammes.abramsGriffiths) && (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none print:border print:border-gray-300">
              <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100 print:bg-indigo-100 print:p-3">
                <div className="flex items-center">
                  <Target className="w-5 h-5 text-indigo-600 mr-2" />
                  <h3 className="text-lg font-semibold text-indigo-800 print:text-base">Nomogrammes</h3>
                </div>
              </div>
              <div className="p-6 print:p-4">
                <div className="space-y-3">
                  {result.nomogrammes.schafer && (
                    <div>
                      <span className="font-medium text-gray-700 print:text-sm">Schafer:</span>
                      <span className="ml-2 text-indigo-600 print:text-sm">{result.nomogrammes.schafer}</span>
                    </div>
                  )}
                  {result.nomogrammes.abramsGriffiths && (
                    <div>
                      <span className="font-medium text-gray-700 print:text-sm">Abrams-Griffiths:</span>
                      <span className="ml-2 text-indigo-600 print:text-sm">{result.nomogrammes.abramsGriffiths}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Grid des résultats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 print:gap-4">
          {/* Recommandations */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none print:border print:border-gray-300">
            <div className="bg-green-50 px-6 py-4 border-b border-green-100 print:bg-green-100 print:p-3">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold text-green-800 print:text-base">Recommandations</h3>
              </div>
            </div>
            <div className="p-6 print:p-4">
              <ul className="space-y-3">
                {result.recommandations.map((recommandation, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"></div>
                    <Tooltip content={recommandation.tooltip}>
                      <span className="text-gray-700 cursor-help hover:text-green-700 transition-colors print:text-sm print:cursor-default border-b border-dotted border-green-300 hover:border-green-500">
                        {recommandation.label}
                      </span>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Examens Complémentaires */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none print:border print:border-gray-300">
            <div className="bg-purple-50 px-6 py-4 border-b border-purple-100 print:bg-purple-100 print:p-3">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-purple-800 print:text-base">Examens Complémentaires</h3>
              </div>
            </div>
            <div className="p-6 print:p-4">
              <ul className="space-y-3">
                {result.examensComplementaires.map((examen, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3"></div>
                    <Tooltip content={examen.tooltip}>
                      <span className="text-gray-700 cursor-help hover:text-purple-700 transition-colors print:text-sm print:cursor-default border-b border-dotted border-purple-300 hover:border-purple-500">
                        {examen.label}
                      </span>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Traitements */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none print:border print:border-gray-300">
            <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 print:bg-blue-100 print:p-3">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-blue-800 print:text-base">Options Thérapeutiques</h3>
              </div>
            </div>
            <div className="p-6 print:p-4">
              <ul className="space-y-3">
                {result.traitements.map((traitement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3"></div>
                    <Tooltip content={traitement.tooltip}>
                      <span className="text-gray-700 cursor-help hover:text-blue-700 transition-colors print:text-sm print:cursor-default border-b border-dotted border-blue-300 hover:border-blue-500">
                        {traitement.label}
                      </span>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Surveillance */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none print:border print:border-gray-300">
            <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-100 print:bg-yellow-100 print:p-3">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-yellow-600 mr-2" />
                <h3 className="text-lg font-semibold text-yellow-800 print:text-base">Surveillance</h3>
              </div>
            </div>
            <div className="p-6 print:p-4">
              <ul className="space-y-3">
                {result.surveillance.map((surveillance, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3"></div>
                    <Tooltip content={surveillance.tooltip}>
                      <span className="text-gray-700 cursor-help hover:text-yellow-700 transition-colors print:text-sm print:cursor-default border-b border-dotted border-yellow-300 hover:border-yellow-500">
                        {surveillance.label}
                      </span>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Pièges Diagnostiques */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-6 print:shadow-none print:border print:border-gray-300 print:mt-4">
          <div className="bg-red-50 px-6 py-4 border-b border-red-100 print:bg-red-100 print:p-3">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-red-800 print:text-base">Pièges Diagnostiques à Éviter</h3>
            </div>
          </div>
          <div className="p-6 print:p-4">
            <ul className="space-y-3">
              {result.pieges.map((piege, index) => (
                <li key={index} className="flex items-start">
                  <AlertTriangle className="flex-shrink-0 w-4 h-4 text-red-400 mt-1 mr-3" />
                  <Tooltip content={piege.tooltip}>
                    <span className="text-gray-700 cursor-help hover:text-red-700 transition-colors print:text-sm print:cursor-default border-b border-dotted border-red-300 hover:border-red-500">
                      {piege.label}
                    </span>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4 mt-8 print:hidden">
          <button
            onClick={onNewExam}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Nouvel Examen
          </button>
          <button
            onClick={handleGeneratePDF}
            disabled={isGeneratingPDF}
            className={`inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
              isGeneratingPDF ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Download className="w-4 h-4 mr-2" />
            {isGeneratingPDF ? 'Génération en cours...' : 'Télécharger le Rapport PDF'}
          </button>
        </div>

        {/* Footer pour impression */}
        <div className="hidden print:block mt-8 pt-4 border-t border-gray-300 text-center text-sm text-gray-600">
          <p>Rapport généré par UroDiag - Plateforme d'aide au diagnostic urodynamique</p>
          <p>Date d'impression: {new Date().toLocaleDateString('fr-FR')}</p>
        </div>
      </div>
    </div>
  );
}