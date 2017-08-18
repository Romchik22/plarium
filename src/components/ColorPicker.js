import React from 'react'
import PropTypes from 'prop-types';

import './ColorPicker.css';
import ColorDropdown from  './ColorDropdown'
import ColorRange from './ColorRange'

class ColorPicker extends React.Component {

	state = {
		listVisible: false,
		colorRangeVisible: false,
		currentColor: '',
    draftColor: '',
	};

	componentDidMount() {
		const { value } = this.props;
		this.setState({currentColor: value, draftColor: value});
	}

	hide = (param) => {
		 param === 'list'  && this.setState({listVisible: false});
		 param === 'range' && this.setState({colorRangeVisible: false});
	};

	toggleDrop = () => {
		this.setState((prevState) => (
		  { listVisible: !prevState.listVisible} ),
      () => { this.state.listVisible && this.hide('range') })
	};

	toggleRange = () => {
		this.setState((prevState) => (
		  { colorRangeVisible: !prevState.colorRangeVisible } ),
			() => { this.state.colorRangeVisible && this.hide('list')})
	};

	setCurrentColor = (color) => {
		this.setState(
			{ currentColor: color, draftColor: color },
      () => { this.props.onChange(this.state.currentColor); });
	};

	setDraftColor = (color) => { this.setState({draftColor: color}); };

	saveCurrentColor = () => {
		this.setState((prevState) => (
			{ currentColor: prevState.draftColor }) ,
			() => { this.props.onChange(this.state.currentColor); });
		this.toggleRange();
	};

	cancel = () => {
	  this.setState((prevState) => ({ draftColor: prevState.currentColor}));
		this.toggleRange();
	};

	closePopup = () => { this.setState({ listVisible: false, colorRangeVisible: false }); } ;

	render() {
	  const { currentColor, draftColor, colorRangeVisible, listVisible } = this.state;
	  const { colors } = this.props;

		return (
			<div className="container">
			{(colorRangeVisible || listVisible) && <div className="back-drop" onClick={this.closePopup}></div>}
      	<div className="content">

        	<div className="color-name">
          	{currentColor}
        	</div>

        	<div className="color-box">
          	<div className="color-indicator" style={{backgroundColor: draftColor}} onClick={this.toggleRange}></div>
						{ this.state.colorRangeVisible &&
          	<ColorRange
							color={draftColor}
							onChange={this.setDraftColor}
							saveCurrentColor={this.saveCurrentColor}
							cancel={this.cancel}
          	/> }
          </div>

       	 <div className="color-dropdown" onClick= {  (e) => {e.preventDefault(); this.toggleDrop()}} >
          <div className="fa fa-angle-down arrow"></div>
          {this.state.listVisible && <ColorDropdown colors={colors} onChange={this.setCurrentColor}/>}
				 </div>

      </div>
    </div>
		)
	}
}

ColorPicker.defaultProps = {
	value: '#ffffff'
};

ColorPicker.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	colors: PropTypes.arrayOf(
		PropTypes.shape({
		name: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired
	})).isRequired
};

export default ColorPicker;