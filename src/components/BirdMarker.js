import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  span {
    display: none;
    font-family: Helvetica;
    position: absolute;
    font-size: 8px;
    letter-spacing: -0.05em;
    line-height: 8px;
    font-weight: bold;
    left: 50%;
    bottom: -16px;
    background-color: #fff!important;
    color: #000!important;
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
    background-color: #999;
    border-color: darken(#999, 7%);
    span {
      background-color: #999;
    }
  }
  &.tikat {
    background-color: #FF1800;
    span {
      background-color: #FF1800;
    }
  }
  &.kahlaajat {
    background-color: #00A87C;
    span {
      background-color: #00A87C;
    }
  }
  &.lokit {
    background-color: #fff;
    span {
      background-color: #fff;
    }
  }
  &.rastaat {
    background-color: #333;
    color: #fff;
    -webkit-font-smoothing: antialiased;
    span {
      background-color: #333;
    }
  }
  &.tiaiset {
    background-color: #FFF600;
    span {
      background-color: #FFF600;
    }
  }
  &.peipot {
    background-color: #C24D24;
    span {
      background-color: #C24D24;
    }
  }
  &.sorsat {
    background-color: #002BCF;
    color: #fff;
    -webkit-font-smoothing: antialiased;
    span {
      background-color: #002BCF;
    }
  }
  &.joutsenet-hanhet {
    background-color: #00C8CF;
    span {
      background-color: #00C8CF;
    }
  }
  &.varpuset-kiurut-kirviset {
    background-color: #EEA003;
    span {
      background-color: #EEA003;
    }
  }
  &.kertut {
    background-color: #EE7708;
    span {
      background-color: #EE7708;
    }
  }
  &.kyyhkyt {
    background-color: #ccc;
    span {
      background-color: #ccc;
    }
  }
  &.kurki-haikarat {
    background-color: #A17D37;
    span {
      background-color: #A17D37;
    }
  }
  &.petolinnut {
    background-color: #634C2F;
    span {
      background-color: #634C2F;
    }
  }
  &.yolaulajat {
    background-color: #C20548;
    color: #fff;
    -webkit-font-smoothing: antialiased;
    span {
      background-color: #C20548;
    }
  }
  &.vastarakit-taskut-lepinkaiset {
    background-color: #81D447;
    span {
      background-color: #81D447;
    }
  }
  &.uikut-kuikat {
    background-color: #008ECF;
    color: #fff;
    -webkit-font-smoothing: antialiased;
    span {
      background-color: #008ECF;
    }
  }
  &.paaskyt {
    background-color: #B97CC2;
    span {
      background-color: #B97CC2;
    }
  }
  &.sirkut {
    background-color: #C1C23B;
    span {
      background-color: #C1C23B;
    }
  }
  &.papukaijalinnut {
    background-color: #01D922;
    span {
      background-color: #01D922;
    }
  }
  &.kanalinnut {
    background-color: #D4B640;
    span {
      background-color: #D4B640;
    }
  }
`;

export const BirdMarker = (props) => {
  return (
    <Marker className={props.family}><span>{ props.text }</span></Marker>
  );
};
