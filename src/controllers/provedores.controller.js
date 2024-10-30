import { pool } from "../db.js";

export const getProveedores = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Proveedores");
    res.send(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Somethin goes wrong",
      error:error.message
    });
  }
};

export const getProveedor = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Proveedores WHERE Id_prov= ?", [
      req.params.id,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({
        message: "Proveedor not found",
      });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
      error:error.message
    });
  }
};

export const createProveedor = async (req, res) => {
  const { Id_prov, nom_prov, tel_prov, correo_prov, stock_prov } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO Proveedores (Id_prov, nom_prov, tel_prov, correo_prov, stock_prov) VALUES (?, ?, ?, ?, ?)",
      [Id_prov, nom_prov, tel_prov, correo_prov, stock_prov]
    );
    res.send({message: 'Se ha creado el provedor',
      rows: rows.affectedRows
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
      error: error.message
    });
  }
};

export const deleteProvedor = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM Proveedores WHERE Id_prov= ?", [
      req.params.id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Provedor not found",
      });

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something goes wrong",
      error:error.message
    });
  }
};

export const updateProvedor = async (req, res) => {
  const { id } = req.params;
  const { nom_prov, tel_prov, correo_prov, stock_prov } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE Proveedores SET nom_prov = IFNULL(?, nom_prov), tel_prov = IFNULL(?, tel_prov), correo_prov = IFNULL(?, correo_prov), stock_prov= IFNULL(?, stock_prov) WHERE Id_prov = ?",
      [nom_prov, tel_prov, correo_prov, stock_prov, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Provedor not found",
      });

    const [rows] = await pool.query("SELECT * FROM Proveedores WHERE Id_prov = ?", [
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
