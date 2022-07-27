/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutEffect, useRef, useState } from "react";

function UserTimer({ name, color, timeRun, handle }) {
    const [time, setTime] = useState(5);
    let timer = useRef();
    useLayoutEffect(() => {
        timer.current = setInterval(function () {
            setTime((time) => {
                if (time == 1) {
                    handle();
                    clearInterval(timer.current);
                    return 0;
                }
                else {
                    return time - 1;
                }
            });
        }, 1000);
        return ()=>{
            clearInterval(timer.current);
            setTime(5);
        };
    },[timeRun]);
    return (
        <div className="timer">
            <div className="user">
                <div className={`user__chess user__chess--${color}`}></div>
                <div className="user__name">{name}</div>
                <div className={`user__timer ${(!timeRun)?'hide':''}`}>{time}</div>
            </div>
        </div>
    );
};
export default UserTimer;