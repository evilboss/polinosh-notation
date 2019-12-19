import React, {Component} from "react";
import {Form, Button, Col, Input, InputNumber, Row, Select, Steps, message} from "antd";
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


class PolishNotationComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			current: 0,
			expressionStr: [],
			evaluate: false,
		};
	}

	getSteps() {
		const {getFieldDecorator} = this.props.form;
		const {expressionStr, evaluate} = this.state;
		const steps = [
			{
				title: 'Operand1',
				content: <Row gutter={16}>
					<Col sm={12}>
						<Form.Item label="Please enter a Number">

							{
								getFieldDecorator('operand1', {
									rules: [{required: true, message: 'Please enter a Number'}],
								})(
									<InputNumber size="large" min={1}
															 max={100000}/>
								)
							}
						</Form.Item>

					</Col>
					<Col sm={12}>
						<Button type="primary" onClick={() => this.next()}>Add Number</Button>
					</Col>
				</Row>,
			},
			{
				title: 'Operand2',
				content: <Row gutter={16}>
					<Col sm={12}>


						<Form.Item label="Please enter a Number">

							{
								getFieldDecorator('operand2', {
									rules: [{required: true, message: 'Please enter a Number'}],
								})(
									<InputNumber size="large" min={1}
															 max={100000}/>
								)
							}
						</Form.Item>
					</Col>
					<Col sm={12}>
						<Button type="primary" onClick={() => this.next()}>Add Another Number</Button>
						{/* Change text to  Add another number sa 2nd number */}
					</Col>
				</Row>,
			},
			{
				title: 'Operator',
				content: <Row gutter={16}>
					<Col sm={12}>
						<Form.Item label="Select Operation">
							{getFieldDecorator('operator', {
								rules: [{required: true}],
							})(
								<Select
									size='large'
									showSearch
									optionFilterProp="children"
									filterOption={(input, option) =>
										option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
									<Option value="+">+ (Add)</Option>
									<Option value="-">- (Subtract)</Option>
									<Option value="*">* (Multiply)</Option>
									<Option value="/">/ (Divide)</Option>
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col sm={12}>
						<Button type="primary" onClick={() => this.next()}>Add Operand</Button>
					</Col>
				</Row>,
			},
			{
				title: 'Result Page',
				content: <Row gutter={16}>
					<Col xs={12} md={8}>
						<Form.Item label="Select Operation">
							{getFieldDecorator('operator', {
								rules: [{required: true}],
							})(
								<Select
									size='large'
									showSearch
									optionFilterProp="children"
									filterOption={(input, option) =>
										option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
									}
								>
									<Option value="+">+ (Add)</Option>
									<Option value="-">- (Subtract)</Option>
									<Option value="*">* (Multiply)</Option>
									<Option value="/">/ (Divide)</Option>
								</Select>
							)}
						</Form.Item>
					</Col>
					<Col xs={12} md={8}>
						<Form.Item label="Operand">
							{getFieldDecorator('operand', {
								rules: [{required: true}],

							})(
								<Input value="1"/>
							)}
						</Form.Item>
					</Col>
					<Col xs={24} md={8}>
						<Button type="primary">Add Operation</Button>
					</Col>
				</Row>,
			},];
		return steps;
	}

	next() {
		const {form} = this.props;
		const {expressionStr} = this.state;
		let goNext = false;
		const setValues = (value) => {
			expressionStr.push(value)
		};
		let {current, evaluate} = this.state;
		if (current === 0) {
			form.validateFieldsAndScroll(['operand1'], (err, values) => {
				if (!err) {
					setValues(Object.values(values));
					goNext = true;
				}
			});

		} else if (current === 1) {
			form.validateFieldsAndScroll(['operand2'], (err, values) => {
				if (!err) {
					setValues(Object.values(values));
					goNext = true;
				}
			});

		} else if (current === 2) {
			form.validateFieldsAndScroll(['operator'], (err, values) => {
				if (!err) {
					console.log(Object.values(values));
					setValues(Object.values(values));
					evaluate = true;
					goNext = true;
				}
			});
		}
		if (goNext) {

			const current = this.state.current + 1;

			this.setState({current, evaluate});
		}
	}

	//
	//

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

		const {current, expressionStr} = this.state;
		let result = '';

		console.log(expressionStr.toString().replace(/,/gi, ' '), expressionStr.length);
		if (expressionStr.length >= 3) {
			result = this.evalStr(expressionStr.toString().replace(/,/gi, ' '), 'space');
		}

		const steps = this.getSteps();
		console.log(this.evalStr('3 4 +', 'space'));
		return (
			<div className="wrapper">
				<h1 className='result'>Expression<br/>Evaluator</h1>
				<ResultComponent expression={expressionStr} result={result}/>

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

export default Form.create()(PolishNotationComponent);
