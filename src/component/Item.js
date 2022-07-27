import { memo } from "react";
function Item({ value, handle }) {
    let style = ["item__active"];
    switch (value) {
        case 1: style[1] = "item__active--white"; break;
        case -1: style[1] = "item__active--black"; break;
        default: style[0] = "item__active--none"; break;
    }

    return (
        <div className="item" onClick={handle}>
            <div className={style.join(" ")}></div>
        </div>
    );
};
export default memo(Item);