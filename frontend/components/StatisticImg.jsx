import React from 'react';

const StatisticImg = props => {
  return (
    <div>
      <h3>{props.props.name}</h3>
      <h3>{props.props.wins}</h3>
      <h3>{props.props.losses}</h3>
    </div>
  );
};

export default StatisticImg;
