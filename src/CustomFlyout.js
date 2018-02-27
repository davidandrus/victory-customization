import React from 'react';
import { Flyout } from 'victory';

export default function CustomFlyout(props) {

  const {
    scale,
  } = props;

  alert('sucka');


  return <Flyout {...props} />
}