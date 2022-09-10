import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image';

//assets 
import ImageRulesNormal from "../public/images/image-rules.svg";
import ImageRulesBonus from "../public/images/image-rules-bonus.svg";
import IconClose from "../public/images/icon-close.svg";
import LogoBonus from "../public/images/logo-bonus.svg";
import Logo from "../public/images/logo.svg";
import BgPentagon from "../public/images/bg-pentagon.svg";
import BgTriangle from "../public/images/bg-triangle.svg";
import IconLizard from "../public/images/icon-lizard.svg";
import IconPaper from "../public/images/icon-paper.svg";
import IconRock from "../public/images/icon-rock.svg";
import IconScissors from "../public/images/icon-scissors.svg";
import IconSpock from "../public/images/icon-spock.svg";


interface PlayAgainProps {
  show: boolean,
  showFn: (show: boolean) => void,
  computerOption: string,
  setComputerOption: (computerOption: string) => void,
  selectedValue: string,
  resultBroadcast: string,
  setResultBroadcast: (string: string) => void,
  score: number;
  setScore: (score: number) => void;
}



const Rules = ({ showRules, handleShowRules, advancedMode }: { showRules: Boolean, handleShowRules: () => void, advancedMode: Boolean }) => {

  return showRules && (
    <div className='absolute top-0 left-0 bg-white w-[100vw] h-[100vh] flex items-center justify-center flex-col md:top-[50%] md:left-[50%] md:transform md:-translate-x-[50%]  md:translate-y-[-30%] md:px-4 md:w-[350px] md:h-[400px] md:rounded'>
      <div className="text-black mb-4 flex justify-center items-center justify-self-start w-[80%] md:w-[90%] md:justify-between">
        <span className='uppercase text-[32px] text-headerOutline'> Rules</span>
        <button onClick={handleShowRules} className="hidden md:flex">
          <Image src={IconClose} alt="close-icon" />
        </button>
      </div>

      <div>
        <Image src={advancedMode ? ImageRulesBonus : ImageRulesNormal} alt="game-instructions" />
      </div>

      <button onClick={handleShowRules} className="flex mt-6 p-[0.5rem] rounded-full border-2 border-headerOutline md:hidden">
        <Image src={IconClose} alt="close-icon" />
      </button>
    </div>

  )
}

const ScoreBoard = ({ advancedMode, score }: { advancedMode: Boolean, score: number }) => {

  return (
    <div className='flex justify-center items-center w-full mb-[1rem] '>

      <div className='w-[80%] mx-auto border-4 border-headerOutline rounded flex justify-between items-center p-2 px-4 mt-[1rem] md:w-[60%]'>
        <div className='w-[45%] relative'>
          <Image src={advancedMode ? LogoBonus : Logo} alt="game-logos" objectFit='cover' layout='intrinsic' />
        </div>

        <div className='flex justify-center items-center p-2 rounded bg-white flex-col w-[100px]'>
          <p className='text-[15px] text-scoreText uppercase'>Score</p>
          <p className='text-[2rem] text-headerOutline '>
            {score}
          </p>
        </div>

      </div>

    </div>

  )
}

const ButtonGroup = ({ handleShowRules, handleAdvancedMode, advancedMode }: { handleShowRules: () => void, handleAdvancedMode: () => void, advancedMode: Boolean }) => {
  return (
    <div className='w-full absolute bottom-[0.5rem] '>
      <div className='flex justify-between items-center mx-auto w-[80%] '>
        <button className='border-2 border-white text-white text-lg w-[130px] p-2 text-center whitespace-nowrap' onClick={handleAdvancedMode}> {advancedMode ? "Advanced Mode" : "Normal Mode"}</button>
        <button className='border-2 border-white text-white text-lg w-[120px] p-2' onClick={handleShowRules}>Rules</button>
      </div>
    </div>

  )
}

const ResultStage = ({ lightColor, darkColor, bgImg, show }: { lightColor: string, darkColor: string, bgImg: string, show: boolean }) => {
  return (
    <div className={`${show ? "flex" : "hidden"}`}>
      <div className={`w-[8rem] h-[8rem] rounded-full shadow-lg relative overflow-hidden bg-${lightColor} md:w-[13rem] md:h-[13rem] hover:scale-110 transition ease-linear duration-500`} >
        <div className={`w-[8rem] h-[8rem] rounded-full absolute transform top-[47%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-${darkColor} md:w-[13rem] md:h-[13rem]`}></div>
        <div className='w-[6rem] h-[6rem] rounded-full shadow-lg overflow-hidden absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] bg-darkInnerBackground md:w-[10rem] md:h-[10rem] hover:scale-100 transition ease-linear duration-500 '>
          <div className='w-[6rem] h-[6rem] rounded-full shadow-lg reltive overflow-hidden absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[47%] bg-lightInnerBackground md:w-[10rem] md:h-[10rem]' >
          </div>
        </div>
        <div className='absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] cursor-pointer'>
          <Image src={bgImg} alt="icon-paper" width={70} height={70} />
        </div>

      </div>
    </div>
  )


}


