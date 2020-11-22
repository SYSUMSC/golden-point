import './App.scss';
import React, { useEffect, useState } from 'react';
import { NameInput } from './components/name-input/NameInput';
import { makeApiPath, resolveUserFromLocalStorage, saveUserData } from './utils';
import { UserStatus } from './components/user-status/UserStatus';
import { PlayerRank } from './components/player-rank/PlayerRank';
import { NumberInput } from './components/number-input/NumberInput';
import { GraphView } from './components/graph-view/GraphView';
import { NumberStatus } from './components/number-status/NumberStatus';
import { GameTitle } from './components/game-title/GameTitle';

function App() {
  const [user, setUser] = useState(resolveUserFromLocalStorage());
  const [numberInquiryEnabled, setNumberInquiryEnabled] = useState(false);
  const [rankData, setRankData] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [submittedNumber, setSubmittedNumber] = useState(null);
  useEffect(() => {
    const eventSource = new EventSource(makeApiPath('event'));
    eventSource.onmessage = ({ data }) => {
      const parsed = JSON.parse(data);
      switch (parsed.type) {
        case 'NUMBER_INQUIRY_BEGIN':
          setSubmittedNumber(null);
          setNumberInquiryEnabled(true);
          break;
        case 'NUMBER_INQUIRY_END':
          setNumberInquiryEnabled(false);
          setGraphData(parsed.data);
          setRankData(
            parsed.data.scoreMap.map((item) => ({
              id: item.id,
              name: item.name,
              score: item.score,
              totalScore: item.totalScore
            }))
          );
          break;
      }
    };
  }, []);
  return (
    <div className="rootContainer">
      <div className="rankContainer">
        <PlayerRank data={rankData} />
      </div>
      <div className="mainContainer">
        <div className="topContainer">
          <GameTitle />
          <div className="topControlContainer">
            {!user && (
              <NameInput
                onNameSubmitted={([id, name]) => {
                  setUser({ id, name });
                  saveUserData(id, name);
                }}
              />
            )}
            {user && <UserStatus id={user.id} name={user.name} />}
            {numberInquiryEnabled && user && submittedNumber === null && (
              <NumberInput
                userId={user.id}
                onNumberSubmitted={(number) => setSubmittedNumber(number)}
              />
            )}
            {user && submittedNumber !== null && <NumberStatus number={submittedNumber} />}
          </div>
        </div>
        <div className="graphContainer">
          <GraphView data={graphData} isWaiting={numberInquiryEnabled} />
        </div>
      </div>
    </div>
  );
}

export default App;
