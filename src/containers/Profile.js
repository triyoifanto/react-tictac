import React, { Component } from 'react'
import {Container, Name, GameListHeader, GameList, GameRecord, Column, ColumnLabels} from '../styled/Profile'
import Relay from 'react-relay'

class Profile extends Component {

    // static defaultProps ={
    //     user: {
    //         email: 'USER_EMAIL',
    //         games: [
    //             {
    //                 winner: true,
    //                 createdAt: '12/25/2016',
    //                 id: '0001'
    //             },
    //             {
    //                 winner: true,
    //                 createdAt: '12/26/2016',
    //                 id: '0002'
    //             },
    //             {
    //                 winner: true,
    //                 createdAt: '12/27/2016',
    //                 id: '0003'
    //             },
    //             {
    //                 winner: true,
    //                 createdAt: '12/28/2016',
    //                 id: '0004'
    //             }
    //         ]
    //     }
    // }

     get records() {
    return this.props.viewer.user.p1games.edges.map( (edge,index) => {
      let {node: game} = edge
      return (
        <GameRecord
          key={index}
          index={index}
        >
          <Column>
            {(game.winner) ? 'Won!' : "Didn't win"}
          </Column>
          <Column>
            {game.p1Guess}
          </Column>
          <Column>
            {(game.p1GuessCorrect) ? 'Yes' : 'Nope'}
          </Column>
          <Column>
            {new Date(game.createdAt).toLocaleDateString()}
          </Column>
        </GameRecord>
      )
    })
  }

    render(){
        let {email} =this.props.viewer.user
        return(
            <Container>
                <Name>
                    {email}
                </Name>
                <GameList>
                    <GameListHeader>
                        MyGames
                    </GameListHeader>
                    <ColumnLabels>
                    <Column>
                    OutCome
                    </Column>
                    <Column>
                    Gues
                    </Column>
                    <Column>
                    OutCome
                    </Column>
                    <Column>
                    Guesd COrrectly
                    </Column>
                    <Column>
                    Date
                    </Column>
                </ColumnLabels>
                {this.records}
                </GameList>                
            </Container>            
        )
    }
}


export default Relay.createContainer(
    Profile, {
        fragments: {
            viewer: () => Relay.ql`
                fragment on Viewer {
                    user {
                        id
                        email
                        p1games (first: 10) {
                            edges {
                                node {
                                id
                                createdAt
                                winner {
                                    id
                                }
                                p1Guess
                                p1GuessCorrect
                                }
                            }
                            }
                    }
                }
            `,
        }
    }
)