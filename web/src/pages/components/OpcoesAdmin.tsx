import React from 'react';

import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ManageAccounts from '@material-ui/icons/'
import Button from '@material-ui/core/Button';

import UserManager from './UserManager';

interface IOpcoesAdminProps { }
interface IOpcoesAdminState {
    dialogOpen:boolean
}

export default class OpcoesAdmin extends React.Component<IOpcoesAdminProps, IOpcoesAdminState> {
    constructor(props:IOpcoesAdminProps) {
        super(props);

        this.state = {
            dialogOpen: false
        }
    }

    /* Quando clica no botão Gerenciar usuários abre a janela que lista os usuários para edição/exclusão. */
    _onGerenciarUsuariosClickHandler = () => {
        this.setState({
            ...this.state,
            dialogOpen: true
        });
    }

    /* Quando pressiona ESC ou clica em "Sair" dentro da janela de edição então fecha a janela de edição de usuários. */
    _onDialogClose = () => {
        this.setState({
            ...this.state,
            dialogOpen: false
        });
    }

    render() {
        return(
            <>
                <Typography>Opções do admin</Typography>
                <ListItem>
                    <Button onClick={this._onGerenciarUsuariosClickHandler}>
                        <ListItemIcon>
                            <span className="material-icons">manage_accounts</span>
                        </ListItemIcon>
                        <ListItemText>
                            Gerenciar usuários
                        </ListItemText>
                    </Button>
                </ListItem>
                <UserManager
                    open={this.state.dialogOpen}
                    onClose={this._onDialogClose} />
            </>
        );
    }
}