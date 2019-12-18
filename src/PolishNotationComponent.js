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
			expressionStr: '',
			evaluate: false,
		};
	}

	getSteps() {
		const {getFieldDecorator} = this.props.form;
		const {expressionStr, evaluate} = this.state;
		console.log(expressionStr, this.evalStr(expressionStr, 'space'));
		const steps = [
			{
				title: 'Operand1',
				content: <Row gutter={16}>
					<Col sm={12}>
						<Form.Item>

							{
								getFieldDecorator('operand', {
									rules: [{required: true, message: 'Please input your Number'}],
								})(
									<InputNumber placeholder="Please enter a number" size="large"
															 style={{height: '70px', width: '300px', fontSize: '20px', textAlign: 'center'}} min={1}
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


						<Form.Item>

							{
								getFieldDecorator('operand', {
									rules: [{required: true, message: 'Please input your Number'}],
								})(
									<InputNumber placeholder="Please enter a number" size="large"
															 style={{height: '70px', width: '300px', fontSize: '20px', textAlign: 'center'}} min={1}
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
				title: 'Operator',
				content: <Row gutter={16}>
					<Col sm={12}>
						<Form.Item>
							{getFieldDecorator('operator', {
								rules: [{required: true}],
							})(
								<Select
									size='large'
									showSearch
									placeholder="Select Operation"
									style={{fontSize: '20px'}}
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
					<ResultComponent expression={expressionStr} result={evaluate ? this.evalStr(expressionStr, 'space') : ''}/>
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
			},];
		return steps;
	}

	next() {
		const {form} = this.props;
		let goNext = false;
		let {evalStr, current, evaluate} = this.state;
		console.log(evalStr);
		if (current < 2) {
			form.validateFieldsAndScroll(['operand'], (err, values) => {
				if (!err) {
					console.log(values);
					evalStr = (evalStr) ? `${evalStr}  ${Object.values(values)}` : Object.values(values);
					goNext = true;
				}
			});

		} else if (current === 2) {
			form.validateFieldsAndScroll(['operator'], (err, values) => {
				if (!err) {
					evalStr = (evalStr) ? `${evalStr}  ${Object.values(values)}` : Object.values(values);
					evaluate = true;
					goNext = true;
				}
			});
		}
		if (goNext) {
			console.log(evalStr);

			const current = this.state.current + 1;

			this.setState({current, evalStr, evaluate});
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

export default Form.create()(PolishNotationComponent);
