import React, { Component } from 'react';
import './css/salary.css';
class SalaryCalculator extends Component {
  constructor(props) {
    super(props);
    this.salaryInputRef = React.createRef();
    this.state = {
      salaryAmount: '',
      frequency: '',
      hoursPerWeek: 40,
      overtimeHoursPerWeek: 0,
      includeStateTax: false,
      stateTaxRate: 5,
      takeHomePay: undefined,
      annualSalary: undefined,
    };
  }

handleSalaryChange = (e) => {
  const inputSalary = e.target.value.replace(/[^0-9.,]/g, '');
  const formattedSalary = this.formatSalary(inputSalary);

  this.setState({ salaryAmount: formattedSalary });
}

formatSalary = (input) => {
  let salary = input.replace(/[^0-9.]/g, '');
  return salary;
}

  handleFrequencyChange = (e) => {
    const newFrequency = e.target.value;
    this.setState({ frequency: newFrequency });
  }

  handleHoursPerWeekChange = (e) => {
    const hoursPerWeek = parseFloat(e.target.value);
    this.setState({ hoursPerWeek });
  }

  handleOvertimeHoursChange = (e) => {
    const overtimeHoursPerWeek = parseFloat(e.target.value);
    this.setState({ overtimeHoursPerWeek });
  }

  handleIncludeStateTaxChange = (e) => {
    const includeStateTax = e.target.checked;
    this.setState({ includeStateTax });
  }

  handleStateTaxRateChange = (e) => {
    const stateTaxRate = parseFloat(e.target.value);
    this.setState({ stateTaxRate });
  }

  calculateTaxes = (annualSalary) => {
    const { includeStateTax, stateTaxRate } = this.state;

    const federalTaxBrackets = [
      { min: 0, max: 11000, rate: 0.10 },
      { min: 11000, max: 44725, rate: 0.12 },
      { min: 44725, max: 95375, rate: 0.22 },
      { min: 95375, max: 182100, rate: 0.24 },
      { min: 182100, max: 231250, rate: 0.32 },
      { min: 231250, max: 578125, rate: 0.35 },
      { min: 578125, max: Infinity, rate: 0.37 },
    ];

    let federalTax = 0;
    for (const bracket of federalTaxBrackets) {
      if (annualSalary >= bracket.min) {
        const taxableIncomeInBracket = Math.min(annualSalary, bracket.max) - bracket.min;
        federalTax += taxableIncomeInBracket * bracket.rate;
      } else {
        break;
      }
    }

    let stateTax = 0;
    if (includeStateTax) {
      stateTax = (annualSalary * stateTaxRate) / 100;
    }

    return federalTax + stateTax;
  }

  handleCalculate = () => {
    const { salaryAmount, frequency, hoursPerWeek, overtimeHoursPerWeek } = this.state;

    if (!salaryAmount || isNaN(parseFloat(salaryAmount)) || frequency === '') {
      alert("Please enter a valid salary amount and frequency.");
      return; 
    }

    let annualSalary = 0;

    switch (frequency) {
      case 'hourly':
        annualSalary = (parseFloat(salaryAmount) * hoursPerWeek * 52) + (parseFloat(salaryAmount) * overtimeHoursPerWeek * 52 * 1.5);
        break;
      case 'bi-weekly':
        annualSalary = parseFloat(salaryAmount) * 26;
        break;
      case 'monthly':
        annualSalary = parseFloat(salaryAmount) * 12;
        break;
      case 'yearly':
        annualSalary = parseFloat(salaryAmount);
        break;
      default:
        break;
    }

    const totalTax = this.calculateTaxes(annualSalary);
    const takeHomePay = annualSalary - totalTax;

    this.setState({
      takeHomePay: takeHomePay.toFixed(2),
      annualSalary: annualSalary.toFixed(2),
    });
  }

  handleReset = () => {
    this.setState({
      salaryAmount: '',
      frequency: '',
      hoursPerWeek: 40,
      overtimeHoursPerWeek: 0,
      includeStateTax: false,
      stateTaxRate: 5,
      takeHomePay: undefined,
      annualSalary: undefined,
    });
    this.salaryInputRef.current.focus();
  }

  formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    const { salaryAmount, frequency, takeHomePay, annualSalary, hoursPerWeek, overtimeHoursPerWeek, includeStateTax, stateTaxRate } = this.state;

    return (
      <div>
        <h1>Salary Calculator</h1>
        <div>
          <label>
            Salary:
            <input
              type="text"
              placeholder="$0"
              value={`$${salaryAmount}`}
              onChange={this.handleSalaryChange}
              ref={this.salaryInputRef}
            />
          </label>
        </div>
        <div>
          <label>
          Frequency:
          <select value={frequency} onChange={this.handleFrequencyChange}>
            <option value="" disabled>Select Frequency</option>
            <option value="hourly">Hourly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          </label>
        </div>
        {frequency === 'hourly' && (
          <div>
            <label>
              Hours Per Week:
              <input type="number" value={hoursPerWeek} onChange={this.handleHoursPerWeekChange} />
            </label>
            <label>
              Overtime Hours Per Week:
              <input type="number" value={overtimeHoursPerWeek} onChange={this.handleOvertimeHoursChange} />
            </label>
          </div>
        )}
        <div>
          <label>
            Include State Income Tax:
            <input type="checkbox" checked={includeStateTax} onChange={this.handleIncludeStateTaxChange} />
          </label>
          {includeStateTax && (
            <div>
              <label>
                State Tax Rate:
                <input type="number" step="0.01" value={stateTaxRate} onChange={this.handleStateTaxRateChange} />
              </label>
            </div>
          )}
        </div>
        <div>
          <button onClick={this.handleCalculate}>Calculate</button>
          <button onClick={this.handleReset}>Reset</button>
        </div>
        <div>
          <h2>Take-Home Pay Information</h2>
          <ul>
            <li>Salary: ${annualSalary ? this.formatNumberWithCommas(annualSalary) : 0}</li>
            <li>Take-Home Pay (Yearly): ${takeHomePay ? this.formatNumberWithCommas(takeHomePay) : 0}</li>
            <li>Take-Home Pay (Monthly): ${takeHomePay ? this.formatNumberWithCommas((takeHomePay / 12).toFixed(2)) : 0}</li>
            <li>Take-Home Pay (Bi-Weekly): ${takeHomePay ? this.formatNumberWithCommas((takeHomePay / 26).toFixed(2)) : 0}</li>
            <li>Take-Home Pay (Weekly): ${takeHomePay ? this.formatNumberWithCommas((takeHomePay / 52).toFixed(2)) : 0}</li>
            <li>Take-Home Pay (Hourly): ${takeHomePay ? this.formatNumberWithCommas((takeHomePay / (hoursPerWeek * 52)).toFixed(2)) : 0}</li>
            {includeStateTax && <li>State Income Tax: ${annualSalary ? this.formatNumberWithCommas((annualSalary * stateTaxRate / 100).toFixed(2)) : 0}</li>}
          </ul>
        </div>
      </div>
    );
  }
}

export default SalaryCalculator;