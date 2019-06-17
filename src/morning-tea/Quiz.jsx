import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Spinner } from 'reactstrap';
import './styles/Quiz.css';
import Option from './Option';
import { parseData, mockData, random } from './helpers/helper';

const BASE_URL = "https://opentdb.com/api.php?amount=10&type=multiple"

class Quiz extends Component {
    static defaultProps = {
        mockData: parseData(mockData)
    }
    constructor(props) {
        super(props)
        this.state = {
            triviaData: [],
            trivia: {},
            count: 0,
            score: 0,
            disabled: true,
            answerIndex: null,
            timer: "10"
        }
    }

    handleCountdown() {
        this.timeId = setInterval(() => {
            this.setState(prvSt => ({
                timer: "0" + (Number(prvSt.timer) - 1)
            }))
        }, 1000)

        this.timeOutId = setTimeout(() => {
            clearInterval(this.timeId)
            this.setState({
                disabled: true
            })
        }, 10000)
    }

    // display next trivia question
    handleNext = () => {
        // console.log(this.props.mockData)
        clearInterval(this.timeId)
        clearTimeout(this.timeOutId);
        this.handleCountdown()
        const {mockData} = this.props;
        const {count, triviaData} = this.state;
        //generate random number for the position of correct answer
        const rand = random();
        this.setState(prvSt => ({
            trivia: {...triviaData[count]},
            count: prvSt.count + 1,
            disabled: false,
            answerIndex: rand,
            timer: "10"
        }));
        
        //create a ref in order to call/trigger function in child component
        this.refs.child.cleanUpClasses();
        this.refs.child1.cleanUpClasses();
        this.refs.child2.cleanUpClasses();
        this.refs.child3.cleanUpClasses();
    }

    handleScore = () => {
        this.setState(prvSt => ({
            score: prvSt.score + 1
        }));
    }

    handleNewQuiz = async () => {
        // API Call
        const res = await axios.get(BASE_URL);
        const parsedData = await parseData(res.data.results);
        // console.log(parsedData);
        this.setState({
            triviaData: [...parsedData],
            count: 0,
            score: 0,
            timer: "10",
            trivia: {},
            answerIndex: null
        });
        //================================
        this.refs.child.cleanUpClasses();
        this.refs.child1.cleanUpClasses();
        this.refs.child2.cleanUpClasses();
        this.refs.child3.cleanUpClasses();
    }

    async componentDidMount() {
        // API Call
        const res = await axios.get(BASE_URL);
        const parsedData = await parseData(res.data.results);
        // console.log(parsedData);
        this.setState({
            triviaData: [...parsedData]
        });
    }

    componentDidUpdate() {
        console.log(`update: ${this.state.answerIndex}`)        
    }

    // disable the button after user interaction
    buttonInteraction = () => {
        this.setState({
            disabled: true,
        })
    }

    render() {
        const {mockData} = this.props;
        // const {question, category, correct_answer, incorrect_answers} = one;
        const {
            count, 
            trivia, 
            trivia: {question, category, options}, 
            disabled, 
            score,
            answerIndex: rand,
            timer
        } = this.state;

        const buttonText = Object.keys(trivia).length !== 0 ? "Next" : "Start";
        // const rand = random();
        // console.log(rand)

        const start_screen = (
            Object.keys(trivia).length !== 0 
            ?
                <div className="Quiz-question">
                    <h3>{question}</h3>
                    <p style={{color: "steelblue"}}> {category} </p>
                </div>
            :
                <div className="Quiz-startScreen">
                    <h1>Are you ready?</h1>
                    <h3>Click start <i class="fas fa-arrow-circle-right"></i></h3>
                    <Fragment>
                        <Spinner type="grow" color="primary" />
                        <Spinner type="grow" color="warning" />
                        <Spinner type="grow" color="danger" />
                    </Fragment>
                </div>
        )

        //====================================================================================

        return (
            <Fragment>
                <h3 className="heading">Everyone has a knowledge gap. Discover what you don't know...</h3>
                <Container className="Quiz">
                    <Container className="Quiz-main">
                        <Row className="Quiz-top">
                            <Col>
                                {start_screen}
                            </Col>
                        </Row>
                        <Row className="Quiz-bottom">
                            <Col>
                                <Row style={{height: "50%"}}>
                                    <Col className="Quiz-options">
                                        <Option
                                            key={1}
                                            option={count > 0 && (rand === 1 ? options[3] : options[1])} 
                                            isCorrect={rand === 1} 
                                            buttonInteraction={this.buttonInteraction}
                                            disabled={disabled}
                                            ref="child"
                                            handleScore={this.handleScore}
                                        />
                                    </Col>
                                    <Col className="Quiz-options">
                                        <Option
                                            key={2} 
                                            option={count > 0 && (rand === 0 ? options[3] : options[0])} 
                                            isCorrect={rand === 0} 
                                            buttonInteraction={this.buttonInteraction}
                                            disabled={disabled}
                                            ref="child1"
                                            handleScore={this.handleScore}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{height: "50%"}}>
                                    <Col className="Quiz-options">
                                        <Option
                                            key={3} 
                                            option={count > 0 && (rand === 2 ? options[3] : options[2])} 
                                            isCorrect={rand === 2} 
                                            buttonInteraction={this.buttonInteraction}
                                            disabled={disabled}
                                            ref="child2"
                                            handleScore={this.handleScore}
                                        />
                                    </Col>
                                    <Col className="Quiz-options">
                                        <Option
                                            key={4} 
                                            option={count > 0 && (rand === 3 ? options[3] : options[rand])} 
                                            isCorrect={rand === 3} 
                                            buttonInteraction={this.buttonInteraction}
                                            disabled={disabled}
                                            ref="child3"
                                            handleScore={this.handleScore}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>                        
                    </Container>

                    <Container className="Quiz-aside">
                        <Row className="Quiz-aside-score">
                            <h4>Score: {score}/{mockData.length}</h4>
                        </Row>
                        <Row className="Quiz-aside-start">
                            <Button
                                className="Quiz-aside-start-button"
                                color="info" 
                                onClick={this.handleNext} 
                                disabled={count === mockData.length}
                            >   
                                {buttonText}
                            </Button>
                        </Row>
                        <Row className="Quiz-aside-replay">
                            <Button 
                                className="Quiz-aside-replay-button" 
                                color="info" 
                                onClick={this.handleNewQuiz}
                                disabled={count < mockData.length}
                            >
                                Play Again
                            </Button>
                        </Row>
                        <Row className="Quiz-aside-timer">
                            <div>
                                {/* <p style={{color: "steelblue"}}>Hurry!! <i class="fas fa-hourglass-start fa-1x"></i></p> */}
                                <h1><span>00</span>:<span>{timer}</span></h1>
                            </div>
                        </Row>
                    </Container>
                </Container>                
            </Fragment>
        )
    }
}

export default Quiz;
