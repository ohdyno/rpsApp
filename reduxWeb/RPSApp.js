const React = require("react")
const ReactDOM = require("react-dom")
const {combineReducers} = require('redux')
const {connect} = require('react-redux')

let RoundHistory = ({rounds}) => {
    return <ul>
        {rounds.map((r) => <li>{r.p1Throw} {r.p2Throw} {r.winner}</li>)}
    </ul>
}

let RPSApp = React.createClass({
    componentWillMount(){
        this.props.useCases.history(this)
    },

    rounds(rs){
        this.props.dispatch({type: 'ROUNDS', rounds: rs})
    },

    tie(){
        this.props.dispatch({type: 'TIE'})
        this.props.useCases.history(historyObserver)
    },

    p2Wins(){
        this.props.dispatch({type: 'P2_WINS'})
        this.props.useCases.history(historyObserver)
    },

    p1Wins(){
        this.props.dispatch({type: 'P1_WINS'})
        this.props.useCases.history(historyObserver)
    },

    invalid(){
        this.props.dispatch({type: 'INVALID'})
        this.props.useCases.history(historyObserver)
    },

    handleP1InputChange (e) {
        e.preventDefault()
        this.props.dispatch({type: 'P1_CHANGED', text: e.target.value})
    },

    handleP2InputChange (e) {
        e.preventDefault()
        this.props.dispatch({type: 'P2_CHANGED', text: e.target.value})
    },

    submitHandler (e) {
        e.preventDefault()
        this.props.useCases.play(p1, p2, this)
    },

    render(){
        return <div>
            {this.props.gameResult}

            <form onSubmit={this.submitHandler}>
                <input type="text" name="p1" onChange={this.handleP1InputChange}/>
                <input type="text" name="p2" onChange={this.handleP2InputChange}/>

                <input id="playButton" type="submit" value="PLAY"/>
            </form>

            {this.props.roundHistory}
        </div>
    }
})

// let RPSApp = ({
//     //mapStateToProps
//     roundHistory,
//     gameResult,
//     p1,
//     p2,
//
//     dispatch,
//     useCases
// }) => {
//     const historyObserver = {
//         rounds(rs){
//             dispatch({type: 'ROUNDS', rounds: rs})
//         }
//     }
//
//     const playObserver = {
//         tie(){
//             dispatch({type: 'TIE'})
//             useCases.history(historyObserver)
//         },
//
//         p2Wins(){
//             dispatch({type: 'P2_WINS'})
//             useCases.history(historyObserver)
//         },
//
//         p1Wins(){
//             dispatch({type: 'P1_WINS'})
//             useCases.history(historyObserver)
//         },
//
//         invalid(){
//             dispatch({type: 'INVALID'})
//             useCases.history(historyObserver)
//         }
//     }
//
//     const handleP1InputChange = function (e) {
//         e.preventDefault()
//         dispatch({type: 'P1_CHANGED', text: e.target.value})
//     }
//
//     const handleP2InputChange = function (e) {
//         e.preventDefault()
//         dispatch({type: 'P2_CHANGED', text: e.target.value})
//     }
//
//     let submitHandler = (e) => {
//         e.preventDefault()
//         useCases.play(p1, p2, playObserver)
//     }
//
//     return <div>
//         {gameResult}
//
//         <form onSubmit={submitHandler}>
//             <input type="text" name="p1" onChange={handleP1InputChange}/>
//             <input type="text" name="p2" onChange={handleP2InputChange}/>
//
//             <input id="playButton" type="submit" value="PLAY"/>
//         </form>
//
//         {roundHistory}
//     </div>
// }

function mapStateToProps(state) {
    return state
}

RPSApp = connect(mapStateToProps)(RPSApp)

const gameResult = (state = 'NONE', action) => {
    switch (action.type) {
        case 'TIE':
            return 'TIE GAME'
        case 'P1_WINS':
            return 'P1 WINS'
        case 'P2_WINS':
            return 'P2 WINS'
        case 'INVALID':
            return 'INVALID'
        default:
            return state
    }
}

const p1 = (state = '', action) => {
    switch (action.type) {
        case 'P1_CHANGED':
            return action.text
        default:
            return state
    }
}

const p2 = (state = '', action) => {
    switch (action.type) {
        case 'P2_CHANGED':
            return action.text
        default:
            return state
    }
}

const roundHistory = (state = 'NO ROUNDS', action) => {
    switch (action.type) {
        case 'ROUNDS':
            return <RoundHistory rounds={action.rounds}/>
        default:
            return state
    }
}

const reducer = combineReducers({
    gameResult,
    p1,
    p2,
    roundHistory
})

module.exports = {
    RPSApp,
    reducer,
}