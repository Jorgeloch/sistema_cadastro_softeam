const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
            return {
                DBConnectionString: "mongodb+srv://user_db:njB6sH0zRaRI291Q@clustersofteam.iqsjr3x.mongodb.net/?retryWrites=true&w=majority",
                JWTPassword: "senha1234",
                JWTExpiresIn: "1d"
            }
    }
}
console.log(`working at ${env.toUpperCase()} environment`)
module.exports = config()