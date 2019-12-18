import React from 'react';
import {Button, InputNumber, Select, Row, Col, Input} from 'antd';
import ResultComponent from './ResultComponent';
import './App.css';
const { Option } = Select;

const App = () => (
	<div className="App">
		<div className="wrapper">
			<h1>Expression Evaluator</h1>
			<Row gutter={16}>
				<Col sm={12}>
					<div className="form-item">
						<span class="label">Please enter a number</span>
						<InputNumber size="large" min={1} max={100000}/>
					</div>
				</Col>
				<Col sm={12}>
					<Button type="primary">Add Number</Button>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col sm={12}>
					<div className="form-item">
						<span class="label">Please enter a number</span>
						<Select
							showSearch
							placeholder="Select Operation"
							optionFilterProp="children"
							filterOption={(input, option) =>
								option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
						>
							<Option value="jack">Jack</Option>
							<Option value="lucy">Lucy</Option>
							<Option value="tom">Tom</Option>
						</Select>
					</div>
				</Col>
				<Col sm={12}>
					<Button type="primary">Add Number</Button>
				</Col>
			</Row>
			<ResultComponent/>

			<Row gutter={16}>
				<Col xs={12} md={8}>
					<div className="form-item">
						<span class="label">Operator</span>
						<Select
							showSearch
							placeholder="Select Operation"
							optionFilterProp="children"
							filterOption={(input, option) =>
								option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
						>
							<Option value="jack">Jack</Option>
							<Option value="lucy">Lucy</Option>
							<Option value="tom">Tom</Option>
						</Select>
					</div>
				</Col>
				<Col xs={12} md={8}>
					<div className="form-item">
						<span class="label">Operand</span>
						<Input value="1"/>
					</div>
				</Col>
				<Col xs={24} md={8}>
					<Button type="primary">Add Operation</Button>
				</Col>
			</Row>
		</div>
	</div>

);

export default App;
