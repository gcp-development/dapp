import { WsProvider,ApiPromise } from '@polkadot/api';
import { web3Accounts,web3Enable } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types"
import { ChangeEvent, useEffect,useState } from 'react';

const NAME="RococoContracts";

const App=()=> {
  const[api,setApi]= useState<ApiPromise>();
  const[accounts,setAccountsList]= useState<InjectedAccountWithMeta[]>([]);
  const[selectedAccount,setSelectedAccount]= useState<InjectedAccountWithMeta>();

  //parachainInfo.parachainId
  //const[paraChainInfo,setParaChainInfo]= useState(0);


  const setup = async() => {
    const wsProvider=new WsProvider("wss://rococo-contracts-rpc.polkadot.io");
    const api = new ApiPromise({ provider: wsProvider });
    await api.isReady;
    console.log("The api is ready.");
    setApi(api);
  };

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


  useEffect(()=>{
    setup();
  },[]);


  useEffect( () => {
    if(!api) return;

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions 
    (async () => {
      //State Queries
      const now = await api.query.timestamp.now();
      console.log(now.toPrimitive());

      //const { nonce, data: balance } = await api.query.system.account(address);

      const parachainId = await api.query.parachainInfo.parachainId();
      console.log("Parachain Id: " + parachainId.toPrimitive());

      //RPC calls
      const chainName = await api.rpc.system.chain();
      console.log("Chain Name: " + chainName.toPrimitive());

    })();

  },[api]);

  return (
    <div style={styles.container}>
    {accounts.length === 0 ? (
      <button onClick={onClickConnection} style={styles.button}> Connect</button>
      ):null}

    {accounts.length>0 && !selectedAccount ? (
      <>
      <select onChange={onChangeAddress} defaultValue={'DEFAULT'} style={styles.select}>
      <option value="DEFAULT" disabled>
          Choose one
        </option>
        {accounts.map((account)=>(
        <option key={account.address} value={account.address}>{account.address}</option>
        ))}
        </select>
      </>
    ):null}

     {selectedAccount ? <>{selectedAccount.address}</> :null}

    </div>
  );
}

export default App;


const styles: { [name: string]: React.CSSProperties } = {
  container: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  select: {
    padding: 5,
    width: 200,
  },
  result: {
    marginTop: 30,
  },
};
