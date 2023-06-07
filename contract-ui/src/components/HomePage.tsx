import {
    useBalance,
    useBlockHeader,
    useBlockHeaders,
    useCall,
    useCallSubscription,
    useChainRpc,
    useChainRpcList,
    useContract,
    useDryRun,
    useEventSubscription,
    useEvents,
    useInstalledWallets,
    useTx,
    useTxPaymentInfo,
    useUninstalledWallets,
    useWallet,
  } from 'useink';

import abi from '../abi/erc20.json';
import { useNotifications, useTxNotifications } from 'useink/notifications';
import { RustResult, formatBalance, isBroadcast, isFinalized, isInBlock, isPendingSignature, pickDecoded, pickDecodedError, pickResultErr, pickResultOk, pickTxInfo, shouldDisable } from 'useink/utils';

const SHIBUYA_CONTRACT_ADDRESS = 'bLpkbBpjkrRMxwZcMsaQMKmczrSYwbgyidfiAAseiCKq753';

const HomePage = () => {

    const shibuyaContract = useContract(SHIBUYA_CONTRACT_ADDRESS, abi, 'shibuya-testnet');
    const shibuyaFlipTx = useTx(shibuyaContract, 'flip');
    useTxNotifications(shibuyaFlipTx); // Add a notification on tx status changes
    const shibuyaGetSubcription = useCallSubscription<boolean>(shibuyaContract, 'get');

    return (
        <div>

              <h3 className="text-xl">
                Shibuya Flipped:{' '}
                {pickDecoded(shibuyaGetSubcription.result)?.toString() || '--'}
              </h3>


              <h3 className="text-xl">
                <b>Status:</b> {shibuyaFlipTx.status}
              </h3>

              <button
                onClick={() => shibuyaFlipTx.resetState()}
                disabled={shouldDisable(shibuyaFlipTx) || ['InBlock', 'None'].includes(shibuyaFlipTx.status)}
                className="rounded-2xl text-white px-6 py-4 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 hover:disabled:bg-blue-300 transition duration-75"
              >
                Reset state
              </button>

       </div>
    );
};

export default HomePage;
