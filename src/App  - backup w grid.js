import React from "react";
import { useForm } from "react-hook-form";

import { Grid, Paper } from '@material-ui/core';

import { instruments as companies } from './z-instruments.json';


import "./styles.css";

export default function App() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <>

        <Grid 
          container 
          item xs={12}
          spacing={1} 
          justify="space-around"
          >

        {companies.map((company) => {
          return (
              <>
                <Grid className='card' xs={1}>
                  <img style={{ width: '50px', height: '50px' }} src={'https://data.sharesies.nz' + company.logos.thumb}></img>
                </Grid>
                <Grid className='card' xs={5}>
                  {company.name + ' (' + company.symbol + ')'}
                </Grid>
                <Grid className='card' xs={3}>
                  {company.marketPrice}
                </Grid>
                <Grid className='card' xs={3}>
                  {company.exchange}
                </Grid>
              </>
            )}
          )
        }
      </Grid>


      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Email" name="Email" ref={register({required: true, pattern: /^\S+@\S+$/i})} />
        <input type="tel" placeholder="Mobile number" name="Mobile number" ref={register({required: true, minLength: 6, maxLength: 12})} />

        <input name="Developer" type="radio" value="Yes" ref={register({ required: true })}/>
        <input name="Developer" type="radio" value="No" ref={register({ required: true })}/>
        <input type="text" placeholder="First name" name="First name" ref={register({required: true, maxLength: 80})} />
        <select name="Title" ref={register({ required: true })}>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
        </select>

        <input type="submit" />

        <Grid 
          container 
          item xs={12}
           spacing={3} 
           justify="space-evenly"
           >

          <Grid  >
            <input type="text" placeholder='{JSON.stringify(a)}' name="Last name" ref={register({required: true, maxLength: 100})} />
          </Grid>
          <Grid  >
            <input type="text" placeholder='{JSON.stringify(a)}' name="Last name" ref={register({required: true, maxLength: 100})} />
          </Grid>
          <Grid >
            <input type="text" placeholder='{JSON.stringify(a)}' name="Last name" ref={register({required: true, maxLength: 100})} />
          </Grid>
        </Grid>



    </form>

    </>
  );
}


