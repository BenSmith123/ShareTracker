
import "./styles.css";

import React, { useState } from 'react';
import { Button } from '@material-ui/core';


import ShareOverview from './shares/Overview';


const MENU_ITEMS = {
  SHARES: 'Shares',
  SHARE_SUMMARY: 'Share summary',
  CRYPTO: 'Crypto'
};


function renderMenuItem(menuItem) {
  switch (menuItem) {

    case MENU_ITEMS.SHARES:
      return <ShareOverview />

    case MENU_ITEMS.SHARE_SUMMARY:
      return <div />;

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

      <Button onClick={() => setDisplay(MENU_ITEMS.SHARE_SUMMARY)} >
				Share summary
			</Button>

      <Button onClick={() => setDisplay(MENU_ITEMS.CRYPTO)} >
				Crypto currency
			</Button>

		</div>

    {renderMenuItem(display)}

	</>


	

    // <>
    //     <Grid 
    //       container 
    //       item xs={12}
    //       spacing={1} 
    //       justify="space-around"
    //       >

    //     {companies.map((company) => {
    //       return (
    //           <>
    //             <Grid className='card' xs={1}>
    //               <img style={ {width: '50px', height: '50px'}}src={'https://data.sharesies.nz' + company.logos.thumb}></img>
    //             </Grid>
    //             <Grid className='card' xs={5}>
    //               {company.name + ' (' + company.symbol + ')'}
    //             </Grid>
    //             <Grid className='card' xs={3}>
    //               {company.marketPrice}
    //             </Grid>
    //             <Grid className='card' xs={3}>
    //               {company.exchange}
    //             </Grid>
    //           </>
    //         )}
    //       )
    //     }
    //   </Grid>

 
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <input type="text" placeholder="Email" name="Email" ref={register({required: true, pattern: /^\S+@\S+$/i})} />
    //     <input type="tel" placeholder="Mobile number" name="Mobile number" ref={register({required: true, minLength: 6, maxLength: 12})} />

    //     <input name="Developer" type="radio" value="Yes" ref={register({ required: true })}/>
    //     <input name="Developer" type="radio" value="No" ref={register({ required: true })}/>
    //     <input type="text" placeholder="First name" name="First name" ref={register({required: true, maxLength: 80})} />
    //     <select name="Title" ref={register({ required: true })}>
    //       <option value="Mr">Mr</option>
    //       <option value="Mrs">Mrs</option>
    //       <option value="Miss">Miss</option>
    //       <option value="Dr">Dr</option>
    //     </select>

    //     <input type="submit" />

    // </form>

    // </>
  );
}


