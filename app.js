const inquirer = require('inquirer');

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      },
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter Github username!');
          return false;
        }
      },
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true,
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      },
    },
  ]);
};

const promptProject = portfolioData => {
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  console.log(`
  ================
  Add a New Project
  ================`);
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project',
        validate: projectNameInput => {
          if (projectNameInput) {
            return true;
          } else {
            console.log('Please enter project name!');
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: projectDescriptionInput => {
          if (projectDescriptionInput) {
            return true;
          } else {
            console.log('Please enter a description of project!');
            return false;
          }
        },
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node'],
      },
      {
        type: 'input',
        name: 'feature',
        message: 'Enter the GitHub link to your proeject (Required)',
        validate: githubLinkInput => {
          if (githubLinkInput) {
            return true;
          } else {
            console.log('Please add GitHub link!');
            return false;
          }
        },
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false,
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false,
      },
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};
promptUser()
  .then(promptProject)
  .then(portfolioData => console.log(portfolioData));

// const pageHTML = generatePage(name, github);

// fs.writeFile("index.html", pageHTML, (err) => {
//   if (err) throw err;

//   console.log("Portfolio complete! Checkout index.html to see the output!");
// });
