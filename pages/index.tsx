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
        <title>Hammurabi's</title>
        <meta
          name="description"
          content="Simplified NextJs with typescript example app integrated with Metaplex's Candy Machine"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-600 flex flex-col justify-center items-center bg-bg-img bg-cover overflow-hidden">

        {/* <Image className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none w-screen" src={bg}/> */}
        <div className="absolute h-screen w-full top-0">

            {/* <img src="/bg.png" className="absolute w-full h-screen top-0"/> */}
            {/* <div className="h-24 b-red-300 text-2xl">Hey</div> */}
        </div>
        
      <div className="relative flex flex-col items-center justify-center px-4 pt-10 mt-20 bg-white shadow-xl ring-1 ring-gray-900 mx-6 rounded-lg sm:rounded-lg sm:mx-12 md:mx-16 lg:w-3/5 sm:px-10">
        <Toaster />
        <div className="flex w-full mt-3"
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
        <div className="flex items-start justify-center w-full my-10">
          {connected ? (
            <>
              {new Date(mintStartDate).getTime() < Date.now() ? (
                <>
                  {isSoldOut ? (
                    <p>SOLD OUT</p>
                    ) : (
                      <>
                      <div className="flex flex-col w-3/4">
                      {connected && (
                            <div className="text-center p-6">
                              
                              <div className="">

                              <Image className="rounded-full shadow-md" src={showcase} />
                              </div>

                              <div className="mr-auto text-sm font-bold text-lg">
                                <span className="">NFTS Available: </span>
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
                          className="px-4 my-10 py-2 mx-auto font-bold text-white text-5xl bg-yellow-300 hover:bg-yellow-500 shadow-lg"
                          >
                          {isMinting ? "loading" : "mint 1"}
                        </button>
                        <p className="text-center text-lg mx-10">To celebrate the launch of Babylon, archaeological research has uncovered many mosaics of Hammurabi, king of Babylon well ahead of his time. Try to mint some of these mosaics, and win some special roles, and maybe a place among the Uruks.</p>
            
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
            <div className="flex flex-col w-1/2">
            
            <p className="text-2xl text-center font-bold">Join Babylon</p>
            <br />
            <p className="text-2xl text-center font-bold">Connect Wallet to Mint</p>
            <br />

            <div className="flex text-2xl">
            
                            <div className="text-center p-6">
                              
                              <div className="">

                              <Image className="rounded-full shadow-md" src={showcase} />
                              </div>

                              <div className="mr-auto text-sm font-bold text-lg">
                                <span className="">NFTS Available: </span>
                                {nftsData.itemsRemaining}
                                <p>
                                {nftsData.itemsRedeemed} / 1000 MINTED
                                </p>
                                <p>Contract : </p>
                                <p className="text-gray-400 text-sm">Minted on the Solana Mainnet</p>

                                {/* <p>
                                TOTAL NFT SUPPLY: 
                                {nftsData.itemsAvailable}
                                </p> */}
                              </div>
                            </div>
        
            </div>
            <p className="text-center text-lg -mx-10">To celebrate the launch of Babylon, archaeological research has uncovered many mosaics of Hammurabi, king of Babylon well ahead of his time. Try to mint some of these mosaics, and win some special roles, and maybe a place among the Uruks.</p>
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
      <div className="flex justify-center space-x-14 md:space-x-48 bg-gradient-to-t from-green-600  min-h-20 to-transparent -translate-y-12 h-32 w-screen">

        <a href="https://discord.gg/JQecN2HU">
          <img src="https://img.icons8.com/ios/50/000000/discord-logo--v1.png"/>
        </a>
        <a href="https://twitter.com/BabylonDao">
        <img src="https://img.icons8.com/ios/50/000000/twitter--v1.png"/>
        </a>
        <a href="https://babylondao.finance/#/">
        <img width="50px" src="https://img.icons8.com/material-outlined/96/000000/link--v1.png"/>
        </a>

      </div>
            </div>
            {/* <div className="bg-red-300">Hey</div> */}
    </>
  );
}
