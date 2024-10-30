import { pool } from "../db.js";

export const getVehiculos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Vehiculos");
    res.send(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Somethin goes wrong",
      error:error.message
    });
  }
};

export const getVehiculo = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Vehiculos WHERE Id_veh= ?", [
      req.params.id,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({
        message: "Aseguradora not found",
      });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
      error:error.message
    });
  }
};

export const createVehiculo = async (req, res) => {
  const { Id_veh, mod_veh, marca_veh, año_veh, peso_veh, color_veh, fecha_ing, status_veh } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO Vehiculos (Id_veh, mod_veh, marca_veh, año_veh, peso_veh, color_veh, fecha_ing, status_veh) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [Id_veh, mod_veh, marca_veh, año_veh, peso_veh, color_veh, fecha_ing, status_veh]
    );
    res.send({message: 'Se ha creado el Vehiculo',
      rows: rows.affectedRows
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
      error: error.message
    });
  }
};

export const deleteVehiculo = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM Vehiculos WHERE Id_veh= ?", [
      req.params.id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Aseguradoras not found",
      });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
      error:error.message
    });
  }
};

export const updateVehiculo = async (req, res) => {
  const { id } = req.params;
  const { mod_veh, marca_veh, año_veh, peso_veh, color_veh, fecha_ing, status_veh } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE Vehiculos SET mod_veh = IFNULL(?, mod_veh), marca_veh = IFNULL(?, marca_veh), año_veh = IFNULL(?, año_veh), peso_veh = IFNULL(?, peso_veh), color_veh = IFNULL(?, color_veh), fecha_ing = IFNULL(?, fecha_ing), status_veh = IFNULL(?, status_veh) WHERE Id_veh = ?",
      [mod_veh, marca_veh, año_veh, peso_veh, color_veh, fecha_ing, status_veh, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Employee not found",
      });

    const [rows] = await pool.query("SELECT * FROM Vehiculos WHERE Id_veh = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
      error: error.message
    });
  }
};
