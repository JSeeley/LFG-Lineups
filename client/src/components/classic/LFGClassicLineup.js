import React from 'react'
import { Table, Icon } from 'semantic-ui-react'
import BlankCells from '../BlankCells.js'

function ClassicLineup(props) {
    
    const removePlayer = (e, player) => {
        e.preventDefault()
        props.removePlayer(player)
    }

    let qb = props.qb
    let rb = props.rb
    let wr = props.wr
    // let flex = props.flex

    return (
        <>
        <Table fixed style={{borderColor:"white", color:"#fafafa", marginTop:"-2.5%", marginLeft:"11%", width:"520px"}}>           
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell style={{fontWeight:"normal", fontSize:"12px", letterSpacing: ".5px", width:"54px", color:"white",  backgroundColor:"#2e323c"}}>POS.</Table.HeaderCell>
                    <Table.HeaderCell style={{fontWeight:"normal", fontSize:"12px", letterSpacing: ".5px", width:"160px", color:"white",  backgroundColor:"#2e323c"}}>PLAYER</Table.HeaderCell>
                    <Table.HeaderCell style={{fontWeight:"normal", fontSize:"12px", letterSpacing: ".5px",  width:"56px", color:"white", backgroundColor:"#2e323c"}}>TEAM</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>           
                <Table.Row>
                    <Table.Cell>QB</Table.Cell>
                    {qb ? 
                        <>
                        <Table.Cell>{qb.athleteName}</Table.Cell>
                        <Table.Cell>{qb.rarityTier}</Table.Cell>
                        {/* <Table.Cell><center><Icon name="close" style={{cursor:"pointer"}} onClick={(event) => removePlayer(event, qb)}/></center></Table.Cell> */}
                        </>
                    :
                        <BlankCells/>
                    }
                </Table.Row>
                <Table.Row>
                    <Table.Cell>RB</Table.Cell>
                    {rb ?  
                        <>
                        <Table.Cell>{rb.athleteName}</Table.Cell>
                        <Table.Cell>{rb.rarityTier}</Table.Cell>
                        {/* <Table.Cell><center><Icon name="close" style={{cursor:"pointer"}} onClick={(event) => removePlayer(event, qb)}/></center></Table.Cell> */}
                        </>
                    :
                        <BlankCells/>
                    }
                </Table.Row>
                {/* <Table.Row>
                    <Table.Cell>RB</Table.Cell>
                    {rbs.length > 1 ? 
                        <>
                        <Table.Cell>{rbs[1].displayName}</Table.Cell>
                        <Table.Cell>{rbs[1].teamAbbreviation}</Table.Cell>
                        <Table.Cell>{rbs[1].Projection}</Table.Cell>
                        <Table.Cell>${rbs[1].salary}</Table.Cell>
                        <Table.Cell><center><Icon style={{cursor:"pointer"}} name="close" onClick={(event) => removePlayer(event, rbs[1])}/></center></Table.Cell>
                        </>
                    :
                        <BlankCells/>
                    }
                </Table.Row> */}
                <Table.Row>
                    <Table.Cell>WR</Table.Cell>
                    {wr ?
                        <>
                        <Table.Cell>{wr.athleteName}</Table.Cell>
                        <Table.Cell>{wr.rarityTier}</Table.Cell>
                        {/* <Table.Cell><center><Icon name="close" style={{cursor:"pointer"}} onClick={(event) => removePlayer(event, qb)}/></center></Table.Cell> */}
                        </>
                    :
                        <BlankCells/>
                    }
                </Table.Row>
                {/* <Table.Row>
                    <Table.Cell>WR</Table.Cell>
                    {wrs.length > 1? 
                        <>
                        <Table.Cell>{wrs[1].displayName}</Table.Cell>
                        <Table.Cell>{wrs[1].teamAbbreviation}</Table.Cell>
                        <Table.Cell>{wrs[1].Projection}</Table.Cell>
                        <Table.Cell>${wrs[1].salary}</Table.Cell>
                        <Table.Cell><center><Icon style={{cursor:"pointer"}} name="close" onClick={(event) => removePlayer(event, wrs[1])}/></center></Table.Cell>
                        </>
                    :
                        <BlankCells/>
                    }
                </Table.Row>
                <Table.Row>
                    <Table.Cell>WR</Table.Cell>
                    {wrs.length > 2? 
                        <>
                        <Table.Cell>{wrs[2].displayName}</Table.Cell>
                        <Table.Cell>{wrs[2].teamAbbreviation}</Table.Cell>
                        <Table.Cell>{wrs[2].Projection}</Table.Cell>
                        <Table.Cell>${wrs[2].salary}</Table.Cell>
                        <Table.Cell><center><Icon style={{cursor:"pointer"}} name="close" onClick={(event) => removePlayer(event, wrs[2])}/></center></Table.Cell>
                        </>
                    :
                        <BlankCells/>
                    }
                </Table.Row>
                <Table.Row>
                    <Table.Cell>TE</Table.Cell>
                    {te ? 
                        <>
                        <Table.Cell>{te.displayName}</Table.Cell>
                        <Table.Cell>{te.teamAbbreviation}</Table.Cell>
                        <Table.Cell>{te.Projection}</Table.Cell>
                        <Table.Cell>${te.salary}</Table.Cell>
                        <Table.Cell><center><Icon style={{cursor:"pointer"}} name="close"  onClick={(event) => removePlayer(event, te)}/></center></Table.Cell>
                        </>
                    :
                        <BlankCells/>
                    }
                </Table.Row>
                <Table.Row>
                    <Table.Cell>FLEX</Table.Cell>
                    {flex.length !== 0 ? 
                        <>
                        <Table.Cell>{flex[0].displayName}</Table.Cell>
                        <Table.Cell>{flex[0].teamAbbreviation}</Table.Cell>
                        <Table.Cell>{flex[0].Projection}</Table.Cell>
                        <Table.Cell>${flex[0].salary}</Table.Cell>
                        <Table.Cell><center><Icon style={{cursor:"pointer"}} name="close" onClick={(event) => removePlayer(event, flex[0])}/></center></Table.Cell>
                        </>
                    :
                        <BlankCells/>
                    }
                </Table.Row>
                <Table.Row>
                    <Table.Cell>DST</Table.Cell>
                    {dst ? 
                        <>
                        <Table.Cell>{dst.displayName}</Table.Cell>
                        <Table.Cell>{dst.teamAbbreviation}</Table.Cell>
                        <Table.Cell>{dst.Projection}</Table.Cell>
                        <Table.Cell>${dst.salary}</Table.Cell>
                        <Table.Cell><center><Icon style={{cursor:"pointer"}} name="close" onClick={(event) => removePlayer(event, dst)}/></center></Table.Cell>
                        </>
                    :
                        <BlankCells/>
                    }
                </Table.Row> */}
              </Table.Body>
            </Table>
        </>
    )
}

export default ClassicLineup