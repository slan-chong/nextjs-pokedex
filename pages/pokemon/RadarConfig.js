export const RadarOptions = {
  scale: {
    r: {
      max: 160,
      min: 0,
      ticks: {
        stepSize: 40,
        showLabelBackdrop: false,
        backdropColor: "rgba(203, 197, 11, 1)",
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        font: {
          size: 14,
        },
        pointStyle: "rect",
        usePointStyle: true,
      },
    },
  },
  font: { family: "Segoe Ui" },
};
