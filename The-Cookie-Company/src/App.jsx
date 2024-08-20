//first import what we need to use
import CookieBtn from "./components/CookieBtn";
import UpgradeButton from "./components/UpgradeButton";
// import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  //second define the state var to be used
  const [cookies, setCookies] = useState(0);
  const [cps, setCps] = useState(1);
  localStorage.setItem(`data`, `data`);

  // const buttonStyle = onClick "greenButton" : "redButton";
  // const upgradeButton = ({ onClick }) => {

  //3rd define a useEffect which runs when cps changes
  useEffect(() => {
    const theInterval = setInterval(function () {
      setCookies((curr) => curr + cps);
    }, 1000);

    return () => clearInterval(theInterval);
  }, [cps]);

  //4th define functions to be used in this code
  function incrementCookies() {
    setCookies(cookies + 1);
  }

  function buyUpgrade() {
    setCookies(cookies - 10);
    setCps(cps + 1);
  }
  //5th define function for the 2nd upgrade button...
  // function upgradeButton2() {
  //   setCookies(cookies + 100);
  //   setCps(cps + 10);
  //JFX returns this...

  return (
    <>
      <h1>Simple Cookie Clicker</h1>
      <div id="cps">Cookies Per Second (cps): {cps}</div>
      <div id="cookies">Cookies: {cookies}</div>
      <div id="buy upgrade">Upgrade Cookies: {buyUpgrade}</div>
      <div id="cpsUpgrade">Cookies Per Second (cpsUpgrade): {cps}</div>

      <CookieBtn onClick={incrementCookies} />
      <UpgradeButton buyUpgrade onClick={buyUpgrade}>
        Buy me!
      </UpgradeButton>
    </>
  );
}
