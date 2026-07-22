const connection = require("../db/connection");

const getSchedules = (req, res) => {
  const tripId = req.query.trip_id;
  if(tripId){
    connection.query(
      `SELECT * FROM schedules WHERE trip_id = ?`,
      [tripId],
      (err, results) => {
        if (err) {
          return res.status(500).json(err);
        }
        res.json(results);
      }
    );
  }else{
    connection.query(
      "SELECT * FROM schedules",
      (err, results) => {
        if (err) {
          return res.status(500).json(err);
        }
        res.json(results);
      }
    );
  }
};

const createSchedule = (req, res) => {
  const {
    trip_id,
    day,
    time,
    place,
    title,
    memo,
  } = req.body;

  const sql = `
    INSERT INTO schedules
    (trip_id, day, time, place, title, memo)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [
      trip_id,
      day,
      time,
      place,
      title,
      memo,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({
        message: "スケジュール登録成功",
      });
    }
  );
};

const deleteSchedule = (req, res) => {
  const id =req.params.id;
  const sql = `
    DELETE FROM schedules
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

const updateSchedule = (req, res) => {
  const id =req.params.id;
  const {
    day,
    time,
    place,
    title,
    memo,
  } = req.body;

  const sql = `
    UPDATE schedules
    SET
    day = ?,
    time = ?,
    place = ?,
    title = ?,
    memo = ?
    WHERE id = ?
  `;

  connection.query(
    sql,
    [
      day,
      time,
      place,
      title,
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
    getSchedules,
    createSchedule,
    deleteSchedule,
    updateSchedule
  };
