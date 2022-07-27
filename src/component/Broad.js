/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { io } from 'socket.io-client';
import Alert from './Alert';
import Intro from './Intro';
import Item from "./Item";
import UserTimer from './UserTimer';
function Broad() {
    const socket = useRef();
    const [data, setData] = useState(null);
    const [intro, setIntro] = useState(true);
    const [waiting, setWaiting] = useState(false);
    const [bot, setBot] = useState(false);
    useEffect(() => {
        socket.current = io('https://caro1410.herokuapp.com/');
        socket.current.on('game_new', (data) => {
            console.log('game new: ', data);
            setWaiting(false);
            setData(data);
        });
        socket.current.on('game_turn', (data) => {
            console.log(data);
            setData(data);
        });
    }, []);

    function renderBroad() {
        let broad = [];
        for (let i = 0; i < 14; i++) {
            for (let j = 0; j < 14; j++) {
                broad.push(<Item value={data.data[i][j]} handle={() => { update(i, j) }} />);
            }
        }
        return broad;
    }

    function update(row, col) {
        if (!bot) {
            let request = {
                col: col,
                row: row,
                id: data.id
            }
            socket.current.emit('game_turn', request);
        }
        else {
            data[row][col]=1;
            let newData={
                turn: !data.turn,
                data: data.data,
                win: false
            };
            setData(newData);
        }
    }

    function handleFindGame() {
        console.log('find game');
        socket.current.emit('room_wait', 'Finding new game');
        setIntro(!intro);
        setWaiting(true);
    }

    function handleBot() {
        setIntro(!intro);
        setWaiting(false);
        setBot(true);
    }

    const handleTimeout = () => {
        if (data.turn == socket.current.id) {
            socket.current.emit('game_timeout', {
                id: data.id,
                user: socket.current.id
            });
        }
    }

    function playAgain() {
        setIntro(true);
        setWaiting(false);
    }

    if (intro) {
        return <Intro handlePlay={handleFindGame} handleBot={handleBot} />
    }

    if (waiting) {
        return (
            <div className='broad__load'>
                <div className="loader"></div>
            </div>
        );
    }

    // {
    //     data,
    //     win,
    //     turn,
    // }

    // if (bot == true) {
    //     return (
    //         // <div className="game">
    //         //     <div className="broad__game">
    //         //         <div className={`broad ${data.turn ? 'broad__active' : ' '}`}>
    //         //             {renderBroad()}
    //         //         </div>
    //         //     </div>
    //         //     <UserTimer name='Bạn' color={'white'} timeRun={data.turn} handle={handleTimeout} />
    //         //     <UserTimer name='Đối thủ' color={'black'} timeRun={!data.turn} handle={handleTimeout} />
    //         //     {data.win != null ? (data.win ? <Alert win={true} handleNew={playAgain} /> : <Alert win={false} handleNew={playAgain} />) : ''}
    //         // </div >
            
    //     );
    // }

    return (
        <div className="game">
            <div className="broad__game">
                <div className={`broad ${data.turn == socket.current.id ? 'broad__active' : ' '}`}>
                    {renderBroad()}
                </div>
            </div>
            <UserTimer name='Bạn' color={data.user1 == socket.current.id ? 'white' : 'black'} timeRun={data.turn == socket.current.id ? true : false} handle={handleTimeout} />
            <UserTimer name='Đối thủ' color={data.user2 == socket.current.id ? 'white' : 'black'} timeRun={data.turn != socket.current.id ? true : false} handle={handleTimeout} />
            {data.win != null ? (data.win == socket.current.id ? <Alert win={true} handleNew={playAgain} /> : <Alert win={false} handleNew={playAgain} />) : ''}
        </div >
    );
};
export default Broad;