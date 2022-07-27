import img from './logo.png';
function Intro({handlePlay, handleBot}) {
    return (
        <div className="intro">
            <div className="intro__logo">
                <img src={img}></img>
            </div>
            <div className="intro__option">
                <div>
                    <button className="intro__button" onClick={handlePlay}>CHƠI NGAY</button>
                </div>
                <div>
                    {/* <button className="intro__button" onClick={handleBot}>CHƠI VỚI MÁY </button> */}
                </div>
            </div>
        </div>
    );
}

export default Intro;