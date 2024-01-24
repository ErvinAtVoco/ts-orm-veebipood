import { Request, Response, Router } from "express";
import User from "../models/user";
import Contact from "../models/contact";

const router: Router = Router();

router.post('/user', async (req: Request, res: Response) => {

  const contact = new Contact({
    address: req.body.contact.address,
    phone: req.body.contact.phone,
    email: req.body.contact.email,
  })

  try {
    contact.save(async (err, savedContact) => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        personalCode: req.body.personalCode,
        password: req.body.password,
        admin: req.body.admin,
        created: req.body.created,
        contact: savedContact._id
      })
      const userToSave = await user.save();
      res.status(200).json(userToSave);
    });

    
  }
  catch (error) {
    res.status(400).json({message: error})
  }
});
  router.get('/user', async (req: Request, res: Response) => {
    try{
      const data = await User.find().populate("contact");
      res.json(data)
    }
    catch(error){
      res.status(500).json({message: error})
    }
});

    router.get('/user/:id', async (req: Request, res: Response) => {
        try{
          const data = await User.findById(req.params.id).populate("contact");
          res.json(data)
        }
        catch(error){
          res.status(500).json({message: error})
        }

    router.delete('/user/:id', async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            await User.findByIdAndDelete(id);
            const data = await User.find();
            res.send(data);
        }
        catch(error){
            res.status(500).json({message: error})
        }
    })
});

    router.put('/user/:id', async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
          
            const user = await User.findById(id);
            const contactId = user?.contact;
          
            const updatedContact = {
                address: req.body.contact.address,
                phone: req.body.contact.phone,
                email: req.body.contact.email
            };
          
            await Contact.findByIdAndUpdate(
                contactId, updatedContact
            )
          
            const updatedUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                personalCode: req.body.personalCode,
                password: req.body.password,
                admin: req.body.admin,
                created: req.body.created,
                contact: contactId
            }
          
            const options = { new: true };  
          
            const result = await User.findByIdAndUpdate(
                id, updatedUser, options
            ).populate("contact")
          
            res.send(result)
        }
        catch(error){
            res.status(500).json({message: error})
        }
    })    

export default router;