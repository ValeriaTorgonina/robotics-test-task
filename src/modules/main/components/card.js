import styled from 'styled-components';
import React from 'react';

const Container = styled.div`
    box-sizing: border-box;
    padding: 20px 30px;
    padding-right: 60px;
    text-align: left;

    ${({itIsHistory}) => itIsHistory ? 
        'border: 2px solid #ddedf4; width: 100%': 
        'background-color: #f8f8f8; max-width: 640px;'
    }
`
const Title = styled.h2`
    font-size: 32px;
    margin-top: 0;
    margin-bottom: 20px;
    color: ${({itIsHistory}) => itIsHistory ? '#505050' : '#eb4f47'};
`

const Date = styled.span`
    font-size: 14px;
    color: #49a2c7;
    font-weight: bold;
`

const Text = styled.p`
    margin: 10px 0;
    font-size: 14px;
    color: #505050;
    line-height: 25px;
`

class Card extends React.Component {

    render() {
        const {itIsHistory, title, date, text} = this.props
        return (
            <Container itIsHistory={itIsHistory}>
                <Title itIsHistory={itIsHistory}>
                    {title}
                </Title>
                {this.props.itIsHistory ? 
                <Date>{date}</Date> : null
                }
                <Text>{text}</Text>
            </Container>
        )
    }
}

export default Card