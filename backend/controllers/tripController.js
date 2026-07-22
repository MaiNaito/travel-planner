const connection = require("../db/connection");

const getTrips = (req, res) => {
  connection.query(
    "SELECT * FROM trips",
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json(results);
    }
  );
};

const createTrip = (req, res) => {
  const {
    title,
    destination,
    start_date,
    end_date,
    memo
  } = req.body;

  const sql = `
    INSERT INTO trips
    (title, destination, start_date, end_date, memo)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [
      title,
      destination,
      start_date,
      end_date,
      memo,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({
        message: "登録成功",
      });
    }
  );
};

const getTripById = (req, res) => {
  const id = req.params.id;

  const sql = `
    SELECT *
    FROM trips
    WHERE id = ?
  `;

  connection.query(
    sql,
    [id],
    (err,results)=>{
      if (err) {
        return res.status(500).json(err);
      }
      res.json(results[0]);
    }
  );
};

const deleteTrip = (req, res) => {
  const id =req.params.id;
  const sql = `
    DELETE FROM trips
    WHERE id = ?
  `;
  connection.query(
    sql,
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({
        message: "削除成功",
      });
    }
  );
};

const updateTrip = (req, res) => {
  const id =req.params.id;
  const {
    title,
    destination,
    start_date,
    end_date,
    memo,
  } = req.body;

  const sql = `
    UPDATE trips
    SET
    title = ?,
    destination = ?,
    start_date = ?,
    end_date = ?,
    memo = ?
    WHERE id = ?
  `;

  connection.query(
    sql,
    [
      title,
      destination,
      start_date,
      end_date,
      memo,
      id
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({
        message: "更新成功",
      });
    }
  );
};

module.exports = {
  getTrips,
  createTrip,
  getTripById,
  deleteTrip,
  updateTrip
};

