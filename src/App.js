import { useState } from "react";
import styled from "styled-components";
import Footer from "./components/Footer";
import Header from "./components/Header";
import UserInputs from "./components/UserInputs";
import WeatherDisplay from "./components/WeatherList";
import { colors, measurments, smhiBaseUri } from "./utils/config";

const StyledApp = styled.div`
  background: ${colors.neutral[30]};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  main {
    padding-top: 2rem;
    flex-grow: 1;
  }
  .content {
    max-width: ${measurments.contentWidth}px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState();

  const fetchWeather = async (coordinates, errCb) => {
    try {
      const { lon, lat } = coordinates;
      //Verify coordinates are actual coordinates
      const latRegex = new RegExp(
        /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/
      );
      const lonRegex = new RegExp(
        /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/
      );
      const latValid = latRegex.test(lat);
      const lonValid = lonRegex.test(lon);

      //Notify user if coordinates are invalid
      if (!latValid || !lonValid) return errCb(!latValid, !lonValid);

      //Fetch data with lat&lon params
      setLoading(true);
      const url = `${smhiBaseUri}lon/${lon}/lat/${lat}/data.json`;
      const res = await fetch(url);
      const data = await res.json();
      parseWeatherData(data);
    } catch (e) {
      console.log(e);
      alert("Kunde inte hämta väderprognos");
      setLoading(false);
    }
  };

  const parseWeatherData = (data) => {
    const { timeSeries } = data;
    const days = {};

    //Loop over each prognosis
    timeSeries.forEach((time) => {
      //Get relevant data from the parameters array
      const h = new Date(time.validTime).getUTCHours("sv");
      const wsymb2 = time.parameters.filter(
        (param) => param.name === "Wsymb2"
      )[0].values[0];
      const t = time.parameters.filter((param) => param.name === "t")[0]
        .values[0];
      const timeData = {
        validTime: time.validTime,
        t,
        h,
        wsymb2,
      };

      //Sort prognosises into days object

      //Get date string from prognosis
      const validDay = new Date(time.validTime).toLocaleDateString("sv");

      //Push data to times array if already exists
      if (days[validDay]) days[validDay].times.push(timeData);
      //Create the day object if it doesnt exist
      else
        days[validDay] = {
          times: [timeData],
          mainTime: null,
        };
      //Check if prognosis time matches prognosis to be displayed as main
      const MAIN_TIME = 12;
      const isMainTime = new Date(time.validTime).getUTCHours() === MAIN_TIME;
      //If the prognosis matches the main time set its data as main time
      if (isMainTime) days[validDay].mainTime = timeData;
    });
    setWeatherData(days);
    setLoading(false);
  };

  return (
    <StyledApp>
      <main>
        <div className="content">
          <Header />
          <UserInputs fetchWeather={fetchWeather} loading={loading} />
          <WeatherDisplay weatherData={weatherData} loading={loading} />
        </div>
      </main>
      <Footer />
    </StyledApp>
  );
};

export default App;
