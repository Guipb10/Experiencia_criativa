import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Grid from '@material-ui/core/Grid';
import Rodape from './rodape';
import MarkerIcon from './components/MarkerIcon';
import MenuLateral from './components/MenuLateral';
import Axios from '../Axios';

import '../styles/marker.css';

interface Viewport {
    latitude: number,
    longitude: number,
    zoom: number,
    width: number,
    height: number,
    pitch: number,
}

interface IPaginaMapProps { }

interface IPaginaMapState {
    viewport:Viewport,
    readyToPin:boolean,
    tipoMarcador:string,
    markers:Array<object>
}

function hasClass(ele:Element,cls:string) {
    return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele:Element,cls:string) {
    if (!hasClass(ele,cls)) ele.className += " "+cls;
}

function removeClass(ele:Element,cls:string) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
}

class PaginaMap extends React.Component<IPaginaMapProps, IPaginaMapState> {
    constructor(props:IPaginaMapProps) {
        super(props);

        this.state = {
            viewport: {
                latitude: -25.4354136,
                longitude: -49.1904301,
                zoom: 14,
                width: window.innerWidth,
                height: window.innerHeight,
                pitch: 50
            },
            readyToPin: false,
            tipoMarcador: '',
            markers: []
        };
    }

    componentDidMount() {
        Axios.get('/markers').then((result) => {
            this.setState({
                ...this.state,
                markers: result.data
            });
        });
    }

    _handleOnViewportChange = (newViewport:Viewport) => {
        this.setState({
            ...this.state,
            viewport: newViewport
        });
    }

    _changeCursorToNormal = () => {
        const classes:Array<string> = ['mapboxgl-canary', 'mapboxgl-canvas-container', 'overlays'];

        classes.map((className:string) => {
            const element:any = document.getElementsByClassName(className)[0];
            removeClass(element, 'crime_cur');
            removeClass(element, 'acidente_cur');
            removeClass(element, 'sinistro_cur');
        });
        removeClass(document.body, 'crime_cur');
        removeClass(document.body, 'acidente_cur');
        removeClass(document.body, 'sinistro_cur');
    }

   
    _handleOnMapClick = (e:any) => {
        console.log(e);

        this._changeCursorToNormal();

        if(this.state.readyToPin) {
            this.setState({
                ...this.state,
                readyToPin: false,
                markers: [...this.state.markers, {
                    userId: localStorage.userId,
                    tipo: this.state.tipoMarcador,
                    longitude: e.lngLat[0],
                    latitude: e.lngLat[1]
                }]
            });

            Axios.post('/marker', {
                userId: localStorage.userId,
                tipo: this.state.tipoMarcador,
                longitude: e.lngLat[0],
                latitude: e.lngLat[1]
            })
            .then(() => console.log('Marker salvo com sucesso no banco de dados.'))
            .catch((error) => console.log('Erro ao salvar marker no banco de dados: ', error));
        }
    }

   
    _handleOnItemClicked = (tipoMarcador:any) => {
        const elementos:Array<any> = [
            document.getElementsByClassName('mapboxgl-canary')[0],
            document.getElementsByClassName('mapboxgl-canvas-container')[0],
            document.getElementsByClassName('overlays')[0]
        ]

       
        this._changeCursorToNormal();

        this.setState({
            ...this.state,
            readyToPin: true,
            tipoMarcador: tipoMarcador
        })

        switch(tipoMarcador) {
            case 'CRIME':
                elementos.forEach((elemento:any) => addClass(elemento, 'crime_cur'));
                addClass(document.body, 'crime_cur');
                break;
            case 'ACIDENTE':
                elementos.forEach((elemento:any) => addClass(elemento, 'acidente_cur'));
                addClass(document.body, 'acidente_cur');
                break;
            case 'SINISTRO':
                elementos.forEach((elemento:any) => addClass(elemento, 'sinistro_cur'));
                addClass(document.body, 'sinistro_cur');
                break;
        }
    }

    render() {
        return (
            <>
                <Grid container>
                    <Grid item xs={3} sm={3} md={3} lg={3}>
                        <MenuLateral onItemClicked={this._handleOnItemClicked} />
                    </Grid>

                    <Grid item xs={9} sm={9} md={9} lg={9}>
                            <ReactMapGL
                                onClick={this._handleOnMapClick}
                                mapboxApiAccessToken={"pk.eyJ1IjoiZ3VpcGIxIiwiYSI6ImNrb285Zno5ODAyaDEydm5zY21haTRhM3YifQ.T6_MeIr8EEEhBCyzvOqzcQ"}
                                {...this.state.viewport}
                                onViewportChange={this._handleOnViewportChange} >
                                {
                                    this.state.markers.map((marker:any, idx:any) => {
                                        return (
                                            <Marker key={idx} latitude={marker.latitude} longitude={marker.longitude} offsetTop={(-this.state.viewport.zoom * 3) / 2}>
                                                <MarkerIcon tipo={marker.tipo} />
                                            </Marker>
                                        )
                                    })
                                }
                            </ReactMapGL>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Rodape/>
                    </Grid>
                </Grid>
            </>
        );
    }
}
export default PaginaMap;