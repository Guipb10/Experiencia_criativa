const express = require("express");
const app = express();
const cors = require('cors');
const alert = require('alert');
const bcrypt = require("bcryptjs");
const passport = require('passport');

const connection = require('./database/database');
const Register = require('./database/register');
const Marker = require('./database/marker');

const jwt = require('./jwt');

const jwtSecret = "EXPCRIATIVABSI2021";

app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(passport.initialize());
passport.use('jwt', jwt.strategy.jwt);
passport.use('none', jwt.strategy.none);

const runMigrations = require('./database/migrations');
runMigrations();

//Sequelize connection
connection
    .authenticate().then(() => {
        console.log("Database connection successfull")
    })
    .catch((errorMsg) =>{
        console.log(errorMsg);
    });


app.post('/register', (req,res) =>{
    const {email, password, username, phone, confirmPassword, admin} = req.body;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    Register.findOne({where:{email:email}}).then( user => {
        if(user == undefined && password == confirmPassword){
            Register.create({
                email,
                password: hash,
                username,
                phone,
                admin
            }).then((data) =>{
                res.json(data);
            });
        }else{
            alert("Este e-mail já foi cadastrado ou as senhas não coincidem");
        }
    })
});

app.post('/login',(req, res)=>{
    var email = req.body.email;
    var password = req.body.password;

    Register.findOne({where:{email:email}}).then(user =>{
        if(user != undefined){
            var correct = bcrypt.compareSync(password, user.password);
            if(correct){
                res.json({id:user.id, email:user.email, username: user.username, admin: user.admin, token:jwt.createToken(user)});
            }else{
                alert("E-mail ou senha inválidos")
            }
        }else{
            alert("Credenciais inexistentes, por favor registre-se");
        }
    });
});


app.put('/user/:id', async (req, res) => {
    let user = await Register.findByPk(req.params.id);

    if(!user) {
        
        res.status(404).json({error:'User not found.'});
    } else {
        let hash;

        
        if(req.body.password) {
            let salt = bcrypt.genSaltSync(10);
            hash = bcrypt.hashSync(req.body.password, salt);
        }

        
        const result = await Register.update(
            {
                email: req.body.email,
                username: req.body.username,
                phone: req.body.phone,
                password: (!hash) ? user.password : hash 
            },
            {
                returning:true,
                where: {id: req.params.id}
            }
        );

        
        user = await Register.findByPk(req.params.id);

        res.json(user);
    }
});


app.get('/users', async (req, res) => {
    const users = await Register.findAll();
    res.json(users);
});

app.get('/user/:id', async (req, res) => {
    const user = await Register.findByPk(req.params.id);

    if(!user)
        res.status(404).json({error:'User not found.'});
    else
        res.json(user);
});


app.delete('/user/:id', async (req, res) => {
    const user = await Register.findByPk(req.params.id);
    if(!user) {
        res.status(404).json({error: 'Usuário não encontrado.'});
    } else {
        try {
            await user.destroy();
            res.sendStatus(200);
        } catch (error) {
            res.status(500).json({error: `Erro ao deletar usuário: ${error}`});
        }
    }
});

app.get('/info',passport.authenticate(['jwt'],{session: false}), (req,res) =>{
    if(req.user.admin == false){
        res.sendStatus(403);
    }else{
        res.json(req.user);
    }
});


app.get('/markers', async (req, res) => {
    const markers = await Marker.findAll();
    res.json(markers);
});


app.post('/marker', async (req, res) => {
    const camposObrigatorios = ['userId', 'tipo', 'latitude', 'longitude'];
    camposObrigatorios.forEach((campo) => {
        if(!req.body[campo]) res.send(400).json(`O campo "${campo}" é obrigatório e não foi informado no corpo da requisição.`);
    });

    const marker = await Marker.create({
        userId:req.body.userId,
        tipo:req.body.tipo,
        latitude:req.body.latitude,
        longitude:req.body.longitude
    });

    res.json(marker);
});


app.delete('/marker/:id', async (req, res) => {
    const marker = await Marker.findByPk(req.params.id);
    if(!marker) {
        res.status(404).json({error: 'Marker não encontrado.'});
    } else {
        try {
            await marker.destroy();
            res.sendStatus(200);
        } catch(error) {
            res.status(500).json({error: `Erro ao deletar marker: ${error}`});
        }
    }
});

//Servidor
app.listen(3001, () => {
    console.log("Server running on port 3001");
});