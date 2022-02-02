import { connect_db, insertDocument } from '../../helpers/db-util';

async function handler(req, res) {
  //  database credentials

  /* -------------------------------------------------------------------------- */
  if (req.method === 'POST') {
    const { email, name, message } = req.body;
    /* ------------------------------- validation ------------------------------- */
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.tirm === '' ||
      !message ||
      message.trim === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
    }
    /* ----------------------------- message object ----------------------------- */
    const newMessage = {
      email,
      name,
      message,
    };
    /* ----------------------------- connect with db ---------------------------- */
    let client;
    try {
      client = await connect_db();  
    } catch (err) {
      res.status(500).json({ message: 'Conneting to the database failed ⚠' });
      return;
    }
    /* ----------------------------- insert document ---------------------------- */
    try {
      await insertDocument(client, 'messages', newMessage);
    } catch (err) {
      res.status(500).json({ message: 'Failed to insert document ❗' });
      return;
    }

    /* ---------------------------- send success response ---------------------------- */
    res
      .status(201)
      .json({ messsage: 'Successufly Stored Message!', message: newMessage });
  }
}
export default handler;
