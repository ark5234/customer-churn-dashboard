export const formatChartData = (rawData, type) => {
  switch (type) {
    case 'churnRate':
      return {
        labels: rawData.map(item => item.date),
        values: rawData.map(item => item.churnRate)
      };
    case 'customerSegment':
      return {
        labels: rawData.map(item => item.segment),
        values: rawData.map(item => item.count)
      };
    default:
      return {
        labels: [],
        values: []
      };
  }
};

export const calculateChurnRate = (churnedCustomers, totalCustomers) => {
  if (!totalCustomers) return 0;
  return (churnedCustomers / totalCustomers) * 100;
};

export const getChartColors = (count) => {
  const baseColors = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
  ];

  return Array(count).fill(0).map((_, index) => baseColors[index % baseColors.length]);
}; 