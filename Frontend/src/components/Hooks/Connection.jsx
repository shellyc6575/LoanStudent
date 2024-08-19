import React, { useState, useEffect, useContext, useMemo } from "react";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { LightSmartContractAccount } from "@alchemy/aa-accounts";
import { ParticleSigner } from "@tabascoweb3/aa-signers/particle";
import { polygonMumbai } from "viem/chains";
import {Web3} from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai.infura.io/v3/95688893704a4d5bac083296c3547383"));
const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

const AlchemyContext = React.createContext({
  ownerAddress: undefined,
  accountAddress: undefined,
  provider: undefined,
  handleLogin: undefined,
  userInfo: undefined,
  loading: undefined,
  Logout: undefined,
});

export const UseAlchemy = () => {
  return useContext(AlchemyContext);
};

export const BiconomyProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [accountAddress, setAccountAddress] = useState(null);
  const [ownerAddress, setOwnerAddress] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [providerState, setProviderState] = useState(null);

  const particleSigner = useMemo(() => new ParticleSigner({
    projectId: "2509d133-0dd5-409a-bf0d-7db2b6648bbf",
    clientKey: "cbdskjEjAxMDhYksv0ubDZo51l599QCOHZqBpPA0",
    appId: "efb5c91d-cfae-49d5-bacb-8b30e35e83f9",
    chainName: "polygon",
    chainId: 80001,
  }), []);

  useEffect(() => {
    const checkLogin = async () => {
      if (particleSigner.inner.auth.isLogin()) {
        setUserInfo(await particleSigner.getAuthDetails());
      }
    };
    checkLogin();
  }, [particleSigner]);

  const handleLogin = async () => {
    setLoading(true);

    if (!particleSigner.inner.auth.isLogin()) {
      await particleSigner.authenticate({
        loginOptions: {},
        login: async (loginOptions) => {
          await particleSigner.inner.auth.login(loginOptions);
        },
      });
    }

    setUserInfo(await particleSigner.getAuthDetails());

    const provider = await initializeProvider(particleSigner);
    setProviderState(provider);

    if (provider?.account?.owner) {
      const owner = await provider.account.owner.getAddress();
      const smart = await provider.getAddress();
      localStorage.setItem("filWalletAddress",await provider.getAddress());
      const balanceWei = await web3.eth.getBalance(await provider.getAddress());
      
      // Convert Wei to Ether (assuming Ethereum)
      const balanceEther = web3.utils.fromWei(balanceWei, "ether");
      localStorage.setItem("smartbal",balanceEther);
      
      localStorage.setItem("CheckLogin","Yes");
      setOwnerAddress(owner);
      setAccountAddress(smart);
    }

    setLoading(false);
    
  };

  const Logout = () => {
    localStorage.clear();
    setAccountAddress(null);
    setOwnerAddress(null);
  };

  const initializeProvider = async (particleSigner) => {
    return new AlchemyProvider({
      apiKey: "6efwtYfRltPbAdgTp0QiLYddDimdOLbd",
      chain: polygonMumbai,
      entryPointAddress,
    }).connect(rpcClient => new LightSmartContractAccount({
      entryPointAddress,
      chain: rpcClient.chain,
      owner: particleSigner,
      factoryAddress: "0x000000893A26168158fbeaDD9335Be5bC96592E2",
      rpcClient,
    }));
  };

  return (
    <AlchemyContext.Provider
      value={{
        ownerAddress: ownerAddress,
        accountAddress: accountAddress,
        provider: providerState,
        userInfo: userInfo,
        handleLogin,
        loading,
        Logout,
      }}
    >
      {children}
    </AlchemyContext.Provider>
  );
};
