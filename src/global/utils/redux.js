const mapDynamicState = stateList => state => {
  let tempState = {};

  if(typeof stateList === 'string') {
    let stateParts = stateList.split(':').map(str => str.trim());
    const [reducerName, propsStr] = stateParts;
    const props = propsStr.split(/\s/);

    props.forEach(prop => tempState[prop] = state[`${reducerName}State`][prop+'Reducer']);
  } else if(stateList.constructor.name === 'Object') {
    for (const reducerName in stateList) {
      if (stateList.hasOwnProperty(reducerName)) {
        let propsTemp = stateList[reducerName];
        let props = [];

        if(Array.isArray(propsTemp)) {
          propsTemp = propsTemp.map(str => str.trim());
          let dirtyArr = propsTemp.map(str => str.split(/\s/));
          dirtyArr.forEach(str => {
            if(typeof str === 'string') props.push(str);
            else if(Array.isArray(str)) str.forEach(str => props.push(str));
          });
        } else if(typeof propsTemp === 'string') {
          propsTemp = propsTemp.trim();
          props = propsTemp.split(/\s/);
        } else {
          console.error(new Error(`The element in an object in mapDynamicState must be of type Array or String`));
        }
        props.forEach(prop => tempState[prop] = state[`${reducerName}State`][prop+'Reducer']);
      }
    }
  } else {
    console.error(new Error(`The element in mapDynamicState must be of type Object or String`));
  }
  return tempState;
}

export { mapDynamicState as _mapDynamicState };






const _mapDynamicState = stateList => state => {
  let tempState = {};
  const isArray = Array.isArray(stateList);

  if (typeof stateList === 'string') {
    let stateParts = stateList.split(': ');
    const [stateName, reducerName] = stateParts;
    let listedState = stateParts[2];
    if(!listedState) return;

    listedState = listedState.split(' ');
    let statePart;
    statePart = reducerName ? state[stateName + 'State'][reducerName + 'Reducer'] : state[stateName + 'State'];
    listedState.forEach(element => tempState[element] = statePart[element]);
  } else if (typeof stateList == 'object' && !isArray) {
    for (const key in stateList) {
      let stateName = stateList[key];

      if(typeof stateName === 'string') {
        let stateParts = stateName.split(': ');
        const reducerName = stateParts[0];
        let listedState = stateParts[1];

        listedState = listedState.split(' ');
        listedState.forEach(element => tempState[element] = state[key + 'State'][reducerName + 'Reducer'][element]);
      } else if(typeof stateName === 'object') {
        for (const subKey in stateName) {
          let props = stateName[subKey];
          props = props.split(' ');
          props.forEach(element => tempState[element] = state[key + 'State'][subKey + 'Reducer'][element]);
        }
      }
    }
  }
  return tempState;
}

export {_mapDynamicState as mapDynamicState};

/*
const mapStateToProps = _mapDynamicState('global: uploader: currentCanvasData props');
valeur de mapStateToProps:
{
  currentCanvasData: state.global.uploaderReducer.currentCanvasData
  props: state.global.uploaderReducer.props
}
ces valeurs stocker dans le state:
reduxState: {
  global: {
    uploaderReducer: {
      currentCanvasData: 'value',
    }
  }
}


global = state
uploader = reducer
currentCanvasData props = props du reducer

les props sont dans un reducer, qui est lui même dans un "state" qui est lui même dans le state du store redux

conception du state redux

state: {

  game: {
    reducer1: {
      prop1: 'value',
      prop2: 'value',
    }
    reducer2: {
      prop1: 'value',
      prop2: 'value',
    }
  }

  site: {
    reducer1: {
      prop1: 'value',
      prop2: 'value',
    }
    reducer2: {
      prop1: 'value',
      prop2: 'value',
    }
  }

  global: {
    reducer1: {
      prop1: 'value',
      prop2: 'value',
    }
    reducer2: {
      prop1: 'value',
      prop2: 'value',
    }
  }

}

global contenant des données qui sont utilisable ET dans le site ET dans le jeu

exemple utilisable

// dans le cas où vous avez besoin de 1 seul state et 1 seul reducer par state dans un container
const mapStateToProps = _mapDynamicState('stateName: reducerName: prop1 prop2 prop3');

// dans le cas où vous avez besoin de plusieurs state et 1 seul reducer par state dans un container
const mapStateToProps = _mapDynamicState({
  stateName1: 'reducerName: prop1 prop2 prop3',
  stateName2: 'reducerName: prop1 prop2 prop3',
});

// dans le cas où vous avez besoin de 1 ou plusieurs state et 1 ou plusieurs reducer par state dans un container
const mapStateToProps = _mapDynamicState({
  stateName1: {
    reducerName1: 'prop1 prop2 prop3',
    reducerName2: 'prop1 prop2 prop3',
  },
  stateName2: 'reducerName: prop1 prop2 prop3',
});
*/
