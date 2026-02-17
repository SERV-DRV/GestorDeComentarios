export const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: login }, { username: login }],
      isActive: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Credenciales inválidas o usuario no encontrado",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Contraseña incorrecta",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login exitoso",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
};