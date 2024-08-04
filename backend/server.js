const express=require('express');
const app=express();
const db=require('./db');
const diseases=require('./models/Disease')
const userRoutes=require('./routes/userRoutes')
const mealplannerRoute=require('./routes/mealplannerRoute')
PORT=5600;
app.use(express.json());

app.get('/cal',async(req,res)=>{
    const { Disease: diseaseName } = req.query;

  try {
    const query = diseaseName ? { Disease: diseaseName } : {};
    const disease = await diseases.find(query);
    res.status(200).json(disease);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

})
app.use('/meal',mealplannerRoute);
app.use('/user',userRoutes);
app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`)
})