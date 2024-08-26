import React from 'react';
import { serverType } from '../../types/serverType';
import { Form } from 'react-bootstrap';
import { updateStatus } from '../../Services/ServersService';
import './ServerCard.css';

type Props = {
    server: serverType;
    fetchServers: (updateFiltered?: boolean) => Promise<void>;      
}

const ServerCard: React.FC<Props> = (props: Props) => {

    const handleToggle = async () => {
        try {
            await updateStatus(props.server.id, !props.server.status);
            await props.fetchServers(false);
        } catch (error) {
            console.error("Error updating server status:", error);
        }
    };

    return (
        <div className="server-card">
            <h3>-- {props.server.name} --</h3>
            <p><strong className="server-card-label">IP Address: </strong>{props.server.ip_address}</p>
            <p><strong className="server-card-label">Company: </strong>{props.server.company_name}</p>
            <p><strong className="server-card-label">Created on: </strong>{new Date(props.server.created_at).toLocaleDateString()}</p>

            <div className="server-card-footer">
                <Form.Check
                    type="switch"
                    label={`Status: ${props.server.status ? 'Active' : 'Inactive'}`}
                    checked={props.server.status}
                    onChange={handleToggle}
                />
            </div>                        
            
        </div>
    );
};

export default ServerCard;
