const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  try {
    const messagesFile = path.join(__dirname, 'messages.json');
    let messages = [];

    try {
      const data = await fs.readFile(messagesFile, 'utf8');
      if (data) {
        messages = JSON.parse(data);
      }
    } catch (err) {
      // File doesn't exist, we will create it
    }

    const emailExists = messages.some(msg => msg.email === email);
    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists. Please use a different email.' });
    }

    messages.push({
      name,
      email,
      message,
      date: new Date().toISOString()
    });

    await fs.writeFile(messagesFile, JSON.stringify(messages, null, 2));
    return res.status(200).json({ success: true, message: 'Submitted successfully! Thank you for contacting us.' });

  } catch (error) {
    console.error('Error saving contact submission:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
