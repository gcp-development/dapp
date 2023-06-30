import { WsProvider,ApiPromise } from '@polkadot/api';
import { web3Accounts,web3Enable } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types"
import { ChangeEvent, useEffect,useState } from 'react';
import Home from './components/Home';
import "./App.css";

const NAME="RococoContracts";
const WS_PROVIDER="wss://rococo-contracts-rpc.polkadot.io";

const App=()=> {

  const[api,setApi]= useState<ApiPromise>();
  const[accounts,setAccountsList]= useState<InjectedAccountWithMeta[]>([]);
  const[selectedAccount,setSelectedAccount]= useState<InjectedAccountWithMeta>();

  const createInstance = async() => {
    //Create an instance
    //https://polkadot.js.org/docs/api/start/create/
    const wsProvider=new WsProvider(WS_PROVIDER);
    const api = new ApiPromise({ provider: wsProvider });
    await api.isReady;
    console.log(api.genesisHash.toHex());
    setApi(api);
  };
  
  useEffect(()=>{
    createInstance();
  },[]);

  const onClickConnection = async () => {
    const extensions=await web3Enable(NAME);

    if(!extensions){
      throw Error("No extensions");
    }
    
    const accountsList= await web3Accounts();

    setAccountsList(accountsList);

    if(accountsList.length===1)
    {
      console.log(accountsList);
    }    
  };
  
  const onChangeAddress = async (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    
    const address=accounts.find(
      (account)=> account.address=== value
    );

    setSelectedAccount(address);
  };
 
  return (
    <div className="div">
    {accounts.length === 0 ? (
      <button onClick={onClickConnection} > Connect</button>
      ):null}

    {accounts.length>0 && !selectedAccount ? (
      <>
      <select onChange={onChangeAddress} defaultValue={'DEFAULT'} className="select" >
      <option value="DEFAULT" disabled>
          Choose one
        </option>
        {accounts.map((account)=>(
        <option key={account.address} value={account.address}>{account.meta.name || account.address}</option>
        ))}
        </select>
      </>
    ):null}
     {selectedAccount ? <>
     <Home api={api} accountsList={accounts} web3Account={selectedAccount}></Home>
     </> :null}
    </div>
  );
}

export default App;