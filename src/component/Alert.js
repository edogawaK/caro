import { useState } from 'react';
import winImg from './win.png';
import loseImg from './lose.png';
function Alert({ win, handleNew }) {
    return (
        <div className="alert">
            <div className="alert__blur"></div>
            <div className="alert__content">
                {win&&<img src={winImg} className="alert__icon"></img>}
                {!win&&<img src={loseImg} className="alert__icon"></img>}
                <div>{win?'Win':'Lose'}</div>
                <div>
                    <button className='alert__button' onClick={handleNew}>Ván mới</button>
                </div>
            </div>
        </div>
    );
}
export default Alert;