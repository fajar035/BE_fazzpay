const success = (res, status, data) => res.status(status).json(data);
const error = (res, status, data) => {
  console.error(data);
  res.status(status).json({ message: data.message });
};

module.exports = { success, error };
