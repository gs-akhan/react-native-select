const Option = require('./option');

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const window = Dimensions.get('window');

const SELECT = 'SELECT';

const styles = StyleSheet.create({
  container: {
    borderColor: '#BDBDC1',
    borderWidth: 2 / window.scale
  }
});

class Select extends Component {
  constructor(props) {
    super(props);

    this.pageX = 0;
    this.pageY = 0;

    let defaultValue = props.defaultValue;

    if (!defaultValue) {
      if (Array.isArray(props.children)) {
        defaultValue = props.children[0].props.children;
      } else {
        defaultValue = props.children.props.children;
      }
    }

    this.state = {
      value: defaultValue
    }
  }

  reset() {
    const { defaultValue } = this.props;
    this.setState({ value: defaultValue });
  }

  _onPress() {
    const { optionListRef, children, onSelect, width, height } = this.props;

    if (!children.length) {
      return false;
    }

    optionListRef()._show(children, this.pageX, this.pageY, width, height, (item, value=item) => {
      if (item) {
        onSelect(value);
        this.setState({
          value: item
        });
      }
    });
  } 
  blur() {
    this.props.optionListRef()._blur();
  }
  render() {
    const { width, height, children, defaultValue, style, styleOption, styleText } = this.props;
    const dimensions = { width, height };

    return (
      <TouchableWithoutFeedback onPress={this._onPress.bind(this)}>
        <View ref={SELECT} style={[styles.container, dimensions, style ]}>
          <Option style={ styleOption } styleText={ styleText }>{this.state.value}</Option>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Select.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  optionListRef: PropTypes.func.isRequired,
  onSelect: PropTypes.func
};

Select.defaultProps = {
  width: 200,
  height: 40,
  onSelect: () => { }
};

module.exports = Select;
