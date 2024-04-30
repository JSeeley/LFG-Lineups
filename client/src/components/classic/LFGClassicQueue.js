import React from 'react'
import { Table, Button, Grid, Label, Icon, Modal, ModalContent, ModalActions, Loader } from 'semantic-ui-react'

function LFGClassicQueue(props) {

  const RMSuperstars = props.RMSuperstars
  const RMQbs = props.RMQbs
  const RMRbs = props.RMRbs
  // const RMWrs = props.RMWrs
  const RMWrTes = props.RMWrTes
  const RMFlexes = props.RMFlexes

    // const sortPos = (e) => {
    //     e.preventDefault()
    //     props.sortPos()    
    // }
    
    // const sortProjection = (e) => {
    //     e.preventDefault()
    //     props.sortProjection()
    // }

    // const sortFFPG= (e) => {
    //     e.preventDefault()
    //     props.sortFFPG()
    // }
    
    // const sortMoney = (e) => {
    //     e.preventDefault()
    //     props.sortMoney()
    // }
    
    // const sortName = (e) => {
    //     e.preventDefault()
    //     props.sortName()
    // }

    const setPlayer = (e, player) => {
        e.preventDefault()
        props.setPlayer(player)
    }
    
    const renderPlayerCells = (players) => {
        return players.map((player) => (
          <Table.Row key={player.collectibleKey}>
            <Table.Cell style={{ textAlign: "center", borderBottom: ".05px", borderColor: "#fafafa" }}>
              {player.rarityTier}
            </Table.Cell>
            <Table.Cell style={{ borderBottom: ".05px", borderColor: "#fafafa" }}>
              {player.athleteName}
            </Table.Cell>
            <Table.Cell style={{ borderBottom: ".05px", borderColor: "#fafafa" }}>
              <center>
                        <Icon onClick={(event) => setPlayer(event, player)} style={{cursor:"pointer"}}  size="large" name="plus circle" />
              </center>
            </Table.Cell>
          </Table.Row>
        ));
      };

    // const playercells = props.players.map (player => 
    //     <Table.Row>
    //         <Table.Cell style={{textAlign:"center",borderBottom:".05px", borderColor:"#fafafa"}}>{player.position}</Table.Cell>
    //         <Table.Cell style={{borderBottom:".05px",borderColor:"#fafafa"}}>{player.displayName} 
    //         {player.status === "None" ?
    //             <></>
    //         : 
    //         player.status === "IR" ? 
    //             <><span style={{color:"#61dafb", fontWeight:"700"}}> {player.status.substr(0,2)}</span></> 
    //         : 
    //             <><span style={{color:"#61dafb", fontWeight:"700"}}> {player.Status.substr(0,1)}</span></> 
    //         }
    //         <br></br><span style={{fontSize:"11px", letterSpacing:".4px"}}>{player.competition['name']}</span></Table.Cell>
    //         <Table.Cell style={{borderBottom:".05px",borderColor:"#fafafa"}}>{player.teamAbbreviation}</Table.Cell>
    //         <Table.Cell style={{borderBottom:".05px",borderColor:"#fafafa"}}>{player.draftStatAttributes[0].value}</Table.Cell>
    //         <Table.Cell style={{borderBottom:".05px",  borderColor:"#fafafa"}}>{player.Projection}</Table.Cell>
    //         {/* <Table.Cell style={{borderBottom:".05px",  borderColor:"#fafafa"}}>${player.salary}</Table.Cell> */}
    //         <Table.Cell style={{borderBottom:".05px",  borderColor:"#fafafa"}}>
    //             <center>
    //                 <Icon onClick={(event) => setPlayer(event, player)} style={{cursor:"pointer"}}  size="large" name="plus circle" />
    //             </center>
    //         </Table.Cell> 
    //     </Table.Row>
    // )
    
    return (
      <div>
            <Grid divider vert style={{marginTop:".5%"}}>
                <Grid.Row columns={5}>
                    <Grid.Column>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>SS</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {renderPlayerCells(RMSuperstars)}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column>
                    <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>QB</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {renderPlayerCells(RMQbs)}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column>
                    <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>RB</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {renderPlayerCells(RMRbs)}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column>
                    <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>WR/TE</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {renderPlayerCells(RMWrTes)}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                    <Grid.Column>
                    <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>FLEX</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {renderPlayerCells(RMFlexes)}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default LFGClassicQueue