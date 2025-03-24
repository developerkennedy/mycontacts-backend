const  {Router} = require("express");
const categoryController = require("../controllers/categoryController");
const contactController = require("../controllers/contactController");
const routes = Router();

routes.get('/category', categoryController.index);
routes.get('/category/:id', categoryController.show);
routes.post('/category', categoryController.store);
routes.delete('/category/:id', categoryController.delete);
routes.put('/category/:id', categoryController.update);

//contacts
routes.get('/contacts', contactController.index);
routes.post('/contacts', contactController.store);
routes.get('/contacts/:id', contactController.show);
routes.put('/contacts/:id', contactController.update);
routes.delete('/contacts/:id', contactController.delete);

module.exports = routes;
