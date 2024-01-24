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
    
})

router.get('/order/:id', async (req: Request, res: Response) => {
    
})

router.delete('/order/:id', async (req: Request, res: Response) => {
  
})

router.put('/order/:id', async (req: Request, res: Response) => {
    
})

export default router;