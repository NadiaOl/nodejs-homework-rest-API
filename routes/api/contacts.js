import express from "express";
import contactControllers from "../../controllers/contact-controller.js";
import contactsSchemas from "../../schemas/contacts-schemas.js";

import {validateBody, isValidId} from "../../decorators/index.js";
import authenticate from "../../helpers/authenticate.js";

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get('/', contactControllers.getAll)

contactsRouter.get('/:id', isValidId, contactControllers.getById)

contactsRouter.post('/', validateBody(contactsSchemas.contactsAddSchema), contactControllers.add)

contactsRouter.delete('/:id', isValidId, contactControllers.deleteById)

contactsRouter.put('/:id', isValidId, validateBody(contactsSchemas.contactsAddSchema), contactControllers.updateById)

contactsRouter.patch('/:id/favorite', isValidId, validateBody(contactsSchemas.updateFavoriteSchema), contactControllers.updateStatusContact)

export default contactsRouter;