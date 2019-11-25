import React from 'react';
import styled from 'styled-components';
import Card from './components/card';
import DropDownList from './components/dropDownList';
import { connect } from 'react-redux';
import ShipChart from './components/shipChart';

const Container = styled.div`
    max-width: 985px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: start;
`
const MainContainer = styled.div`
    padding: 70px 0;
`

class ShipChartScreen extends React.Component {

    render() {
        const {title, text, date} = this.props.activeYear
        return (
            <MainContainer>
                <Container>
                    <Card 
                        itIsHistory={false} 
                        title='Наша миссия' 
                        text='ВЛБАНК (ОАО) перешёл на промышленную эксплуатацию автоматизированной
                            банковской системы ЦФТ-Банк, современного масштабируемого решения, позволившего
                            банку перестроить свой  технологический'
                    />
                    <DropDownList/>
                </Container>
                <ShipChart/>
                <Container>
                <Card 
                    itIsHistory={true} 
                    title={title}
                    text={text}
                    date={date}
                />
                </Container>
            </MainContainer>
        )
    }
}

export default connect( state => state.main)(ShipChartScreen)