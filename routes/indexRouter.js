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

router.use((req, res) => {
  res.status(404).render("404", {title: "Page not Found"});
});

export default router;