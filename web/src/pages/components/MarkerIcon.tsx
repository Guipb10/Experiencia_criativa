import React from 'react';

import DirectionsCar from '@material-ui/icons/DirectionsCar';
import LocalHospital from '@material-ui/icons/LocalHospital';
import OfflineBolt from '@material-ui/icons/OfflineBolt';

import markerIcon from '../../img/map-marker-red.png'

interface IMarkerIconProps {
    tipo:string
}
interface IMarkerIconState { }

export default class MarkerIcon extends React.Component<IMarkerIconProps, IMarkerIconState> {
    render() {
        switch(this.props.tipo) {
            case "CRIME":
                return (<LocalHospital fontSize="large" />)
            case "ACIDENTE":
                return (<DirectionsCar fontSize="large" />)
            case "SINISTRO":
                return (<OfflineBolt fontSize="large" />)
            default:
                return (<img alt="map" src={markerIcon} width="50px" height="50px" />);
        }
    }
}