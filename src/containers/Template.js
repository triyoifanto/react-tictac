import React, { Component } from 'react'
import MuiThemeProfider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import NavDrawer from '../components/NavDrawer'
import {Header, Main} from '../styled/Template'

injectTapEventPlugin()

class Template extends Component {
    render(){
        return(
            <MuiThemeProfider>
            <div>
                <NavDrawer/>
                <Header>
                    TicTac Game
                </Header>
                <Main>
                    {this.props.children}
                </Main>
            </div>       
            </MuiThemeProfider>     
        )
    }
}


export default Template