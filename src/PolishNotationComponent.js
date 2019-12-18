import React, {Component} from "react";
import {Button, Col, Input, InputNumber, Row, Select, Steps, message} from "antd";
import ResultComponent from "./ResultComponent";

const {Step} = Steps;

const {Option} = Select;

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


export default class PolishNotationComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: 0,
			expressionStr: ''
		};

	}

	getSteps() {
		return [
			{
				title: 'First',
				content: <Row gutter={16}>
					<Col sm={12}>
						<div className="form-item">
							<span className="label">Please enter a number</span>
							<InputNumber size="large" min={1} max={100000}/>
						</div>
					</Col>
					<Col sm={12}>
						<Button type="primary" onClick={() => this.next()}>Add Number</Button>
					</Col>
				</Row>,
			},
			{
				title: 'Second',
				content: <Row gutter={16}>
					<Col sm={12}>
						<div className="form-item">
							<span className="label">Please enter a number</span>
							<InputNumber size="large" min={1} max={100000}/>
						</div>
					</Col>
					<Col sm={12}>
						<Button type="primary" onClick={() => this.next()}>Add Number</Button>
					</Col>
				</Row>,
			},
			{
				title: 'third',
				content: <Row gutter={16}>
					<Col sm={12}>
						<div className="form-item">
							<span className="label">Plese select an Operand</span>
							<InputNumber size="large" min={1} max={100000}/>
						</div>
					</Col>
					<Col sm={12}>
						<Button type="primary" onClick={() => this.next()}>Add Operand</Button>
					</Col>
				</Row>,
			},
			{
				title: 'Last',
				content: <Row gutter={16}>
					<ResultComponent/>
					<Col xs={12} md={8}>
						<div className="form-item">
							<span className="label">Operator</span>
							<Select
								showSearch
								placeholder="Select Operation"
								optionFilterProp="children"
								filterOption={(input, option) =>
									option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
							>
								<Option value="+">+</Option>
								<Option value="-">-</Option>
								<Option value="*">*</Option>
								<Option value="/">/</Option>
							</Select>
						</div>
					</Col>
					<Col xs={12} md={8}>
						<div className="form-item">
							<span className="label">Operand</span>
							<Input value="1"/>
						</div>
					</Col>
					<Col xs={24} md={8}>
						<Button type="primary">Add Operation</Button>
					</Col>
				</Row>,
			},]
	}

	next() {
		let {evalStr} = this.state;
		const current = this.state.current + 1;
		this.setState({current});
	}

	prev() {
		const current = this.state.current - 1;
		this.setState({current});
	}

	evalStr = (str, mul) => {
		var stack = [];
		str = str.trim();
		if (str.length == 0) return 0;
		if (mul) str = str.toLowerCase().split(" ");
		for (var i = 0; i < str.length; i++) {
			if (str[i] in operators) {
				var numArg = operators[str[i]][1];
				if (stack.length < numArg) throw "Missing operant";
				stack.push(operators[str[i]][0].apply(null, (function () {
					var arr = [];
					for (var j = 0; j < numArg; j++) {
						arr.push(stack.pop());
					}
					return arr;
				})()));
			} else {
				if (!/^[0-9.]+$/.test(str[i])) throw "Unknown operator \"" + str[i] + "\"";
				stack.push(+str[i]);
			}
		}
		if (stack.length != 1) throw "Uncaught extra operant";
		return stack[0];
	};

	render() {
		const {current} = this.state;
		const steps = this.getSteps();
		console.log(this.evalStr('3 4 +', 'space'));
		return (
			<div className="wrapper">
				<h1 className='result'>Expression </h1>
				<h1 className='result'> Evaluator</h1>

				<div className="steps-content">{steps[current].content}</div>
				<div className="steps-action">

					{current > 0 && (
						<Button style={{marginLeft: 8}} onClick={() => this.prev()}>
							Previous
						</Button>
					)}
				</div>


			</div>
		)
	}
}
