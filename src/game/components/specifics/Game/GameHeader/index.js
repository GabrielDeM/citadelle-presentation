import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FaAngleDown } from 'react-icons/fa';
import { connect } from 'react-redux';

import './GameHeader.scss';
import { mapDynamicState } from '../../../../../global/utils';
import { emit as emitDisconnect } from '../../../../../global/socket/disconnect';
import { auth as globalAuth } from '../../../../../global/store/global/actions';
import { auth as siteAuth, temp } from '../../../../../global/store/site/actions';
import { citadel } from '../../../../../global/store/game/actions';
import { getBuildingData } from '../../../../utils';

const {
  setCitadel,
  setHeadquarter,
  setBuildings,
} = citadel;

const {
  setLogged,
} = temp

const {
  logout: globalLogout,
} = globalAuth

const {
  logout: siteLogout,
} = siteAuth

const mapStateToProps = mapDynamicState({
  global: 'auth: user',
  game: 'citadel: citadel headquarter buildings buildingsData',
});

const mapDispatchToProps = dispatch => ({
  setCitadel: citadel => dispatch(setCitadel(citadel)),
  setHeadquarter: headquarter => dispatch(setHeadquarter(headquarter)),
  setBuildings: buildings => dispatch(setBuildings(buildings)),
  globalLogout: () => dispatch(globalLogout()),
  siteLogout: () => dispatch(siteLogout()),
  setLogged: (user, logged) => dispatch(setLogged(user, logged)),
});

class GameHeader extends React.Component {
  state = {
    anchorEl: null,
    arrowRef: null,
    logoutGlobal: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  };

  disconnect = () => {
    const {
      user,
      setLogged,
      globalLogout,
      siteLogout,
    } = this.props;
    emitDisconnect.ownDisconnect(user._id);
    setLogged({}, false);
    globalLogout();
    siteLogout();
  }

  render() {
    const { citadel, user, buildings } = this.props;
    const { iron, oil, ammo } = citadel.resources;
    const { anchorEl } = this.state;
    const warehouse = getBuildingData(this.props, 'warehouse');
    const maxRessources = warehouse.storage;
    const hydroponicFarm = getBuildingData(this.props, 'hydroponicFarm');
    const maxPopulation = hydroponicFarm.maxPopulation;

    return (
      <div className="GameHeader">
        <div className="gameheader">
          <div className="microMenu">
            <div>
              <Button
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <h2>{user.username}<FaAngleDown /></h2>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}><Link to={`/profile`}>Profil</Link></MenuItem>
                <MenuItem onClick={this.disconnect}><Link to={`/`}>Logout</Link></MenuItem>
              </Menu>
            </div>
          </div>
          <div className="CitaName">
            <div>
              <h2>{citadel.name}</h2>
            </div>
          </div>
          <div className="ViewRessources">
            <div className="ViewRessourcesTop">
              <div>
                <div>
                  <Tooltip
                    title={
                      <React.Fragment>
                        <div className="tooltip">
                          <h3>Fer</h3>
                          <hr/>
                          <div className="divs">
                            <div>Disponible :</div>
                            <div>{iron}</div>
                          </div>
                          <br/>
                          <div className="divs">
                            <div>Stockage max :</div>
                            <div>{maxRessources}</div>
                          </div>
                          <br/>
                          <div className="divs">
                            <div>Production /h :</div>
                            <div className="production">+352</div>
                          </div>
                        </div>
                      </React.Fragment>
                    }
                  >
                    <Button>
                      <img src={require("../../../../utils/img/fer.png")} alt="fer" width="32px" height="24px" /><span>{iron}</span>
                    </Button>
                  </Tooltip>
                  <Tooltip
                    title={
                      <React.Fragment>
                        <div className="tooltip">
                          <h3>Pétrole</h3>
                          <hr/>
                          <div className="divs">
                            <div>Disponible :</div>
                            <div>{oil}</div>
                          </div>
                          <br/>
                          <div className="divs">
                            <div>Stockage max :</div>
                            <div>{maxRessources}</div>
                          </div>
                          <br/>
                          <div className="divs">
                            <div>Production /h :</div>
                            <div className="production">+352</div>
                          </div>
                        </div>
                      </React.Fragment>
                    }
                  >
                    <Button>
                      <img src={require('../../../../utils/img/fuel.png')} alt="petrole" width="32px" height="32px" />{oil}
                    </Button>
                  </Tooltip>
                  <Tooltip
                    title={
                      <React.Fragment>
                        <div className="tooltip">
                          <h3>Munitions</h3>
                          <hr/>
                          <div className="divs">
                            <div>Disponible :</div>
                            <div>{ammo}</div>
                          </div>
                          <br/>
                          <div className="divs">
                            <div>Stockage max :</div>
                            <div>{maxRessources}</div>
                          </div>
                          <br/>
                          <div className="divs">
                            <div>Production /h :</div>
                            <div className="production">+352</div>
                          </div>
                        </div>
                      </React.Fragment>
                    }
                  >
                    <Button>
                      <img src={require('../../../../utils/img/ammo.png')} alt="ammo" width="32px" height="24px" />{ammo}
                    </Button>
                  </Tooltip>
                </div>
                <div className="ViewRessourcesBot">
                  <img src={require('../../../../utils/img/warehouse2.png')} alt="ressources" width="32px" height="32px" />{maxRessources}
                  <img src={require('../../../../utils/img/meat.png')} alt="pop" width="32px" height="32px" />{citadel.unitsNumber} / {maxPopulation}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameHeader);
