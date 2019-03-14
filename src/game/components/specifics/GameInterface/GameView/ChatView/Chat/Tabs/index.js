import React from 'react'
import { connect } from 'react-redux';

import './Tabs.scss';
import { mapDynamicState } from '../../../../../../../../global/utils';
import { chat } from '../../../../../../../../global/store/game/actions';

const {
  setTab,
} = chat;

const mapStateToProps = mapDynamicState('game: chat: tab');
const mapDispatchToProps = dispatch => ({
  setTab: tab => dispatch(setTab(tab)),
});

const Tabs = ({ tab, setTab }) => {

  const handleClick = tab => () => {
    setTab(tab);
  }

  return(
    <div className="Tabs">
      <div className="tabs">
        <span onClick={handleClick('public')} className="tab">Publique <span></span></span>
        <span onClick={handleClick('chatbot')} className="tab">Chatbot <span></span></span>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
