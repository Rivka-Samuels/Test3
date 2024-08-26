
class Config{
    public serversUrl = "http://localhost:4000/api/v1/servers";
}
const appConfig = new Config(); // Singleton
export default appConfig;
