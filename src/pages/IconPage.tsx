import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useDarkMode } from '../contexts/DarkModeContext';

const IconPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [size, setSize] = useState(100);
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [svgContent, setSvgContent] = useState<string>('');
  const [search, setSearch] = useState('');
  const { darkMode } = useDarkMode();

  // Define a cor inicial baseada no modo dark
  const [color, setColor] = useState(darkMode ? '#FFFFFF' : '#000000');

  const handleDownload = () => {
    const svgElement = document.getElementById('svg-icon') as SVGSVGElement;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElement);
    const blob = new Blob([source], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetch(`/icons/${name}.svg`)
      .then(response => response.text())
      .then(data => setSvgContent(data));
  }, [name]);

  // Atualiza a cor do ícone quando o modo dark muda
  useEffect(() => {
    setColor(darkMode ? '#FFFFFF' : '#000000');
  }, [darkMode]);

  // Atualiza o conteúdo SVG com os novos valores
  const updatedSvgContent = svgContent
    .replace(/<svg/, `<svg id="svg-icon" style="width: ${size}px; height: ${size}px;"`)
    .replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`)
    .replace(/stroke="[^"]*"/g, `stroke="${color}"`);

  return (
    <div>
      <NavBar search={search} setSearch={setSearch} />
      <h1>{name}</h1>
      <div dangerouslySetInnerHTML={{ __html: updatedSvgContent }} />
      <div>
        <label>
          Size:
          <input
            type="number"
            value={size}
            onChange={e => setSize(Number(e.target.value))}
          />
        </label>
        <label>
          Stroke Width:
          <input
            type="number"
            value={strokeWidth}
            onChange={e => setStrokeWidth(Number(e.target.value))}
          />
        </label>
        <label>
          Color:
          <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};

export default IconPage;
