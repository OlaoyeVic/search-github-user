// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import { Pie3D } from ".";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);


const ChartComponent = ({data}) =>{
  const chartConfigs = {
    type: "doughnut2D", // The chart type
    width: "450", // Width of the chart
    height: "300", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      //Chart Configuration
      "chart": {
        "caption": "Stars Per Languages",
        "theme": "candy",
        "decimals": 0,
        "preradius": "45%",
        "showPercentValues": 0
        // "palettecolor": "#f0db4f"
      },
      // Chart Data
      data
    }
  }
  return <ReactFC {...chartConfigs} />
}
export default ChartComponent;

