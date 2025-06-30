require('dotenv').config();
const app = require('models/app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API a correr na porta ${PORT}`));
