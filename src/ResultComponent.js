import React, {Component} from "react";
import {Button, InputNumber, Select, Row, Col} from 'antd';
import './App.css';

export default class ResultComponent extends Component {
	constructor(props) {
		super();
	}


	render() {
		const {expression: expressions, result} = this.props;
		return (
			<div>
				<div className="spacer" style={{height: "50px"}}></div>
				<div className="tiles">
					<Row gutter={16}>

						{expressions.map((item, key) =>
							<Col span={8} key={key}>
								<span>{item}</span>
							</Col>
						)}

					</Row>
				</div>
				{result ? <div
					<p className="equals">=</p>
					<p className="result">{result}</p>
				</div> : ''}


				<div className="spacer" style={{height: "50px"}}></div>
			</div>
		)
	}
}
