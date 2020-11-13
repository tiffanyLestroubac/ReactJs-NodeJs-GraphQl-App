var pgtools = require("pgtools");
const config = {
  user: "postgres",
  host: "localhost",
  password: "Super76$",
  port: 5432
};

pgtools.createdb(config, "some_db", function(err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});