export const getRewards = (amount) => {
  if (amount <= 50) return 0;
  if (amount > 100) return 50 + 2 * (amount - 100);
  return amount - 50;
};

export const sortData = (data = [], sortBy, order) => {
  const result = data.sort((d1, d2) => {
    switch (sortBy) {
      case "name":
        return order === "asc"
          ? d1.name.toLowerCase() > d2.name.toLowerCase()
            ? 1
            : d1.name.toLowerCase() == d2.name.toLowerCase()
            ? 0
            : -1
          : d2.name.toLowerCase() > d1.name.toLowerCase()
          ? 1
          : d2.name.toLowerCase() == d1.name.toLowerCase()
          ? 0
          : -1;
      case "amount":
        return order === "asc" ? d1.amount - d2.amount : d2.amount - d1.amount;
      case "date":
        const date1 = new Date(d1.date);
        const date2 = new Date(d2.date);
        return order === "asc" ? date1 - date2 : date2 - date1;
      case "rewards":
        const reward1 = getRewards(d1.amount);
        const reward2 = getRewards(d2.amount);
        return order === "asc" ? reward1 - reward2 : reward2 - reward1;
      default:
        return 0;
    }
  });
  return result;
};

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getRewardsByMonthData = (data) => {
  const months = [];
  let result = {};
  const sortedData = sortData(data, "date", "desc");
  sortedData.forEach((d) => {
    let date = new Date(d.date);
    let month = `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
    if (months.indexOf(month) == -1) {
      months.push(month);
    }
    result = {
      ...result,
      [d.name]: {
        ...(result[d.name] || {}),
        [month]: ((result[d.name] || {})[month] || []).concat(d),
      },
    };
  });
  return { months, data: result };
};

export const getTotalRewards = (data = []) => {
  return data.reduce((acc, d) => acc + getRewards(d.amount), 0);
};
