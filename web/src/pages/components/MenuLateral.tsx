import React from 'react';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';

import DirectionsCar from '@material-ui/icons/DirectionsCar';
import LocalHospital from '@material-ui/icons/LocalHospital';
import OfflineBolt from '@material-ui/icons/OfflineBolt';

import ProfileHeader from './ProfileHeader';
import OpcoesAdmin from './OpcoesAdmin';

interface IMenuProps {
    onItemClicked:any
}

interface IMenuState { }

export default class MenuLateral extends React.Component<IMenuProps, IMenuState> {
    render() {
        return (
            <div>
                <ProfileHeader />

                <Divider style={{marginBottom: '25px'}} />
                <Typography>Adicionar marcadores</Typography>
                <List>
                    <ListItem>
                        <Button onClick={() => this.props.onItemClicked('CRIME')}>
                            <ListItemIcon><LocalHospital /></ListItemIcon>
                            <ListItemText>Crime</ListItemText>
                        </Button>
                    </ListItem>

                    <ListItem>
                        <Button onClick={() => this.props.onItemClicked('ACIDENTE')}>
                            <ListItemIcon><DirectionsCar /></ListItemIcon>
                            <ListItemText>Acidente de trânsito</ListItemText>
                        </Button>
                    </ListItem>

                    <ListItem>
                        <Button onClick={() => this.props.onItemClicked('SINISTRO')}>
                            <ListItemIcon><OfflineBolt /></ListItemIcon>
                            <ListItemText>Sinistro</ListItemText>
                        </Button>
                    </ListItem>
                </List>
                {
                    localStorage.isAdmin === 'true' && <><Divider style={{marginBottom: '25px'}} /><OpcoesAdmin /></>
                }

            </div>
        )
    }
}