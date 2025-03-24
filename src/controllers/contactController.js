const contactRepository = require("../repositories/contactRepository");
const uuidValid = require('../libs/uuidValid');
const isValidEmail = require('../libs/isValidEmail');

class contactController {
    async index(req, res) {
       try {
           const {orderBy} = req.query;
           const contacts = await contactRepository.findAll(orderBy)
           res.status(200).json(contacts)
       }catch (error) {
           res.status(500).json({error: "Erro ao buscar contatos"})
       }
    }

    async store(req, res) {
        try {
            const {name,email,phone,categoryId} = req.body;

            if(!name.length || !email.length){
                return res.status(400).json({error: "Please enter a valid name or email"})
            }

            if(!isValidEmail(email)){
                return res.status(400).json({error: "Please enter a valid email"})
            }


            const contactExist = await contactRepository.findByEmail(email);

            if (contactExist) {
                return  res.status(404).json({error:"Contact already exists"});
            }
            const contact = await contactRepository.create({name,email,phone,categoryId})
            res.status(204).json(contact)
        }catch (error) {
         res.status(500).json({error: "Failed to created contact"})
        }
    }

    async show(req, res) {
       try {
           const {id} = req.params;

           if(!uuidValid(id)){
               return res.status(400).json({error:"No id match"});
           }
           const contact = await contactRepository.findById(id)

           if(!contact){
               return res.status(404).json({error: 'No contact'})
           }

           res.status(200).json(contact)
       }catch (error) {

       }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const {name,phone,email,categoryId} = req.body;

            if(!uuidValid(id)){
                return res.status(400).json({error:"Please enter a valid uuid"})
            }

            const contact = await contactRepository.findById(id)

            if(!contact){
                return res.status(404).json({error:"Contact not found"})
            }

            if(contact && contact.id !== id){
                return res.status(400).json({error:"Contact with ID"})
            }

            const newContact = await contactRepository.update(id,{name,phone,email,categoryId})

            res.status(200).json(newContact)
        }catch (error) {
            res.status(500).json({error: "Failed to update contact"})
        }




    }

    async delete(req, res) {
        try {
            const {id} = req.params;

            if(!uuidValid(id)){
                return res.status(400).json({error: "Missing uuid"});
            }

            const contact = await contactRepository.delete(id)

            res.status(204).send()
        }catch (error) {
            res.status(500).json({error: "Failed to delete contact"})
        }
    }

}

module.exports = new contactController();
