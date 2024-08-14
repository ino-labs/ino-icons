import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import FooterBar from '../components/FooterBar';
import { useDarkMode } from '../contexts/DarkModeContext';
import iconResize from '../images/icon-resize.svg';
import iconBorder from '../images/icon-border.svg';
import iconClose from '/assets/icons/ino-close.svg';
import { MuiColorInput } from 'mui-color-input';

const IconPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [size, setSize] = useState(100);
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [svgContent, setSvgContent] = useState<string>('');
  const [search, setSearch] = useState('');
  const { darkMode } = useDarkMode();

  // Define a cor inicial baseada no modo dark
  const defaultColor = darkMode ? '#FFFFFF' : '#000000';
  const [color, setColor] = useState(defaultColor);

  useEffect(() => {
    fetch(`/assets/icons/${name}.svg`)
      .then(response => response.text())
      .then(data => setSvgContent(data));
  }, [name]);

  // Atualiza a cor do ícone quando o modo dark muda
  useEffect(() => {
    setColor(darkMode ? '#FFFFFF' : '#000000');
  }, [darkMode]);

  // Função para resetar a cor
  const resetColor = () => {
    setColor(defaultColor);
  };

  // Atualiza o conteúdo SVG com os novos valores
  const updatedSvgContent = svgContent
    .replace(/<svg/, `<svg id="svg-icon" style="width: ${size}px; height: ${size}px;"`)
    .replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`)
    .replace(/stroke="[^"]*"/g, `stroke="${color}"`);

  const handleDownload = () => {
    // Espera que o SVG esteja renderizado
    setTimeout(() => {
      const svgElement = document.getElementById('svg-icon') as SVGSVGElement | null;
      if (svgElement) {
        const serializer = new XMLSerializer();
        const source = serializer.serializeToString(svgElement);
        const blob = new Blob([source], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${name}.svg`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        console.error('SVG element not found');
      }
    }, 0); // Executa o código após o próximo ciclo de renderização
  };

  return (
    <div>
      <NavBar search={search} setSearch={setSearch} />
      <h1 className='text-center font-bold text-[32px] mt-10 mb-8'>{name}</h1>
      <div className='icon-preview-container'>
        <div className="icon-controls">
          <div className='icon-control'>
            <img className="icon-control-img" src={iconResize} alt="Size" />
            <input
              className='input-range'
              type="range"
              min="16" 
              max="200"
              value={size}
              onChange={e => setSize(Number(e.target.value))}
            />
            <span>{size}px</span>
          </div>
          <div className='icon-control'>
            <img className="icon-control-img" src={iconBorder} alt="Stroke Width" />
            <input
              className='input-range'
              type="range"
              min="1" 
              max="5"
              value={strokeWidth}
              onChange={e => setStrokeWidth(Number(e.target.value))}
            />
            <span>{strokeWidth}px</span>
          </div>
          <div className='icon-control'>
            <MuiColorInput isAlphaHidden value={color} onChange={setColor} format='hex' />
            <img className='reset-value' src={iconClose} onClick={resetColor} alt="Reset" />
          </div>
          <div className='icon-control'>
            <button onClick={handleDownload}>
              Download
            </button>
          </div>
        </div>
        <div className='icon-preview' dangerouslySetInnerHTML={{ __html: updatedSvgContent }} />
      </div>
      <FooterBar />
    </div>
  );
};

export default IconPage;
