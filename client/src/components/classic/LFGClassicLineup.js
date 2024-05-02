import React from 'react'
import { Table, Icon } from 'semantic-ui-react'
import BlankCells from '../BlankCells.js'

function ClassicLineup(props) {
    
    const removePlayer = (e, player) => {
        e.preventDefault()
        props.removePlayer(player)
    }

    const lineups = props.lineups

    const getPositionHeaders = () => {
        const allPositions = new Set();
        lineups.forEach(lineup => {
          Object.keys(lineup.positions).forEach(position => {
            allPositions.add(position);
          });
        });
        return Array.from(allPositions);
      };
    
      return (
        <div>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                {getPositionHeaders().map(position => (
                  <Table.HeaderCell key={position}>{position.toUpperCase()}</Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {lineups.map(lineup => (
                <Table.Row key={lineup.id}>
                  <Table.Cell>{lineup.id}</Table.Cell>
                  {getPositionHeaders().map(position => (
                    <Table.Cell key={position}>
                      {lineup.positions[position] ? lineup.positions[position].athleteName : ''}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {/* Other components and buttons */}
        </div>
      );
    }

export default ClassicLineup