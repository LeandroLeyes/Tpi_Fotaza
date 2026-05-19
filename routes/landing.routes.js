import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("landing/index", {
    title: "Fotaza",
  });
});

export default router;
