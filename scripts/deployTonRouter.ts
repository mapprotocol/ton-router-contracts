import { toNano } from '@ton/core';
import { TonRouter } from '../wrappers/TonRouter';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sender = provider.sender().address
    if (!sender) {
        return
    }

    const tonRouter = provider.open(
        TonRouter.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('TonRouter')
        )
    );

    await tonRouter.sendDeploy(provider.sender(), toNano('0.045'));

    await provider.waitForDeploy(tonRouter.address, 200);

    console.log(await tonRouter.getCounter());

    console.log('ID', await tonRouter.getID());
}
