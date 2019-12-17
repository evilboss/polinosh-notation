import React, {Component} from "react";

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
		return (
			<div>RESULT PAGE</div>
		)
	}
}
