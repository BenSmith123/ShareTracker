
import React from 'react';
import 'chartjs-plugin-datalabels';

import { Doughnut } from 'react-chartjs-2';

// import { stats } from '../sharesies.private/stats.json';
import { portfolio } from '../sharesies.private/check.json';
import { instruments as companies } from '../sharesies.private/instruments-portfolio.json';


// ordered arrays of processed data from sharesies API
const investmentArrays = {
  names: [],
  contributions: [],
};

let totalContribution = 0;


portfolio.sort((a, b) => (b.contribution - a.contribution));

portfolio.forEach((investment) => {
  companies.find((company) => { // eslint-disable-line array-callback-return
    if (company.id === investment.fund_id) {

      // avoid trying to figure out what obj the data comes from
      const data = { ...company, ...investment };
      investmentArrays.names.push(data.name);

      // TODO - calcuelate currency diff - seperate arrays for NZD value and USD?
      investmentArrays.contributions.push(data.contribution);

      totalContribution += parseInt(data.contribution);
    }
  });
});


console.log(portfolio);

console.log(totalContribution);


// why this no work
// const portfolioSummary = portfolio.map((investment) => companies
//   .find((company) => (company.id === investment.fund_id
//     ? { ...company, ...investment }
//     : null)));


const chartOptions = {
  plugins: {
    datalabels: {
      // TODO - hide labels at the top and create new components for a list of companies
      display: true,
      color: 'white',
      anchor: 'end',
      font: {
        weight: 'none',
        size: 12,
      },
      formatter: (value, { dataIndex }) => {
        // calculate percentage and add a title
        // TODO - add money value? - should be an option toggle (default off) for privacy
        const percentage = ((parseFloat(value) / totalContribution) * 100).toFixed(1);
        return `${percentage}%\n${investmentArrays.names[dataIndex]}`;
      },
    },
  },
};

// http://tristen.ca/hcl-picker/#/hlc/13/1.05/DE80A7/E17E5B
// #DE80A7,#C28BBD,#9C97CA,#6FA1CA,#42A9BE,#25ACA8,
// #38AD8B,#5AAB6D,#7CA752,#9C9F40,#B9953C,#D18946,#E17E5B

function renderPieChart(dataValues, dataLabels) {
  return (
    <Doughnut
      options={chartOptions}
      data={{
        labels: dataLabels,
        datasets: [{
          label: '# of Votes',
          data: dataValues,
          backgroundColor: [ // TODO - globally define or automate chartjs colours
            '#DE80A7',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }],
      }}
    />
  );
}


export default function Summary() {

  // implement hooks for loading/updating data - once API is implemented

  return (
    <>
      {renderPieChart(investmentArrays.contributions, investmentArrays.names)}
    </>
  );
}


