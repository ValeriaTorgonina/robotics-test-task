import React from 'react';
import Select from 'react-styled-select';
import { connect } from 'react-redux';
import { changeYear } from '../../state/actions';
import './style.css';

class DropDownList extends React.Component {
    changeYear(year) {
        this.props.dispatch(changeYear(year))
    }

    getList() {
        return this.props.years.map(item => {
           return {value: item.year, label: item.year}
        })
    }

    render() {
        return (
            <Select 
                options={this.getList()} 
                className='select-styles'
                value={this.props.activeYear.year}
                onChange={(event) => this.changeYear(event)}
            />
        )
    }
}

export default connect(state => state.main)(DropDownList)