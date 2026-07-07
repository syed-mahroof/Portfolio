import React, { useId } from 'react';
import './ElectricBorder.css';

const ElectricBorder = ({
  children,
  color = '#7df9ff',
  speed = 1,
  chaos = 0.12,
  thickness = 2,
  style = {},
  className = ''
}) => {
  const id = useId().replace(/:/g, '');
  const filterId = `electric-filter-${id}`;

  return (
    <div className={`electric-border-wrapper ${className}`} style={style}>
      <svg className="electric-svg-filter">
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={chaos}
            numOctaves="1"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              values={`${chaos} ${chaos}; ${chaos * 1.5} ${chaos * 1.5}; ${chaos} ${chaos}`}
              dur={`${2 / speed}s`}
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={thickness * 3}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      
      <div 
        className="electric-border-effect"
        style={{
          border: `${thickness}px solid ${color}`,
          filter: `url(#${filterId}) drop-shadow(0 0 5px ${color})`,
          borderRadius: style.borderRadius || 'inherit'
        }}
      />
      
      <div className="electric-border-content" style={{ borderRadius: style.borderRadius || 'inherit' }}>
        {children}
      </div>
    </div>
  );
};

export default ElectricBorder;
