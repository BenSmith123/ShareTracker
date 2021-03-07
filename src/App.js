import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

import { instruments as companies } from './sharesies.private/instruments.json';


import "./styles.css";


const columns = [
  { field: 'id', headerName: '#', width: 60 },
  { 
    field: 'logo', 
    headerName: 'Logo',
    width: 120,
    height: 120,
    renderCell: (params) => (
      <img 
        style={{ width: '100px', height: 'auto' }}
        src={params.value}
		alt="company logo"
      >
      </img>
    ),
  },
  { field: 'name', headerName: 'Name', width: 300 },
  { field: 'symbol', headerName: 'Symbol', width: 120 },
  {
    field: 'marketPrice',
    headerName: 'Market price',
    type: 'number',
    width: 180,
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  // },
];


const rows = companies.map((company, i) => {
    return {
      id: i + 1,
      logo: 'https://data.sharesies.nz' + company.logos.thumb,
      name: company.name,
      symbol: company.symbol,
      marketPrice: company.marketPrice,
      // exchange: company.exchange
    }
});


export default function App() {

	const [showShares, setShowShares] = useState(true);

  return (

	<>

		<div className="menuContainer" style={{ width: 200, height: 200 }}>
			<Button
				onClick={() => setShowShares(!showShares)}
			>
				Hello {showShares}
			</Button>
		</div>

		{
			showShares ?
			<DataGrid 
				rows={rows}
				rowHeight={100}
				autoHeight
				columns={columns}
				pageSize={60}
				// autoPageSize
			/>

			:
			
			<div>
				{/* TODO */}
			</div>
		}
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


