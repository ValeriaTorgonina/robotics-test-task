import React from 'react';
import Select from 'react-styled-select';
import { connect } from 'react-redux';
import { changeYear } from '../state/actions';
import './style.css';

class DropDownList extends React.Component {
    changeYear(year) {
        this.props.dispatch(changeYear(year))
    }

    getList() {
        const options = this.props.years.map(item => {
           return {value: item.year, label: item.year}
        })
        return options
    }

    render() {
        return (
            <Select 
                options={this.getList()} 
                className='customStyles'
                value={this.props.activeYear.year}
                onChange={(event) => this.changeYear(event)}
            />
        )
    }
}

export default connect(state => state.mainReducer)(DropDownList)