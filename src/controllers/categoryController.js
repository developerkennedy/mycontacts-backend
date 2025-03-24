const categoryRepository =  require("../repositories/categoryRepository");
const uuidValid = require("../libs/uuidValid");

class CategoryController {
    async  index(req, res) {
        try {
            const categories = await categoryRepository.findAll()
            res.status(200).json(categories)
        }catch (error) {
            res.status(500).json({ error: "Failed to list categories" });
        }
    }

    async store(req, res) {
        try {
            const {name} = req.body;
            if(!name){
                return res.status(400).json({error: "Missing name"});
            }
            const category = await categoryRepository.create({name})
            res.status(201).json(category);
        }catch (error) {
            res.status(500).json({ error: "Failed to create category" });
        }
    }

    async show(req, res) {
      try {
          const {id} = req.params;

          if(!uuidValid(id)){
              return res.status(400).json({error: "Missing uuid"});
          }
          const category = await categoryRepository.findById(id)

          if(!category){
              return res.status(404).json({error: "category not found"});
          }
          res.status(200).json(category)
      }catch (error) {
          res.status(500).json({ error: "Failed to show category" });
      }
    }

    async delete(req, res) {
      try {
          const {id} = req.params;

          if(!uuidValid(id)){
              return res.status(404).json({error: "Missing uuid"});
          }
          const category = await categoryRepository.delete(id)
          res.status(204).send()
      }catch (error) {
          res.status(500).json({ error: "Failed to delete category" });
      }
   }

    async update(req, res) {
       try {
           const {id} = req.params;
           const {name} = req.body;

           if(!uuidValid(id)){
               return res.status(404).json({error: "Missing uuid"});
           }
           const categoryExist = await categoryRepository.findById(id)

           if(!categoryExist){
               return res.status(404).json({error: "category not found"});
           }

           const updateCategory = await categoryRepository.update(id, {name})
           res.status(200).json(updateCategory)
       }catch (error) {
           res.status(500).json({ error: "Failed to update category" });
       }
   }
}


module.exports =  new CategoryController()
