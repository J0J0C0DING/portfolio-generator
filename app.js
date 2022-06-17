const fs = require("fs");

const generatePage = require("./src/page-template");

const profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs;

fs.writeFile("index.html", generatePage(name, github), (err) => {
  if (err) throw err;

  console.log("Portfolio complete! Checkout index.html to see the output!");
});

// const printProfileData = (profileDataArgs) => {
//   // This...
//   for (let i = 0; i < profileDataArr.length; i += 1) {
//     console.log(profileDataArgs[i]);
//   }

//   console.log("================");

//   // Is the same as this...
//   profileDataArr.forEach((profileItem) => console.log(profileItem));
// };

// printProfileData(profileDataArgs);
