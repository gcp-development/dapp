import { useEffect, useState, FormEvent } from 'react';
import { ApiPromise } from '@polkadot/api';
import { BN, BN_TWO, formatBalance } from '@polkadot/util';
import { ContractPromise } from '@polkadot/api-contract';
import type { WeightV2 } from '@polkadot/types/interfaces'
import { web3FromAddress } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types"
import abi from '../abi/erc20.json';
import "./Home.css";

const CONTRACT_ADDRESS="5DWNgGWW63qgN9YEEAni7KwNgTcbbNoqd673PXdH6BptMmX4";
const CONTRACT_TRANSFER_AMOUNT=0.0000000000005;

type TransferForm = {
  amount: string;
};

export  default function Home({api, accountsList, web3Account}:{api?:ApiPromise, accountsList:InjectedAccountWithMeta[], web3Account: InjectedAccountWithMeta})  {

  const [balance,setBalance]= useState<BN>();
  const [parachainEpoch,setParachainEpoch]= useState<string>();
  const [parachainId,setParachainId]= useState<string>();
  const [parachainName,setParachainName]= useState<string>();
  const [toAddress,setToAddress]= useState<string>();
  const [form, setForm] = useState<TransferForm>({amount: '',});

  useEffect( () => {
    if(!api) return;

    if(accountsList[0].address===web3Account.address)
      setToAddress(accountsList[1].address);
    else
      setToAddress(accountsList[0].address);

    formatBalance.setDefaults({ unit: 'ROC' });
   
  },[api,accountsList,web3Account]);

  useEffect(() => {
    if(!api) return;

    if(!web3Account) return;
    //Query subscriptions
    //https://polkadot.js.org/docs/api/start/api.query.subs
    api.query.system.account(web3Account.address,({data:{free}}:{data:{free:BN}})=>{
      setBalance(free)
    });
  },[api,web3Account]);

  useEffect(() => {
    if(!api) return;

    (async () => {
      //State queries
      //https://polkadot.js.org/docs/api/start/api.query
      const parachainEpoch = await api.query.timestamp.now();
      setParachainEpoch(parachainEpoch.toPrimitive()?.toString()); 
      console.log("Parachain Epoch: ",parachainEpoch.toPrimitive());

      //RPC queries
      //https://polkadot.js.org/docs/api/start/api.rpc
      const parachainId = await api.query.parachainInfo.parachainId();
      setParachainId(parachainId.toString());
      console.log("Parachain Id: " + parachainId.toString());

      const parachainName = await api.rpc.system.chain();
      setParachainName(parachainName.toPrimitive().toString());
      console.log("Parachain Name: " + parachainName.toPrimitive());
   
    })();
  },[api,setParachainEpoch,setParachainId,setParachainName]);

  async function submitExtrinsicForm(e: FormEvent<HTMLFormElement>) {
    //ExtrinsicTransactions
    //https://polkadot.js.org/docs/api/start/api.tx
    if(!api) return;
    if(!web3Account) return;
    e.preventDefault();
    const AMOUNT = new BN(form.amount).mul(new BN(10).pow(new BN(12)));
    const injector= await web3FromAddress(web3Account.address);
    
    const txHash = await api.tx.balances.transfer(toAddress, AMOUNT)
    .signAndSend(web3Account.address,
     {
       signer:injector.signer
     }
     );
     console.log('Submitted details:', form.amount);
     console.log(txHash.toPrimitive());
  };

  async function submitContractForm(e: FormEvent<HTMLFormElement>) {
    //Contract Transactions
    //https://polkadot.js.org/docs/api-contract/start/contract.tx
    if(!api) return;
    if(!web3Account) return;
    e.preventDefault();
    const contract = new ContractPromise(api,abi, CONTRACT_ADDRESS);
    //Get the Weights V2 from the chain
    // @ts-ignore
    const maxBlock = api.consts.system.blockWeights.maxBlock;
    console.log("WeightV2: " + maxBlock);
    const storageDepositLimit=null;
    const VALUE =new BN(CONTRACT_TRANSFER_AMOUNT);
    const injector= await web3FromAddress(web3Account.address);

    //Dry-run
    const { gasRequired, storageDeposit, result } = await contract.query.transfer(
      web3Account.address,
      {
        gasLimit: api?.registry.createType('WeightV2', maxBlock) as WeightV2,
        storageDepositLimit,
      },
      toAddress,
      VALUE,
    );

    if (result.isOk) {
      console.log('gasRequired', gasRequired.toHuman());
      console.log('storageDeposit', storageDeposit.toHuman());

      const estimatedGas = api.registry.createType(
        'WeightV2',
        {
          refTime: gasRequired.refTime.toBn().mul(BN_TWO),
          proofSize: gasRequired.proofSize.toBn().mul(BN_TWO),
        }
      ) as WeightV2

     const txHash = await contract.tx.transfer(
       {
        gasLimit:estimatedGas,
        storageDepositLimit: null,
       },
       toAddress,
       VALUE
     )
     .signAndSend(web3Account.address,
      {
        signer:injector.signer
      }
      );

      console.log(txHash.toPrimitive());
    } else {
      console.error('Error', result.asErr);
    }
  };

  return (
     <div className="container">
      <div>
        <h2 className="title text-3xl font-bold underline mb-3">aDapp</h2>
        <p className="mb-3">Account selected name: {web3Account.meta.name}</p>
      </div>
      <div >
        <p className="mb-3">Account selected address: {web3Account.address}</p>
        <p className="mb-3">Account selected balance: {formatBalance(balance, { withSiFull: true })}</p>
      </div>
      <hr></hr>
      <form onSubmit={submitExtrinsicForm}>
        <h3>Extrinsic transaction</h3>
        <p className="mb-3">Parachain Id: {parachainId}</p>
        <p className="mb-3">Parachain Name: {parachainName}</p>
        <p className="mb-3">Parachain Epoch: {parachainEpoch}</p>
        <div>
          <label htmlFor="amount">Transfer the amount </label>
          <input
              type="number"
              id="amount"
              value={form.amount}
              
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          <label htmlFor="address">, to the address {toAddress}.</label>
        </div>
        <div>
          <button type="submit" className="mt-2 h-10 px-6 font-semibold bg-black text-white">
              Submit
          </button>
        </div>
      </form>
      <hr></hr>
      <form onSubmit={submitContractForm}>
        <h3>Contract transaction</h3>
        <p className="mb-3">Contract address: {CONTRACT_ADDRESS}</p>
        <p className="mb-3">Parachain Id: {parachainId}</p>
        <p className="mb-3">Parachain Name: {parachainName}</p>
        <p className="mb-3">Parachain Epoch: {parachainEpoch}</p>
        <div>
          <label htmlFor="amount">Transfer {CONTRACT_TRANSFER_AMOUNT.toFixed(13)} ROC, to the address {toAddress}. </label>
        </div>
        <div>
          <button type="submit" className="mt-2 h-10 px-6 font-semibold bg-black text-white">
              Submit
          </button>
        </div>
      </form>
    </div>
  );
}