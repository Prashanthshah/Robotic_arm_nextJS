// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

let initialPosition = {
  base: 90,
  shoulder: 0,
  elbow: 60,
  grip: 180,
};

export default function handler(req, res) {
  //
  // console.log("backend", initialPosition);
  if (req.query.base) {
    initialPosition.base = req.query.base;
    initialPosition.shoulder = req.query.shoulder;
    initialPosition.elbow = req.query.elbow;
    initialPosition.grip = req.query.grip;
  }

  res.status(200).json({ ...initialPosition });
}
