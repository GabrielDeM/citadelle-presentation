require('./updateRessources');
require('./updateRessourcesInMongo');


/*
setInterval(() => {
  console.log(chalk.blue('updating'));
  const citadels = buildings.map(building => building.headquarter.citadel);
  citadels.forEach(citadel => {
    mongoose.Citadel.updateRessources(citadel)
      .then(data => console.log('done'))
      .catch(err => console.log('err'))
  });
}, 20000);*/

let timer = 0;

setInterval(() => {
  //console.log(timer += 2.5);
}, 2500);
