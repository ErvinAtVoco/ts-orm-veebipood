import {Request, Response, Router} from "express";
import Product from "../models/product";
import Category from "../models/category";

const router: Router = Router();

router.post('/product', async (req: Request, res: Response) => {

    const categoryData = new Category({
        name: req.body.categoryName
    })

    try {
        const savedCategoryData = await categoryData.save();
        const productData = new Product({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            active: req.body.active,
            stock: req.body.stock,
            created: req.body.created,
            category: savedCategoryData._id
        })
        const savedProductData = await productData.save();
        res.json(200).json(savedProductData)
    } catch (error) {
        res.json(500).json({ message: error})
    }
})

router.get('/product', async (req: Request, res: Response) => {
    try {
        const data = await Product.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

router.get('/product/:id', async (req: Request, res: Response) => {
    try{
      const data = await Product.findById(req.params.id);
      res.json(data)
    }
    catch(error){
      res.status(500).json({message: error})
    }
  })
  
  router.delete('/product/:id', async (req: Request, res: Response) => {
    try{
      const id = req.params.id;
      await Product.findByIdAndDelete(id)
      const data = await Product.find();
      res.send(data);
    }
    catch(error){
      res.status(500).json({message: error})
    }
  })