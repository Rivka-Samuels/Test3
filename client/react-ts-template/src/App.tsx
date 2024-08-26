import React, { useEffect, useState } from "react";
import ServerCard from "./components/serverCard/serverCard";
import { fetchAllServers } from "./Services/ServersService";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import { serverType } from "./types/serverType";
import ServerList from "./components/ServerList/serverList";

function App() {
    const [servers, setServers] = useState<serverType[]>([]);
    const [filteredServers, setFilteredServers] = useState<serverType[]>([]);

    useEffect(() => {
        fetchServers();
    }, []);

    const fetchServers = async (updateFiltered = true) => {
        try {
            const servers = await fetchAllServers();
            if (servers) {
                setServers(servers);
                setFilteredServers(servers);
            }
        } catch (error) {
            console.error("Error fetching servers:", error);
        }
    };

    return (
        <div className="app-container">
            <header>
            
            <h1>Server management</h1>
            </header>
            <ServerList servers={servers} setFilteredServers={setFilteredServers} />
            <div className="server-list">
                {filteredServers.map((s) => (
                    <ServerCard key={s.id} server={s} fetchServers={fetchServers} />
                ))}
            </div>
            <h5>The design is from a template I made for the parking project</h5>
        </div>
    );
}

export default App;
