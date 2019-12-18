import React, {Component} from "react";
import {Button, InputNumber, Select, Row, Col} from 'antd';
import './App.css';

const operators = {
	"+": [(a, b) => b + a, 2],
	"-": [(a, b) => b - a, 2],
	"*": [(a, b) => b * a, 2],
	"/": [(a, b) => b / a, 2],
	"^": [(a, b) => Math.pow(b, a), 2],
	"sin": [a => Math.sin(a), 1],
	"cos": [a => Math.cos(a), 1],
	"tan": [a => Math.tan(a), 1],
	"floor": [a => a | 0, 1],
	"ceil": [a => Math.ceil(a), 1],
	"round": [a => Math.round(a), 1],
	"ln": [a => Math.log(a), 1],
	"sqrt": [a => Math.sqrt(a), 1],
	"e": [() => Math.E, 0],
	"pi": [() => Math.PI, 0]
};


export default class ResultComponent extends Component {
	constructor(props) {
		super();
	}

	evalStr = (str, mul) => {
		const stack = [];
		str = str.trim();
		if (str.length === 0) return 0;
		if (mul) str = str.toLowerCase().split(" ");
		for (let i = 0; i < str.length; i++) {
			if (str[i] in operators) {
				const numArg = operators[str[i]][1];
				// eslint-disable-next-line no-throw-literal
				if (stack.length < numArg) throw "Missing operant";
				stack.push(operators[str[i]][0].apply(null, (() => {
					const arr = [];
					for (let j = 0; j < numArg; j++) {
						arr.push(stack.pop());
					}
					return arr;
				})()));
			} else {
				// eslint-disable-next-line no-throw-literal
				if (!/^[0-9.]+$/.test(str[i])) throw "Unknown operator \"" + str[i] + "\"";
				stack.push(+str[i]);
			}
		}
		if (stack.length != 1) throw "Uncaught extra operant";
		return stack[0];
	};

	render() {
		console.log(this.evalStr('3 4 +', 'space'));
		return (
			<div>
				<div className="spacer" style={{height: "50px"}}></div>
				<div className="tiles">
					<Row gutter={16}>
						<Col span={8}>
							<span>3</span>
						</Col>
						<Col span={8}>
							<span>4</span>
						</Col>
						<Col span={8}>
							<span>+</span>
						</Col>
					</Row>
				</div>
				<p className="equals">=</p>
				<p className="result">7</p>
				<div className="spacer" style={{height: "50px"}}></div>
			</div>
		)
	}
}
