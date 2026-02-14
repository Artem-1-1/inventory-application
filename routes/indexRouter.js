import { Router } from "express";

const router = Router();

router.route("/").get((req, res) => {
  res.render("index", { title: "Homepage" });
});

router.route("/about").get((req, res) => {
  res.render("about", { title: "About" });
});

router.route("/contact").get((req, res) => {
  res.render("contact", { title: "Contact" });
});

export default router;