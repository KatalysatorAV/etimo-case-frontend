import { useState } from "react";
import styled from "styled-components";
import { colors, measurments, shadows } from "../utils/config";
import WeatherDisplay from "./WeatherDisplay";

const StyledWeatherRow = styled.div`
  background: ${colors.neutral[10]};
  margin-top: 1rem;
  padding: 1rem;
  border-radius: ${measurments.borderRadius}px;
  box-shadow: ${shadows[3]};
  cursor: pointer;
  .weather-row-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .weather-row-bottom {
    max-height: 0;
    transition: 200ms ease-in-out;
    overflow: hidden;
  }
  &.expanded {
    .weather-row-bottom {
      max-height: 500px;
    }
  }
`;

const WeatherRow = ({ row, date }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <StyledWeatherRow
      role="button"
      onClick={() => setExpanded(!expanded)}
      className={expanded ? "expanded" : ""}
    >
      <div className="weather-row-top">
        <p className="m0 b">{date}</p>
        <p className="m0">
          Väder klockan 12: <WeatherDisplay data={row.mainTime} />
        </p>
      </div>
      <div className="weather-row-bottom">
        <ul>
          {row.times.map((time) => (
            <li key={time.validTime}>
              <span className="b">KL {time.h}:</span>{" "}
              <WeatherDisplay data={time} />
            </li>
          ))}
        </ul>
      </div>
    </StyledWeatherRow>
  );
};

export default WeatherRow;
