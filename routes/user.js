const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

router.post("/add-user", async (req, res) => {
  const { email, password, fullName, role } = req.body;

  try {
    const { data: user, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
      user_metadata: { fullname: fullName, user_role: role, email: email },
    });
    if (error) {
      res.status(500).send({ status: "failed", message: error });
    } else {
      res.status(200).send({ status: "success", message: user });
    }
  } catch (error) {
    res.status(500).send({ status: "failed", message: error });
  }
});

router.post("/delete-user", async (req, res) => {
  const { id } = req.body;

  try {
    const { data: user, error } = await supabase.auth.admin.deleteUser(id);
    if (error) {
      res.status(500).json({ message: error });
    } else {
      res.status(200).json({ message: user });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
