import React from 'react';
import styled from 'styled-components';
import Card from './components/card';
import DropDownList from './components/dropDownList/dropDownList';
import { connect } from 'react-redux';
import ShipChart from './components/shipChart';

const Container = styled.div`
    position: relative;
    max-width: 985px;
    margin: 0 auto;
    margin-top: 70px;
`
const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
`

class ShipChartScreen extends React.Component {

    render() {
        const {title, text, date} = this.props.activeYear
        return (
            <Container>
                <FlexContainer>
                    <Card 
                        itIsHistory={false} 
                        title='Наша миссия' 
                        text='ВЛБАНК (ОАО) перешёл на промышленную эксплуатацию автоматизированной
                            банковской системы ЦФТ-Банк, современного масштабируемого решения, позволившего
                            банку перестроить свой  технологический'
                    />
                    <DropDownList/>
                </FlexContainer>
                <ShipChart/>
                <Card 
                    itIsHistory={true} 
                    title={title}
                    text={text}
                    date={date}
                />
            </Container>
        )
    }
}

export default connect( state => state.mainReducer)(ShipChartScreen)