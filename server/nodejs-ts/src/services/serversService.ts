import runQuery from "../db/dal";
import { ResultSetHeader } from "mysql2";

type serverData = {
    id: number;
    name: string;
    ip_address: string;
    company_id: number;
    status: boolean;
    created_at: Date;
    company_name: string;
};

export async function getServers(): Promise<serverData[]> {
    let q = `SELECT server.id, server.name, server.ip_address, server.company_id, server.status, server.created_at, company.company_name FROM server JOIN company ON server.company_id = company.id;`;
   const servers = await runQuery(q);
   return servers
}

export async function updateStatus(id: number, newValue: boolean) {
    let q = `UPDATE server SET status= ${newValue} WHERE id=${id};`;
    const res = (await runQuery(q)) as ResultSetHeader | any;
    if (res.affectedRows === 0){
        console.log("Warning: try to update non-exists park");        
    }    
   }

