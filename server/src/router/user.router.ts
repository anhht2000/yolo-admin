import { Router } from "express";

const router = Router();

router.get('/a',(req,res)=>{
  res.send('ahihi');
})

export default router;
