import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colorize } from '../helpers/styled-utils';
import helpers from '../helpers';
import * as styled_var from '../constants/styled-variables';
import * as icons from '../icons';

const Icon = props => (
  <div dangerouslySetInnerHTML={{ __html: icons[props.icon] }} />
);

const Marker = styled.span`
  width: 28px;
  height: 28px;
  display: block;
  text-align: center;
  border-radius: 100px;
  background-color: #5477c5;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid #eee;
  span {
    display: none;
    font-family: Helvetica;
    position: absolute;
    font-size: 7.5px;
    letter-spacing: -0.05em;
    line-height: 8px;
    font-weight: bold;
    left: 50%;
    bottom: -18px;
    background-color: #fff;
    color: #000;
    padding: 2px 2px 1px;
    transform: translate(-50%, -50%);
    text-transform: uppercase;
    border: 1px solid #eee;
  }
  svg {
    top: 50%;
    left: 50%;
    transform: translate(-40%, -40%);
    position: absolute;
    width: 27px;
    fill: #000;
  }
  &:hover {
    z-index: 1000;
    transform: scale(1.25);
    span {
      display: block;
    }
  }
  &.active {
    z-index: 1000;
    transform: scale(1.7);
    span {
      display: block;
    }
  }
  &.varikset {
    ${colorize(styled_var.varikset)};
  }
  &.tikat {
    ${colorize(styled_var.tikat)};
  }
  &.kahlaajat {
    ${colorize(styled_var.kahlaajat)};
  }
  &.lokit {
    ${colorize(styled_var.lokit)};
    svg {
      fill: #fff;
    }
  }
  &.rastaat {
    ${colorize(styled_var.rastaat)};
  }
  &.tiaiset {
    ${colorize(styled_var.tiaiset)};
  }
  &.peipot {
    ${colorize(styled_var.peipot)};
    svg {
      fill: #fff;
    }
  }
  &.sorsat {
    ${colorize(styled_var.sorsat)};
  }
  &.joutsenet-hanhet {
    ${colorize(styled_var.joutsenetHanhet)};
  }
  &.varpuset-kiurut-kirviset {
    ${colorize(styled_var.varpusetKiurutKirviset)};
    svg {
      fill: #5e4920;
    }
  }
  &.kertut {
    ${colorize(styled_var.kertut)};
    svg {
      fill: #ff8709;
    }
  }
  &.kyyhkyt {
    ${colorize(styled_var.kyyhkyt)};
    svg {
      fill: #666;
    }
  }
  &.kurki-haikarat {
    ${colorize(styled_var.kurkiHaikarat)};
    svg {
      fill: #fff;
    }
  }
  &.petolinnut {
    ${colorize(styled_var.petolinnut)};
    svg {
      fill: #29200e;
    }
  }
  &.vastarakit-taskut-lepinkaiset {
    ${colorize(styled_var.vastarakitTaskutLepinkaiset)};
  }
  &.uikut-kuikat {
    ${colorize(styled_var.uikutKuikat)};
  }
  &.paaskyt {
    ${colorize(styled_var.paaskyt)};
  }
  &.sirkut {
    ${colorize(styled_var.sirkut)};
  }
  &.papukaijalinnut {
    ${colorize(styled_var.papukaijalinnut)};
    svg {
      fill: #01fb22;
    }
  }
  &.kanalinnut {
    ${colorize(styled_var.kanalinnut)};
  }
`;

const BirdMarker = props => {
  const isActive = props.id === props.activeMarker ? 'active' : '';
  const classes = `${props.family} ${isActive}`;
  return (
    <Marker className={classes} onClick={e => props.onMarkerClick(props.id)}>
      <Icon icon={helpers.camelCasify(props.family)} />
      <span>{props.text}</span>
    </Marker>
  );
};
export default BirdMarker;
