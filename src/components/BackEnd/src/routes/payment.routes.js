import { Router } from "express";
import { createSession } from "../controllers/payment.controllers.js";

const router = Router();

router.get("/create-checkout-session", createSession);
router.get("/payment", (req, res) => {
  res.redirect("http://localhost:5173/payment");
});

router.get("/cancel", (req, res) => res.send("cancel"));

export default router;
