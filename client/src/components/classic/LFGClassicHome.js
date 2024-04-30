import React, { useState, useEffect } from 'react';
import { Table, Button, Grid, Label, Icon, Modal, ModalContent, ModalActions, Loader } from 'semantic-ui-react'
import LFGClassicQueue from './LFGClassicQueue.js'
import ClassicLineupHeader from './ClassicLineupHeader.js'
import LFGClassicLineup from './LFGClassicLineup.js'

function CollectibleList() {

  const [collectibles, setCollectibles] = useState([]);
  const [RMSuperstars, setRMSuperstars] = useState([]);
  const [RMQbs, setRMQbs] = useState([]);
  const [RMRbs, setRMRbs] = useState([]);
  const [RMWrTes, setRMWrTes] = useState([]);
  const [RMFlexes, setRMFlexes] = useState([]);
  const [qb, setQb] = useState()
  const [rb, setRb] = useState()
  const [wr, setWr] = useState()
  // const [wrte, setWrTe] = useState()
  // const [flex, setFlex] = useState()
  const [lineupPlayers, setLineupPlayers] = useState([])
  const [playerCount, setPlayerCount] = useState(9)
  const [projection, setProjection] = useState(0)
  const [open, setOpen] = useState(false)
  const [isLoading, setLoading] = useState(false);

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


  const setPlayer = (player) => {
    if (!lineupPlayers.find(p => p.athleteName === player.athleteName)) { 
        if (player.position === "QB" && !qb ) {
            setLineupData(player)
            setQb(player)
        }
        else if (player.position === "RB" && !rb) {
            setRb(player)
            setLineupData(player)
        }
        else if (player.position === "WR" && !wr) {
            setWr(player)
            setLineupData(player)
        }
    }
}

const setLineupData = (player) => {     
  // setProjection(projection + player.Projection)
  setLineupPlayers(lineupPlayers => [...lineupPlayers, player])
}





  return (
    <div>
          <LFGClassicLineup 
                            qb={qb}
                            rb={rb}
                            wr={wr}
                            // flex={flex}
                        />
           <LFGClassicQueue 
                            // sortMoney={sortMoney}
                            // sortPos={sortPos}
                            // sortProjection={sortProjection}
                            // sortName={sortName}
                            collectibles={collectibles}
                            setPlayer={setPlayer}
                            RMSuperstars={RMSuperstars}
                            RMQbs={RMQbs}
                            RMRbs={RMRbs}
                            RMWrTes={RMWrTes}
                            RMFlexes={RMFlexes}
                            // sortFFPG={sortFFPG}
                        />
         
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