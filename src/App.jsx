import './styles/styles.scss';

import React, { useState } from 'react';
import { Button } from '@material-ui/core';

import ShareOverview from './shares/Overview';
import Summary from './shares/Summary';


const MENU_ITEMS = {
  SHARES: 'Shares',
  SHARE_SUMMARY: 'Share summary',
  CRYPTO: 'Crypto',
};


function renderMenuItem(menuItem) {
  switch (menuItem) {
    case MENU_ITEMS.SHARES:
      return <ShareOverview />;

    case MENU_ITEMS.SHARE_SUMMARY:
      return <Summary />;

    case MENU_ITEMS.CRYPTO:
      return <div />;

    default:
      return null;
  }
}


export default function App() {
  const [display, setDisplay] = useState(MENU_ITEMS.SHARES);

  return (

    <>

      <h1>{display}</h1>

      <div className="menuContainer" style={{ width: 200, height: 200 }}>
        <Button onClick={() => setDisplay(MENU_ITEMS.SHARES)}>
          Share overview
        </Button>

        <Button onClick={() => setDisplay(MENU_ITEMS.SHARE_SUMMARY)}>
          Share summary
        </Button>

        <Button onClick={() => setDisplay(MENU_ITEMS.CRYPTO)}>
          Crypto currency
        </Button>

      </div>

      {renderMenuItem(display)}

    </>

  );
}
