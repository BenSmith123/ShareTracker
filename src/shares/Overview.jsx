import { DataGrid } from '@material-ui/data-grid';

import { instruments as companies } from '../sharesies.private/instruments.json';




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
  


  export default function ShareOverview() { 

    return (
        <DataGrid 
        rows={rows}
        rowHeight={100}
        autoHeight
        columns={columns}
        pageSize={60}
        // autoPageSize
    />
    )
  }
