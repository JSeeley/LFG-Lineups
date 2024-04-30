import React, { useState, useEffect } from 'react';
import ClassicQueue from './ClassicQueue.js'
import { Table, Button, Grid, Label, Icon, Modal, ModalContent, ModalActions, Loader } from 'semantic-ui-react'
import ClassicLineupHeader from './ClassicLineupHeader.js'
import ClassicLineup from './ClassicLineup.js'

function CollectibleList() {
  const [collectibles, setCollectibles] = useState([]);
  const [RMSuperstars, setRMSuperstars] = useState([]);
  const [RMQbs, setRMQbs] = useState([]);
  const [RMRbs, setRMRbs] = useState([]);
  const [RMWrTes, setRMWrTes] = useState([]);
  const [RMFlexes, setRMFlexes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://lfg-lineups.s3.us-west-2.amazonaws.com/portfolio.json');
      const jsonData = await response.json();
      processCollectibles(jsonData.collectibleEditions);
    };

    fetchData();
  }, []);

  const processCollectibles = (collectibleEditions) => {
    const processedData = collectibleEditions.map(edition => {
      const athleteNameAttribute = edition.collectibleAttributes.find(attr => attr.displayName === "Athlete Name");
      const athleteName = athleteNameAttribute ? athleteNameAttribute.value : 'Unknown';
      const rarityTierAttribute = edition.collectibleAttributes.find(attr => attr.displayName === "Rarity Tier");
      const rarityTier = rarityTierAttribute ? rarityTierAttribute.value : 'Unknown';
      const positionAttribute = edition.collectibleAttributes.find(attr => attr.displayName === "Position");
      const position = positionAttribute ? positionAttribute.value : 'Unknown';
      const superstarAttribute = edition.collectibleAttributes.find(attr => attr.displayName === "SuperStar Status");
      const superstar = superstarAttribute ? superstarAttribute.value : 'Unknown';

      return {
        collectibleKey: edition.collectibleKey,
        editionNumber: edition.editionNumber,
        athleteName: athleteName,
        rarityTier: rarityTier,
        position: position,
        superstar: superstar
      };
    });

    setCollectibles(processedData);

    // Reignmaker Superstars
    const filteredSSs = processedData.filter(item =>
        item.superstar === 'Yes' && 
        (item.rarityTier === 'Legendary' || item.rarityTier === 'Reignmaker')
    );
    filteredSSs.sort((a, b) => {
        if (a.rarityTier === 'Reignmaker' && b.rarityTier !== 'Reignmaker') {
        return -1;
        } else if (a.rarityTier !== 'Reignmaker' && b.rarityTier === 'Reignmaker') {
        return 1;
        }
        return 0;
    });
    setRMSuperstars(filteredSSs);

    // Reignmaker QBs
    const filteredQBs = processedData.filter(item => 
        item.position === 'QB' && 
        item.superstar === 'No' && 
        (item.rarityTier === 'Legendary' || item.rarityTier === 'Reignmaker')
    );
    filteredQBs.sort((a, b) => {
        if (a.rarityTier === 'Reignmaker' && b.rarityTier !== 'Reignmaker') {
        return -1;
        } else if (a.rarityTier !== 'Reignmaker' && b.rarityTier === 'Reignmaker') {
        return 1;
        }
        return 0;
    });
    setRMQbs(filteredQBs);

    // Reignmaker RBs

    const filteredRBs = processedData.filter(item => 
        item.position === 'RB' && 
        item.superstar === 'No' && 
        (item.rarityTier === 'Legendary' || item.rarityTier === 'Reignmaker')
    );
    filteredRBs.sort((a, b) => {
        if (a.rarityTier === 'Reignmaker' && b.rarityTier !== 'Reignmaker') {
        return -1;
        } else if (a.rarityTier !== 'Reignmaker' && b.rarityTier === 'Reignmaker') {
        return 1;
        }
        return 0;
    });
    setRMRbs(filteredRBs);

    // Reignmaker WR/TEs
    const filteredWRTEs = processedData.filter(item => 
        (item.position === 'WR' || item.position === 'TE') && 
        item.superstar === 'No' && 
        (item.rarityTier === 'Legendary' || item.rarityTier === 'Reignmaker')
    );
    filteredWRTEs.sort((a, b) => {
        if (a.rarityTier === 'Reignmaker' && b.rarityTier !== 'Reignmaker') {
        return -1;
        } else if (a.rarityTier !== 'Reignmaker' && b.rarityTier === 'Reignmaker') {
        return 1;
        }
        return 0;
    });
    setRMWrTes(filteredWRTEs);

    // Reaignmaker Flexes
    const filteredFlexes = processedData.filter(item => 
        item.superstar === 'No' && 
        (item.rarityTier === 'Legendary' || item.rarityTier === 'Reignmaker')
    );
    filteredFlexes.sort((a, b) => {
        if (a.rarityTier === 'Reignmaker' && b.rarityTier !== 'Reignmaker') {
        return -1;
        } else if (a.rarityTier !== 'Reignmaker' && b.rarityTier === 'Reignmaker') {
        return 1;
        }
        return 0;
    });
    setRMFlexes(filteredFlexes);
  };

const renderPlayerCells = (items) => {
    return items.map((item) => (
      <Table.Row key={item.collectibleKey}>
        <Table.Cell style={{ textAlign: "center", borderBottom: ".05px", borderColor: "#fafafa" }}>
          {item.rarityTier}
        </Table.Cell>
        <Table.Cell style={{ borderBottom: ".05px", borderColor: "#fafafa" }}>
          {item.athleteName}
        </Table.Cell>
        <Table.Cell style={{ borderBottom: ".05px", borderColor: "#fafafa" }}>
          <center>
            <Icon style={{ cursor: "pointer" }} size="large" name="plus circle" />
          </center>
        </Table.Cell>
      </Table.Row>
    ));
  };

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
      <h1>Collectible List</h1>
      <ul>
        {collectibles.map((item, index) => (
          <li key={index}>
            Key: {item.collectibleKey}, Number: {item.editionNumber}, Athlete: {item.athleteName}, Rarity: {item.rarityTier}, Position: {item.position}, SuperStar: {item.superstar}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CollectibleList;