const UserSelected = ({ selected, showValue }: { selected: string, showValue: boolean }) => {

  switch (selected) {
    case "paper":
      return <ResultStage lightColor="paper" darkColor="darkPaper" bgImg={IconPaper} show={showValue} />
    case "scissors":
      return <ResultStage lightColor="scissors" darkColor="darkScissors" bgImg={IconScissors} show={showValue} />
    case "rock":
      return <ResultStage lightColor="rock" darkColor="darkRock" bgImg={IconRock} show={showValue} />
    case "lizard":
      return <ResultStage lightColor="lizard" darkColor="darkLizard" bgImg={IconLizard} show={showValue} />
    case "spock":
      return <ResultStage lightColor="cyan" darkColor="darkCyan" bgImg={IconSpock} show={showValue} />
    default: return null;

  }
}

const PlayAgain = ({ show, showFn, computerOption, setComputerOption, selectedValue, resultBroadcast, setResultBroadcast, score, setScore }: PlayAgainProps) => {



  useEffect(() => {

    if (
      (selectedValue === "lizard" && (computerOption === "spock" || computerOption === "paper")) ||
      (selectedValue === "spock" && (computerOption === "rock" || computerOption === "scissors")) ||
      (selectedValue === "rock" && (computerOption === "lizard" || computerOption === "scissors")) ||
      (selectedValue === "paper" && (computerOption === "rock" || computerOption === "spock")) ||
      (selectedValue === "scissors" && (computerOption === "paper" || computerOption === "lizard"))

    ) {

      setResultBroadcast("YOU WIN !");
      setScore(score + 1);

    } else if (selectedValue === computerOption) {
      setResultBroadcast("IT'S A TIE!")

    } else {
      setResultBroadcast("YOU LOSE !")
      setScore(score - 1);
    }

  }, [selectedValue, computerOption])




  const _st = () => {
    showFn(!show);
  }




  return (
    <div className={`${show ? "flex" : "hidden"} justify-center items-center flex-col absolute bottom-[6rem] md:relative `}>
      <p className='text-white font-extrabold upppercase text-[3.5rem]'>{resultBroadcast}</p>
      <button className='text-center uppercase rounded bg-white text-black px-[2rem]  py-[0.5rem] text-[1.5rem]' onClick={_st}>Play Again</button>
    </div>
  )



}


const AdvancedCircle = ({ handleAdvancedSelected, lightColor, darkColor, bgImg, value }: { handleAdvancedSelected: (event: any) => void, lightColor: string, darkColor: string, bgImg: string, value: string }) => {
  return (
    <div className={`w-[8rem] h-[8rem] rounded-full shadow-lg relative overflow-hidden ${lightColor} hover:scale-110 transition ease-linear duration-500`} >
      <div className={`w-[8rem] h-[8rem] rounded-full absolute transform top-[47%] left-[50%] -translate-x-[50%] -translate-y-[50%] ${darkColor}`}></div>
      <div className='w-[6rem] h-[6rem] rounded-full shadow-lg overflow-hidden absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] bg-darkInnerBackground hover:scale-100 transition ease-linear duration-500 '>
        <div className='w-[6rem] h-[6rem] rounded-full shadow-lg overflow-hidden absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[47%] bg-lightInnerBackground' >
        </div>
      </div>
      <div className='absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] cursor-pointer'>
        <Image src={bgImg} alt="icon-paper" width={70} height={70} onClick={handleAdvancedSelected} data-value={value} />
      </div>
    </div>
  )
}

