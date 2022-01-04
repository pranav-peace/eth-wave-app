const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log('Contract Address: ', waveContract.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log('Total Waves: ', Number(waveCount));

    let waveTransaction = await waveContract.wave('A message!');
    await waveTransaction.wait();

    const [_, randomPerson] = await hre.ethers.getSigners();
    waveTransaction = await waveContract.connect(randomPerson).wave('Another message :)');
    await waveTransaction.wait();

    let waveArray = await waveContract.getAllWaves();
    console.log('Final wave count:', Number(waveCount));
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();