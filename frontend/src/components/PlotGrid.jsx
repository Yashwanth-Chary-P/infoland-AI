import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectPlot } from '../features/plots/plotsSlice.js';

const PlotGrid = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle plot selection - dispatch Redux action and navigate to plot details
  const handleSelect = (plotId) => {
    dispatch(selectPlot(plotId));
    navigate(`/plot/${plotId}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Legend */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center space-x-4 bg-white rounded-lg p-3 shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--gov-fill)' }}></div>
            <span className="text-sm font-medium">Government</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--priv-fill)' }}></div>
            <span className="text-sm font-medium">Private</span>
          </div>
        </div>
      </div>

      {/* SVG Map */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <svg viewBox="0 0 1400 950" xmlns="http://www.w3.org/2000/svg" aria-label="Colony Map, plots 127 to 147" className="w-full h-auto">
          <rect x="0" y="0" width="1400" height="950" fill="#fbf2e6"></rect>

          {/* Roads */}
          <rect x="60" y="840" width="1150" height="60" fill="var(--road)" rx="6"></rect>
          <line x1="80" y1="870" x2="1340" y2="870" stroke="#fff" strokeWidth="3" strokeDasharray="18 12" />
          <rect x="60" y="670" width="1150" height="44" fill="var(--road)" rx="6"></rect>
          <line x1="80" y1="692" x2="1340" y2="692" stroke="#fff" strokeWidth="3" strokeDasharray="12 8" />
          <rect x="420" y="120" width="44" height="820" fill="var(--road)" rx="6"></rect>
          <line x1="442" y1="140" x2="442" y2="920" stroke="#fff" strokeWidth="3" strokeDasharray="12 8" />
          <rect x="930" y="120" width="44" height="820" fill="var(--road)" rx="6"></rect>
          <line x1="952" y1="140" x2="952" y2="920" stroke="#fff" strokeWidth="3" strokeDasharray="12 8" />

          {/* Park */}
          <g id="park">
            <rect x="80" y="140" width="320" height="240" rx="10" fill="var(--park-fill)" stroke="#8cc07a" strokeWidth="3"></rect>
            <g fill="#2f9b4d">
              <circle cx="130" cy="200" r="10"></circle>
              <circle cx="170" cy="220" r="9"></circle>
              <circle cx="220" cy="190" r="10"></circle>
              <circle cx="280" cy="230" r="9"></circle>
              <circle cx="300" cy="180" r="9"></circle>
            </g>
            <rect x="90" y="305" width="60" height="30" rx="4" fill="#3da6f0" stroke="#2a78b5"></rect>
          </g>

          {/* Block A */}
          <g id="plots-block-a">
            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="127" 
              x="80" 
              y="400" 
              width="140" 
              height="120" 
              rx="8" 
              fill="var(--gov-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(127)}
              role="button"
              aria-label="Plot 127"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(127)}
            ></rect>
            <text className="plot-num" x="150" y="460">127</text>

            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="128" 
              x="80" 
              y="540" 
              width="140" 
              height="120" 
              rx="8" 
              fill="var(--priv-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(128)}
              role="button"
              aria-label="Plot 128"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(128)}
            ></rect>
            <text className="plot-num" x="150" y="600">128</text>

            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="129" 
              x="80" 
              y="724" 
              width="140" 
              height="100" 
              rx="8" 
              fill="var(--priv-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(129)}
              role="button"
              aria-label="Plot 129"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(129)}
            ></rect>
            <text className="plot-num" x="150" y="774">129</text>

            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="130" 
              x="236" 
              y="400" 
              width="140" 
              height="120" 
              rx="8" 
              fill="var(--priv-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(130)}
              role="button"
              aria-label="Plot 130"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(130)}
            ></rect>
            <text className="plot-num" x="306" y="460">130</text>

            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="131" 
              x="236" 
              y="540" 
              width="140" 
              height="120" 
              rx="8" 
              fill="var(--gov-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(131)}
              role="button"
              aria-label="Plot 131"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(131)}
            ></rect>
            <text className="plot-num" x="306" y="600">131</text>

            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="132" 
              x="236" 
              y="724" 
              width="140" 
              height="100" 
              rx="8" 
              fill="var(--priv-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(132)}
              role="button"
              aria-label="Plot 132"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(132)}
            ></rect>
            <text className="plot-num" x="306" y="774">132</text>
          </g>

          {/* Block B */}
          <g id="plots-block-b">
            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="133" 
              x="490" 
              y="140" 
              width="240" 
              height="120" 
              rx="8" 
              fill="var(--priv-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(133)}
              role="button"
              aria-label="Plot 133"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(133)}
            ></rect>
            <text className="plot-num" x="610" y="200">133</text>

            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="134" 
              x="750" 
              y="140" 
              width="140" 
              height="120" 
              rx="8" 
              fill="var(--gov-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(134)}
              role="button"
              aria-label="Plot 134"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(134)}
            ></rect>
            <text className="plot-num" x="820" y="200">134</text>

            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="135" 
              x="490" 
              y="276" 
              width="240" 
              height="120" 
              rx="8" 
              fill="var(--priv-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(135)}
              role="button"
              aria-label="Plot 135"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(135)}
            ></rect>
            <text className="plot-num" x="610" y="336">135</text>

            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="136" 
              x="750" 
              y="276" 
              width="140" 
              height="120" 
              rx="8" 
              fill="var(--priv-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(136)}
              role="button"
              aria-label="Plot 136"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(136)}
            ></rect>
            <text className="plot-num" x="820" y="336">136</text>

            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="137" 
              x="490" 
              y="412" 
              width="240" 
              height="120" 
              rx="8" 
              fill="var(--gov-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(137)}
              role="button"
              aria-label="Plot 137"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(137)}
            ></rect>
            <text className="plot-num" x="610" y="472">137</text>

            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="138" 
              x="750" 
              y="412" 
              width="140" 
              height="120" 
              rx="8" 
              fill="var(--priv-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(138)}
              role="button"
              aria-label="Plot 138"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(138)}
            ></rect>
            <text className="plot-num" x="820" y="472">138</text>

            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="139" 
              x="490" 
              y="548" 
              width="240" 
              height="100" 
              rx="8" 
              fill="var(--priv-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(139)}
              role="button"
              aria-label="Plot 139"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(139)}
            ></rect>
            <text className="plot-num" x="610" y="608">139</text>

            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="140" 
              x="750" 
              y="548" 
              width="140" 
              height="100" 
              rx="8" 
              fill="var(--gov-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(140)}
              role="button"
              aria-label="Plot 140"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(140)}
            ></rect>
            <text className="plot-num" x="820" y="608">140</text>

            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="141" 
              x="490" 
              y="724" 
              width="240" 
              height="100" 
              rx="8" 
              fill="var(--priv-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(141)}
              role="button"
              aria-label="Plot 141"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(141)}
            ></rect>
            <text className="plot-num" x="610" y="774">141</text>

            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="142" 
              x="750" 
              y="724" 
              width="140" 
              height="100" 
              rx="8" 
              fill="var(--priv-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(142)}
              role="button"
              aria-label="Plot 142"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(142)}
            ></rect>
            <text className="plot-num" x="820" y="774">142</text>
          </g>

          {/* Block C */}
          <g id="plots-block-c">
            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="143" 
              x="980" 
              y="140" 
              width="200" 
              height="120" 
              rx="8" 
              fill="var(--priv-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(143)}
              role="button"
              aria-label="Plot 143"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(143)}
            ></rect>
            <text className="plot-num" x="1080" y="200">143</text>

            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="144" 
              x="980" 
              y="276" 
              width="200" 
              height="120" 
              rx="8" 
              fill="var(--gov-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(144)}
              role="button"
              aria-label="Plot 144"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(144)}
            ></rect>
            <text className="plot-num" x="1080" y="336">144</text>

            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="145" 
              x="980" 
              y="412" 
              width="200" 
              height="120" 
              rx="8" 
              fill="var(--priv-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(145)}
              role="button"
              aria-label="Plot 145"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(145)}
            ></rect>
            <text className="plot-num" x="1080" y="472">145</text>

            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="146" 
              x="980" 
              y="548" 
              width="200" 
              height="100" 
              rx="8" 
              fill="var(--priv-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(146)}
              role="button"
              aria-label="Plot 146"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(146)}
            ></rect>
            <text className="plot-num" x="1080" y="608">146</text>

            <rect 
              className="plot-shape cursor-pointer" 
              data-plot-id="147" 
              x="980" 
              y="724" 
              width="200" 
              height="100" 
              rx="8" 
              fill="var(--gov-fill)" 
              stroke="var(--plot-boundary)" 
              strokeWidth="3"
              onClick={() => handleSelect(147)}
              role="button"
              aria-label="Plot 147"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(147)}
            ></rect>
            <text className="plot-num" x="1080" y="774">147</text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default PlotGrid;

