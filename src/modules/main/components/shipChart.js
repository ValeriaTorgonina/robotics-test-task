import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { changeYear } from '../state/actions';

const Period = styled.button`
    display: inline-block;
    margin-right: 40px;
    margin-bottom: 100px;
    position: relative;
    width: 22px;
    height: 22px;
    background-color: ${({active}) => active ? '#eb4f47;' : '#49a2c7'};
    border-radius: 50%;
    border: none;

    :focus {
        outline: none;
    }

    ::before {
        content: '${({year}) => year}';
        position: absolute;
        bottom: -20px;
        left: 50%;
        padding: 2px 12px;
        border-radius: 5px;
        transform: translate(-50%, 100%);
        ${({active}) => active ? 'color: white; background: #eb4f47;' : null}
        line-height: 15px;
    }
`

const Canvas = styled.canvas``

class ShipChart extends React.Component {

    changeYear(year) {
            this.props.dispatch(changeYear(year))
    }

    render() {
        const {years, activeYear} = this.props
        return (
            <Canvas>
                {years.map((item, i) => {
                    return <Period 
                        year={item.year} 
                        key={i}
                        active={item.year === activeYear.year ? true : false}
                        onClick={() => this.changeYear(item.year)}
                    />
                })}
            </Canvas>
        )
    }
}

export default connect(state => state.mainReducer)(ShipChart)