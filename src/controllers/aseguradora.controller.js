import { pool } from "../db.js";

export const getAseguradoras = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Aseguradoras");
    res.send(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Somethin goes wrong",
      error:error.message
    });
  }
};

export const getAseguradora = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Aseguradoras WHERE Id_aseg= ?", [
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

export const createAseguradora = async (req, res) => {
  const { Id_aseg, nom_aseg, tel_aseg, correo_aseg } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO Aseguradoras (Id_aseg, nom_aseg, tel_aseg, correo_aseg) VALUES (?, ?, ?, ?)",
      [Id_aseg, nom_aseg, tel_aseg, correo_aseg]
    );
    res.send({message: 'Se ha creado la aseguradora',
      rows: rows.affectedRows
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
      error:error.message
    });
  }
};

export const deleteAseguradora = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM Aseguradoras WHERE Id_aseg= ?", [
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

export const updateAseguradoras = async (req, res) => {
  const { id } = req.params;
  const { nom_aseg, tel_aseg, correo_aseg } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE Aseguradoras SET nom_aseg = IFNULL(?, nom_aseg), tel_aseg = IFNULL(?, tel_aseg), correo_aseg = IFNULL(?, correo_aseg) WHERE Id_aseg = ?",
      [nom_aseg, tel_aseg, correo_aseg, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Employee not found",
      });

    const [rows] = await pool.query("SELECT * FROM Aseguradoras WHERE Id_aseg = ?", [
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
