import { useEffect, useState, FormEvent } from 'react';
import { BN, BN_TWO, formatBalance } from '@polkadot/util';
import { ContractPromise } from '@polkadot/api-contract';
import type { WeightV2 } from '@polkadot/types/interfaces'
import { web3Accounts,web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types"
import abi from '../abi/erc20.json';

const CONTRACT_ADDRESS="5DWNgGWW63qgN9YEEAni7KwNgTcbbNoqd673PXdH6BptMmX4";
const DEV_ACCOUNT_I_ADDRESS="5FNXJqU9i14rxvsmfCihVLFeDs68VZPjvqNqwMkGvfX9xiWT";
const DEV_ACCOUNT_II_ADDRESS="5Ev7FnAcuNwoPRF1Txb5YvyjMCeuBaMh8tHzcMqGYrCa3ZFe";


type TransferForm = {
  amount: string;
};

export  default function Home({accountsList, web3Account}:{accountsList:InjectedAccountWithMeta[], web3Account: InjectedAccountWithMeta})  {

/*
    formatBalance.setDefaults({ unit: 'ROC' });
  const[balance,setBalance]= useState<BN>();

  const onClickTransaction = async () => {

    const toAddress = "5Ev7FnAcuNwoPRF1Txb5YvyjMCeuBaMh8tHzcMqGYrCa3ZFe";
    //The API interfaces, only deal with u128 values. "1,000,000,000,000"
    const AMOUNT = new BN(1).mul(new BN(10).pow(new BN(12)));

    if(!api) return;

    if(!selectedAccount) return;

    const injector= await web3FromAddress(selectedAccount.address);

    //Extrinsic call
    const txHash = await api.tx.balances.transfer(toAddress, AMOUNT)
    .signAndSend(selectedAccount.address,
      {
        signer:injector.signer
      }
      );

      console.log(txHash);
  };

  const onClickContractTransaction = async () => {

    if(!api) return;

    if(!selectedAccount) return;

    const contract = new ContractPromise(api,abi, CONTRACT_ADDRESS);

    //get the Weights V2 from the chain
    // @ts-ignore
    const maxBlock = api.consts.system.blockWeights.maxBlock //as unknown as WeightV2
    console.log("WeightV2: " + maxBlock);

    const storageDepositLimit=null;

    const VALUE =new BN(0.0000000000005);

    const injector= await web3FromAddress(DEV_ACCOUNT_I_ADDRESS);

    //dry-run
    const { gasRequired, storageDeposit, result } = await contract.query.transfer(
      selectedAccount.address,
      {
        gasLimit: api?.registry.createType('WeightV2', maxBlock) as WeightV2,
        storageDepositLimit,
      },
      DEV_ACCOUNT_II_ADDRESS,
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


     const txHash = contract.tx.transfer(
       {
        gasLimit:estimatedGas,
        storageDepositLimit: null,
       },
       DEV_ACCOUNT_II_ADDRESS,
       VALUE
     )
     .signAndSend(DEV_ACCOUNT_I_ADDRESS,
      {
        signer:injector.signer
      }
      );

      console.log(txHash);


    } else {
      console.error('Error', result.asErr);
    }
  };


useEffect( () => {
    if(!api) return;

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions 
    (async () => {
      //State Queries
      const now = await api.query.timestamp.now();
      console.log(now.toPrimitive());

      const parachainId = await api.query.parachainInfo.parachainId();
      console.log("Parachain Id: " + parachainId.toPrimitive());

      //RPC calls
      const chainName = await api.rpc.system.chain();
      console.log("Chain Name: " + chainName.toPrimitive());
   
    })();

  },[api]);

  useEffect(() => {
    if(!api) return;

    if(!selectedAccount) return;

    api.query.system.account(selectedAccount.address,({data:{free}}:{data:{free:BN}})=>{
      setBalance(free)
    })

  },[api,selectedAccount]);



        <button onClick={onClickTransaction}>Transfer 0.05 ROC from {selectedAccount.address} to 5Ev7FnAcuNwoPRF1Txb5YvyjMCeuBaMh8tHzcMqGYrCa3ZFe</button>
        <span>Balance:{formatBalance(balance, { withSiFull: true })}</span>
        <button onClick={onClickContractTransaction}>Contract Transfer </button>
            onChange={(e) => setContact({ ...contact, name: e.target.value })}  
*/
  const [toAddress,setToAddress]= useState<string>();
  const [form, setForm] = useState<TransferForm>({amount: '',});

  useEffect( () => {
    if(accountsList[0].address===web3Account.address)
      setToAddress(accountsList[1].address);
    else
      setToAddress(accountsList[0].address);  
  },[accountsList,web3Account]);

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('Submitted details:', form.amount);
/*
    const injector= await web3FromAddress(web3Account.address);
    const txHash = await api.tx.balances.transfer(toAddress, form.amount)
    .signAndSend(web3Account.address,
     {
       signer:injector.signer
     }
     );
     console.log(txHash);*/
  };
    
  

    return (
      <div className="flex flex-col py-10 max-w-md mx-auto">
         <h2 className="text-3xl font-bold underline mb-3">Test Cases</h2>
         <p className="mb-3">Account selected name: {web3Account.meta.name}</p>
         <p className="mb-3">Account selected address: {web3Account.address}</p>
        <form  onSubmit={submitForm}>
          <div  className="flex flex-col mb-2">
            <label htmlFor="amount">Transfer the amount </label>
            <input
              type="decimal"
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
      </div>
    );
  }


  /*

      //The API interfaces, only deal with u128 values. "1,000,000,000,000"
        const AMOUNT = new BN(1).mul(new BN(10).pow(new BN(12)));
    
      
    
    
    
        
  */