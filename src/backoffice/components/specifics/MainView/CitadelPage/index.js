import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import './CitadelPage.scss';
import { mapDynamicState } from '../../../../../global/utils';
import { emit, on } from '../../../../socket/user';
import { emit as emitC, on as onC } from '../../../../socket/citadel';
import { on as onCitadel, emit as emitCitadel } from '../../../../../game/socket/citadel';
import { citadel } from '../../../../../global/store/game/actions';
import { getBuildingData } from '../../../../../game/utils';

const {
  setCitadel,
  setHeadquarter,
  setBuildings,
  setBuildingsData,
} = citadel;

const mapStateToProps = mapDynamicState('game: citadel: citadel headquarter buildings buildingsData');

const mapDispatchToProps = dispatch => ({
  setCitadel: citadel => dispatch(setCitadel(citadel)),
  setHeadquarter: headquarter => dispatch(setHeadquarter(headquarter)),
  setBuildings: buildings => dispatch(setBuildings(buildings)),
  setBuildingsData: buildingsData => dispatch(setBuildingsData(buildingsData)),
});

class CitadelPage extends React.Component {

  state = {
    citadel: null,
    storage: null,
    maxPopulation: null,
    user: [],
  }

  componentDidMount = () => {
    const { setBuildingsData, setBuildings } = this.props;

    emitCitadel.retrieveBuildingsData();
    onCitadel.getBuildingsDataFromDB(buildingsData => setBuildingsData(buildingsData));

    const { id } = this.props.match.params;

    emitC.getCitadelById(id);
    onC.getCitadelFromDB(citadel => {
      emitCitadel.retrieveBuildings({
        id: citadel._id,
        model: 'citadel'
      });
      onCitadel.getBuildingsFromDB(buildings => setBuildings(buildings));
        this.setState({
          citadel,
        })
      this.setState({
        ...this.state,
        citadel,
      })
      emit.getUserById(citadel.userId);
      on.retrieveUserFromDB(user => {
        this.setState({
          user,
        })
      })
    });
  }

  render() {
    // Chercher la bonne citadelle en fonction du slug de l'url
    const { citadel, storage: storageState, maxPopulation: maxPopulationState, user } = this.state;
    const { buildingsData, buildings } = this.props;
    if(buildingsData.length > 0 && buildings.length > 0){
      const warehouse = getBuildingData(this.props, 'warehouse');
      const storage = warehouse.storage;
      const hydroponicFarm = getBuildingData(this.props, 'hydroponicFarm');
      const maxPopulation = hydroponicFarm.maxPopulation;
      if(!storageState && !maxPopulationState){
        this.setState({
          storage,
          maxPopulation,
        })
      }
    }
    // Limite de population et de ressources
    return (
      <div className="CitadelPage">
        <div className="new-index">
          {
            citadel && (
                <div className="citadelPage">
                  <div className="left-content">
                    <h2>{citadel.name}</h2>
                    <h3>Score: {citadel.score}</h3>
                    <Link
                      to={`/backoffice/players/${user._id}`}
                      className="citadelpage-link"
                    >
                      <h3 className="username">{user.username}</h3>
                      <span className="slider" />
                    </Link>
                  </div>
                  <div className="right-content">
                    <div className="img-ressources">
                      <img src={require("../../../../../game/utils/img/fer.png")} alt="fer" width="64px" height="48px" />{citadel.resources.iron}
                      <img src={require('../../../../../game/utils/img/fuel.png')} alt="petrol" width="64px" height="64px" />{citadel.resources.oil}
                      <img src={require('../../../../../game/utils/img/ammo.png')} alt="ammo" width="64px" height="48px" />{citadel.resources.ammo}
                    </div>
                    <div className="ViewRessourcesBot">
                      <img src={require('../../../../../game/utils/img/warehouse2.png')} alt="ressources" width="64px" height="64px" />{storageState}
                      <img src={require('../../../../../game/utils/img/meat.png')} alt="pop" width="64px" height="64px" />{citadel.population} / {maxPopulationState}
                    </div>
                  </div>
                </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CitadelPage)
