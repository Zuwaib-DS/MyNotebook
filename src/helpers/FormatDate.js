const DateFormatter = {
  // Formats a string date to "dd-MM-yyyy" format
  formatDate: (date) => {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  },
};

export default DateFormatter;
