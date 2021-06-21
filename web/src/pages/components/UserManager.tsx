import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { DataGrid, GridColDef } from '@material-ui/data-grid';

import ProfileEditor from './ProfileEditor';
import Alert from './Alert';

import Axios from '../../Axios';

interface IUserManagerProps {
    open:boolean,
    onClose:any
}
interface IUserManagerState {
    rows:Array<User>,
    selectedRows:Array<User>,
    profileEditorVisible:boolean,
    alertOpen:boolean
}

export default class UserManager extends React.Component<IUserManagerProps, IUserManagerState> {
    constructor(props:IUserManagerProps) {
        super(props);

        const rows:User[] = [];
        const selectedRows:User[] = [];
        this.state = {
            rows: rows,
            selectedRows: selectedRows,
            profileEditorVisible: false,
            alertOpen:false
        }
    }

    componentDidMount() {
        this._loadUsers();
    }

    /* Busca todos os usuários para listar no grid. */
    _loadUsers = () => {
        Axios.get('/users')
            .then((result:any) => {
                this.setState({
                    ...this.state,
                    rows:result.data
                });
            })
            .catch((error:any) => {
                console.log('Erro ao buscar usuários: ', error);
            });
    }

    /* Quando clica no checkbox de marcar ou desmarcar todos, adiciona ou remove todos os usuários na lista de usuários selecionados. */
    _onSelectionModelChangeHandler = (e:any) => {
        const selectedRows = this.state.rows.filter((row:any) => e.selectionModel.includes(row.id));
        this.setState({
            ...this.state,
            selectedRows: selectedRows
        });
    }

    /* Quando seleciona/deseleciona um usuário então adiciona/remove da lista de usuários selecionados. */
    _onRowSelectedHandler = (row:any) => {
        if(row.isSelected) {
            this.setState({
                ...this.state,
                selectedRows:[...this.state.selectedRows, row.data]
            });
        } else {
            const selectedRows = this.state.selectedRows.filter((selectedRow:any) => selectedRow.id !== row.data.id);
            this.setState({
                ...this.state,
                selectedRows:selectedRows
            });
        }
    }

    /* Quando clica em excluir exibe a mensagem dizendo que vai deletar os usuários selecionados e seus marcadores. */
    _onExcluirButtonClickHandler = () => {
        this.setState({
            ...this.state,
            alertOpen: true
        });
    }

    /* Quando clica em ok na mensagem de alerta ai sim faz a chamada pra deletar todos os usuários selecionados. */
    _onAlertOkButtonClickHandler = async () => {
        await Promise.all(this.state.selectedRows.map(async(row:any) => {
            try {
                await Axios.delete(`/user/${row.id}`);
                console.log(`Usuário de ID ${row.id} deletado com sucesso.`);

                this.setState({
                    ...this.state,
                    alertOpen: false
                });
            } catch(error) {
                console.log(`Erro ao deletar usuário de ID ${row.id}: `, error);
            }
        }));

        /* Após realizar a exclusão então carrega os usuários de novo para atualizar o grid. */
        this._loadUsers();
    }

    /* Quando clica em editar abre a tela de edição de usuário. */
    _onEditarButtonClickHandler = () => {
        if(this.state.selectedRows.length > 1) {
            alert('Somente é permitido editar um usuário por vez.');
        } else {
            this.setState({
                ...this.state,
                profileEditorVisible: true
            });
        }
    }

    /* Após realizada a edição dos usuários carrega eles de novo e fecha a tela de edição de usuário. */
    _onEdicaoUsuarioSuccessHandler = () => {
        this._onProfileEditorClose();
        this._loadUsers();
    }

    /* Quando pressiona ESC ou clica em "Sair" fecha a tela de edição de usuário. */
    _onProfileEditorClose = () => {
        this.setState({
            ...this.state,
            profileEditorVisible: false
        });
    }

    render() {
        const columns:GridColDef[] = [
            {field: 'id', headerName: 'id', width: 90},
            {field: 'username', headerName: 'Nome', width: 150},
            {field: 'email', headerName: 'E-mail', width: 150},
            {field: 'phone', headerName: 'Telefone', width: 150}
        ]

        let userId:number = 0;
        if(this.state.selectedRows.length > 0) userId = this.state.selectedRows[0].id;

        return (
            <>
            <Dialog
                maxWidth='md'
                fullWidth={true}
                open={this.props.open}
                onClose={this.props.onClose}>
                <DialogTitle>Gerenciar Usuários</DialogTitle>
                <DialogContent>
                    <div>
                        <DataGrid
                            autoHeight
                            onRowSelected={this._onRowSelectedHandler}
                            onSelectionModelChange={this._onSelectionModelChangeHandler}
                            rows={this.state.rows}
                            columns={columns}
                            pageSize={5}
                            checkboxSelection />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={this.props.onClose}>Sair</Button>
                    <Button
                        color="secondary"
                        onClick={this._onExcluirButtonClickHandler}>Excluir</Button>
                    <Button
                        color="primary"
                        onClick={this._onEditarButtonClickHandler}>Editar</Button>
                </DialogActions>
            </Dialog>
            <ProfileEditor
                onClose={this._onProfileEditorClose}
                onSuccess={this._onEdicaoUsuarioSuccessHandler}
                userId={userId}
                open={this.state.profileEditorVisible} />
            <Alert
                open={this.state.alertOpen}
                onClose={() => this.setState({...this.state, alertOpen:false})}
                onOk={this._onAlertOkButtonClickHandler}
                title="Alerta de exclusão" >
                    Deseja realmente excluir os usuários selecionados? Todos os marcadores que eles criaram serão excluídos com eles.
            </Alert>
            </>
        )
    }
}