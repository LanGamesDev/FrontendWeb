//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     

//core
import "primereact/resources/primereact.min.css";

import React, { useState, useEffect, useRef } from 'react';
import LayoutSidebar from "../../../components/general/layout/LayoutSidebar";

const NewGame = () => {

    return (
        <LayoutSidebar>
            <div>New game</div>
        </LayoutSidebar>
    );
    
}

export default NewGame;
  