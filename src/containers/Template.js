import React, { Component } from 'react'
import MuiThemeProfider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import RaisedButton from 'material-ui/RaisedButton'

injectTapEventPlugin()

class Template extends Component {
    render(){
        return(
            <MuiThemeProfider>
            <div>
                <header>
                    <h1>TictacTuring</h1>
                    <RaisedButton
                        label={'Test Button'}
                        primary={true}
                        onTouchTap={()=>{console.log('hello, I work')}}
                    />
                </header>
                <main>
                    {this.props.children}
                </main>
            </div>       
            </MuiThemeProfider>     
        )
    }
}


export default Template