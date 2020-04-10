import './App.css'
import React, { Component } from 'react'

import Button from '../components/Button'
import Display from '../components/Display'

const initaState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class App extends Component {
    state = { ...initaState }

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.setOperation = this.setOperation.bind(this)
    }

    clearMemory() {
        this.setState({ ...initaState })
    }
    addDigit(digit) {
        const display = this.state.displayValue

        if (digit === '.' && display.includes('.')) {
            return
        }
        const clearDisplay = display === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : display
        const displayValue = currentValue + digit
        this.setState({ displayValue, clearDisplay: false })

        if (digit !== '.') {
            const values = [...this.state.values]
            const index = this.state.current
            values[index] = parseFloat(displayValue)
            this.setState({ values })

        }
    }
    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]

            const setValue = (value) => values[0] = value


            switch (currentOperation) {
                case '+':
                    setValue(values[0] + values[1])
                    break;
                case '-':
                    setValue(values[0] - values[1])
                    break;
                case '/':
                    setValue(values[0] / values[1])
                    break;
                case '*':
                    setValue(values[0] * values[1])
                    break;
                default:
                    setValue(values[0])
            }
            values[1] = 0

            this.setState({
                displayValue: values[0], 
                clearDisplay: !equals,
                operation: equals ? null : operation,
                values,
                current: equals ? 0 : 1
            })
        }

    }

    render() {
        return (
            <div className="calculator">
                < Display value={this.state.displayValue} />
                < Button label="AC" click={this.clearMemory} triple />
                < Button label="/" click={this.setOperation} operation />
                < Button label="7" click={this.addDigit} />
                < Button label="8" click={this.addDigit} />
                < Button label="9" click={this.addDigit} />
                < Button label="*" click={this.setOperation} operation />
                < Button label="4" click={this.addDigit} />
                < Button label="5" click={this.addDigit} />
                < Button label="6" click={this.addDigit} />
                < Button label="-" click={this.setOperation} operation />
                < Button label="1" click={this.addDigit} />
                < Button label="2" click={this.addDigit} />
                < Button label="3" click={this.addDigit} />
                < Button label="+" click={this.setOperation} operation />
                < Button label="0" click={this.addDigit} double />
                < Button label="." click={this.addDigit} />
                < Button label="=" click={this.setOperation} operation />

            </div>
        )
    }
}

