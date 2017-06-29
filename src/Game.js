import React from "react";
import {Action} from "./reducers/board";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import AutoRenew from "material-ui/svg-icons/action/autorenew";
import Unchecked from "material-ui/svg-icons/toggle/radio-button-unchecked";
import ClearIcon from "material-ui/svg-icons/content/clear";


const iconsStyle = {
  position: `relative`,
  top: `5px`
};

const Game = ({dispatch, st}) => {
  return (
    <div className="game">
      <div className="game-header">{gameHeader(dispatch, st)}</div>
      <table className="game-table">
        <tbody>
          {st.matrix.map((line, y) => (
            <tr key={y}>
              {line.map((value, x) =>
                (<td key={`${x}-${y}`} onClick={() => onTdClick(dispatch, x, y)}>{valueToIcon(value)}</td>)
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const onTdClick = (dispatch, x, y) => dispatch({type: `NEXT`, action: new Action(x, y)});
const newGameButtonClick = (dispatch) => dispatch({type: `NEW_GAME`});

const gameHeader = (dispatch, st) => {
  if (st.winner === `draw`) {
    return (<div><p>Draw! </p>{newGameButton(dispatch)}</div>);
  } else if (st.winner) {
    return (<div><p>Winner is: {valueToIcon(st.winner)}</p>{newGameButton(dispatch)}</div>);
  }
};

const newGameButton = (dispatch) => (
  <RaisedButton
    label="New Game"
    labelPosition="before"
    containerElement="label"
    icon={<AutoRenew />}
    onClick={() => newGameButtonClick(dispatch)}
  />);

const valueToIcon = (value) => {
  if (value === `X`) {
    return <ClearIcon style={iconsStyle}/>;
  } else if (value === `0`) {
    return <Unchecked style={iconsStyle}/>;
  }
};

Game.propTypes = {
  st: PropTypes.shape({
    matrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired).isRequired).isRequired,
    nextTurn: PropTypes.string.isRequired,
    winner: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default Game;
