import React from 'react';

import  './dispetcher.css';

const Dispetcher = props =>{
    return(
        <div className='dispetcher'>
            <h2 className='dispetcher--header'> Dispetçer </h2>
            <div className="dispetcher--list_div">
                <ul className="dispetcher--list_ul">
                    <li className={`dispetcher--list_li ${'bold_list'}`} >Awtobusyň ýol haty  |</li>
                    <li className="dispetcher--list_li">Awtobusyň çykyşy we girişi  |</li>
                    <li className="dispetcher--list_li">Ýoldaky gözegçiniň belligi</li>
                </ul>
            </div>
            <div>
                
            </div>
        </div>
    );
};

export default Dispetcher; 