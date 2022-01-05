const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();
    console.log('Contract Address: ', waveContract.address);

    // Get Contract Balance
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBalance));

    // Send 2 Waves
    let waveTransaction = await waveContract.wave('First One!');
    await waveTransaction.wait();

    let waveTransaction2 = await waveContract.wave('Second One!');
    await waveTransaction2.wait();

    // Let's see what changed
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBalance));

    let waveArray = await waveContract.getAllWaves();
    console.log(waveArray);
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