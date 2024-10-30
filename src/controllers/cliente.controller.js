import { pool } from "../db.js";

export const getClientes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Clientes");
    res.send(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Somethin goes wrong",
      error:error.message
    });
  }
};

export const getCliente = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Clientes WHERE Id_cli= ?", [
      req.params.id,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({
        message: "Cliente not found",
      });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
      error:error.message
    });
  }
};

export const createCliente = async (req, res) => {
  const { Id_cli, nom_cli, apat_cli, amat_cli, sex_cli, RFC_cli, veh_cli, aseg_cli } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO Clientes (Id_cli, nom_cli, apat_cli, amat_cli, sex_cli, RFC_cli, veh_cli, aseg_cli) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [Id_cli, nom_cli, apat_cli, amat_cli, sex_cli, RFC_cli, veh_cli, aseg_cli]
    );
    res.send({message: 'Se ha creado el cliente',
      rows: rows.affectedRows
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
      error: error.message
    });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM Clientes WHERE Id_cli= ?", [
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

export const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nom_cli, apat_cli, amat_cli, veh_cli, aseg_cli } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE Clientes SET nom_cli = IFNULL(?, nom_cli), apat_cli = IFNULL(?, apat_cli), amat_cli = IFNULL(?, amat_cli), veh_cli = IFNULL(?, veh_cli), aseg_cli = IFNULL(?, aseg_cli) WHERE Id_cli = ?",
      [nom_cli, apat_cli, amat_cli, veh_cli, aseg_cli, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Employee not found",
      });

    const [rows] = await pool.query("SELECT * FROM Clientes WHERE Id_cli = ?", [
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
