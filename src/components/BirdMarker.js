import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { darken } from 'polished';
import { colorize } from '../helpers/styled-utils';
import * as swatches from '../constants/styled-variables';

const Marker = styled.span`
  width: 30px;
  height: 30px;
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
    font-size: 8px;
    letter-spacing: -0.05em;
    line-height: 8px;
    font-weight: bold;
    left: 50%;
    bottom: -18px;
    background-color: #fff;
    color: #000;
    padding: 3px 2px 1px;
    transform: translate(-50%,-50%);
    text-transform: uppercase;
    border: 1px solid #eee;
  }
  &:hover {
    z-index: 1000;
    transform: scale(1.1);
    span {
      display: block;
    }
  }
  &.varikset {
    ${colorize(swatches.varikset)};
  }
  &.tikat {
    ${colorize(swatches.tikat)};
  }
  &.kahlaajat {
    ${colorize(swatches.kahlaajat)};
  }
  &.lokit {
    ${colorize(swatches.lokit)};
  }
  &.rastaat {
    ${colorize(swatches.rastaat)};
  }
  &.tiaiset {
    ${colorize(swatches.tiaiset)};
  }
  &.peipot {
    ${colorize(swatches.peipot)};
  }
  &.sorsat {
    ${colorize(swatches.sorsat)};
  }
  &.joutsenet-hanhet {
    ${colorize(swatches.joutsenetHanhet)};
  }
  &.varpuset-kiurut-kirviset {
    ${colorize(swatches.varpusetKiurutKirviset)};
  }
  &.kertut {
    ${colorize(swatches.kertut)};
  }
  &.kyyhkyt {
    ${colorize(swatches.kyyhkyt)};
  }
  &.kurki-haikarat {
    ${colorize(swatches.kurkiHaikarat)};
  }
  &.petolinnut {
    ${colorize(swatches.petolinnut)};
  }
  &.yolaulajat {
    ${colorize(swatches.yolaulajat)};
  }
  &.vastarakit-taskut-lepinkaiset {
    ${colorize(swatches.vastarakitTaskutLepinkaiset)};
  }
  &.uikut-kuikat {
    ${colorize(swatches.uikutKuikat)};
  }
  &.paaskyt {
    ${colorize(swatches.paaskyt)};
  }
  &.sirkut {
    ${colorize(swatches.sirkut)};
  }
  &.papukaijalinnut {
    ${colorize(swatches.papukaijalinnut)};
  }
  &.kanalinnut {
    ${colorize(swatches.kanalinnut)};
  }
`;

export const BirdMarker = (props) => {
  return (
    <Marker className={props.family}><span>{ props.text }</span></Marker>
  );
};
