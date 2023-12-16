import React, { useState } from 'react';

const stateSalaries = {
  "Alabama": 50620,
  "Alaska": 66130,
  "Arizona": 58620,
  "Arkansas": 48570,
  "California": 73220,
  "Colorado": 67870,
  "Connecticut": 69310,
  "Delaware": 62260,
  "Florida": 55980,
  "Georgia": 58000,
  "Hawaii": 61420,
  "Idaho": 51350,
  "Illinois": 63930,
  "Indiana": 53500,
  "Iowa": 53520,
  "Kansas": 52850,
  "Kentucky": 51490,
  "Louisiana": 50940,
  "Maine": 55960,
  "Maryland": 69750,
  "Massachusetts": 76600,
  "Michigan": 58000,
  "Minnesota": 63640,
  "Mississippi": 45180,
  "Missouri": 54520,
  "Montana": 52200,
  "Nebraska": 55070,
  "Nevada": 55490,
  "New Hampshire": 62550,
  "New Jersey": 70890,
  "New Mexico": 54400,
  "New York": 74870,
  "North Carolina": 56220,
  "North Dakota": 55800,
  "Ohio": 56530,
  "Oklahoma": 50940,
  "Oregon": 62680,
  "Pennsylvania": 58470,
  "Rhode Island": 64530,
  "South Carolina": 50650,
  "South Dakota": 49890,
  "Tennessee": 52820,
  "Texas": 57300,
  "Utah": 57360,
  "Vermont": 59190,
  "Virginia": 65590,
  "Washington": 72350,
  "West Virginia": 49170,
  "Wisconsin": 56120,
  "Wyoming": 54440,
};

const stateCostOfLiving = {
  "Alabama": 33654,
  "Alaska": 48670,
  "Arizona": 39856,
  "Arkansas": 32979,
  "California": 53171,
  "Colorado": 45931,
  "Connecticut": 46912,
  "Delaware": 44389,
  "Florida": 40512,
  "Georgia": 38747,
  "Hawaii": 55491,
  "Idaho": 37658,
  "Illinois": 41395,
  "Indiana": 36207,
  "Iowa": 35871,
  "Kansas": 35185,
  "Kentucky": 35508,
  "Louisiana": 35576,
  "Maine": 39899,
  "Maryland": 48235,
  "Massachusetts": 53860,
  "Michigan": 37111,
  "Minnesota": 41498,
  "Mississippi": 3233,
  "Missouri": 35338,
  "Montana": 37328,
  "Nebraska": 37519,
  "Nevada": 41630,
  "New Hampshire": 45575,
  "New Jersey": 49511,
  "New Mexico": 34501,
  "New York": 49623,
  "North Carolina": 36702,
  "North Dakota": 35707,
  "Ohio": 35932,
  "Oklahoma": 33966,
  "Oregon": 46193,
  "Pennsylvania": 40066,
  "Rhode Island": 44481,
  "South Carolina": 34826,
  "South Dakota": 36864,
  "Tennessee": 34742,
  "Texas": 37582,
  "Utah": 40586,
  "Vermont": 43927,
  "Virginia": 43067,
  "Washington": 47231,
  "West Virginia": 34861,
  "Wisconsin": 37374,
  "Wyoming": 37550,
};

const SalaryMetric = () => {
  const [userSalary, setUserSalary] = useState(0);
  const [selectedState, setSelectedState] = useState('Alabama');

  const handleSalaryChange = (event) => {
    setUserSalary(parseFloat(event.target.value));
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const calculatePercentageDifference = () => {
    const stateAverageSalary = stateSalaries[selectedState];
    if (stateAverageSalary) {
      const percentageDifference = ((userSalary - stateAverageSalary) / stateAverageSalary) * 100;
      return percentageDifference.toFixed(2); 
    }
    return 'N/A'; 
  };

  const selectedStateCostOfLiving = stateCostOfLiving[selectedState];

  const calculateDisposableIncome = () => {
    if (selectedStateCostOfLiving && userSalary > 0) {
      const disposableIncome = userSalary - selectedStateCostOfLiving;
      return disposableIncome.toFixed(2);
    }
    return 'N/A';
  };

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <h1>Salary Metric</h1>
      <label>
        Enter Your Salary:
        $<input type="number" value={userSalary} onChange={handleSalaryChange} />
      </label>
      <br />
      <label>
        Select Your State:
        <select value={selectedState} onChange={handleStateChange}>
          {Object.keys(stateSalaries).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </label>
      <br />
      <div>
        {userSalary > 0 && (
          <p>
            Your salary is {calculatePercentageDifference()}% {userSalary >= stateSalaries[selectedState] ? 'above' : 'below'} the average salary in {selectedState}.
            The cost of living in ${selectedState} is ${formatNumberWithCommas(selectedStateCostOfLiving)} per year.
            Based on your salary, you are likely to have ${formatNumberWithCommas(calculateDisposableIncome())} of disposable income per year.
          </p>
        )}
      </div>
    </div>
  );
};

export default SalaryMetric;
