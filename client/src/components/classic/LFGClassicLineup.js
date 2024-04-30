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
        <Table fixed style={{borderColor:"white", color:"#fafafa", marginTop:"-2.5%", marginLeft:"2%", width:"1500px"}}>           
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell style={{fontWeight:"normal", fontSize:"12px", letterSpacing: ".5px", color:"white",  backgroundColor:"#2e323c"}}>QB</Table.HeaderCell>
                    <Table.HeaderCell style={{fontWeight:"normal", fontSize:"12px", letterSpacing: ".5px", color:"white",  backgroundColor:"#2e323c"}}>RB</Table.HeaderCell>
                    <Table.HeaderCell style={{fontWeight:"normal", fontSize:"12px", letterSpacing: ".5px", color:"white", backgroundColor:"#2e323c"}}>WR</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>           
                <Table.Row>
                    {qb ? 
                        <>
                        <Table.Cell>{qb.athleteName}</Table.Cell>
                        <Table.Cell><center><Icon name="close" style={{cursor:"pointer"}} onClick={(event) => removePlayer(event, qb)}/></center></Table.Cell>
                        </>
                    :
                        <BlankCells/>
                    }
                    {rb ?  
                        <>
                        <Table.Cell>{rb.athleteName}</Table.Cell>
                        <Table.Cell><center><Icon name="close" style={{cursor:"pointer"}} onClick={(event) => removePlayer(event, qb)}/></center></Table.Cell>
                        </>
                    :
                        <BlankCells/>
                    }
                    {wr ?
                        <>
                        <Table.Cell>{wr.athleteName}</Table.Cell>
                        <Table.Cell><center><Icon name="close" style={{cursor:"pointer"}} onClick={(event) => removePlayer(event, qb)}/></center></Table.Cell>
                        </>
                    :
                        <BlankCells/>
                    }
                    
                </Table.Row>
              </Table.Body>
            </Table>
        </>
    )
}

export default ClassicLineup