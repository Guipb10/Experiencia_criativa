import React from 'react';

import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContentText';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

interface IAlertProps {
    open:boolean
    title:string,
    onClose:any,
    onOk:any,

}
interface IAlertState { }

export default class Alert extends React.Component<IAlertProps, IAlertState> {
    render() {
        return (
            <Dialog
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                open={this.props.open}
                onClose={this.props.onClose}>
                <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent style={{paddingLeft:"20px"}}>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.children}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={this.props.onOk}>Ok</Button>
                    <Button color="secondary" onClick={this.props.onClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        );
    }
}