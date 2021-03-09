
import React from 'react';
// import 'chartjs-plugin-datalabels';

import { Doughnut } from 'react-chartjs-2';

import { portfolio } from '../sharesies.private/check.json';
import { instruments as companies } from '../sharesies.private/instruments-portfolio.json';


const investmentArrays = {
  names: [],
  contributions: [],
};


portfolio.sort((a, b) => (a.contribution - b.contribution));

console.log(portfolio);

portfolio.forEach((investment) => {
  companies.find((company) => { // eslint-disable-line
    if (company.id === investment.fund_id) {
      // avoid trying to figure out what obj the data comes from
      const data = { ...company, ...investment };
      investmentArrays.names.push(data.name);
      investmentArrays.contributions.push(data.contribution);
    }
  });
});


console.log(investmentArrays);


// why this no work
// const portfolioSummary = portfolio.map((investment) => companies
//   .find((company) => (company.id === investment.fund_id
//     ? { ...company, ...investment }
//     : null)));


const chartOptions = {
  plugins: {
    datalabels55: {
      display: true,
      color: 'white',
      anchor: 'end',
      font: {
        weight: 'bold',
        size: 20,
      },
      formatter: (value) => {

        console.log('hwllo');
        console.log(value, value.toFixed(5));
        return '';
      }

      // take the percentage (decimal), turn to integer by (x100) round to 1dp
      // const percentage = (value.toFixed(3) * 100).toFixed(1);

      // don't show percentage symbol if value is < 2 %
      // return percentage < 3.5 ? percentage : `${percentage}%`;
      ,
    },
  },
};


function renderPieChart(dataValues, dataLabels) {
  return (
    <Doughnut data={{
      labels: dataLabels,
      options: chartOptions,
      datasets: [{
        label: '# of Votes',
        data: dataValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
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
  return (
    <>
      {renderPieChart(investmentArrays.contributions, investmentArrays.names)}
    </>
  );
}


