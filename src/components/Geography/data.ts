export const strTheme=(colors: any) => ({
  axis: {
    domain: {
      line: {
        stroke: colors.grey[100],
      },
    },
    legend: {
      text: {
        fill: colors.grey[100],
      },
    },
    ticks: {
      line: {
        stroke: colors.grey[100],
        strokeWidth: 1,
      },
      text: {
        fill: colors.grey[100],
      },
    },
  },
  legends: {
    text: {
      fill: colors.grey[100],
    },
  },
});
