import React from 'react';
import {Button, InputNumber, Select, Row, Col, Input} from 'antd';
import ResultComponent from './ResultComponent';
import PolishNotationComponent from "./PolishNotationComponent";
import './App.css';

const {Option} = Select;

const App = () => (
	<div className="App">
		<PolishNotationComponent/>
	</div>

);

export default App;
