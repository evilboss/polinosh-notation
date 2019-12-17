import React from 'react';
import {Button, InputNumber, Select} from 'antd';

import './App.css';
const { Option } = Select;
var operators = {
	"+": [function(a, b){ return b+a }, 2],
	"-": [function(a, b){ return b-a }, 2],
	"*": [function(a, b){ return b*a }, 2],
	"/": [function(a, b){ return b/a }, 2],
	"^": [function(a, b){ return Math.pow(b,a) }, 2],
	"sin": [function(a){ return Math.sin(a) }, 1],
	"cos": [function(a){ return Math.cos(a) }, 1],
	"tan": [function(a){ return Math.tan(a) }, 1],
	"floor": [function(a){ return a|0 }, 1],
	"ceil": [function(a){ return Math.ceil(a) }, 1],
	"round": [function(a){ return Math.round(a) }, 1],
	"ln": [function(a){ return Math.log(a) }, 1],
	"sqrt": [function(a){ return Math.sqrt(a) }, 1],
	"e": [function(){ return Math.E }, 0],
	"pi": [function(){ return Math.PI }, 0]
}
function evalStr(str, mul){
	var stack = [];
	str = str.trim();
	if(str.length == 0) return 0;
	if(mul) str = str.toLowerCase().split(" ");
	for(var i = 0; i < str.length; i++){
		if(str[i] in operators){
			var numArg = operators[str[i]][1];
			if(stack.length < numArg) throw "Missing operant";
			stack.push(operators[str[i]][0].apply(null, (function(){
				var arr = [];
				for(var j = 0; j < numArg; j++){
					arr.push(stack.pop());
				}
				return arr;
			})()));
		}else{
			if(!/^[0-9.]+$/.test(str[i])) throw "Unknown operator \""+str[i]+"\"";
			stack.push(+str[i]);
		}
	}
	if(stack.length != 1) throw "Uncaught extra operant";
	return stack[0];
}
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

		<Button type="primary">Button</Button>
	</div>

);

export default App;
