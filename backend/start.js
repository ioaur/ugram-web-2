const { exec } = require("child_process");

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

class ServiceMonitor {
    constructor(services) {
        this.services = services;
    }
    async monitor() {
        let status = {
            url: {},
            alias: {},
        };

        for (let service of this.services) {
            for (let index = 0; index < service.attempts; index++) {
                await sleep(service.timeout);
                let isAlive = await this.ping(service);
                status.url[`${service.address}:${service.port}`] = isAlive;
                status.alias[service.service] = isAlive;
                if (isAlive) break;
            }
        }

        exec("ping postgres", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });

        setTimeout(
            () =>
                exec("yarn migration:run", (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                }),
            5 * 1000
        );

        setTimeout(
            () =>
                exec("nest start --watch", (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                }),
            10 * 1000
        );

        return status;
    }
    ping(connection) {
        return new Promise((resolve, reject) => {
            const tcpp = require("tcp-ping");
            tcpp.ping(connection, (err, data) => {
                let error = data.results[0].err;
                if (!error) {
                    resolve(true);
                }
                if (error) {
                    resolve(false);
                }
            });
        });
    }
}

(async function test() {
    let services = [
        {
            service: "postgres",
            address: "0.0.0.0",
            port: 5432,
            timeout: 1000,
            attempts: 20,
        },
    ];
    status = await new ServiceMonitor(services).monitor();
    console.log(status);
})();
