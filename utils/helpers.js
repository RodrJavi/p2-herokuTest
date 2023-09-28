// Helper function to set date in correct format on posts
function displayDate(inputDate){
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(inputDate).toLocaleDateString(undefined, options);
}

module.exports = { displayDate };
