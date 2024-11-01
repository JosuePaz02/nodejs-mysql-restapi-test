import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Trabajadores");
    res.send(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Somethin goes wrong",
      error:error.message
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Trabajadores WHERE Id_trab= ?", [
      req.params.id,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({
        message: "Employee not found",
      });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
      error:error.message
    });
  }
};

export const createEmployees = async (req, res) => {
  const { Id_trab, nom_tra, apat_trab, amat_trab, sex_trab, nom_puesto } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO Trabajadores (Id_trab, nom_tra, apat_trab, amat_trab, sex_trab, nom_puesto) VALUES (?, ?, ?, ?, ?, ?)",
      [Id_trab, nom_tra, apat_trab, amat_trab, sex_trab, nom_puesto]
    );
    res.send({message: 'Se ha creado el trabajador',
      rows: rows.affectedRows
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
      error:error.message
    });
  }
};

export const deleteEmployees = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM Trabajadores WHERE Id_trab= ?", [
      req.params.id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Employee not found",
      });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
      error:error.message
    });
  }
};

export const updateEmployees = async (req, res) => {
  const { id } = req.params;
  const { nom_tra, apat_trab, amat_trab, nom_puesto } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE Trabajadores SET nom_tra = IFNULL(?, nom_tra), apat_trab = IFNULL(?, apat_trab), amat_trab = IFNULL(?, amat_trab), nom_puesto = IFNULL(?, nom_puesto) WHERE Id_trab = ?",
      [nom_tra, apat_trab, amat_trab, nom_puesto, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Employee not found",
      });

    const [rows] = await pool.query("SELECT * FROM employees WHERE Id_trab = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
      error:error.message
    });
  }
};
