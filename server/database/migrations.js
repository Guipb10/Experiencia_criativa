const Register = require('./register');
const Marker = require('./marker');

module.exports = function runMigrations() {
    Register.sync({force:false})
        .then(() => {
            console.log('Migration da tabela "users" executada com sucesso.')
            Marker.sync({force:false})
                .then(() => {
                    console.log('Migration da tabela "markers" executada com sucesso.')
                })
                .catch((error) => console.log('Erro ao executar migration da tabela "markers": ', error));
        })
        .catch((error) => console.log('Erro ao executar migration da tabela "users": ', error));
}