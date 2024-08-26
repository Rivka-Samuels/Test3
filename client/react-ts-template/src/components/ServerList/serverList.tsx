import React, { useState, useCallback, useEffect } from 'react';
import { serverType } from '../../types/serverType';
import './serverList.css'; 

type Props = {
    servers: serverType[];
    setFilteredServers: (servers: serverType[]) => void;
}

const ServerList = ({ servers, setFilteredServers }: Props) => {
    const [onlyActive, setOnlyActive] = useState<boolean>(false);
    const [sortByNewDate, setSortByNewDate] = useState<boolean>(false); 

    const handleOnlyActive = () => {
        setOnlyActive(prev => !prev);
    };

    const handleSortByNewDate = () => {
        setSortByNewDate(prev => !prev);
    };

    const handleClear = () => {
        setOnlyActive(false);
        setSortByNewDate(false); 
        setFilteredServers(servers); 
    };

    const handleAll = () => {
        setFilteredServers(servers);
    };

    const filterServer = useCallback(() => {
        let filteredServers = servers;

        if (onlyActive) {
            filteredServers = filteredServers.filter(s => s.status);
        }

        if (sortByNewDate) {
            filteredServers = filteredServers.slice().sort((a, b) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
        }

        setFilteredServers(filteredServers);
    }, [onlyActive, sortByNewDate, servers, setFilteredServers]); 

    useEffect(() => {
        filterServer();
    }, [filterServer]);

    return (
        <div className="filter-header">
            <div className="filter-option">
                <input
                    type='checkbox'
                    checked={onlyActive}
                    onChange={handleOnlyActive}
                />
                <label>Show only Active</label>
            </div>
            <div className="filter-option">
                <div className="button-group">
                    <button onClick={handleSortByNewDate}>Sort by New Date</button>
                    <button onClick={handleAll}>All</button>
                    <button onClick={handleClear}>Clear</button>
                </div>
            </div>
        </div>
    );
};

export default ServerList;
