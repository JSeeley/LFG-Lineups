import React, { useState, useEffect } from 'react'
import { Button, Grid, Label, Icon, Modal, ModalContent, ModalActions, Loader } from 'semantic-ui-react'
import ClassicQueue from './ClassicQueue.js'
import ClassicLineupHeader from './ClassicLineupHeader.js'
import ClassicLineup from './ClassicLineup.js'
import portfolio from '../portfolio.json'

// 

function ClassicHome() {

    const [players, setPlayers] = useState([])
    const [qqbs, setQQbs] = useState([])
    const [qrbs, setQRbs] = useState([])
    const [qwrs, setQWrs] = useState([])
    const [qtes, setQTes] = useState([])
    const [qdsts, setQDsts] = useState([])
    const [qflexs, setQFlexs] = useState([])
    const [qall, setQAll] = useState([])
    const [qb, setQb] = useState()
    const [rbs, setRbs] = useState([])
    const [wrs, setWrs] = useState([])
    const [te, setTe] = useState()
    const [dst, setDst] = useState()
    const [flex, setFlex] = useState([])
    const [lineupPlayers, setLineupPlayers] = useState([])
    const [salary, setSalary] = useState(50000)
    const [salaryPerPlayer, setSalaryPerPlayer] = useState(5555)
    const [playerCount, setPlayerCount] = useState(9)
    const [projection, setProjection] = useState(0)
    const [open, setOpen] = useState(false)
    const [isLoading, setLoading] = useState(false);

    const url = "https://lfg-lineups.s3.us-west-2.amazonaws.com/portfolio.json"

    useEffect(() => {
        fetchPlayerQueue()
    },[])


    // the json is hosted using "render" which is a cloud platform that hosts static stuff and maybe could be used for cron jobs? She is fetching the json and applying each chunk like qte to her variables above.

    // When finished, the json is fetched and the data is set to the variables above. The data is then set to the players variable which is used in the ClassicQueue component. The ClassicQueue component is the list of players that you can select from to build your lineup. The ClassicLineup component is the lineup that you are building. The ClassicLineupHeader component is the header that shows the salary, salary per player, and projection of the lineup. The Modal is the popup that asks if you want to include the selected players in the lineup. The buttons in the Label.Group are used to filter the players in the ClassicQueue component. The sort functions are used to sort the players in the ClassicQueue component. 
    // The setPlayer function is used to add a player to the lineup. The removePlayer function is used to remove a player from the lineup. The optimizeWith function is used to optimize the lineup with the selected players. The optimizeWithout function is used to optimize the lineup without the selected players. The optimizePlayers function is used to optimize the lineup with the selected players. The setLineupData function is used to set the lineup data when a player is added to the lineup. The removeLineupData function is used to remove the lineup data when a player is removed from the lineup.

    const fetchPlayerQueue = () => {
        fetch(`https://lfg-lineups.s3.us-west-2.amazonaws.com/portfolio.json`)
        .then((res)=> res.json())
        .then(data => {
            console.log(data)
        })
    }

    const setPlayer = (player) => {
        if (!lineupPlayers.find(p => p.playerId === player.playerId)) { 
            if (player.position === "QB" && !qb ) {
                setLineupData(player)
                setQb(player)
            }
            else if (player.position === "RB" && rbs.length < 2) {
                setRbs(rbs => [...rbs, player])
                setLineupData(player)
            }
            else if (player.position === "WR" && wrs.length < 3) {
                setWrs(wrs => [...wrs, player])
                setLineupData(player)
            }
            else if (player.position === "TE" && !te) {
                setTe(player)
                setLineupData(player)
            }
            else if (player.position === "DST" && !dst) {
                setDst(player)
                setLineupData(player)
            }
            else if (flex.length < 1 && (player.position === "RB" || player.position === "WR"  || player.position === "TE")) {
                setFlex([player])
                setLineupData(player)
            }
        }
    }

    const setLineupData = (player) => {     
        setProjection(projection + player.Projection)
        setLineupPlayers(lineupPlayers => [...lineupPlayers, player])
        // let s = salary - player.salary
        // if (playerCount === 1) {
        //     setSalaryPerPlayer(0)
        // }
        // else {
        //     setSalaryPerPlayer(parseInt(s/(playerCount - 1)))
        // }
        // setSalary(s)
        // setPlayerCount(playerCount - 1)
    }

    const removePlayer = (player) => {
        removeLineupData(player)
        if (player === flex[0]) {
            setFlex([])
        }  
        else if (player.position === "QB") {
            setQb()
        }
        else if (player.position === "RB") {
            let z = rbs.filter(f => f !== player)
            setRbs(z)
        }
        else if (player.position === "WR") {
            let z = wrs.filter(f => f !== player)
            setWrs(z)
        }
        else if (player.position === "TE") {
            setTe()
        }
        else if (player.position ==="DST" ) {
            setDst()
        }
    }

    const removeLineupData = (player) => {
        setProjection(projection - player.Projection)
        let s = salary + player.salary
        setSalaryPerPlayer(parseInt(s/(playerCount + 1)))
        setSalary(s)
        setPlayerCount(playerCount + 1)
        let x = lineupPlayers.filter(f => f.playerId !== player.playerId)
        setLineupPlayers(x)
    }

    const sortPos = () => {
        setPlayers([...players.slice().sort((item1, item2) => item2.position < item1.position ? -1 : 1)])
    }

    const sortProjection = () => {
        setPlayers([...players.slice().sort((item1, item2) => item2.Projection < item1.Projection ? -1 : 1)])
    }

    const sortFFPG = () => {
        setPlayers([...players.slice().sort((item1, item2) => item2.draftStatAttributes[0].value < item1.draftStatAttributes[0].value ? -1 : 1)])
    }

    const sortMoney = () => {
        setPlayers([...players.slice().sort((item1, item2) => item2.salary < item1.salary ? -1 : 1)])
    }

    const sortName = () => {
        setPlayers([...players.slice().sort((item1, item2) => item2.displayName < item1.displayName ? 1 : -1)])
    }
 
    const setQPlayers = () => {
        setPlayers(qqbs)
    }

    const setRPlayers = () => {
        setPlayers(qrbs)
    }

    const setWPlayers = () => {
        setPlayers(qwrs)
    }

    const setTPlayers = () => {
        setPlayers(qtes)
    }

    const setFPlayers = () => {
        setPlayers(qflexs)
    }

    const setDPlayers = () => {
        setPlayers(qdsts)
    }

    const setAllPlayers = () => {
        setPlayers(qall)
    }

    return (
        <div>
            <Grid divider vert style={{marginTop:".5%"}}>
                <Grid.Row columns={2}>
                    <Grid.Column> 
                        {isLoading ? 
                            <Loader active /> : <Loader />
                        }
                        <ClassicLineupHeader
                            salary={salary}
                            salaryPerPlayer={salaryPerPlayer}
                            projection={projection}
                        />
                        <ClassicLineup 
                            qb={qb}
                            te={te}
                            rbs={rbs}
                            wrs={wrs}
                            flex={flex}
                            dst={dst}
                            removePlayer={removePlayer}
                        />
                        {/* <Modal
                        style={{width:"305px"}}
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={<Button style={{width: "230px", marginLeft:"6%",backgroundColor:"#61dafb", color:"#181a1f"}}>OPTIMIZE LINEUP</Button>}
                        >
                            <ModalContent style={{textAlign:"center"}}>
                                <p style={{fontFamily:"Helvetica", fontSize:"15px", fontWeight:"bold"}}>Include selected players?</p>
                                <ModalActions>
                                    <Button basic color="teal" style={{marginLeft:"1.5%", width:"110px"}} onClick={optimizeWith}>
                                        <Icon name='checkmark' /> Yes
                                    </Button>
                                    <Button basic color='grey' style={{width:"110px"}} onClick={optimizeWithout}>
                                        <Icon name='remove' /> No
                                    </Button>
                                </ModalActions>
                            </ModalContent>
                        </Modal> */}
                    </Grid.Column>
                    <Grid.Column>
                        {/* only changed the names of the filters. Haven't done functionality to filter early and late. */}
                        <Label.Group style={{height:"46px", cursor:"pointer", marginLeft:"24%", marginTop:"1.85%",marginBottom:"-2.3%"}}>
                            <Label onClick={setQPlayers} style={{fontSize:"11.5px", backgroundColor:"#61dafb"}}>EARLY</Label>
                            <Label onClick={setRPlayers} style={{fontSize:"11.5px", marginLeft:"-.5%", backgroundColor:"#61dafb"}}>LATE</Label>
                            {/* <Label onClick={setWPlayers} style={{fontSize:"11.5px", marginLeft:"-.5%", backgroundColor:"#61dafb"}}>WR</Label>
                            <Label onClick={setTPlayers} style={{fontSize:"11.5px",marginLeft:"-.5%", backgroundColor:"#61dafb"}}>TE</Label>
                            <Label onClick={setDPlayers} style={{fontSize:"11.5px",marginLeft:"-.5%", backgroundColor:"#61dafb"}}>DST</Label>
                            <Label onClick={setFPlayers} style={{fontSize:"11.5px", marginLeft:"-.5%", backgroundColor:"#61dafb"}}>FLEX</Label>
                            <Label onClick={setAllPlayers} style={{fontSize:"11.5px",marginLeft:"-.5%", backgroundColor:"#61dafb"}}>ALL</Label> */}
                        </Label.Group>
                        <ClassicQueue 
                            // sortMoney={sortMoney}
                            sortPos={sortPos}
                            sortProjection={sortProjection}
                            sortName={sortName}
                            players={players}
                            setPlayer={setPlayer}
                            sortFFPG={sortFFPG}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default ClassicHome



// const LFGClassicHome = () => {
//     return (
//         <div>
//             {portfolio.collectibleEditions.map((edition, index) => {
//                 // Find the attribute for "Athlete Name"
//                 const athleteNameAttribute = edition.collectibleAttributes.find(attr => attr.displayName === "Athlete Name");

//                 return (
//                     <div key={index}>
//                         <p>{athleteNameAttribute ? athleteNameAttribute.value : 'N/A'}</p>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }

// export default LFGClassicHome