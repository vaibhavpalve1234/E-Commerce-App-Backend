const ProductModel = require('../model/Product.Model')
const {validateProductSchema} = require('../middlewares/validationSchema')

module.exports = {
    createProduct:async (req,res, next)=>{
        try {
            let user = req.user._id
            console.log(req.user)
           const {name, image, brand, category, description, reviews} = req.body;
           let response = await validateProductSchema.validate(req.body)
            const result = await ProductModel.create({
                user:user,
                name:name,
                image:image, 
                brand:brand, 
                category:category, 
                description:description
            })
            console.log(result)
            res.status(200).send(result)
        } catch (error) {
            next(error)
            res.status(404).send("Error: "+ error)
        }
    }
}