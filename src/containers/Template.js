import React, { Component } from 'react'
import MuiThemeProfider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import NavDrawer from '../components/NavDrawer'
import {Header, Main} from '../styled/Template'
import Relay from 'react-relay'

injectTapEventPlugin()

class Template extends Component {
    render(){
        return(
            <MuiThemeProfider>
            <div>
                <NavDrawer
                    auth={this.props.route.auth}
                    authenticated={this.props.viewer.user}
                />
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


export default Relay.createContainer(
  Template, {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          user {
            id
          }
        }
      `,
    },
  }
);