import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Axios from '../../Axios';

interface IProfileEditorProps {
    onClose:any,
    onSuccess:any,
    open:boolean,
    userId:number
}

interface IProfileEditorState {
    user:any,
    passwordError:boolean,
    password:string
    passwordConfirmation:string
}

export default class ProfileEditor extends React.Component<IProfileEditorProps, IProfileEditorState> {
    constructor(props:IProfileEditorProps) {
        super(props);

        this.state = {
            user:null,
            passwordError:false,
            password:'',
            passwordConfirmation:''
        };
    }

    componentDidMount() {
        this._loadUser();
    }

    _loadUser = async() => {
        if(this.props.userId === 0) return;

        try {
            const result = await Axios.get(`/user/${this.props.userId}`);
            this.setState({...this.state, user:result.data});
        } catch (error:any) {
            console.log(`Erro ao buscar usuário de ID ${this.props.userId}: `, error);
        };
    }

    _handleOnEmailChange = (e:any) => {
        this.setState({
            ...this.state,
            user: {...this.state.user, email:e.target.value}
        });
    }

    _handleOnUsernameChange = (e:any) => {
        this.setState({
            ...this.state,
            user: {...this.state.user, username:e.target.value}
        });
    }

    _handleOnPhoneChange = (e:any) => {
        this.setState({
            ...this.state,
            user:{...this.state.user, phone:e.target.value}
        });
    }


    _handleOnPasswordChange = (e:any) => {
        this.setState({
            ...this.state,
            password:e.target.value
        });

        if(!e.target.value && !this.state.password) return;

        if(e.target.value !== this.state.password) {
            this.setState({
                ...this.state,
                passwordError:true
            });
        } else {
            this.setState({
                ...this.state,
                passwordError:false
            });
        }
    }

    _handleOnPasswordConfirmationChange = (e:any) => {
        this.setState({
            ...this.state,
            passwordConfirmation:e.target.value
        });

        if(!e.target.value && !this.state.password) return;

        if(e.target.value !== this.state.password) {
            this.setState({
                ...this.state,
                passwordError:true
            });
        } else {
            this.setState({
                ...this.state,
                passwordError:false
            });
        }
    }

    _handleOnSubmitForm = async () => {
        try {
            await Axios.put(`/user/${this.props.userId}`, {
                ...this.state.user,
                password:this.state.password
            });

            this.props.onClose();
            this.props.onSuccess();
        } catch(error:any) {
            console.error('Erro ao editar perfil: ', error);
        }
    }

    render() {
        if(!this.state.user) {
            this._loadUser();
            return <div></div>
        }

        return (
            <Dialog
                maxWidth='sm'
                fullWidth={true}
                open={this.props.open}
                onClose={this.props.onClose}>
                <DialogTitle>Editar Perfil</DialogTitle>
                <DialogContent>
                    <form id="update_user_form" noValidate autoComplete="off">
                        <TextField
                            value={this.state.user.email}
                            onChange={this._handleOnEmailChange}
                            id={`edit_email_${this.props.userId}`}
                            label="E-mail"
                            type="email"
                            fullWidth />

                        <TextField
                            value={this.state.user.username}
                            onChange={this._handleOnUsernameChange}
                            id="edit_username"
                            label="Nome"
                            type="text"
                            fullWidth />

                        <TextField
                            value={this.state.user.phone}
                            onChange={this._handleOnPhoneChange}
                            id={`edit_phone_${this.props.userId}`}
                            label="Telefone"
                            type="text"
                            fullWidth />

                        <TextField
                            value={this.state.password}
                            onChange={this._handleOnPasswordChange}
                            id={`edit_password_${this.props.userId}`}
                            label="Senha"
                            type="text"
                            fullWidth />

                        <TextField
                            value={this.state.passwordConfirmation}
                            onChange={this._handleOnPasswordConfirmationChange}
                            error={this.state.passwordError}
                            helperText="A confirmação de senha deve ser igual a nova senha."
                            id={`edit_password_confirmation_${this.props.userId}`}
                            label="Confirmação de Senha"
                            type="text"
                            fullWidth />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose}>Cancelar</Button>
                    <Button onClick={this._handleOnSubmitForm}>Salvar</Button>
                </DialogActions>
            </Dialog>
        )
    }
}