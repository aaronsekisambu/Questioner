const app = require('./js/app');

// port listening automatically
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening at port ${port}....`));