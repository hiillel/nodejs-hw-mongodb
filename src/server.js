import express from "express";
import cors from "cors";
import pino from "pino-http";

import { env } from "./utils/env.js";

import { getAllContacts, getContactById } from "./services/contacts.js";

const PORT = Number(env("PORT", "3000"));

export const setupServer = () => {
  const app = express();
  app.use(express.json());

  //  pino and cors
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );
  // contacts

  app.get("/contacts", async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    try {
      const contact = await getContactById(contactId);

      if (!contact) {
        return res.status(404).json({
          status: 404,
          message: 'Contact not found',
        });
      }

      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (e) {
      req.log.error(e);
      res.status(500).json({
        status: 500,
        message: 'Internal server error',
      });
    }
  });

  //   error404
  app.use("*", (req, res) => {
    res.status(404).json({
      message: "Not found",
    });
  });

  // server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
};

export default setupServer;