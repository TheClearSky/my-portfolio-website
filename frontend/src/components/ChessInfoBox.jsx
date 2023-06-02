import React, {useEffect, useState} from 'react';
import "./ChessInfoBox.css";
import Glasscard from './Glasscard';
import MultiplayerChatBox from './MultiplayerChatBox';
import ChessInfoPickMenu from './ChessInfoPickMenu';
import { useDispatch,useSelector } from 'react-redux';
import { updateSingleOrMulti,updateSinglePlayerMode,updateMultiPlayerMode,updateColor,sendRequestToJoinGameID } from '../apiSlices/chessSlice';
import { useGetProfileQuery } from '../apiSlices/userApiSlice';
import FromMessage from "./FromMessage.jsx";
import ToMessage from "./ToMessage.jsx";


//To do
//Random Match Implememt

//Computer Implement
export default function ChessInfoBox() {
    //Single Player || Multi Player
    const [singleOrMulti,setSingleOrMulti]=useState("Single Player");
    //Pass And Play || Computer
    const [singlePlayerMode,setSinglePlayerMode]=useState("Pass And Play");
    //Create Game || Join Game || Random Match
    const [multiPlayerMode,setMultiPlayerMode]=useState("Join Game");
    //Black || White
    const [color,setColor]=useState("White");
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(updateSingleOrMulti(singleOrMulti));
    },[singleOrMulti])
    useEffect(()=>{
        dispatch(updateSinglePlayerMode(singlePlayerMode));
    },[singlePlayerMode])
    useEffect(()=>{
        dispatch(updateMultiPlayerMode(multiPlayerMode));
    },[multiPlayerMode])
    useEffect(()=>{
        dispatch(updateColor(color));
    },[color])

    const { data:profileData } = useGetProfileQuery();
    const multiplayerDetails=useSelector(state=>state.chess.multiplayer);

    const [inputGameID,setInputGameID]=useState("");

    return (
        <Glasscard className="chessinfobox">
            <ChessInfoPickMenu buttonList={["Single Player","Multi Player"]} activeButton={singleOrMulti} setActiveButton={setSingleOrMulti}/>

            {(singleOrMulti==="Single Player")&&
            <ChessInfoPickMenu buttonList={["Pass And Play"]} activeButton={singlePlayerMode} setActiveButton={setSinglePlayerMode}/>}

            {(singleOrMulti==="Multi Player")&&
            <ChessInfoPickMenu buttonList={["Create Game","Join Game"]} activeButton={multiPlayerMode} setActiveButton={setMultiPlayerMode}/>}

            {(!((singleOrMulti==="Multi Player")&&(multiPlayerMode==="Join Game")))&&(!((singleOrMulti==="Single Player")&&(singlePlayerMode==="Pass And Play")))&&
            <ChessInfoPickMenu buttonList={["Black","White"]} activeButton={color} setActiveButton={setColor}/>}

            {(singleOrMulti==="Multi Player")&&(multiplayerDetails.gameID)&&
             <div className="gameidbox">
                <div>Current GameID</div>
                <div className='gameid'>
                    <span>{multiplayerDetails.gameID}</span>
                    <img 
                        onClick={()=>{navigator.clipboard.writeText(multiplayerDetails.gameID)}} 
                        title='clicktocopy' alt='copy' src="/icons/copyicon.svg"
                    />
                </div>
            </div>}

            {((singleOrMulti==="Multi Player")&&(multiPlayerMode==="Join Game"))&&
            <div className="entergameidbox">
                <div>Enter GameID To Join</div>
                <input className='gameidinput' type="text" value={inputGameID} onChange={e=>setInputGameID(e.target.value)} />
                <button onClick={()=>dispatch(sendRequestToJoinGameID(inputGameID))}>Join</button>
            </div>}

            {(multiplayerDetails.errormessage)&&
            <div className='chesserrormessage'>
                {multiplayerDetails.errormessage}
            </div>}

            {(singleOrMulti==="Multi Player")&&
            <>
                <MultiplayerChatBox player1={profileData.name} player2={multiplayerDetails.opponentname}>
                    <FromMessage>In development</FromMessage>
                    <ToMessage>Coming Soon</ToMessage>
                </MultiplayerChatBox>
            </>}
        </Glasscard>
    )
}
