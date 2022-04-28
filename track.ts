import {providers} from "ethers";
import {config} from "dotenv";
import * as fs from 'fs';

config();
const ALCHEMY_KEY = process.env.ALCHEMY_KEY;

const ethMainUrl = `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`;
const arbMainUrl = `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`;
const arbTestUrl = `https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`;
const arbNitroUrl = 'https://nitro-devnet.arbitrum.io/rpc';
const optMainUrl = `https://opt-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`;
const optTestUrl = `https://opt-kovan.g.alchemy.com/v2/${ALCHEMY_KEY}`;

const provider = new providers.JsonRpcProvider(arbMainUrl);
const fileName = 'arbData.txt';

async function main() {
    provider.pollingInterval = 500;
    console.log(`Provider polling at every: ${provider.pollingInterval} ms`);
    fs.writeFile(fileName, 'Block Number, Block Timestamp, Prev Block Receive Time, Deviation\n', { flag: 'a+' }, (err) => {})
    let curBlock:providers.Block, prevBlock:providers.Block;
    let prevTime:number, curTime:number;
    provider.on("block", async (blockNumber)=> {
        curBlock = (await provider.getBlock(blockNumber));
        const timestamp = curBlock.timestamp;
        prevTime = curTime;
        curTime = Date.now();
        fs.writeFile(fileName, `${blockNumber}, ${timestamp}, ${Math.round(prevTime/1000)}, ${timestamp-Math.round(prevTime/1000)}\n`, { flag: 'a+' }, (err) => {})
        // console.log(`Mined Block#: ${blockNumber} with block.timestamp: ${timestamp} and deviation: ${timestamp-Math.round(prevTime/1000)} at prevTime:${Math.round(prevTime/1000)} and curTime:${Math.round(curTime/1000)}`);
    })
}

main()