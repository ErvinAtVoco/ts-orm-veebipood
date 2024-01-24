import { Request, Response, Router } from "express";
import Order from "../models/order";
import Products from "../models/cartProduct";
import order from "../models/order";

const router: Router = Router();

router.post('/order', async (req: Request, res: Response) => {
    const productsData = new Products({
        product: req.body.product,
        quantity: req.body.quantity
    })
    
    try {
        productsData.save(async (err, savedProductsData) => {
            const order = new Order({
                paid: req.body.header,
                total: req.body.content,
                created: req.body.created,
                orderer: req.body.ordered,
                products: savedProductsData._id
            })
            const orderToSave = await order.save();
            res.status(200).json(orderToSave);
        });
    }
        catch (error) {
        res.status(400).json({message: error})
    }

})

router.get('/order', async (req: Request, res: Response) => {
    try{
        const data = await Order.find().populate("productsData");
        res.json(data)
      }
      catch(error){
        res.status(500).json({message: error})
      }
})

router.get('/order/:id', async (req: Request, res: Response) => {
    try{
        const data = await Order.findById(req.params.id).populate("productsData");
        res.json(data)
      }
      catch(error){
        res.status(500).json({message: error})
      }
})

router.delete('/order/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        await Order.findByIdAndDelete(id);
        const data = await Order.find();
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

router.put('/order/:id', async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
      
        const order = await Order.findById(id);
        const productsId = order?.products;
      
        const updatedProducts = {
            product: req.body.product,
            quantity: req.body.quantity
        };
      
        await Products.findByIdAndUpdate(
            ProductsId, updatedProducts
        )
      
        const updatedOrder = {
            paid: req.body.header,
                total: req.body.content,
                created: req.body.created,
                orderer: req.body.ordered,
                products: product._id
        }
      
        const options = { new: true };  
      
        const result = await Order.findByIdAndUpdate(
            id, updatedOrder, options
        ).populate("products")
      
        res.send(result)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})

export default router;