const NormalCircle = ({ handleNormalSelected, lightColor, darkColor, bgImg, value }: { handleNormalSelected: (event: any) => void, lightColor: string, darkColor: string, bgImg: string, value: string }) => {
  return (
    <div className={`w-[8rem] h-[8rem] rounded-full shadow-lg relative overflow-hidden ${lightColor} md:w-[10rem] md:h-[10rem] hover:scale-110 transition ease duration-500`} >
      <div className={`w-[8rem] h-[8rem] rounded-full absolute transform top-[47%] left-[50%] -translate-x-[50%] -translate-y-[50%] ${darkColor} md:w-[10rem] md:h-[10rem]`}></div>
      <div className='w-[6rem] h-[6rem] rounded-full shadow-lg overflow-hidden absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] bg-darkInnerBackground md:w-[8rem] md:h-[8rem] hover:scale-100 transition ease-linear duration-500 '>
        <div className='w-[6rem] h-[6rem] rounded-full shadow-lg reltive overflow-hidden absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[47%] bg-lightInnerBackground md:w-[8rem] md:h-[8rem]' >
        </div>
      </div>
      <div className='absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%] cursor-pointer'>
        <Image src={bgImg} alt="icon-paper" width={70} height={70} onClick={handleNormalSelected} data-value={value} />
      </div>

    </div>
  )
}



