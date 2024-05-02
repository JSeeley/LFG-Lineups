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
  const [wrte, setWrTe] = useState()
  const [flex, setFlex] = useState()
  // const [wrte, setWrTe] = useState()
  // const [flex, setFlex] = useState()
  const [lineups, setLineups] = useState([{ id: 1, positions: { qb: null, rb: null, wr: null, wrte: null, flex: null } }]);
  const [lineupID, setLineupID] = useState(1);
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
      const uniquePlayerID = `${edition.collectibleKey.substring(0, 8)}-${edition.collectibleKey.substring(8, 12)}-${edition.collectibleKey.substring(12, 16)}-${edition.collectibleKey.substring(16, 20)}-${edition.collectibleKey.substring(20)}+${edition.editionNumber}`;


      return {
        uniquePlayerID: uniquePlayerID,
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


  const setPlayer = (player, lineupID) => {
      const lineupIndex = lineups.findIndex(l => l.id === lineupID);
      if (lineupIndex === -1) return; // Lineup not found
    
      const lineup = lineups[lineupIndex];

          if (player.position === "QB" && !lineup.positions.qb) {
          setLineupData(player, lineupID, 'qb');
          removeQueuePlayer(player);
          console.log("QB added")

      }
      else if (player.position === "RB" && !lineup.positions.rb) {
          setLineupData(player, lineupID, 'rb')
          removeQueuePlayer(player);
          console.log("RB added")
      }
      else if (player.position === "WR" && !lineup.positions.wr) {
          setLineupData(player, lineupID, 'wr')
          removeQueuePlayer(player);
          console.log("WR added")
      }
      else if ((player.position === "WR" || player.position === "TE") && !lineup.positions.wrte) {
          setLineupData(player, lineupID, 'wrte')
          removeQueuePlayer(player);
          console.log("WR/TE added")
        }
        else if ((player.position === "RB" || player.position === "WR" || player.position === "TE") && !lineup.positions.flex) {
          setLineupData(player, lineupID, 'flex')
          removeQueuePlayer(player);
          console.log("Flex added")
        }
      else {
        console.log("You already have a player in this position")
      }
}

useEffect(() => {
  console.log(lineups);
}, [lineups]);

const setLineupData = (player, lineupId, positionKey) => {
  setLineups(currentLineups => currentLineups.map(lineup =>
      lineup.id === lineupId ? {
          ...lineup,
          positions: { ...lineup.positions, [positionKey]: player }
      } : lineup
  ));
};

const addNewLineup = () => {
  const newId = lineups.length > 0 ? lineups[lineups.length - 1].id + 1 : 1;
  setLineups(currentLineups => [
      ...currentLineups,
      { id: newId, positions: { qb: null, rb: null, wr: null, wrte: null, flex: null } }
  ]);
  setLineupID(newId);
};

const removeQueuePlayer = (player) => {
  // Update state to filter out the player added to the lineup from all relevant arrays
  setRMQbs(prev => prev.filter(p => p.uniquePlayerID !== player.uniquePlayerID));
  setRMRbs(prev => prev.filter(p => p.uniquePlayerID !== player.uniquePlayerID));
  setRMWrTes(prev => prev.filter(p => p.uniquePlayerID !== player.uniquePlayerID));
  setRMFlexes(prev => prev.filter(p => p.uniquePlayerID !== player.uniquePlayerID));
  setRMSuperstars(prev => prev.filter(p => p.uniquePlayerID !== player.uniquePlayerID));
};


// const removePlayer = (player) => {
//   removeLineupData(player)
//   if (player.position === "QB") {
//       setQb()
//   }
//   else if (player.position === "RB") {
//       setRb()
//   }
//   else if (player.position === "WR") {
//       setWr()
//   }
//   else if (player.position === "TE") {
//       setTe()
//   }
// }

// const removeLineupData = (player) => {
//   let x = lineups.filter(f => f.playerId !== player.playerId)
//   setLineupPlayers(x)
// }

  return (
    <div>
          <LFGClassicLineup 
                            qb={qb}
                            rb={rb}
                            wr={wr}
                            wrte={wrte}
                            flex={flex}
                            lineups={lineups}
                            // removePlayer={removePlayer}
                        />
          <Button onClick={addNewLineup}>Add New Lineup</Button>
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
                            lineupID={lineupID}
                            // sortFFPG={sortFFPG}
                        />
    </div>
  );
}

export default CollectibleList;