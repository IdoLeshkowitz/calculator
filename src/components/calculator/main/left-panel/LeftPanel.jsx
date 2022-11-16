import React from 'react';
import {AiOutlineInfoCircle,AiOutlineCloudSync} from 'react-icons/ai';
import {HiOutlineLightBulb} from 'react-icons/hi';
import {MdHistory} from 'react-icons/md';
function LeftPanel() {
    return (  <>
    <div className='button-blue i'><AiOutlineInfoCircle className='icon'/></div>
    <div className='button-orange theme'><HiOutlineLightBulb className='icon'/></div>
    <div className='button-orange history'><MdHistory className='icon'/></div>
    <div className='button-orange scientific'><img  className="icon"src="https://cdn2.iconfinder.com/data/icons/mathematics-geometry/154/math-function-root-x-power-n-1024.png"></img></div>
    <div className='button-orange remote'><AiOutlineCloudSync className='icon'/></div>
    <div className='button-blue space1'></div>
    <div className='button-blue space2'></div>
    <div className='button-blue space3'></div>
    </>);
}

export default LeftPanel;