import runQuery from "./dal"

const createTables = async () => {

    let Q = `
    CREATE TABLE IF NOT EXISTS company  (
        id INT AUTO_INCREMENT PRIMARY KEY,
        company_name ENUM('Microsoft', 'IBM', 'GoDaddy', 'DigitalOcean') NOT NULL
        );`

   await runQuery(Q);

     Q = `

    CREATE TABLE IF NOT EXISTS server (
    id INT AUTO_INCREMENT PRIMARY KEY,  
    name VARCHAR(100) NOT NULL,          
    ip_address VARCHAR(45) NOT NULL,   
    company_id INT,                    
    status BOOLEAN NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (company_id) REFERENCES company(id)
    );`     
    await runQuery(Q)
}

const createSampleData = async () => {

    let Q = `
    INSERT INTO company (company_name) VALUES
    ('Microsoft'),
    ('IBM'),
    ('GoDaddy'),
    ('DigitalOcean');
    `;
    await runQuery(Q);

    Q = `
    INSERT INTO server (name, ip_address, company_id, status) VALUES
    ('Server1', '192.168.1.1', 1, TRUE),
    ('Server2', '192.168.1.2', 2, TRUE),
    ('Server3', '192.168.1.3', 3, FALSE),
    ('Server4', '192.168.1.4', 4, TRUE);
    `;
    await runQuery(Q);
}



// createTables().then(() => {
    // console.log("Done creating tables");
// })
// 
// createSampleData().then(()=>{console.log("Done adding data");})

// **************************************************
// ts-node ./src/db/initialDB.ts
