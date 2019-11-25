import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { changeYear } from '../state/actions';
import {CanvasApp} from '../../../canvas-part';
import ShipIcon from '../../../images/ship-Icon.png';

const Canvas = styled.canvas`
    display: block;
    width: 100%;
    max-width: 1250px;
    margin: 70px auto;
    margin-left: -30px;
    height: auto;
`

class ShipChart extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.clickStorage = [];
    }

    componentDidMount() {
        this.canvas = new CanvasApp({
            imageUrl: ShipIcon,
            canvasEl:  this.canvasRef.current,
            years: this.props.years.map((item) => item.year)
        });
        this.canvas.run().then(() => {
            this.canvas.onPeakClick((i, year) => this.changeYear(year))
        })
    }

    componentWillUnmount() {
        this.canvas.destroy()
    }

    changeYear(year) {
        this.props.dispatch(changeYear(year));
    }

    async run() {
        if (this.isRunning || !this.clickStorage.length) {
            return
        }

        this.isRunning = true;
        const i = this.clickStorage.shift();
        
        await this.canvas.setActive(i);

        this.isRunning = false;
        return this.run()
    }

    saveClick(i) {
        if (this.canvas) {
            this.clickStorage.push(i);
            this.run()
        }
        
    }

    render() {
        const {years, activeYear} = this.props
        const i = years.findIndex(item => item.year === activeYear.year)
        this.saveClick(i);

        return (
            <Canvas ref={this.canvasRef}/>
        )
    }
}

export default connect(state => state.main)(ShipChart)