import React from 'react';
import {Button, InputNumber, Select} from 'antd';
import ResultComponent from './ResultComponent';
import './App.css';
const { Option } = Select;

const App = () => (
	<div className="App">
		<InputNumber size="large" min={1} max={100000}/>
		<Select
			showSearch
			style={{width: 200}}
			placeholder="Select Operation"
			optionFilterProp="children"
			filterOption={(input, option) =>
				option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
			}
		>
			<Option value="jack">Jack</Option>
			<Option value="lucy">Lucy</Option>
			<Option value="tom">Tom</Option>
		</Select>,
		<ResultComponent/>

		<Button type="primary">Button</Button>
	</div>

);

export default App;
