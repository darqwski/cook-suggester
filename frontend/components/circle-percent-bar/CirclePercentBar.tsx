import React from "react";

import "./circle-percent-bar.less";
const defaultCircleBarOptions = {
  unloadedColor: "#777",
  loadedColor: "greenyellow",
  progressBarSize: '10rem',
  progressBarWidth: '2rem',
  insideCircleColor: '#FAFAFA'
}
const CirclePercentBar: React.FC<{
  percentage: number;
  barOptions?: {
    loadedColor?: string;
    unloadedColor?: string;
    progressBarSize?: string;
    progressBarWidth?: string;
    insideCircleColor?:string
  };
}> = ({ percentage, barOptions }) => {
  const percentRotation = 3.6 * percentage;
  const loadedColor = barOptions?.loadedColor || defaultCircleBarOptions.loadedColor;
  const unloadedColor = barOptions?.unloadedColor || defaultCircleBarOptions.unloadedColor;
  const progressBarSize = barOptions?.progressBarSize || defaultCircleBarOptions.progressBarSize;
  const progressBarWidth = barOptions?.progressBarWidth || defaultCircleBarOptions.progressBarWidth;
  const insideCircleColor = barOptions?.insideCircleColor || defaultCircleBarOptions.insideCircleColor;

  const backgroundStyle = {
    background: `conic-gradient(greenyellow 0% ${percentage}%, ${unloadedColor} ${percentage}%)`,
    width: progressBarSize,
    height: progressBarSize,
    padding: `calc(${progressBarWidth}/2)`
  }

  const textStyle = {
    width: `calc(${progressBarSize} - ${progressBarWidth})`,
    height: `calc(${progressBarSize} - ${progressBarWidth})`,
    background: insideCircleColor,
    fontSize: `calc(${progressBarSize}/6)`
  }


  return (
    <div className="circle-percent-bar">
      <div className="circle-percent-bar__background" style={backgroundStyle}>
        <div className="circle-percent-bar__text" style={textStyle}>{percentage.toFixed(2)}%</div>
      </div>
    </div>
  );
};

export default CirclePercentBar;
