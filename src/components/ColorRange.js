import React from 'react'
import PropTypes from 'prop-types'

class ColorRange extends React.Component {
	state = {
		color: { red: 0, green: 0, blue: 0 }
	};

	componentDidMount() {
		const color = this.hexToRgb(this.props.color);
		this.setState({color});
	}

	componentWillReceiveProps(nextProps) {
		const color = this.hexToRgb(nextProps.color);
		this.setState({color});
	}

	rgbToHex = (color) => {
		return "#" + ((1 << 24) + (color.red << 16) + (color.green << 8) + (color.blue << 0)).toString(16).slice(1);
	};

	hexToRgb = (hex) => {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			red: parseInt(result[1], 16),
			green: parseInt(result[2], 16),
			blue: parseInt(result[3], 16)
		} : null;
	};

	changeColor = (color) => {
		const hexColor = this.rgbToHex(color);
		this.props.onChange(hexColor);
	};

	handleChange = (e) => {
		const temp = {...this.state.color};
		temp[e.target.name] = e.target.value;
		this.setState({color: temp}, () => { this.changeColor(this.state.color)});
	};

	render() {
	const { color } = this.state;
	const { saveCurrentColor, cancel } = this.props;
		return (
			<div className="range">
				<div className="square square-range"></div>

				<div>
					<input className="red-range" type="range" min="0" max="255" value={color.red} step="1" name="red" onChange={(e) => {this.handleChange(e)}}/>
				</div>
				<div>
					<input className="green-range" type="range" min="0" max="255" value={color.green} step="1" name="green" onChange={ (e) => this.handleChange(e)}/>
				</div>
				<div>
					<input className="blue-range" type="range" min="0" max="255" value={color.blue} step="1" name="blue" onChange={(e) => this.handleChange(e)}/>
				</div>

				<div className="buttons">
					<button className="button-cancel" onClick={cancel}>Cancel</button>
					<button className="button-ok" onClick={saveCurrentColor}>OK</button>
				</div>

			</div>
		)
	}
};

ColorRange.propTypes = { color: PropTypes.string.isRequired };

export default ColorRange;