const Home: NextPage = () => {

  const [advancedMode, setAdvancedMode] = useState<boolean>(false);
  const [showRules, setShowRules] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [normalSelected, setNormalSelected] = useState<string>("");
  const [advancedSelected, setAdvancedSelected] = useState<string>("");
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [showNormal, setShowNormal] = useState<boolean>(false);
  const [computerOption, setComputerOption] = useState<string>("");
  const [resultBroadcast, setResultBroadcast] = useState<string>("");


  const computationAdvanced = ["paper", "rock", "spock", "lizard", "scissors"];
  const computationNormal = ["paper", "scissors", "rock"];




  const generateRandom = (computationArray: string[]) => {
    const _val = Math.floor(Math.random() * computationArray.length)
    setComputerOption(computationArray[_val]);
  }

  const handleShowRules = () => {
    setShowRules(!showRules);
    setScore(0);
  }

  const handleAdvancedMode = () => {
    setAdvancedMode(!advancedMode);
    setScore(0);
  }

  const handleNormalSelected = (event: any) => {
    setNormalSelected(event.target.getAttribute('data-value'));
    setShowNormal(!showNormal);

    generateRandom(computationNormal);
  }

  const handleAdvancedSelected = (event: any) => {
    setAdvancedSelected(event.target.getAttribute('data-value'));
    setShowAdvanced(!showAdvanced);

    generateRandom(computationAdvanced);
  }


  console.log(normalSelected);
  console.log(computerOption);

  return (
    <div className='w-full relative min-h-[100vh]'>
      <Head>
        <title>Rock-Paper-scissors-Lizard-Spock</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <main>

        <ScoreBoard advancedMode={advancedMode} score={score} />


        <div className='w-full'>

          {
            advancedMode && (
              <>

                {/* ___________________START PENTAGON STRUCTURE ____________ */}

                <div className={`${showAdvanced ? "hidden" : "flex"}`}>
                  <div className={`w-[300px] mx-auto flex justify-center items-center min-h-[70vh] relative md:w-[400px]`}>

                    {/* ______BACKGROUND IMAGE --START ______ */}
                    <div className='w-full mx-auto relative flex justify-center items-center '>
                      <Image src={BgPentagon} alt="pentagon" objectFit='cover' layout='intrinsic' />

                      {/* ______ BACKGROUND IMAGE --END________ */}


                      {/* __________ ALL CIRCLES START _____________ */}

                      <div className={`absolute -top-[4rem] left-[5.5rem] md:left-[8.5rem]`}>
                        <AdvancedCircle
                          handleAdvancedSelected={handleAdvancedSelected}
                          lightColor="bg-scissors"
                          darkColor="bg-darkScissors"
                          bgImg={IconScissors}
                          value="scissors"
                        />
                      </div>


                      <div className={`absolute top-[3rem] -right-[2rem] `}>
                        <AdvancedCircle
                          handleAdvancedSelected={handleAdvancedSelected}
                          lightColor="bg-paper"
                          darkColor="bg-darkPaper"
                          bgImg={IconPaper}
                          value="paper"
                        />
                      </div>


                      <div className={`absolute -bottom-[2.7rem] -right-[0rem]`}>
                        <AdvancedCircle
                          handleAdvancedSelected={handleAdvancedSelected}
                          lightColor="bg-rock"
                          darkColor="bg-darkRock"
                          bgImg={IconRock}
                          value="rock"
                        />
                      </div>

                      <div className={`absolute -bottom-[2.7rem] -left-[0rem]`}>
                        <AdvancedCircle
                          handleAdvancedSelected={handleAdvancedSelected}
                          lightColor="bg-lizard"
                          darkColor="bg-darkLizard"
                          bgImg={IconLizard}
                          value="lizard"
                        />
                      </div>

                      <div className={`absolute top-[3rem] -left-[2rem]`}>
                        <AdvancedCircle
                          handleAdvancedSelected={handleAdvancedSelected}
                          lightColor="bg-cyan"
                          darkColor="bg-darkCyan"
                          bgImg={IconSpock}
                          value="spock"
                        />
                      </div>

                      {/* __________ END ALL CIRCLES _____________ */}


                    </div>
                  </div>
                </div>

                {/* ___________________END PENTAGON STRUCTURE ____________ */}


                <div className={`${showAdvanced ? "flex" : "hidden"} justify-around items-center w-full min-h-[60vh] mx-auto md:w-[70%] `}>

                  <UserSelected
                    selected={advancedSelected}
                    showValue={showAdvanced}
                  />

                  <PlayAgain
                    show={showAdvanced}
                    showFn={setShowAdvanced}
                    computerOption={computerOption}
                    setComputerOption={setComputerOption}
                    selectedValue={advancedSelected}
                    resultBroadcast={resultBroadcast}
                    setResultBroadcast={setResultBroadcast}
                    score={score}
                    setScore={setScore}
                  />


                  <UserSelected
                    selected={computerOption}
                    showValue={showAdvanced}
                  />


                </div>
              </>

            )
          }


          {
            !advancedMode && (
              <>
                {/* ___________________ TRIANGLE STRUCTURE --START______________ */}

                <div className={`relative ${showNormal ? "hidden" : "flex"}`}>
                  <div className={`w-[300px] mx-auto flex justify-center items-center min-h-[70vh] relative md:w-[400px] `}>


                    {/* ______BACKGROUND IMAGE --START ______ */}

                    <div className='w-[85%] mx-auto relative md:w-full'>
                      <Image src={BgTriangle} alt="pentagon" objectFit='cover' layout='intrinsic' />
                      {/* ______ BACKGROUND IMAGE --END________ */}



                      {/* __________ ALL CIRCLES START _____________ */}

                      <div className={`absolute -top-[3rem] -left-[3rem] md:-left-[2rem]`}>
                        <NormalCircle
                          handleNormalSelected={handleNormalSelected}
                          lightColor="bg-paper"
                          darkColor="bg-darkPaper"
                          bgImg={IconPaper}
                          value="paper"
                        />
                      </div>

                      <div className={`absolute -top-[3rem] -right-[3rem] md:right-[2rem]`}>
                        <NormalCircle
                          handleNormalSelected={handleNormalSelected}
                          lightColor="bg-scissors"
                          darkColor="bg-darkScissors"
                          bgImg={IconScissors}
                          value="scissors"
                        />
                      </div>

                      <div className={`absolute -bottom-[2.5rem] left-[25%] md:left-[20%]`}>
                        <NormalCircle
                          handleNormalSelected={handleNormalSelected}
                          lightColor="bg-rock"
                          darkColor="bg-darkRock"
                          bgImg={IconRock}
                          value="rock"
                        />
                      </div>

                      {/* __________ END ALL CIRCLES _____________ */}
                    </div>

                  </div>
                </div>

                {/* ___________________ TRIANGLE STRUCTURE --END ______________ */}


                <div className={`${showNormal ? "flex" : "hidden"} justify-around items-center w-full min-h-[60vh] mx-auto md:w-[70%] `}>

                  <UserSelected
                    selected={normalSelected}
                    showValue={showNormal}
                  />

                  <PlayAgain
                    show={showNormal}
                    showFn={setShowNormal}
                    computerOption={computerOption}
                    setComputerOption={setComputerOption}
                    selectedValue={normalSelected}
                    resultBroadcast={resultBroadcast}
                    setResultBroadcast={setResultBroadcast}
                    score={score}
                    setScore={setScore}
                  />


                  <UserSelected
                    selected={computerOption}
                    showValue={showNormal}
                  />


                </div>




              </>

            )
          }

        </div>

        <ButtonGroup handleShowRules={handleShowRules} handleAdvancedMode={handleAdvancedMode} advancedMode={advancedMode} />
        <Rules showRules={showRules} handleShowRules={handleShowRules} advancedMode={advancedMode} />


      </main>

    </div>


  )

}


export default Home;
