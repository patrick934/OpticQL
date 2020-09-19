import React, { useEffect, useState, useContext } from "react";
import TestWindowTwo from './testWindowTwo.jsx';
import { Context } from './store.jsx';

import {
	VictoryChart,
	VictoryLine,
	VictoryAxis,
	VictoryBar,
	VictoryTooltip,
	VictoryVoronoiContainer,
} from "victory";


const History = (props) => {

	const { store } = useContext(Context);
	let chartContainer = [];

	const containerLine = [
		<VictoryChart
			// theme={VictoryTheme.material}
			domainPadding={{ x: 10 }}
			containerComponent={
				<VictoryVoronoiContainer
					voronoiDimension="x"
					labels={({ datum }) =>
						`Query: ${datum.t} ms,
					Query String: ${datum.z}`
					}
					labelComponent={
						<VictoryTooltip
							// flyoutHeight={30}
							cornerRadius={5}
							flyoutStyle={{ fill: "#D4F1F4" }}
							style={{ fontSize: 9 }}
						/>
					}
				/>
			}
		>
			<VictoryLine
				style={{
					// labels: { fontSize: 6 },
					data: { stroke: "#189AB4" },
					// parent: { border: "1px solid #ccc" },
				}}
				data={props.storeHistory}
			// labels={({ datum }) => `Avg.: ${datum.y}`}
			/>
			<VictoryAxis
				label={"Query Database ID"}
				style={{
					tickLabels: { fontSize: 10, padding: 5, angle: -30, fill: "black" },
					axis: { stroke: "black" },
					axisLabel: { fontSize: 10, padding: 30 },
				}}
			/>
			<VictoryAxis
				label={"Response Duration (ms)"}
				style={{
					tickLabels: { fontSize: 10, padding: 5, fill: "black" },
					axis: { stroke: "black" },
					axisLabel: { fontSize: 10, padding: 30 },
				}}
				dependentAxis
			/>
		</VictoryChart>,
	];

	// Container for bar chart --> Used when there is ONLY ONE path

	const containerBar = [
		<VictoryChart
			// theme={VictoryTheme.material}
			domainPadding={{ x: 5 }}
		// containerComponent={<VictoryZoomContainer />}
		>
			<VictoryBar
				style={{
					data: { fill: "#189AB4" },
				}}
				data={props.storeHistory}
				labels={({ datum }) =>
					`Query: ${datum.t} ms,
				Query String: ${datum.z}`
				}
				barWidth={({ index }) => index * 5 + 20}
				labelComponent={
					<VictoryTooltip
						dy={0}
						// centerOffset={{ x: 25 }}
						style={{ fontSize: 8 }}
						constrainToVisibleArea
					/>
				}
			/>
			<VictoryAxis
				label={"Query Database ID"}
				style={{
					tickLabels: { fontSize: 10, padding: 5, fill: "black" },
					axis: { stroke: "black" },
					axisLabel: { fontSize: 10 },
				}}
			/>
			<VictoryAxis
				label={"Response Duration (ms)"}
				style={{
					tickLabels: { fontSize: 10, padding: 5, fill: "black" },
					axis: { stroke: "black" },
					axisLabel: { fontSize: 10 },
				}}
				dependentAxis
			/>
		</VictoryChart>,
	];

	if (store.history.length === 0) {
		chartContainer = 'No historical query information to display';
	} else if (store.history.length === 1) {
		chartContainer.push(containerBar);
	} else {
		chartContainer.push(containerLine);
	}

	const headerStr = 'Historical GraphQL Performance (Overall response duration in ms)'

	const styleSheet = {
		"display": "flex",
		"flexDirection": "column",
		"justifyContent": "center",
		"alignItems": "center",
	}


	return (
		<div>
			{props.showWindow && (
				<TestWindowTwo>
					<div style={styleSheet}>
						<h1 style={{ "color": "#05445E" }}>{headerStr}</h1>
						{chartContainer}
					</div>
				</TestWindowTwo>)}
		</div>
	);

}

export default History;