import React, { useState } from 'react';

const DatePicker = ({ dateValue, onChange }) => {
  const currentYear = new Date().getFullYear();
  const startYear = 1990;
  const endYear = currentYear + 10;

  const years = [];

  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [includeStartDate, setIncludeStartDate] = useState(false);
  const [includeEndDate, setIncludeEndDate] = useState(false);
  const [startYearValue, setStartYearValue] = useState('');
  const [startMonthValue, setStartMonthValue] = useState('');
  const [endYearValue, setEndYearValue] = useState('');
  const [endMonthValue, setEndMonthValue] = useState('');

  const handleStartDateChange = (value) => {
    setIncludeStartDate(value);
    if (!value) {
      setStartYearValue('');
      setStartMonthValue('');
    }
  };

  const handleEndDateChange = (value) => {
    setIncludeEndDate(value);
    if (!value) {
      setEndYearValue('');
      setEndMonthValue('');
    }
  };

  const handleStartYearChange = (year) => {
    setStartYearValue(year);
    onChange({ ...dateValue, year: year, month: startMonthValue });
  };

  const handleStartMonthChange = (month) => {
    setStartMonthValue(month);
    onChange({ ...dateValue, year: startYearValue, month: month });
  };

  const handleEndYearChange = (year) => {
    setEndYearValue(year);
    onChange({ ...dateValue, endYear: year, endMonth: endMonthValue });
  };

  const handleEndMonthChange = (month) => {
    setEndMonthValue(month);
    onChange({ ...dateValue, endYear: endYearValue, endMonth: month });
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={includeStartDate}
          onChange={(e) => handleStartDateChange(e.target.checked)}
        />
        Include Start Date
      </label>

      <label>
        <input
          type="checkbox"
          checked={includeEndDate}
          onChange={(e) => handleEndDateChange(e.target.checked)}
        />
        Include End Date
      </label>

      {includeStartDate && (
        <>
          <select
            name="startYear"
            value={startYearValue}
            onChange={(e) => handleStartYearChange(e.target.value)}
          >
            <option value="">Select Year</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            name="startMonth"
            value={startMonthValue}
            onChange={(e) => handleStartMonthChange(e.target.value)}
          >
            <option value="">Select Month</option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </>
      )}

      {includeEndDate && (
        <>
          <select
            name="endYear"
            value={endYearValue}
            onChange={(e) => handleEndYearChange(e.target.value)}
          >
            <option value="">Select Year</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            name="endMonth"
            value={endMonthValue}
            onChange={(e) => handleEndMonthChange(e.target.value)}
          >
            <option value="">Select Month</option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
};

export default DatePicker;
