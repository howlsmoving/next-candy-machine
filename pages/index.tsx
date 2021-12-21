/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { useEffect, useState } from "react";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import useCandyMachine from "../hooks/useCandyMachine";
import useWalletBalance from "../hooks/useWalletBalance";
import { useWallet } from "@solana/wallet-adapter-react";

import { Toaster } from "react-hot-toast";
import Countdown from "react-countdown";
import useWalletNfts from "../hooks/useWalletNFTs";
import AnNFT from "../components/AnNFT/AnNFT";

import Image from "next/image"
import bg from "../public/bg.png"
import showcase from "../public/showcase.gif"


export default function Home() {
  const [balance] = useWalletBalance();
  const {
    isSoldOut,
    mintStartDate,
    isMinting,
    startMint,
    startMintMultiple,
    nftsData,
  } = useCandyMachine();

  const [isLoading, nfts] = useWalletNfts();

  const { connected } = useWallet();

  const [isMintLive, setIsMintLive] = useState(false);

  useEffect(() => {
    if (new Date(mintStartDate).getTime() < Date.now()) {
      setIsMintLive(true);
    }
  }, []);

  const MintMany = () => {
    const [mintCount, setMintCount] = useState(5);

    return (
      <>
        <button
          onClick={() => startMintMultiple(mintCount)}
          disabled={isMinting}
          className="px-4 py-2 mx-auto font-bold text-white transition-opacity rounded-lg hover:opacity-70 bg-gradient-to-br from-green-300 via-blue-500 to-purple-600"
        >
          {isMinting ? "loading" : `mint ${mintCount}`}
        </button>

        <input
          disabled={isMinting}
          type="number"
          min={2}
          max={10}
          className="px-2 mx-auto mt-5 font-bold text-white bg-gray-500"
          value={mintCount}
          onChange={(e) => setMintCount((e.target as any).value)}
        />
        <p className="mx-auto mt-2">min 2; max 10;</p>
      </>
    );
  };

  return (
    <>
      <Head>
        <title>next-candy-machine</title>
        <meta
          name="description"
          content="Simplified NextJs with typescript example app integrated with Metaplex's Candy Machine"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center relative overflow-hidden sm:py-12">

        {/* <Image className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none w-screen" src={bg}/> */}
        <img src="/bg.png" className="absolute h-screen w-screen top-0"/>
      <div className="relative px-4 pt-10 pb-8 bg-white shadow-xl ring-1 ring-gray-900/5 mx-6 rounded-lg sm:rounded-lg sm:mx-12 md:mx-16 sm:px-10">
        <Toaster />
        <div className="flex items-center justify-between w-full mt-3"
        >
          <div className="-m-4 -mt-10 flex items-center">
            <img className="h-32" src="/logo.png"/>
            <p className="text-2xl">Hammurabi</p>
          </div>
          <div className="flex items-center">
            {connected && (
              <div className="flex items-end mr-2">
                <p className="text-xs text-gray-400">Balance: </p>
                <p className="mx-1 font-bold leading-none">
                  {balance.toFixed(2)}
                </p>
                <p
                  className="font-bold leading-none text-transparent bg-clip-text"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, #00FFA3, #03E1FF, #DC1FFF)`,
                  }}
                  >
                  SOL
                </p>
              </div>
            )}
            <WalletMultiButton/>
          </div>
        </div>
        <div className="flex items-start justify-center w-11/12 my-10">
          {connected ? (
            <>
              {new Date(mintStartDate).getTime() < Date.now() ? (
                <>
                  {isSoldOut ? (
                    <p>SOLD OUT</p>
                    ) : (
                      <>
                      <div className="flex flex-col w-1/2">
                      {connected && (
                            <div className="text-center p-6">
                              
                              <div className="">

                              <Image className="rounded-full shadow-md" src={showcase} />
                              </div>

                              <div className="mr-auto text-sm font-bold text-lg">
                                <span className="">Hammurabis Available: </span>
                                {nftsData.itemsRemaining}
                                <p>
                                {nftsData.itemsRedeemed} / 1000 MINTED
                                </p>
                                <p>
                                TOTAL NFT SUPPLY: 
                                {nftsData.itemsAvailable}
                                </p>
                              </div>
                            </div>
                            )}
                        <h1 className="mb-10 text-4xl text-center font-bold">MINT PRICE: 0.1 SOL</h1>
                        <button
                          onClick={startMint}
                          disabled={isMinting}
                          className="px-4 py-2 mx-auto font-bold text-white text-5xl bg-yellow-300 hover:bg-yellow-500 shadow-lg"
                          >
                          {isMinting ? "loading" : "mint 1"}
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <Countdown
                date={mintStartDate}
                onMount={({ completed }) => completed && setIsMintLive(true)}
                onComplete={() => setIsMintLive(true)}
                />
                )}
            </>
          ) : (
            <div className="flex-none">
            
            <p className="text-2xl font-bold">Connect Wallet to Mint</p>
            <br />

            <div className="flex text-2xl">
            <p>NFTS AVAILABLE: </p>
            <p className="px-2"> {nftsData.itemsAvailable}</p>
            </div>
            </div>
            )}
        </div>
        {/* <div className="flex flex-col w-full">
          <h2 className="text-2xl font-bold">My NFTs</h2>
          <div className="flex mt-3 gap-x-2">
            {(nfts as any).map((nft: any, i: number) => {
              return <AnNFT key={i} nft={nft} />;
            })}
          </div>
        </div> */}
      </div>
            </div>
    </>
  );
}
