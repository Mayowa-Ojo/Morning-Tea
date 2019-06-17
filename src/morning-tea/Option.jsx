import React, {Component} from 'react';
import './styles/Option.css';

class Option extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answerClass: ""
        }
    }

    // Add the appropriate css class and also call buttonInteraction
    selectOption = () => {
        const {isCorrect, buttonInteraction, handleScore} = this.props;
        if(isCorrect) {
            this.setState({
                answerClass: "Option-correct"
            })
            // call the function that increments the score in the parent Component
            handleScore();
        } else {
            this.setState({
                answerClass: "Option-wrong"
            })
        }
        buttonInteraction();
    }

    // Remove answer class
    cleanUpClasses = () => {
        // alert("working!")
        this.setState({
            answerClass: ""
        })
    }
    
    render() {
        const {option, disabled} = this.props;
        const {answerClass} = this.state
        return (
            <button 
                className={`Option ${answerClass}`}
                onClick={this.selectOption}
                disabled={disabled}
                >
                {option}
            </button>
        )
    }
}

export default Option;
