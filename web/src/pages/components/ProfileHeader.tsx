import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';

import Axios from '../../Axios';
import ProfileEditor from './ProfileEditor';

interface IProfileHeaderProps { }
interface IProfileHeaderState {
    user:any,
    editionDialogOpen:boolean
}

export default class ProfileHeader extends React.Component<IProfileHeaderProps, IProfileHeaderState> {
    constructor(props:IProfileHeaderProps) {
        super(props);

        this.state = {
            user: null,
            editionDialogOpen:false
        }
    }

    componentDidMount() {
        this._loadUser();
    }

    /* Carrega o usuário para exibir o nome dele embaixo do avatar. */
    _loadUser = () => {
        Axios
            .get(`/user/${localStorage.userId}`)
            .then((result) => {
                this.setState({...this.state, user:result.data});
            });
    }

    render() {
        if(!this.state.user) return <div></div>

        return (
            <>
            <div style={{
                display:'flex',
                flexFlow: 'column nowrap',
                justifyContent:'center',
                alignItems:'center',
                marginTop: '15px',
                marginBottom: '25px',
                textAlign:'center'}}>

                <Avatar style={{width: '80px', height: '80px'}}>
                    {this.state.user.username.charAt(0)}
                </Avatar>

                <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center', justifyItems: 'center'}}>
                    <Typography variant='h5'>{this.state.user.username}</Typography>
                    <IconButton onClick={() => {this.setState({...this.state, editionDialogOpen:true})}}>
                        <Edit />
                    </IconButton>
                </div>
            </div>

            <ProfileEditor
                open={this.state.editionDialogOpen}
                onClose={() => {this.setState({...this.state, editionDialogOpen:false})}}
                onSuccess={this._loadUser}
                userId={localStorage.userId} />
            </>
        );
    }
}