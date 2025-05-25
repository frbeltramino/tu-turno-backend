const formatAmount = (amount) => {
  return '$' + amount.toLocaleString('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
};

module.exports = {
  formatAmount
}