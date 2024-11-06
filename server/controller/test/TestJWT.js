const bcrypt = require("bcrypt");

const UserModel = require("../../model/user");
const LRNModel = require("../../model/lrn");

exports.LoginHTML = (req, res, next) => {
  res.send(`
    <form action="/test/jwt-login" method="POST">
      <label for="lrn">LRN:</label>
      <input type="text" id="text" name="lrn" required />
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required />
      <button type="submit">Login</button>
    </form>
  `);
};

exports.Success = (req, res, next) => {
  res.send(`
      <h1>It works!</h1>
      <p>Welcome, ${req.session.user.username}</p>
      <a href="/test/logout">Logout</a>
    `);
};


exports.TestLoginPost = async (req, res, next) => {
  const { lrn, password } = req.body;
  console.log("Login attempt:", { lrn, password });

  try {
    // Step 1: Find user by LRN
    const user = await UserModel.findOne({
      where: {
        acc_lrn: lrn,
      },
    });

    if (user) {
      // Step 2: Compare entered password with hashed password
      const passwordMatch = await bcrypt.compare(password, user.password); // Compare with hashed password

      if (passwordMatch) {
        // Step 3: If password matches, retrieve LRN model and role
        const lrnModel = await LRNModel.findOne({
          where: {
            valid_lrn: user.acc_lrn,
          },
        });

        if (lrnModel) {
          const role = lrnModel.role;

          // Set user and role data in session
          req.session.user = {
            id: user.id,
            lrn: user.acc_lrn,
            role: role,
          };

          req.session.save((err) => {
            if (err) {
              console.error("Error saving session:", err);
              return res.status(500).json({ error: "Internal Server Error" });
            }

            console.log("User role:", role);
            console.log("Session ID:", req.sessionID);
            console.log("Session expires at:", req.session.cookie.expires);

            // Return session ID and user role
            res.status(200).json({
              sessionId: req.sessionID,
              role: role,
              sessionExpires: req.session.cookie.expires, // Optional: Send session expiry
            });
          });
        } else {
          console.log("Login failed: LRN model not found");
          res.status(401).json({ error: "Invalid LRN or password" });
        }
      } else {
        console.log("Login failed: Invalid password");
        res.status(401).json({ error: "Invalid LRN or password" });
      }
    } else {
      console.log("Login failed: Invalid LRN");
      res.status(401).json({ error: "Invalid LRN or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.Logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.redirect("/test/jwtform");
  });
};

exports.AuthMiddleware = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/test/jwtform");
  }
};
